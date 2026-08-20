<?php
require_once __DIR__ . '/../config/db.php';

if (isAdminLoggedIn()) {
    header('Location: dashboard.php'); exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = sanitize($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM admin_users WHERE username=? LIMIT 1");
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $admin = $stmt->get_result()->fetch_assoc();
    if ($admin && password_verify($password, $admin['password'])) {
        $_SESSION['admin_id'] = $admin['id'];
        $_SESSION['admin_user'] = $admin['username'];
        header('Location: dashboard.php'); exit;
    } else {
        $error = 'Invalid username or password';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="/favicon.ico?v=2" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2">
<link rel="manifest" href="/site.webmanifest?v=2">
<meta name="theme-color" content="#0a2540">
<title>Admin Login — Vishit Journey</title>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Jost',sans-serif;background:#081428;min-height:100vh;display:flex;align-items:center;justify-content:center}
.login-box{background:#0d1f3c;border:1px solid rgba(201,165,74,0.25);padding:3rem;width:100%;max-width:400px;border-radius:4px}
.logo{text-align:center;margin-bottom:2rem}
.logo h2{color:#c9a54a;font-size:1.8rem;letter-spacing:3px}
.logo p{color:rgba(255,255,255,0.4);font-size:.7rem;letter-spacing:2px;margin-top:4px}
.form-group{margin-bottom:1.2rem}
label{display:block;font-size:.7rem;letter-spacing:2px;color:rgba(255,255,255,0.5);margin-bottom:.4rem;text-transform:uppercase}
input{width:100%;padding:.8rem 1rem;background:rgba(255,255,255,0.05);border:1px solid rgba(201,165,74,0.2);color:#fff;font-family:'Jost',sans-serif;font-size:.9rem;outline:none;transition:border .2s}
input:focus{border-color:#c9a54a}
.btn{width:100%;padding:.9rem;background:#c9a54a;border:none;color:#081428;font-family:'Jost',sans-serif;font-size:.85rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;cursor:pointer;margin-top:.5rem;transition:background .2s}
.btn:hover{background:#e4c06e}
.error{background:rgba(255,0,0,0.1);border:1px solid rgba(255,0,0,0.3);color:#ff6b6b;padding:.8rem;font-size:.82rem;margin-bottom:1rem;text-align:center}
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
<div class="login-box">
  <div class="logo">
    <h2>VISHIT</h2>
    <p>✦ Admin Panel ✦</p>
  </div>
  <?php if($error): ?><div class="error"><?= $error ?></div><?php endif; ?>
  <form method="POST">
    <div class="form-group">
      <label>Username</label>
      <input type="text" name="username" required autocomplete="username">
    </div>
    <div class="form-group">
      <label>Password</label>
      <input type="password" name="password" required autocomplete="current-password">
    </div>
    <button type="submit" class="btn">Login →</button>
  </form>
</div>
</body>
</html>
