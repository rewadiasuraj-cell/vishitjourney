<?php
require_once __DIR__ . '/config.php';

function getDB() {
    static $conn = null;
    if ($conn === null) {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        if ($conn->connect_error) {
            die(json_encode(['success' => false, 'message' => 'Database connection failed']));
        }
        $conn->set_charset('utf8mb4');
        ensureDatabaseTablesExist($conn);
    }
    return $conn;
}

function ensureDatabaseTablesExist($conn) {
    static $migrated = false;
    if ($migrated) return;
    $migrated = true;

    // Check & Add missing columns to packages table
    $pkg_columns = [
        'original_price'      => "DECIMAL(10,2) NULL DEFAULT NULL AFTER price",
        'advance_type'        => "ENUM('percentage', 'fixed', 'full') DEFAULT 'percentage' AFTER price_label",
        'advance_value'       => "DECIMAL(10,2) DEFAULT 20.00 AFTER advance_type",
        'available_seats'     => "INT DEFAULT NULL AFTER badge",
        'inclusions'          => "TEXT NULL AFTER highlights",
        'exclusions'          => "TEXT NULL AFTER inclusions",
        'itinerary'           => "TEXT NULL AFTER exclusions",
        'terms_conditions'    => "TEXT NULL AFTER itinerary",
        'cancellation_policy' => "TEXT NULL AFTER terms_conditions"
    ];
    
    $res = $conn->query("SHOW COLUMNS FROM packages");
    if ($res) {
        $existing_cols = [];
        while ($row = $res->fetch_assoc()) {
            $existing_cols[] = $row['Field'];
        }
        foreach ($pkg_columns as $col => $sql) {
            if (!in_array($col, $existing_cols)) {
                $conn->query("ALTER TABLE packages ADD COLUMN $col $sql");
            }
        }
    }

    // Check & Add missing columns to bookings table
    $booking_columns = [
        'booking_ref'         => "VARCHAR(30) UNIQUE NOT NULL AFTER id",
        'whatsapp'            => "VARCHAR(15) NULL AFTER phone",
        'adults'              => "INT DEFAULT 1 AFTER travel_date",
        'children'            => "INT DEFAULT 0 AFTER adults",
        'rooms'               => "INT DEFAULT 1 AFTER children",
        'pickup_location'     => "VARCHAR(255) NULL AFTER special_requests",
        'advance_amount'      => "DECIMAL(10,2) NOT NULL DEFAULT 0.00 AFTER total_amount",
        'remaining_amount'    => "DECIMAL(10,2) NOT NULL DEFAULT 0.00 AFTER advance_amount",
        'currency'            => "VARCHAR(5) DEFAULT 'INR' AFTER remaining_amount",
        'booking_status'      => "ENUM('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING'",
        'payment_status'      => "ENUM('CREATED', 'PENDING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED', 'PARTIALLY_PAID') DEFAULT 'CREATED'",
        'razorpay_order_id'   => "VARCHAR(100) NULL",
        'razorpay_payment_id' => "VARCHAR(100) NULL",
        'razorpay_signature'  => "VARCHAR(255) NULL",
        'notes'               => "TEXT NULL"
    ];

    $res = $conn->query("SHOW COLUMNS FROM bookings");
    if ($res) {
        $existing_cols = [];
        while ($row = $res->fetch_assoc()) {
            $existing_cols[] = $row['Field'];
        }
        foreach ($booking_columns as $col => $sql) {
            if (!in_array($col, $existing_cols)) {
                $conn->query("ALTER TABLE bookings ADD COLUMN $col $sql");
            }
        }
    }

    // Create payments audit table if not exists
    $conn->query("CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        booking_id INT NOT NULL,
        razorpay_order_id VARCHAR(100) NOT NULL,
        razorpay_payment_id VARCHAR(100) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        currency VARCHAR(5) DEFAULT 'INR',
        payment_status VARCHAR(50) DEFAULT 'PAID',
        payment_method VARCHAR(50) DEFAULT 'razorpay',
        signature_verified TINYINT(1) DEFAULT 1,
        raw_reference TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (booking_id),
        INDEX (razorpay_order_id),
        INDEX (razorpay_payment_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
}

function generateBookingRef($db = null) {
    if (!$db) $db = getDB();
    $prefix = 'VJ' . date('ymd'); // e.g. VJ260813
    
    // Find highest sequence for today
    $res = $db->query("SELECT booking_ref FROM bookings WHERE booking_ref LIKE '{$prefix}%' ORDER BY id DESC LIMIT 1");
    if ($res && $row = $res->fetch_assoc()) {
        $last_seq = intval(substr($row['booking_ref'], -3));
        $next_seq = str_pad($last_seq + 1, 3, '0', STR_PAD_LEFT);
    } else {
        $next_seq = '001';
    }
    return $prefix . $next_seq;
}

function calculatePackagePricing($package, $adults = 1, $children = 0) {
    $adults = max(1, intval($adults));
    $children = max(0, intval($children));

    $base_price = floatval($package['price']);
    // Child price calculation (50% of adult base price unless specified)
    $child_price = round($base_price * 0.5);

    $total_amount = round(($base_price * $adults) + ($child_price * $children));

    $adv_type = strtolower($package['advance_type'] ?? 'percentage');
    $adv_val = floatval($package['advance_value'] ?? ADVANCE_PERCENT);

    if ($adv_type === 'full') {
        $advance_amount = $total_amount;
    } elseif ($adv_type === 'fixed') {
        $advance_amount = min($total_amount, round($adv_val));
    } else {
        // Percentage
        if ($adv_val <= 0) $adv_val = 20;
        $advance_amount = round(($total_amount * $adv_val) / 100);
    }

    $remaining_amount = max(0, $total_amount - $advance_amount);

    return [
        'base_price'       => $base_price,
        'adults'           => $adults,
        'children'         => $children,
        'child_price'      => $child_price,
        'total_amount'     => $total_amount,
        'advance_amount'   => $advance_amount,
        'remaining_amount' => $remaining_amount,
        'advance_type'     => $adv_type,
        'advance_value'    => $adv_val
    ];
}

function sanitize($data) {
    if (is_array($data)) {
        return array_map('sanitize', $data);
    }
    return htmlspecialchars(strip_tags(trim($data ?? '')));
}

function isAdminLoggedIn() {
    return isset($_SESSION['admin_id']) && !empty($_SESSION['admin_id']);
}

function requireAdmin() {
    if (!isAdminLoggedIn()) {
        header('Location: /admin/login.php');
        exit;
    }
}

