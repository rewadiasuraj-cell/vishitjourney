<?php
require_once __DIR__ . '/../config/db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

$name            = sanitize($input['name'] ?? '');
$phone           = sanitize($input['phone'] ?? '');
$whatsapp        = sanitize($input['whatsapp'] ?? $phone);
$email           = sanitize($input['email'] ?? '');
$pkg_id          = intval($input['package_id'] ?? 0);
$travel_date     = sanitize($input['travel_date'] ?? '');
$adults          = max(1, intval($input['adults'] ?? $input['travelers'] ?? 1));
$children        = max(0, intval($input['children'] ?? 0));
$rooms           = max(1, intval($input['rooms'] ?? 1));
$pickup_location = sanitize($input['pickup_location'] ?? '');
$special_requests= sanitize($input['special_requests'] ?? '');

if (empty($name) || empty($phone)) {
    echo json_encode(['success' => false, 'message' => 'Name and phone number are required']);
    exit;
}

if (!$pkg_id) {
    echo json_encode(['success' => false, 'message' => 'Valid package selection is required']);
    exit;
}

$db = getDB();

// Fetch authoritative package details from Database
$stmt = $db->prepare("SELECT * FROM packages WHERE id = ? AND status = 'active'");
$stmt->bind_param('i', $pkg_id);
$stmt->execute();
$package = $stmt->get_result()->fetch_assoc();

if (!$package) {
    echo json_encode(['success' => false, 'message' => 'Selected package does not exist or is inactive']);
    exit;
}

// Check available seats if set
if ($package['available_seats'] !== null && intval($package['available_seats']) < ($adults + $children)) {
    echo json_encode(['success' => false, 'message' => 'Only ' . $package['available_seats'] . ' seats available for this package']);
    exit;
}

// Calculate price strictly on server side
$pricing = calculatePackagePricing($package, $adults, $children);
$total_amount     = $pricing['total_amount'];
$advance_amount   = $pricing['advance_amount'];
$remaining_amount = $pricing['remaining_amount'];
$pkg_name         = $package['name'];

$ref = generateBookingRef($db);

$stmt = $db->prepare("INSERT INTO bookings 
    (booking_ref, package_id, package_name, name, phone, whatsapp, email, travel_date, adults, children, rooms, pickup_location, special_requests, total_amount, advance_amount, remaining_amount, currency, booking_status, payment_status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'INR', 'PENDING', 'CREATED')");

$stmt->bind_param(
    'sissssssiiissddd',
    $ref, $pkg_id, $pkg_name, $name, $phone, $whatsapp, $email, $travel_date, 
    $adults, $children, $rooms, $pickup_location, $special_requests, 
    $total_amount, $advance_amount, $remaining_amount
);

if (!$stmt->execute()) {
    echo json_encode(['success' => false, 'message' => 'Database error creating booking: ' . $stmt->error]);
    exit;
}

$booking_id = $db->insert_id;
$razorpay_order = null;
$razorpay_error = null;

// Create Razorpay Order if advance_amount > 0 and Key is configured
if ($advance_amount > 0) {
    if (RAZORPAY_KEY_ID && strpos(RAZORPAY_KEY_ID, 'XXXXXXXX') === false) {
        $api_url = 'https://api.razorpay.com/v1/orders';
        $payload = json_encode([
            'amount'   => round($advance_amount * 100), // convert to paise
            'currency' => 'INR',
            'receipt'  => $ref,
            'notes'    => [
                'booking_id'  => $booking_id,
                'booking_ref' => $ref,
                'package'     => $pkg_name,
                'customer'    => $name
            ]
        ]);

        $ch = curl_init($api_url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => $payload,
            CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
            CURLOPT_USERPWD        => RAZORPAY_KEY_ID . ':' . RAZORPAY_KEY_SECRET,
            CURLOPT_TIMEOUT        => 15
        ]);
        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $razorpay_order = json_decode($response, true);

        if ($http_code === 200 && !empty($razorpay_order['id'])) {
            $order_id_escaped = $db->real_escape_string($razorpay_order['id']);
            $db->query("UPDATE bookings SET razorpay_order_id='{$order_id_escaped}', payment_status='PENDING' WHERE id={$booking_id}");
        } else {
            $razorpay_error = $razorpay_order['error']['description'] ?? 'Razorpay Order Creation Failed';
        }
    }
}

echo json_encode([
    'success'          => true,
    'booking_id'       => $booking_id,
    'booking_ref'      => $ref,
    'package_name'     => $pkg_name,
    'total_amount'     => $total_amount,
    'advance_amount'   => $advance_amount,
    'remaining_amount' => $remaining_amount,
    'razorpay_order'   => $razorpay_order,
    'razorpay_error'   => $razorpay_error,
    'razorpay_key'     => RAZORPAY_KEY_ID,
    'message'          => 'Booking created successfully'
]);
