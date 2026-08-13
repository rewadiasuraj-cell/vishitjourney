<?php
require_once __DIR__ . '/../config/db.php';
header('Content-Type: application/json');

$post_data = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_RAZORPAY_SIGNATURE'] ?? '';

if (empty($post_data)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Empty payload']);
    exit;
}

// Verify webhook signature if secret configured
if (defined('RAZORPAY_WEBHOOK_SECRET') && !empty(RAZORPAY_WEBHOOK_SECRET) && RAZORPAY_WEBHOOK_SECRET !== 'vishit_webhook_secret_key') {
    $expected_signature = hash_hmac('sha256', $post_data, RAZORPAY_WEBHOOK_SECRET);
    if (!hash_equals($expected_signature, $signature)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid webhook signature']);
        exit;
    }
}

$event = json_decode($post_data, true);
if (!$event || empty($event['event'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    exit;
}

$event_name = $event['event'];
$payload = $event['payload'];

$db = getDB();

if ($event_name === 'payment.captured') {
    $payment = $payload['payment']['entity'] ?? null;
    if ($payment) {
        $order_id   = $payment['order_id'] ?? '';
        $payment_id = $payment['id'] ?? '';
        $amount     = floatval($payment['amount'] ?? 0) / 100;
        $booking_id = intval($payment['notes']['booking_id'] ?? 0);
        $booking_ref= $payment['notes']['booking_ref'] ?? '';

        // Find booking
        $booking = null;
        if ($booking_id) {
            $stmt = $db->prepare("SELECT * FROM bookings WHERE id = ?");
            $stmt->bind_param('i', $booking_id);
            $stmt->execute();
            $booking = $stmt->get_result()->fetch_assoc();
        } elseif ($booking_ref) {
            $stmt = $db->prepare("SELECT * FROM bookings WHERE booking_ref = ?");
            $stmt->bind_param('s', $booking_ref);
            $stmt->execute();
            $booking = $stmt->get_result()->fetch_assoc();
        } elseif ($order_id) {
            $stmt = $db->prepare("SELECT * FROM bookings WHERE razorpay_order_id = ?");
            $stmt->bind_param('s', $order_id);
            $stmt->execute();
            $booking = $stmt->get_result()->fetch_assoc();
        }

        if ($booking) {
            $b_id = $booking['id'];
            $rem = floatval($booking['remaining_amount']);
            $new_pay_status = ($rem <= 0) ? 'PAID' : 'PARTIALLY_PAID';

            // Idempotent check: update if not already marked paid
            if ($booking['booking_status'] !== 'CONFIRMED' || $booking['payment_status'] === 'PENDING' || $booking['payment_status'] === 'CREATED') {
                $stmt_up = $db->prepare("UPDATE bookings SET 
                    razorpay_payment_id = ?,
                    payment_status      = ?,
                    booking_status      = 'CONFIRMED',
                    updated_at          = CURRENT_TIMESTAMP
                    WHERE id = ?");
                $stmt_up->bind_param('ssi', $payment_id, $new_pay_status, $b_id);
                $stmt_up->execute();

                // Check payment log idempotency
                $chk_pay = $db->query("SELECT id FROM payments WHERE razorpay_payment_id = '{$payment_id}'");
                if ($chk_pay && $chk_pay->num_rows === 0) {
                    $stmt_p = $db->prepare("INSERT INTO payments (booking_id, razorpay_order_id, razorpay_payment_id, amount, currency, payment_status, payment_method, signature_verified, raw_reference) VALUES (?, ?, ?, ?, 'INR', ?, 'webhook', 1, ?)");
                    $stmt_p->bind_param('issdss', $b_id, $order_id, $payment_id, $amount, $new_pay_status, $post_data);
                    $stmt_p->execute();
                }
            }
        }
    }
} elseif ($event_name === 'payment.failed') {
    $payment = $payload['payment']['entity'] ?? null;
    if ($payment) {
        $order_id = $payment['order_id'] ?? '';
        if ($order_id) {
            $db->query("UPDATE bookings SET payment_status = 'FAILED' WHERE razorpay_order_id = '{$order_id}' AND payment_status IN ('CREATED','PENDING')");
        }
    }
} elseif ($event_name === 'refund.created') {
    $refund = $payload['refund']['entity'] ?? null;
    if ($refund) {
        $payment_id = $refund['payment_id'] ?? '';
        if ($payment_id) {
            $db->query("UPDATE bookings SET payment_status = 'REFUNDED', booking_status = 'CANCELLED' WHERE razorpay_payment_id = '{$payment_id}'");
        }
    }
}

http_response_code(200);
echo json_encode(['status' => 'ok', 'event' => $event_name]);
