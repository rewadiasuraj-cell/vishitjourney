# Vishit Journeys — Dynamic Website Setup Guide

## 📁 Folder Structure
```
vishit-journeys/
├── index.php          ← Main website
├── config/
│   ├── config.php     ← ⚠️ EDIT THIS FIRST
│   └── db.php         ← Database functions
├── admin/
│   ├── login.php      ← Admin login
│   ├── dashboard.php  ← Stats & recent bookings
│   ├── bookings.php   ← Manage all bookings
│   └── packages.php   ← Add/Edit/Delete packages
├── api/
│   ├── booking.php    ← Save booking + Razorpay order
│   ├── verify-payment.php ← Confirm payment
│   └── newsletter.php ← Email subscription
├── sql/
│   └── database.sql   ← Run this in phpMyAdmin
└── uploads/
    └── packages/      ← Package images upload here
```

---

## 🚀 Step-by-Step Setup on cPanel

### Step 1 — Upload Files
1. Login to cPanel → File Manager
2. Go to `public_html` (or your domain folder)
3. Upload all files from this ZIP

### Step 2 — Create Database
1. cPanel → MySQL Databases → Create new database: `vishit_journeys`
2. Create a database user and assign ALL privileges
3. Go to phpMyAdmin → Select your database
4. Click "Import" → Upload `sql/database.sql` → Click Go

### Step 3 — Edit Config
Open `config/config.php` and update:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'cpanel_username_dbuser'); // your cPanel username_dbuser
define('DB_PASS', 'your_password');
define('DB_NAME', 'cpanel_username_vishit_journeys');
define('SITE_URL', 'https://yourdomain.com');
```

### Step 4 — Razorpay Setup (Optional)
1. Create account at razorpay.com
2. Go to Settings → API Keys → Generate Live Key
3. Update in config.php:
```php
define('RAZORPAY_KEY_ID', 'rzp_live_XXXXXXXX');
define('RAZORPAY_KEY_SECRET', 'XXXXXXXXXXXXXXXX');
```
> If no Razorpay yet — it still works! Bookings save to DB and WhatsApp button works.

### Step 5 — File Permissions
In cPanel File Manager, right-click `uploads/` → Permissions → Set 755

---

## 🔐 Admin Panel
- URL: `yourdomain.com/admin/login.php`
- Username: `admin`
- Password: `vishit@2024`

⚠️ **Change password immediately after first login!**

To change password, go to phpMyAdmin:
```sql
UPDATE admin_users 
SET password = '$2y$10$YOUR_BCRYPT_HASH' 
WHERE username = 'admin';
```
Generate hash at: https://bcrypt-generator.com

---

## ✅ Features
- ✅ Dynamic packages from database
- ✅ Online booking form with customer details saved
- ✅ Razorpay 20% advance payment
- ✅ Admin dashboard with booking stats
- ✅ Manage packages (add/edit/delete/image upload)
- ✅ WhatsApp booking confirmation
- ✅ Newsletter subscription
- ✅ Mobile responsive

## 📞 Support
Contact: vishitjourney2104@gmail.com | 9899902890
