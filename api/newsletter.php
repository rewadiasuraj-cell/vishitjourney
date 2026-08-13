<?php
require_once __DIR__ . '/../config/db.php';
header('Content-Type: application/json');

$email = sanitize($_POST['email'] ?? '');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email']);
    exit;
}

$db = getDB();
$stmt = $db->prepare("INSERT IGNORE INTO newsletter (email) VALUES (?)");
$stmt->bind_param('s', $email);
echo json_encode(['success' => $stmt->execute(), 'message' => $stmt->execute() ? 'Subscribed!' : 'Already subscribed!']);
