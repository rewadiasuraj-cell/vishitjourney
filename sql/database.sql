-- ============================================
-- VISHIT JOURNEYS - DATABASE SETUP
-- Run this in phpMyAdmin or MySQL CLI
-- ============================================

CREATE DATABASE IF NOT EXISTS vishit_journeys CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE vishit_journeys;

-- Admin Users
CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default admin: username=admin, password=vishit@2024
INSERT INTO admin_users (username, password, email) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@vishitjourneys.com');

-- Users (customers)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL UNIQUE,
  email VARCHAR(100),
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Packages
CREATE TABLE packages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category ENUM('international','domestic','hills','honeymoon') DEFAULT 'domestic',
  duration VARCHAR(50),
  price DECIMAL(10,2) NOT NULL,
  price_label VARCHAR(20) DEFAULT 'per person',
  highlights TEXT,
  image_url VARCHAR(500),
  badge VARCHAR(50),
  status ENUM('active','inactive') DEFAULT 'active',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert all packages
INSERT INTO packages (name, category, duration, price, price_label, highlights, image_url, badge) VALUES
('Dubai Luxury Package','international','5D / 4N',39999,'per person','Burj Khalifa Visit|Desert Safari|Luxury Hotel Stay|Airport Transfers|City Tour','https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80','INTERNATIONAL'),
('Thailand Holiday Package','international','6D / 5N',29999,'per person','Bangkok & Pattaya Tour|Coral Island Visit|Hotel with Breakfast|Private Transfers|Beach Activities','https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80','INTERNATIONAL'),
('Bali Honeymoon Package','honeymoon','5D / 4N',44999,'per couple','Private Villa Stay|Romantic Candle Light Dinner|Water Sports|Ubud Sightseeing|Airport Pickup','https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80','HONEYMOON'),
('Maldives Luxury Package','honeymoon','5D / 4N',49999,'per person','Luxury Water Villa Stay|Speed Boat Transfers|All Meals Included|Private Beach|Candle Light Dinner','https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80','PREMIUM'),
('Kashmir Paradise Package','hills','6D / 5N',14999,'per person','Srinagar Houseboat Stay|Gulmarg Gondola Ride|Pahalgam & Sonmarg Tour|Breakfast & Dinner|Private Cab','https://images.unsplash.com/photo-1566837945700-30057527ade0?w=600&q=80','POPULAR'),
('Manali Volvo Package','hills','5D / 4N',6999,'per person','Delhi-Manali Volvo Ticket|3 Nights Hotel|Solang Valley|Local Manali Tour|Breakfast & Dinner','https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80','BEST SELLER'),
('Manali Honeymoon Package','honeymoon','4D / 3N',8499,'per person','Romantic Room Decoration|Candle Light Dinner|Private Cab|Snow Point Visit|Honeymoon Cake','https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&q=80','HONEYMOON'),
('Kasol + Manali Combo','hills','6D / 5N',9999,'per person','Kasol Riverside Stay|Manali Sightseeing|Solang Valley|Bonfire & Music Night|Hotel Stay','https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80