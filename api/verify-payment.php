<?php
require_once __DIR__ . '/../config/db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

$payment_id = sanitize($input['razorpay_payment_id'] ?? '');
$order_id   = sanitize($input['razorpay_order_id'] ?? '');
$signature  = sanitize($input['razorpay_signature'] ?? '');
$booking_id = intval($input['booking_id'] ?? 0);

if (empty($payment_id) || empty($order_id) || empty($signature) || !$booking_id) {
    echo json_encode(['success' => false, 'message' => 'Missing required payment verification details']);
    exit;
}

// Verify HMAC SHA256 Signature
$expected_signature = hash_hmac('sha256', $order_id . '|' . $payment_id, RAZORPAY_KEY_SECRET);

if (!hash_equals($expected_signature, $signature)) {
    $db = getDB();
    $db->query("UPDATE bookings SET payment_status = 'FAILED' WHERE id = {$booking_id}");
    echo json_encode(['success' => false, 'message' => 'Payment signature verification failed. Fraudulent or corrupt payload detected.']);
    exit;
}

$db = getDB();
$stmt = $db->prepare("SELECT * FROM bookings WHERE id = ?");
$stmt->bind_param('i', $booking_id);
$stmt->execute();
$booking = $stmt->get_result()->fetch_assoc();

if (!$booking) {
    echo json_encode(['success' => false, 'message' => 'Booking record not found']);
    exit;
}

$total_amount     = floatval($booking['total_amount']);
$advance_amount   = floatval($booking['advance_amount']);
$remaining_amount = floatval($booking['remaining_amount']);

$payment_status = ($remaining_amount <= 0) ? 'PAID' : 'PARTIALLY_PAID';

// Update booking record
$stmt_update = $db->prepare("UPDATE bookings SET 
    razorpay_payment_id = ?,
    razorpay_signature  = ?,
    payment_status      = ?,
    booking_status      = 'CONFIRMED',
    updated_at          = CURRENT_TIMESTAMP
    WHERE id = ?");
$stmt_update->bind_param('sssi', $payment_id, $signature, $payment_status, $booking_id);
$stmt_update->execute();

// Insert into payments audit log table
$stmt_pay = $db->prepare("INSERT INTO payments 
    (booking_id, razorpay_order_id, razorpay_payment_id, amount, currency, payment_status, payment_method, signature_verified, raw_reference) 
    VALUES (?, ?, ?, ?, 'INR', ?, 'razorpay', 1, ?)");
$raw_ref = json_encode($input);
$stmt_pay->bind_param('issdss', $booking_id, $order_id, $payment_id, $advance_amount, $payment_status, $raw_ref);
$stmt_pay->execute();

echo json_encode([
    'success'          => true,
    'message'          => 'Payment verified and booking confirmed!',
    'booking_id'       => $booking['id'],
    'booking_ref'      => $booking['booking_ref'],
    'package_name'     => $booking['package_name'],
    'customer_name'    => $booking['name'],
    'phone'            => $booking['phone'],
    'travel_date'      => $booking['travel_date'],
    'adults'           => $booking['adults'],
    'children'         => $booking['children'],
    'total_amount'     => $total_amount,
    'advance_amount'   => $advance_amount,
    'remaining_amount' => $remaining_amount,
    'payment_status'   => $payment_status,
    'payment_id'       => $payment_id
]);
