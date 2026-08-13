<?php
require_once __DIR__ . '/../config/db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
$booking_ref = sanitize($input['booking_ref'] ?? '');
$booking_id  = intval($input['booking_id'] ?? 0);

if (empty($booking_ref) && !$booking_id) {
    echo json_encode(['success' => false, 'message' => 'Booking reference or ID is required']);
    exit;
}

$db = getDB();

if ($booking_id) {
    $stmt = $db->prepare("SELECT * FROM bookings WHERE id = ?");
    $stmt->bind_param('i', $booking_id);
} else {
    $stmt = $db->prepare("SELECT * FROM bookings WHERE booking_ref = ?");
    $stmt->bind_param('s', $booking_ref);
}

$stmt->execute();
$booking = $stmt->get_result()->fetch_assoc();

if (!$booking) {
    echo json_encode(['success' => false, 'message' => 'Booking not found']);
    exit;
}

if (in_array($booking['payment_status'], ['PAID', 'CONFIRMED'])) {
    echo json_encode(['success' => false, 'message' => 'This booking has already been paid and confirmed!']);
    exit;
}

$advance_amount = floatval($booking['advance_amount']);
$ref            = $booking['booking_ref'];
$b_id           = $booking['id'];

$razorpay_order = null;

if ($advance_amount > 0 && RAZORPAY_KEY_ID && strpos(RAZORPAY_KEY_ID, 'XXXXXXXX') === false) {
    $api_url = 'https://api.razorpay.com/v1/orders';
    $payload = json_encode([
        'amount'   => round($advance_amount * 100),
        'currency' => 'INR',
        'receipt'  => $ref . '_retry_' . time(),
        'notes'    => [
            'booking_id'  => $b_id,
            'booking_ref' => $ref,
            'package'     => $booking['package_name'],
            'customer'    => $booking['name'],
            'retry'       => true
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
        $db->query("UPDATE bookings SET razorpay_order_id='{$order_id_escaped}', payment_status='PENDING' WHERE id={$b_id}");
    }
}

echo json_encode([
    'success'          => true,
    'booking_id'       => $b_id,
    'booking_ref'      => $ref,
    'package_name'     => $booking['package_name'],
    'customer_name'    => $booking['name'],
    'phone'            => $booking['phone'],
    'email'            => $booking['email'],
    'total_amount'     => floatval($booking['total_amount']),
    'advance_amount'   => $advance_amount,
    'remaining_amount' => floatval($booking['remaining_amount']),
    'razorpay_order'   => $razorpay_order,
    'razorpay_key'     => RAZORPAY_KEY_ID,
    'message'          => 'Payment retry initialized'
]);
