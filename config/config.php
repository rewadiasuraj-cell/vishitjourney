<?php
// ============================================
// VISHIT JOURNEYS - Configuration
// ============================================

// --- DATABASE ---
define('DB_HOST', 'localhost');
define('DB_USER', 'your_db_username');   // Change this
define('DB_PASS', 'your_db_password');   // Change this
define('DB_NAME', 'vishit_journeys');

// --- SITE ---
define('SITE_URL', 'https://vishitjourneys.com');  // Change this
define('SITE_NAME', 'Vishit Journey');
define('ADMIN_EMAIL', 'vishitjourney2104@gmail.com');
define('CONTACT_PHONE', '9899902890');

// --- RAZORPAY & PAYMENT ---
define('PAYMENT_MODE', 'TEST'); // 'TEST' or 'LIVE'
define('RAZORPAY_KEY_ID', 'rzp_test_XXXXXXXXXXXXXXXX');    // Add your Razorpay Key ID here
define('RAZORPAY_KEY_SECRET', 'XXXXXXXXXXXXXXXXXXXXXXXX'); // Add your Razorpay Key Secret here
define('RAZORPAY_WEBHOOK_SECRET', 'vishit_webhook_secret_key'); // Set webhook secret in Razorpay Dashboard
define('ADVANCE_PERCENT', 20); // Fallback 20% advance payment

// --- SESSION ---
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
error_reporting(0);
ini_set('display_errors', 0);

