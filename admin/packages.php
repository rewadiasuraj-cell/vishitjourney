<?php
require_once __DIR__ . '/../config/db.php';
requireAdmin();
$db = getDB();

// Handle save (add/edit)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id             = intval($_POST['id'] ?? 0);
    $name           = sanitize($_POST['name']);
    $cat            = sanitize($_POST['category']);
    $dur            = sanitize($_POST['duration']);
    $price          = floatval($_POST['price']);
    $orig_price     = !empty($_POST['original_price']) ? floatval($_POST['original_price']) : null;
    $label          = sanitize($_POST['price_label']);
    $adv_type       = sanitize($_POST['advance_type'] ?? 'percentage');
    $adv_val        = floatval($_POST['advance_value'] ?? 20);
    $seats          = !empty($_POST['available_seats']) ? intval($_POST['available_seats']) : null;
    $hl             = sanitize($_POST['highlights']);
    $inclusions     = sanitize($_POST['inclusions']);
    $exclusions     = sanitize($_POST['exclusions']);
    $itinerary      = sanitize($_POST['itinerary']);
    $terms          = sanitize($_POST['terms_conditions']);
    $cancellation   = sanitize($_POST['cancellation_policy']);
    $img            = sanitize($_POST['image_url']);
    $badge          = sanitize($_POST['badge']);
    $status         = sanitize($_POST['status']);

    // Handle image upload
    if (!empty($_FILES['image_file']['name'])) {
        $ext = pathinfo($_FILES['image_file']['name'], PATHINFO_EXTENSION);
        $fname = 'pkg_' . time() . '.' . $ext;
        $upload_dir = __DIR__ . '/../uploads/packages/';
        if (!is_dir($upload_dir)) mkdir($upload_dir, 0755, true);
        $dest = $upload_dir . $fname;
        if (move_uploaded_file($_FILES['image_file']['tmp_name'], $dest)) {
            $img = '/uploads/packages/' . $fname;
        }
    }

    if ($id) {
        $stmt = $db->prepare("UPDATE packages SET 
            name=?, category=?, duration=?, price=?, original_price=?, price_label=?, 
            advance_type=?, advance_value=?, available_seats=?, highlights=?, inclusions=?, 
            exclusions=?, itinerary=?, terms_conditions=?, cancellation_policy=?, image_url=?, badge=?, status=? 
            WHERE id=?");
        $stmt->bind_param(
            'sssddsdsisssssssssi',
            $name, $cat, $dur, $price, $orig_price, $label,
            $adv_type, $adv_val, $seats, $hl, $inclusions,
            $exclusions, $itinerary, $terms, $cancellation, $img, $badge, $status, $id
        );
    } else {
        $stmt = $db->prepare("INSERT INTO packages 
            (name, category, duration, price, original_price, price_label, advance_type, advance_value, available_seats, highlights, inclusions, exclusions, itinerary, terms_conditions, cancellation_policy, image_url, badge, status) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        $stmt->bind_param(
            'sssddsdsisssssssss',
            $name, $cat, $dur, $price, $orig_price, $label,
            $adv_type, $adv_val, $seats, $hl, $inclusions,
            $exclusions, $itinerary, $terms, $cancellation, $img, $badge, $status
        );
    }
    $stmt->execute();
    header('Location: packages.php?saved=1'); exit;
}

// Handle delete
if (isset($_GET['delete'])) {
    $id = intval($_GET['delete']);
    $db->query("DELETE FROM packages WHERE id=$id");
    header('Location: packages.php?deleted=1'); exit;
}

// Get package for edit
$edit = null;
if (isset($_GET['edit'])) {
    $edit = $db->query("SELECT * FROM packages WHERE id=" . intval($_GET['edit']))->fetch_assoc();
}

$packages = $db->query("SELECT * FROM packages ORDER BY category, sort_order, id")->fetch_all(MYSQLI_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="/favicon.ico?v=2" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2">
<link rel="manifest" href="/site.webmanifest?v=2">
<meta name="theme-color" content="#0a2540">
<title>Package Management — Vishit Admin</title>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Jost',sans-serif;background:#f0f2f5;display:flex;min-height:100vh}
.sidebar{width:220px;background:#081428;color:#fff;padding:0;flex-shrink:0;position:fixed;height:100vh}
.sidebar-logo{padding:1.5rem;border-bottom:1px solid rgba(201,165,74,0.2);text-align:center}
.sidebar-logo h2{color:#c9a54a;font-size:1.2rem;letter-spacing:2px}
.sidebar-logo p{font-size:.6rem;color:rgba(255,255,255,0.4)}
.nav-link{display:flex;align-items:center;gap:.7rem;padding:.85rem 1.5rem;color:rgba(255,255,255,0.65);text-decoration:none;font-size:.8rem;letter-spacing:1px;transition:all .2s;border-left:3px solid transparent}
.nav-link:hover,.nav-link.active{background:rgba(201,165,74,0.1);color:#c9a54a;border-left-color:#c9a54a}
.nav-section{padding:.5rem 1.5rem;font-size:.6rem;letter-spacing:2px;color:rgba(255,255,255,0.25);text-transform:uppercase;margin-top:1rem}
.main{margin-left:220px;flex:1;padding:2rem}
.page-title{font-size:1.4rem;font-weight:600;margin-bottom:1.5rem}
.btn{padding:.6rem 1.2rem;background:#c9a54a;color:#081428;border:none;font-family:'Jost',sans-serif;font-size:.75rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;cursor:pointer;border-radius:4px;text-decoration:none}
.card{background:#fff;border-radius:8px;box-shadow:0 1px 8px rgba(0,0,0,0.06);margin-bottom:1.5rem}
.card-header{padding:1rem 1.5rem;border-bottom:1px solid #f0f0f0;font-weight:600;font-size:.9rem}
.card-body{padding:1.5rem}
.form-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem}
.form-group{margin-bottom:0}
.form-group.full{grid-column:span 3}
label{display:block;font-size:.68rem;letter-spacing:1.5px;text-transform:uppercase;color:#555;font-weight:600;margin-bottom:.3rem}
input,select,textarea{width:100%;padding:.7rem .9rem;border:1px solid #ddd;font-family:'Jost',sans-serif;font-size:.85rem;outline:none;transition:border .2s;border-radius:4px}
input:focus,select:focus,textarea:focus{border-color:#c9a54a}
table{width:100%;border-collapse:collapse}
th{padding:.7rem 1rem;text-align:left;font-size:.65rem;letter-spacing:1.5px;text-transform:uppercase;color:#888;background:#fafafa;border-bottom:1px solid #f0f0f0}
td{padding:.75rem 1rem;border-bottom:1px solid #f8f8f8;font-size:.82rem;vertical-align:middle}
td img{width:50px;height:40px;object-fit:cover;border-radius:4px}
.badge{padding:3px 10px;border-radius:20px;font-size:.62rem;font-weight:600}
.badge-active{background:#e8f5e9;color:#2e7d32}
.badge-inactive{background:#f5f5f5;color:#999}
.btn-sm{padding:4px 10px;font-size:.65rem;border:none;cursor:pointer;border-radius:3px;font-family:'Jost',sans-serif;text-decoration:none;display:inline-block}
.btn-edit{background:#e3f2fd;color:#1565c0}
.btn-del{background:#ffebee;color:#c62828}
.alert{padding:.7rem 1rem;border-radius:4px;margin-bottom:1rem;font-size:.82rem}
.alert-success{background:#e8f5e9;color:#2e7d32}
@media(max-width:768px){.sidebar{display:none}.main{margin-left:0}.form-grid{grid-template-columns:1fr}}
</style>

  <style id="vjMasterWhiteThemeStyles">
    /* ════════════════════════════════════════════════════════════
       VISHIT JOURNEY — MASTER 100% LIGHT WHITE LUXURY THEME
       (APPLIED ACROSS ALL PAGES & STANDALONE TEMPLATES)
       ════════════════════════════════════════════════════════════ */
    html, body {
      background-color: #FFFFFF !important;
      color: #0B1B33 !important;
    }

    body {
      background: #FFFFFF !important;
      color: #0B1B33 !important;
    }

    section,
    main,
    div,
    header,
    nav,
    footer,
    .search-section,
    .special-offers,
    .destinations,
    .packages,
    .pkg-wrapper,
    .pkg-main-content,
    .why,
    .contact,
    .cta-banner,
    .about-hero,
    .about-section,
    #official-rate-and-faq {
      background-color: #FFFFFF !important;
      color: #0B1B33 !important;
    }

    /* 1. HEADER NAVBAR CLEAN LIGHT STYLING */
    nav, header {
      background: #FFFFFF !important;
      border-bottom: 1px solid #E3E8EF !important;
      box-shadow: 0 4px 20px rgba(11, 27, 51, 0.04) !important;
    }
    .nav-links a {
      color: #0B1B33 !important;
      font-weight: 700 !important;
    }
    .nav-links a:hover, .nav-links a.active {
      color: #D4A72C !important;
    }

    /* 2. ALL CARDS IN PURE WHITE WITH LIGHT BORDER & SOFT SHADOW */
    .pkg2, 
    .offer-card, 
    .review-card, 
    .testi-card, 
    .faq-card, 
    .faq-item, 
    .pricing-card, 
    .trust-highlight-card, 
    .hero-trust-strip, 
    .pkg2-body,
    .about-card,
    .stat-card,
    .team-card {
      background-color: #FFFFFF !important;
      background: #FFFFFF !important;
      border: 1px solid #E3E8EF !important;
      border-radius: 20px !important;
      box-shadow: 0 10px 30px rgba(11, 27, 51, 0.06) !important;
      color: #0B1B33 !important;
    }

    /* 3. ALL HEADINGS IN DEEP NAVY (#0B1B33) */
    h1, h2, h3, h4, h5, h6,
    .section-title,
    .pkg2-body h3,
    .testi-name,
    .review-author,
    .footer-col-title,
    .faq-question,
    .about-title {
      color: #0B1B33 !important;
      text-shadow: none !important;
    }

    /* 4. ALL SUBTITLES & PARAGRAPHS IN SLATE GRAY (#5F6B7A) */
    p, 
    .section-sub, 
    .pkg2-list li, 
    .testi-text, 
    .review-text, 
    .faq-answer, 
    footer p, 
    footer a,
    footer span {
      color: #5F6B7A !important;
      text-shadow: none !important;
    }

    /* GOLD HIGHLIGHTED ACCENTS (#D4A72C) */
    em, 
    .gold-text, 
    .gold-txt, 
    .section-tag, 
    .testi-loc, 
    .review-loc {
      color: #D4A72C !important;
      text-shadow: none !important;
    }

    /* ALTERNATE SECTIONS IN SOFT ICE WHITE (#F7F9FC) */
    .testimonials, 
    .why-us, 
    .faq-section, 
    .alternate-bg,
    footer,
    .footer-section,
    .footer-bottom {
      background-color: #F7F9FC !important;
      background: #F7F9FC !important;
      color: #0B1B33 !important;
    }

    /* BUTTONS */
    .pkg2-btn, .btn-gold, .vj-btn-book {
      background: #D4A72C !important;
      color: #0B1B33 !important;
      border: 1.5px solid #D4A72C !important;
      font-weight: 800 !important;
    }
    .vj-pkg-readmore-btn, .btn-outline, .vj-btn-read {
      background: #FFFFFF !important;
      color: #0B1B33 !important;
      border: 1.5px solid #D4A72C !important;
      font-weight: 700 !important;
    }

    /* FLOATING WHATSAPP BUTTON (GREEN) */
    .whatsapp-btn, .whatsapp-float, [href*="wa.me"] {
      background-color: #25D366 !important;
      color: #FFFFFF !important;
    }
  </style>

</head>
<body>
<div class="sidebar">
  <div class="sidebar-logo"><h2>VISHIT</h2><p>Admin Panel</p></div>
  <div class="nav-section">Main</div>
  <a href="dashboard.php" class="nav-link">📊 Dashboard</a>
  <a href="bookings.php" class="nav-link">📋 Bookings</a>
  <div class="nav-section">Content</div>
  <a href="packages.php" class="nav-link active">🏖 Packages</a>
  <a href="logout.php" class="nav-link">🚪 Logout</a>
</div>
<div class="main">
  <div class="page-title">🏖 Tour Package Management</div>
  <?php if(isset($_GET['saved'])): ?><div class="alert alert-success">✅ Package saved successfully!</div><?php endif; ?>
  <?php if(isset($_GET['deleted'])): ?><div class="alert alert-success">🗑 Package deleted!</div><?php endif; ?>

  <!-- Add/Edit Form -->
  <div class="card">
    <div class="card-header"><?= $edit ? '✏️ Edit Package: ' . htmlspecialchars($edit['name']) : '➕ Add New Package' ?></div>
    <div class="card-body">
      <form method="POST" enctype="multipart/form-data">
        <?php if($edit): ?><input type="hidden" name="id" value="<?= $edit['id'] ?>"><?php endif; ?>
        <div class="form-grid">
          <div class="form-group"><label>Package Name *</label><input name="name" value="<?= htmlspecialchars($edit['name']??'') ?>" required></div>
          <div class="form-group"><label>Category</label>
            <select name="category">
              <?php foreach(['international','domestic','hills','honeymoon'] as $c): ?>
              <option value="<?= $c ?>" <?= ($edit['category']??'')===$c?'selected':'' ?>><?= ucfirst($c) ?></option>
              <?php endforeach; ?>
            </select>
          </div>
          <div class="form-group"><label>Duration</label><input name="duration" value="<?= htmlspecialchars($edit['duration']??'') ?>" placeholder="5D / 4N"></div>
          
          <div class="form-group"><label>Selling Price (₹) *</label><input name="price" type="number" step="0.01" value="<?= $edit['price']??'' ?>" required></div>
          <div class="form-group"><label>Original Price / Strikethrough (₹)</label><input name="original_price" type="number" step="0.01" value="<?= $edit['original_price']??'' ?>" placeholder="e.g. 50000"></div>
          <div class="form-group"><label>Price Label</label><input name="price_label" value="<?= htmlspecialchars($edit['price_label']??'per person') ?>"></div>
          
          <div class="form-group"><label>Advance Payment Type</label>
            <select name="advance_type">
              <option value="percentage" <?= ($edit['advance_type']??'')==='percentage'?'selected':'' ?>>Percentage (%)</option>
              <option value="fixed" <?= ($edit['advance_type']??'')==='fixed'?'selected':'' ?>>Fixed Amount (₹)</option>
              <option value="full" <?= ($edit['advance_type']??'')==='full'?'selected':'' ?>>Full Amount (100%)</option>
            </select>
          </div>
          <div class="form-group"><label>Advance Value (% or ₹)</label><input name="advance_value" type="number" step="0.01" value="<?= $edit['advance_value']??'20' ?>"></div>
          <div class="form-group"><label>Available Seats (Leave blank for unlimited)</label><input name="available_seats" type="number" value="<?= $edit['available_seats']??'' ?>"></div>

          <div class="form-group"><label>Badge Text</label><input name="badge" value="<?= htmlspecialchars($edit['badge']??'') ?>" placeholder="POPULAR / BEST SELLER"></div>
          <div class="form-group"><label>Status</label>
            <select name="status">
              <option value="active" <?= ($edit['status']??'')==='active'?'selected':'' ?>>Active</option>
              <option value="inactive" <?= ($edit['status']??'')==='inactive'?'selected':'' ?>>Inactive</option>
            </select>
          </div>
          <div class="form-group"><label>Image URL</label><input name="image_url" value="<?= htmlspecialchars($edit['image_url']??'') ?>"></div>
          
          <div class="form-group full"><label>Package Highlights (pipe | separated)</label><textarea name="highlights" rows="2" placeholder="Burj Khalifa Visit|Desert Safari|Luxury Hotel Stay"><?= htmlspecialchars($edit['highlights']??'') ?></textarea></div>
          <div class="form-group full"><label>Inclusions</label><textarea name="inclusions" rows="2" placeholder="Hotels, Breakfast, Cab transfers, Sightseeing tickets..."><?= htmlspecialchars($edit['inclusions']??'') ?></textarea></div>
          <div class="form-group full"><label>Exclusions</label><textarea name="exclusions" rows="2" placeholder="Airfare, Personal expenses, Tips, Travel Insurance..."><?= htmlspecialchars($edit['exclusions']??'') ?></textarea></div>
          <div class="form-group full"><label>Itinerary (Day wise details)</label><textarea name="itinerary" rows="3" placeholder="Day 1: Arrival & Hotel Check-in...&#10;Day 2: City Tour..."><?= htmlspecialchars($edit['itinerary']??'') ?></textarea></div>
          <div class="form-group full"><label>Terms & Conditions / Cancellation Policy</label><textarea name="cancellation_policy" rows="2" placeholder="Full refund prior to 15 days of travel..."><?= htmlspecialchars($edit['cancellation_policy']??'') ?></textarea></div>

          <div class="form-group"><label>Or Upload New Image</label><input type="file" name="image_file" accept="image/*"></div>
        </div>
        <div style="margin-top:1.5rem;display:flex;gap:.5rem">
          <button type="submit" class="btn"><?= $edit ? 'Update Package' : 'Add Package' ?></button>
          <?php if($edit): ?><a href="packages.php" class="btn" style="background:#f0f2f5;color:#555">Cancel Edit</a><?php endif; ?>
        </div>
      </form>
    </div>
  </div>

  <!-- Packages List -->
  <div class="card">
    <div class="card-header">All Active & Inactive Packages (<?= count($packages) ?>)</div>
    <table>
      <thead>
        <tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Advance Config</th><th>Seats</th><th>Status</th><th>Actions</th></tr>
      </thead>
      <tbody>
      <?php foreach($packages as $p): 
        $adv = ($p['advance_type']==='full') ? 'Full (100%)' : (($p['advance_type']==='fixed') ? '₹' . number_format($p['advance_value']) : $p['advance_value'] . '%');
      ?>
      <tr>
        <td><img src="<?= htmlspecialchars($p['image_url']) ?>" alt=""></td>
        <td><strong><?= htmlspecialchars($p['name']) ?></strong><br><small style="color:#888"><?= htmlspecialchars($p['duration']) ?> • <?= htmlspecialchars($p['badge']) ?></small></td>
        <td><?= ucfirst($p['category']) ?></td>
        <td>
          <strong>₹<?= number_format($p['price']) ?></strong>
          <?php if($p['original_price']): ?><br><small style="text-decoration:line-through;color:#aaa">₹<?= number_format($p['original_price']) ?></small><?php endif; ?>
        </td>
        <td><span style="background:#e3f2fd;color:#1565c0;padding:2px 8px;border-radius:4px;font-size:0.75rem"><?= $adv ?></span></td>
        <td><?= $p['available_seats'] !== null ? $p['available_seats'] . ' left' : 'Unlimited' ?></td>
        <td><span class="badge badge-<?= $p['status'] ?>"><?= ucfirst($p['status']) ?></span></td>
        <td>
          <a href="?edit=<?= $p['id'] ?>" class="btn-sm btn-edit">Edit</a>
          <a href="?delete=<?= $p['id'] ?>" class="btn-sm btn-del" onclick="return confirm('Delete this package?')">Delete</a>
        </td>
      </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
  </div>
</div>
</body>
</html>
