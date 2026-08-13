<?php
require_once __DIR__ . '/../config/db.php';
header('Content-Type: application/json');

$pkg_id = intval($_GET['id'] ?? 0);
$adults = intval($_GET['adults'] ?? 1);
$children = intval($_GET['children'] ?? 0);

if (!$pkg_id) {
    echo json_encode(['success' => false, 'message' => 'Package ID is required']);
    exit;
}

$db = getDB();
$stmt = $db->prepare("SELECT * FROM packages WHERE id = ? AND status = 'active'");
$stmt->bind_param('i', $pkg_id);
$stmt->execute();
$res = $stmt->get_result();
$package = $res->fetch_assoc();

if (!$package) {
    echo json_encode(['success' => false, 'message' => 'Package not found or inactive']);
    exit;
}

$pricing = calculatePackagePricing($package, $adults, $children);

echo json_encode([
    'success' => true,
    'package' => [
        'id'                  => intval($package['id']),
        'name'                => $package['name'],
        'category'            => $package['category'],
        'duration'            => $package['duration'],
        'price'               => floatval($package['price']),
        'original_price'      => $package['original_price'] ? floatval($package['original_price']) : null,
        'price_label'         => $package['price_label'],
        'highlights'          => explode('|', $package['highlights']),
        'image_url'           => $package['image_url'],
        'badge'               => $package['badge'],
        'inclusions'          => $package['inclusions'],
        'exclusions'          => $package['exclusions'],
        'itinerary'           => $package['itinerary'],
        'terms_conditions'    => $package['terms_conditions'],
        'cancellation_policy' => $package['cancellation_policy'],
        'available_seats'     => $package['available_seats'] ? intval($package['available_seats']) : null
    ],
    'pricing' => $pricing
]);
