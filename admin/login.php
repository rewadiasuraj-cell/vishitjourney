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
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="shortcut icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
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
