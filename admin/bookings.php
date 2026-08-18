<?php
require_once __DIR__ . '/../config/db.php';
requireAdmin();
$db = getDB();

// Handle Status & Balance Updates
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $id = intval($_POST['id']);
    
    if ($_POST['action'] === 'update_booking') {
        $b_status = sanitize($_POST['booking_status']);
        $p_status = sanitize($_POST['payment_status']);
        $notes    = sanitize($_POST['notes'] ?? '');
        
        $stmt = $db->prepare("UPDATE bookings SET booking_status=?, payment_status=?, notes=?, updated_at=CURRENT_TIMESTAMP WHERE id=?");
        $stmt->bind_param('sssi', $b_status, $p_status, $notes, $id);
        $stmt->execute();
        header('Location: bookings.php?updated=1'); exit;
    } elseif ($_POST['action'] === 'mark_balance_paid') {
        $stmt = $db->prepare("UPDATE bookings SET remaining_amount=0, payment_status='PAID', updated_at=CURRENT_TIMESTAMP WHERE id=?");
        $stmt->bind_param('i', $id);
        $stmt->execute();
        header('Location: bookings.php?paid=1'); exit;
    }
}

// Search and Filter Filters
$search      = sanitize($_GET['search'] ?? '');
$filter_b_st = sanitize($_GET['b_status'] ?? 'all');
$filter_p_st = sanitize($_GET['p_status'] ?? 'all');
$filter_pkg  = intval($_GET['package_id'] ?? 0);

$where = [];
if (!empty($search)) {
    $s_esc = $db->real_escape_string($search);
    $where[] = "(b.booking_ref LIKE '%$s_esc%' OR b.name LIKE '%$s_esc%' OR b.phone LIKE '%$s_esc%' OR b.email LIKE '%$s_esc%')";
}
if ($filter_b_st !== 'all') {
    $where[] = "b.booking_status = '$filter_b_st'";
}
if ($filter_p_st !== 'all') {
    $where[] = "b.payment_status = '$filter_p_st'";
}
if ($filter_pkg > 0) {
    $where[] = "b.package_id = $filter_pkg";
}

$where_sql = count($where) > 0 ? 'WHERE ' . implode(' AND ', $where) : '';

$bookings = $db->query("SELECT b.*, p.name as pkg_name FROM bookings b LEFT JOIN packages p ON b.package_id=p.id $where_sql ORDER BY b.id DESC")->fetch_all(MYSQLI_ASSOC);
$packages = $db->query("SELECT id, name FROM packages ORDER BY name")->fetch_all(MYSQLI_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<title>Bookings Management — Vishit Admin</title>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Jost',sans-serif;background:#f0f2f5;display:flex;min-height:100vh}
.sidebar{width:220px;background:#081428;color:#fff;padding:0;flex-shrink:0;position:fixed;height:100vh}
.sidebar-logo{padding:1.5rem;border-bottom:1px solid rgba(201,165,74,0.2);text-align:center}
.sidebar-logo h2{color:#c9a54a;font-size:1.2rem;letter-spacing:2px}
.sidebar-logo p{font-size:.6rem;color:rgba(255,255,255,0.4);letter-spacing:1px}
.nav-link{display:flex;align-items:center;gap:.7rem;padding:.85rem 1.5rem;color:rgba(255,255,255,0.65);text-decoration:none;font-size:.8rem;letter-spacing:1px;transition:all .2s;border-left:3px solid transparent}
.nav-link:hover,.nav-link.active{background:rgba(201,165,74,0.1);color:#c9a54a;border-left-color:#c9a54a}
.nav-section{padding:.5rem 1.5rem;font-size:.6rem;letter-spacing:2px;color:rgba(255,255,255,0.25);text-transform:uppercase;margin-top:1rem}
.main{margin-left:220px;flex:1;padding:2rem}
.page-title{font-size:1.4rem;font-weight:600;margin-bottom:1.5rem}

.filter-bar{background:#fff;padding:1.2rem;border-radius:8px;box-shadow:0 1px 8px rgba(0,0,0,0.06);margin-bottom:1.5rem;display:flex;gap:1rem;flex-wrap:wrap;align-items:center}
.filter-bar input, .filter-bar select{padding:.6rem .9rem;border:1px solid #ddd;border-radius:4px;font-family:'Jost',sans-serif;font-size:.82rem;outline:none}
.filter-bar input[type="text"]{flex:1;min-width:200px}
.btn-search{padding:.6rem 1.2rem;background:#081428;color:#c9a54a;border:none;border-radius:4px;font-family:'Jost',sans-serif;font-size:.8rem;font-weight:600;cursor:pointer}

.card{background:#fff;border-radius:8px;box-shadow:0 1px 8px rgba(0,0,0,0.06);overflow:hidden}
table{width:100%;border-collapse:collapse;font-size:.82rem}
th{padding:.8rem 1rem;text-align:left;font-size:.65rem;letter-spacing:1.5px;text-transform:uppercase;color:#888;background:#fafafa;border-bottom:1px solid #f0f0f0;white-space:nowrap}
td{padding:.85rem 1rem;border-bottom:1px solid #f8f8f8;vertical-align:top}
.badge{padding:3px 10px;border-radius:20px;font-size:.65rem;font-weight:600;display:inline-block;text-transform:uppercase}
.badge-CONFIRMED, .badge-PAID{background:#e8f5e9;color:#2e7d32}
.badge-PARTIALLY_PAID{background:#e3f2fd;color:#1565c0}
.badge-PENDING, .badge-CREATED{background:#fff3e0;color:#e65100}
.badge-FAILED, .badge-CANCELLED{background:#ffebee;color:#c62828}

.btn-sm{padding:5px 12px;font-size:.7rem;letter-spacing:1px;border:none;cursor:pointer;border-radius:4px;background:#c9a54a;color:#081428;font-family:'Jost',sans-serif;font-weight:600;text-decoration:none;display:inline-block}
.modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:100;align-items:center;justify-content:center}
.modal.open{display:flex}
.modal-box{background:#fff;padding:2rem;border-radius:8px;width:550px;max-width:95vw;max-height:90vh;overflow-y:auto}
.modal-box h3{margin-bottom:1.2rem;font-size:1.1rem;border-bottom:2px solid #081428;padding-bottom:.5rem}
.form-row{margin-bottom:1rem}
.form-row label{display:block;font-size:.68rem;font-weight:600;margin-bottom:.3rem;text-transform:uppercase;letter-spacing:1px;color:#555}
.form-row select,.form-row textarea,.form-row input{width:100%;padding:.6rem .8rem;border:1px solid #ddd;border-radius:4px}
.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:.8rem;background:#f9f9f9;padding:1rem;border-radius:6px;margin-bottom:1.2rem;font-size:.82rem}
.detail-label{font-size:.68rem;color:#888;text-transform:uppercase;margin-bottom:2px}
.detail-val{font-weight:600;color:#081428}

.modal-actions{display:flex;gap:.5rem;margin-top:1.2rem;justify-content:flex-end}
.btn-cancel{background:#f5f5f5;color:#555}
.success-msg{background:#e8f5e9;color:#2e7d32;padding:.7rem 1rem;border-radius:4px;margin-bottom:1rem;font-size:.82rem}
@media(max-width:768px){.sidebar{display:none}.main{margin-left:0}}
</style>
</head>
<body>
<div class="sidebar">
  <div class="sidebar-logo"><h2>VISHIT</h2><p>Admin Panel</p></div>
  <div class="nav-section">Main</div>
  <a href="dashboard.php" class="nav-link">📊 Dashboard</a>
  <a href="bookings.php" class="nav-link active">📋 Bookings</a>
  <div class="nav-section">Content</div>
  <a href="packages.php" class="nav-link">🏖 Packages</a>
  <a href="logout.php" class="nav-link">🚪 Logout</a>
</div>
<div class="main">
  <div class="page-title">📋 Customer Bookings Management</div>
  
  <?php if(isset($_GET['updated'])): ?><div class="success-msg">✅ Booking status updated successfully!</div><?php endif; ?>
  <?php if(isset($_GET['paid'])): ?><div class="success-msg">💰 Balance marked as PAID!</div><?php endif; ?>

  <!-- Filters & Search -->
  <form method="GET" class="filter-bar">
    <input type="text" name="search" placeholder="Search Ref, Customer Name, Phone, Email..." value="<?= htmlspecialchars($search) ?>">
    <select name="package_id">
      <option value="0">All Packages</option>
      <?php foreach($packages as $pkg): ?>
      <option value="<?= $pkg['id'] ?>" <?= $filter_pkg===$pkg['id']?'selected':'' ?>><?= htmlspecialchars($pkg['name']) ?></option>
      <?php endforeach; ?>
    </select>
    <select name="b_status">
      <option value="all">All Booking Status</option>
      <?php foreach(['PENDING','CONFIRMED','IN_PROGRESS','COMPLETED','CANCELLED'] as $st): ?>
      <option value="<?= $st ?>" <?= $filter_b_st===$st?'selected':'' ?>><?= $st ?></option>
      <?php endforeach; ?>
    </select>
    <select name="p_status">
      <option value="all">All Payment Status</option>
      <?php foreach(['CREATED','PENDING','PARTIALLY_PAID','PAID','FAILED','CANCELLED','REFUNDED'] as $pst): ?>
      <option value="<?= $pst ?>" <?= $filter_p_st===$pst?'selected':'' ?>><?= $pst ?></option>
      <?php endforeach; ?>
    </select>
    <button type="submit" class="btn-search">Search / Filter</button>
    <a href="bookings.php" style="font-size:.78rem;color:#666;text-decoration:none;align-self:center">Reset</a>
  </form>

  <div class="card">
    <table>
      <thead>
        <tr><th>Ref & Date</th><th>Customer Info</th><th>Package & Travel Date</th><th>Guests</th><th>Amounts</th><th>Payment</th><th>Status</th><th>Actions</th></tr>
      </thead>
      <tbody>
      <?php if(empty($bookings)): ?>
      <tr><td colspan="8" style="text-align:center;padding:2rem;color:#888">No bookings found matching filters.</td></tr>
      <?php else: ?>
      <?php foreach($bookings as $b): ?>
      <tr>
        <td>
          <strong style="color:#081428;font-size:.9rem"><?= htmlspecialchars($b['booking_ref']) ?></strong><br>
          <small style="color:#aaa"><?= date('d M Y, h:i A', strtotime($b['created_at'])) ?></small>
        </td>
        <td>
          <strong><?= htmlspecialchars($b['name']) ?></strong><br>
          <small style="color:#555">📞 <?= htmlspecialchars($b['phone']) ?></small>
          <?php if($b['email']): ?><br><small style="color:#888">✉ <?= htmlspecialchars($b['email']) ?></small><?php endif; ?>
        </td>
        <td>
          <strong><?= htmlspecialchars($b['package_name']) ?></strong><br>
          <small style="color:#2e7d32">🗓 Date: <?= $b['travel_date'] ? date('d M Y', strtotime($b['travel_date'])) : 'TBD' ?></small>
        </td>
        <td>
          <?= $b['adults'] ?> Adult<?= $b['adults']>1?'s':'' ?>
          <?= $b['children']>0 ? '<br><small>+' . $b['children'] . ' Child</small>' : '' ?>
        </td>
        <td>
          <strong>Total: ₹<?= number_format($b['total_amount']) ?></strong><br>
          <small style="color:#2e7d32">Paid: ₹<?= number_format($b['advance_amount']) ?></small><br>
          <small style="color:#c62828">Rem: ₹<?= number_format($b['remaining_amount']) ?></small>
        </td>
        <td><span class="badge badge-<?= $b['payment_status'] ?>"><?= $b['payment_status'] ?></span></td>
        <td><span class="badge badge-<?= $b['booking_status'] ?>"><?= $b['booking_status'] ?></span></td>
        <td>
          <button class="btn-sm" onclick='openModal(<?= json_encode($b) ?>)'>Manage</button>
          <a href="https://wa.me/91<?= preg_replace('/[^0-9]/','',$b['phone']) ?>?text=Hi+<?= urlencode($b['name']) ?>%2C+your+booking+<?= $b['booking_ref'] ?>+for+<?= urlencode($b['package_name']) ?>+is+<?= $b['booking_status'] ?>!+-+Vishit+Journey" target="_blank" class="btn-sm" style="background:#25D366;color:#fff;margin-top:4px">WA</a>
        </td>
      </tr>
      <?php endforeach; ?>
      <?php endif; ?>
      </tbody>
    </table>
  </div>
</div>

<!-- Manage Booking Modal -->
<div class="modal" id="editModal">
  <div class="modal-box">
    <h3>Manage Booking: <span id="modal_ref" style="color:#c9a54a"></span></h3>
    
    <div class="detail-grid">
      <div><div class="detail-label">Customer Name</div><div class="detail-val" id="d_name"></div></div>
      <div><div class="detail-label">Phone / WhatsApp</div><div class="detail-val" id="d_phone"></div></div>
      <div><div class="detail-label">Package Name</div><div class="detail-val" id="d_package"></div></div>
      <div><div class="detail-label">Travel Date</div><div class="detail-val" id="d_date"></div></div>
      <div><div class="detail-label">Guests & Rooms</div><div class="detail-val" id="d_guests"></div></div>
      <div><div class="detail-label">Pickup Location</div><div class="detail-val" id="d_pickup"></div></div>
      <div><div class="detail-label">Total Cost</div><div class="detail-val" id="d_total"></div></div>
      <div><div class="detail-label">Advance Paid</div><div class="detail-val" id="d_advance" style="color:#2e7d32"></div></div>
      <div><div class="detail-label">Remaining Due</div><div class="detail-val" id="d_remaining" style="color:#c62828"></div></div>
      <div><div class="detail-label">Razorpay Order / Pay ID</div><div class="detail-val" id="d_rzp" style="font-size:0.75rem;word-break:break-all"></div></div>
    </div>

    <form method="POST">
      <input type="hidden" name="id" id="modal_id">
      <input type="hidden" name="action" value="update_booking">
      
      <div class="form-row">
        <label>Booking Status</label>
        <select name="booking_status" id="modal_booking_status">
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>
      
      <div class="form-row">
        <label>Payment Status</label>
        <select name="payment_status" id="modal_payment_status">
          <option value="CREATED">CREATED</option>
          <option value="PENDING">PENDING</option>
          <option value="PARTIALLY_PAID">PARTIALLY_PAID</option>
          <option value="PAID">PAID</option>
          <option value="FAILED">FAILED</option>
          <option value="CANCELLED">CANCELLED</option>
          <option value="REFUNDED">REFUNDED</option>
        </select>
      </div>
      
      <div class="form-row">
        <label>Internal Admin Notes</label>
        <textarea name="notes" id="modal_notes" rows="3" placeholder="Add internal notes about payment, hotel confirmation, driver details..."></textarea>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:1.2rem;border-top:1px solid #eee;padding-top:1rem">
        <button type="button" id="btnMarkPaid" onclick="markPaid()" class="btn-sm" style="background:#2e7d32;color:#fff">💰 Mark Balance as Paid</button>
        
        <div class="modal-actions" style="margin-top:0">
          <button type="button" class="btn-sm btn-cancel" onclick="document.getElementById('editModal').classList.remove('open')">Cancel</button>
          <button type="submit" class="btn-sm">Save Changes</button>
        </div>
      </div>
    </form>
    
    <form id="markPaidForm" method="POST" style="display:none">
      <input type="hidden" name="id" id="mark_paid_id">
      <input type="hidden" name="action" value="mark_balance_paid">
    </form>
  </div>
</div>

<script>
let activeBooking = null;
function openModal(b) {
  activeBooking = b;
  document.getElementById('modal_id').value = b.id;
  document.getElementById('mark_paid_id').value = b.id;
  document.getElementById('modal_ref').textContent = b.booking_ref;
  
  document.getElementById('d_name').textContent = b.name;
  document.getElementById('d_phone').textContent = b.phone + (b.whatsapp ? ' (WA: ' + b.whatsapp + ')' : '');
  document.getElementById('d_package').textContent = b.package_name;
  document.getElementById('d_date').textContent = b.travel_date || 'N/A';
  document.getElementById('d_guests').textContent = `${b.adults || 1} Adults, ${b.children || 0} Children (${b.rooms || 1} Rooms)`;
  document.getElementById('d_pickup').textContent = b.pickup_location || 'Not specified';
  document.getElementById('d_total').textContent = '₹' + parseFloat(b.total_amount).toLocaleString('en-IN');
  document.getElementById('d_advance').textContent = '₹' + parseFloat(b.advance_amount).toLocaleString('en-IN');
  document.getElementById('d_remaining').textContent = '₹' + parseFloat(b.remaining_amount).toLocaleString('en-IN');
  document.getElementById('d_rzp').textContent = (b.razorpay_payment_id || b.razorpay_order_id) ? `Order: ${b.razorpay_order_id || 'N/A'}\nPayID: ${b.razorpay_payment_id || 'N/A'}` : 'None';

  document.getElementById('modal_booking_status').value = b.booking_status;
  document.getElementById('modal_payment_status').value = b.payment_status;
  document.getElementById('modal_notes').value = b.notes || '';
  
  document.getElementById('btnMarkPaid').style.display = (parseFloat(b.remaining_amount) > 0) ? 'inline-block' : 'none';
  
  document.getElementById('editModal').classList.add('open');
}

function markPaid() {
  if (confirm('Mark remaining balance as fully paid for ' + activeBooking.booking_ref + '?')) {
    document.getElementById('markPaidForm').submit();
  }
}
</script>
</body>
</html>
