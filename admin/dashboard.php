<?php
require_once __DIR__ . '/../config/db.php';
requireAdmin();
$db = getDB();

$stats = [
  'total_bookings'    => $db->query("SELECT COUNT(*) FROM bookings")->fetch_row()[0],
  'confirmed'         => $db->query("SELECT COUNT(*) FROM bookings WHERE booking_status='CONFIRMED'")->fetch_row()[0],
  'pending'           => $db->query("SELECT COUNT(*) FROM bookings WHERE booking_status='PENDING'")->fetch_row()[0],
  'advance_received'  => $db->query("SELECT COALESCE(SUM(advance_amount),0) FROM bookings WHERE payment_status IN ('PARTIALLY_PAID','PAID')")->fetch_row()[0],
  'outstanding_due'   => $db->query("SELECT COALESCE(SUM(remaining_amount),0) FROM bookings WHERE booking_status='CONFIRMED' AND payment_status='PARTIALLY_PAID'")->fetch_row()[0],
  'total_revenue'     => $db->query("SELECT COALESCE(SUM(total_amount - remaining_amount),0) FROM bookings WHERE payment_status IN ('PARTIALLY_PAID','PAID')")->fetch_row()[0],
  'total_packages'    => $db->query("SELECT COUNT(*) FROM packages WHERE status='active'")->fetch_row()[0],
];

$recent = $db->query("SELECT b.*, p.name as pkg FROM bookings b LEFT JOIN packages p ON b.package_id=p.id ORDER BY b.id DESC LIMIT 10")->fetch_all(MYSQLI_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Dashboard — Vishit Admin</title>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Jost',sans-serif;background:#f0f2f5;color:#333;display:flex;min-height:100vh}
.sidebar{width:220px;background:#081428;color:#fff;padding:0;flex-shrink:0;position:fixed;height:100vh;overflow-y:auto}
.sidebar-logo{padding:1.5rem;border-bottom:1px solid rgba(201,165,74,0.2);text-align:center}
.sidebar-logo h2{color:#c9a54a;font-size:1.2rem;letter-spacing:2px}
.sidebar-logo p{font-size:.6rem;color:rgba(255,255,255,0.4);letter-spacing:1px;margin-top:2px}
.nav-link{display:flex;align-items:center;gap:.7rem;padding:.85rem 1.5rem;color:rgba(255,255,255,0.65);text-decoration:none;font-size:.8rem;letter-spacing:1px;transition:all .2s;border-left:3px solid transparent}
.nav-link:hover,.nav-link.active{background:rgba(201,165,74,0.1);color:#c9a54a;border-left-color:#c9a54a}
.nav-section{padding:.5rem 1.5rem;font-size:.6rem;letter-spacing:2px;color:rgba(255,255,255,0.25);text-transform:uppercase;margin-top:1rem}
.main{margin-left:220px;flex:1;padding:2rem}
.page-title{font-size:1.4rem;font-weight:600;margin-bottom:.3rem}
.page-sub{font-size:.82rem;color:#888;margin-bottom:2rem}
.stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;margin-bottom:2rem}
.stat-card{background:#fff;padding:1.5rem;border-radius:8px;box-shadow:0 1px 8px rgba(0,0,0,0.06);border-left:4px solid #c9a54a}
.stat-card.green{border-left-color:#2e7d32}
.stat-card.orange{border-left-color:#e65100}
.stat-card.red{border-left-color:#c62828}
.stat-card .num{font-size:1.7rem;font-weight:700;color:#081428}
.stat-card .label{font-size:.7rem;color:#888;letter-spacing:1px;text-transform:uppercase;margin-top:4px}
.stat-card .icon{font-size:1.5rem;float:right;margin-top:-2.3rem}
.card{background:#fff;border-radius:8px;box-shadow:0 1px 8px rgba(0,0,0,0.06);margin-bottom:1.5rem}
.card-header{padding:1.2rem 1.5rem;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;justify-content:space-between}
.card-header h3{font-size:.95rem;font-weight:600}
.card-body{padding:0}
table{width:100%;border-collapse:collapse}
th{padding:.8rem 1.5rem;text-align:left;font-size:.68rem;letter-spacing:1.5px;text-transform:uppercase;color:#888;background:#fafafa;border-bottom:1px solid #f0f0f0}
td{padding:.85rem 1.5rem;font-size:.82rem;border-bottom:1px solid #f8f8f8}
tr:last-child td{border:none}
.badge{padding:3px 10px;border-radius:20px;font-size:.65rem;font-weight:600;letter-spacing:.5px;text-transform:uppercase}
.badge-CONFIRMED, .badge-PAID{background:#e8f5e9;color:#2e7d32}
.badge-PARTIALLY_PAID{background:#e3f2fd;color:#1565c0}
.badge-PENDING, .badge-CREATED{background:#fff3e0;color:#e65100}
.badge-FAILED, .badge-CANCELLED{background:#ffebee;color:#c62828}
.btn-sm{padding:4px 12px;font-size:.68rem;letter-spacing:1px;text-transform:uppercase;border:none;cursor:pointer;border-radius:2px;text-decoration:none;display:inline-block}
.btn-gold{background:#c9a54a;color:#081428}
@media(max-width:768px){.sidebar{display:none}.main{margin-left:0}.stats-grid{grid-template-columns:1fr 1fr}}
</style>
</head>
<body>
<div class="sidebar">
  <div class="sidebar-logo"><h2>VISHIT</h2><p>Admin Panel</p></div>
  <div class="nav-section">Main</div>
  <a href="dashboard.php" class="nav-link active">📊 Dashboard</a>
  <a href="bookings.php" class="nav-link">📋 Bookings</a>
  <div class="nav-section">Content</div>
  <a href="packages.php" class="nav-link">🏖 Packages</a>
  <div class="nav-section">Account</div>
  <a href="logout.php" class="nav-link">🚪 Logout</a>
</div>
<div class="main">
  <div class="page-title">Dashboard Overview</div>
  <div class="page-sub">Welcome back, <?= htmlspecialchars($_SESSION['admin_user'] ?? 'Admin') ?> 👋</div>

  <div class="stats-grid">
    <div class="stat-card"><div class="icon">📋</div><div class="num"><?= $stats['total_bookings'] ?></div><div class="label">Total Bookings</div></div>
    <div class="stat-card green"><div class="icon">✅</div><div class="num"><?= $stats['confirmed'] ?></div><div class="label">Confirmed Bookings</div></div>
    <div class="stat-card orange"><div class="icon">⏳</div><div class="num"><?= $stats['pending'] ?></div><div class="label">Pending Bookings</div></div>
    <div class="stat-card green"><div class="icon">💰</div><div class="num">₹<?= number_format($stats['total_revenue']) ?></div><div class="label">Revenue Collected</div></div>
    <div class="stat-card"><div class="icon">💵</div><div class="num">₹<?= number_format($stats['advance_received']) ?></div><div class="label">Advance Received</div></div>
    <div class="stat-card red"><div class="icon">⚠️</div><div class="num">₹<?= number_format($stats['outstanding_due']) ?></div><div class="label">Outstanding Balance</div></div>
  </div>

  <div class="card">
    <div class="card-header">
      <h3>Recent Customer Bookings</h3>
      <a href="bookings.php" class="btn-sm btn-gold">View All Bookings</a>
    </div>
    <div class="card-body">
      <table>
        <thead><tr><th>Ref</th><th>Customer</th><th>Package</th><th>Travelers</th><th>Total Amount</th><th>Payment</th><th>Status</th><th>Date</th></tr></thead>
        <tbody>
        <?php if(empty($recent)): ?>
        <tr><td colspan="8" style="text-align:center;padding:2rem;color:#888">No recent bookings recorded.</td></tr>
        <?php else: ?>
        <?php foreach($recent as $b): ?>
        <tr>
          <td><strong><?= htmlspecialchars($b['booking_ref']) ?></strong></td>
          <td><?= htmlspecialchars($b['name']) ?><br><small style="color:#888"><?= htmlspecialchars($b['phone']) ?></small></td>
          <td><?= htmlspecialchars($b['package_name']) ?></td>
          <td><?= $b['adults'] ?? 1 ?> Adult(s)</td>
          <td>₹<?= number_format($b['total_amount']) ?><br><small style="color:#2e7d32">Adv: ₹<?= number_format($b['advance_amount']) ?></small></td>
          <td><span class="badge badge-<?= $b['payment_status'] ?>"><?= $b['payment_status'] ?></span></td>
          <td><span class="badge badge-<?= $b['booking_status'] ?>"><?= $b['booking_status'] ?></span></td>
          <td><?= date('d M Y', strtotime($b['created_at'])) ?></td>
        </tr>
        <?php endforeach; ?>
        <?php endif; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>
</body>
</html>
