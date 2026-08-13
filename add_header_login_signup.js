const fs = require('fs');

console.log('Adding top right Login and Sign Up buttons and Auth modal...');

const phpFile = 'd:/vishit-journeys/index.php';
if (fs.existsSync(phpFile)) {
  let content = fs.readFileSync(phpFile, 'utf8');

  const navRightNew = `<div class="nav-right-actions" style="display:flex;align-items:center;gap:.8rem">
    <button onclick="openAuthModal('login')" class="nav-btn-login">Login</button>
    <button onclick="openAuthModal('signup')" class="nav-btn-signup">Sign Up →</button>
    <button class="mob-menu-btn" onclick="document.getElementById('mobDrawer').classList.add('open')" aria-label="Menu">`;

  if (content.includes('class="mob-menu-btn"')) {
    content = content.replace(/<div style="display:flex;align-items:center;gap:\.7rem">\s*<a href="#contact"[^]*?class="mob-menu-btn"/gi, navRightNew);
  }

  // Inject CSS for nav-btn-login, nav-btn-signup & auth tabs
  if (!content.includes('.nav-btn-login')) {
    const navBtnCss = `
  /* TOP RIGHT LOGIN & SIGN UP BUTTONS */
  .nav-btn-login {
    padding: .55rem 1.3rem !important;
    border: 1.5px solid rgba(13, 31, 60, 0.25) !important;
    border-radius: 25px !important;
    background: transparent !important;
    color: #0d1f3c !important;
    font-family: 'Jost', sans-serif !important;
    font-size: .78rem !important;
    font-weight: 600 !important;
    letter-spacing: 1.5px !important;
    text-transform: uppercase !important;
    cursor: pointer !important;
    transition: all .25s ease !important;
  }
  .nav-btn-login:hover {
    border-color: var(--gold) !important;
    color: var(--gold2) !important;
    background: rgba(201, 165, 74, 0.08) !important;
    transform: translateY(-2px) !important;
  }
  .nav-btn-signup {
    padding: .55rem 1.4rem !important;
    border: 1.5px solid var(--gold) !important;
    border-radius: 25px !important;
    background: var(--gold) !important;
    color: var(--navy) !important;
    font-family: 'Jost', sans-serif !important;
    font-size: .78rem !important;
    font-weight: 700 !important;
    letter-spacing: 1.5px !important;
    text-transform: uppercase !important;
    cursor: pointer !important;
    transition: all .25s ease !important;
    box-shadow: 0 4px 12px rgba(201, 165, 74, 0.35) !important;
  }
  .nav-btn-signup:hover {
    background: #0d1f3c !important;
    color: var(--gold) !important;
    border-color: #0d1f3c !important;
    box-shadow: 0 4px 15px rgba(13, 31, 60, 0.4) !important;
    transform: translateY(-2px) !important;
  }
  .vj-auth-tabs {
    display: flex; gap: 0.5rem; justify-content: center; background: rgba(255,255,255,0.06);
    padding: 4px; border-radius: 20px; border: 1px solid rgba(201,165,74,0.2); margin-top: 0.6rem;
  }
  .vj-auth-tab {
    flex: 1; padding: 0.4rem 1rem; border: none; background: transparent; color: rgba(255,255,255,0.7);
    font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 1.5px;
    border-radius: 16px; cursor: pointer; transition: all 0.2s;
  }
  .vj-auth-tab.active { background: var(--gold); color: var(--navy); }
`;
    content = content.replace('/* ALL SHAPES CURVED STYLING */', navBtnCss + '\n  /* ALL SHAPES CURVED STYLING */');
  }

  // Inject User Auth Modal HTML & JS if not present
  if (!content.includes('id="vjAuthModal"')) {
    const authModalHtml = `
<!-- USER AUTH MODAL (LOGIN / SIGN UP) -->
<div id="vjAuthModal" class="vj-modal-overlay">
  <div class="vj-modal-box" style="max-width:440px;border-radius:24px;">
    <button onclick="closeAuthModal()" class="vj-modal-close">✕</button>
    
    <div class="vj-modal-header" style="text-align:center;padding-bottom:0.8rem">
      <div class="vj-modal-tag" style="margin-bottom:0.4rem">✦ VISHIT JOURNEY ACCOUNT</div>
      <div class="vj-auth-tabs">
        <button id="tabBtnLogin" onclick="switchAuthTab('login')" class="vj-auth-tab active">LOGIN</button>
        <button id="tabBtnSignup" onclick="switchAuthTab('signup')" class="vj-auth-tab">SIGN UP</button>
      </div>
    </div>

    <div class="vj-modal-body" style="padding-top:1rem">
      <!-- LOGIN FORM -->
      <form id="vjLoginForm" onsubmit="handleAuthSubmit(event, 'login')">
        <div class="vj-field-group">
          <label class="vj-label">Email or Phone Number *</label>
          <input type="text" id="vjLoginUser" class="vj-input" placeholder="Enter email or phone" required>
        </div>
        <div class="vj-field-group">
          <label class="vj-label">Password *</label>
          <input type="password" id="vjLoginPass" class="vj-input" placeholder="••••••••" required>
        </div>
        <div style="text-align:right;margin-bottom:1.2rem">
          <a href="javascript:void(0)" onclick="alert('Password reset link sent to your contact!')" style="color:var(--gold);font-size:0.75rem;text-decoration:none">Forgot Password?</a>
        </div>
        <button type="submit" class="vj-btn-primary" style="width:100%;border-radius:25px">LOGIN TO ACCOUNT →</button>
      </form>

      <!-- SIGN UP FORM -->
      <form id="vjSignupForm" onsubmit="handleAuthSubmit(event, 'signup')" style="display:none">
        <div class="vj-field-group">
          <label class="vj-label">Full Name *</label>
          <input type="text" id="vjSignupName" class="vj-input" placeholder="Enter full name" required>
        </div>
        <div class="vj-field-group">
          <label class="vj-label">Phone / WhatsApp Number *</label>
          <input type="tel" id="vjSignupPhone" class="vj-input" placeholder="+91 9876543210" required>
        </div>
        <div class="vj-field-group">
          <label class="vj-label">Email Address *</label>
          <input type="email" id="vjSignupEmail" class="vj-input" placeholder="yourname@gmail.com" required>
        </div>
        <div class="vj-field-group">
          <label class="vj-label">Create Password *</label>
          <input type="password" id="vjSignupPass" class="vj-input" placeholder="At least 6 characters" required>
        </div>
        <button type="submit" class="vj-btn-primary" style="width:100%;border-radius:25px;margin-top:0.5rem">CREATE ACCOUNT →</button>
      </form>

      <div style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,0.1);text-align:center;font-size:0.75rem;color:rgba(255,255,255,0.6)">
        Are you an administrator? <a href="/admin/login.php" style="color:var(--gold);text-decoration:none;font-weight:600">Admin Login 🔒</a>
      </div>
    </div>
  </div>
</div>

<script>
function openAuthModal(tab) {
  const modal = document.getElementById('vjAuthModal');
  if (modal) {
    modal.style.display = 'flex';
    switchAuthTab(tab || 'login');
  }
}
function closeAuthModal() {
  const modal = document.getElementById('vjAuthModal');
  if (modal) {
    modal.style.display = 'none';
  }
}
function switchAuthTab(tab) {
  const loginForm = document.getElementById('vjLoginForm');
  const signupForm = document.getElementById('vjSignupForm');
  const tabLogin = document.getElementById('tabBtnLogin');
  const tabSignup = document.getElementById('tabBtnSignup');

  if (tab === 'signup') {
    if (loginForm) loginForm.style.display = 'none';
    if (signupForm) signupForm.style.display = 'block';
    if (tabLogin) tabLogin.classList.remove('active');
    if (tabSignup) tabSignup.classList.add('active');
  } else {
    if (loginForm) loginForm.style.display = 'block';
    if (signupForm) signupForm.style.display = 'none';
    if (tabLogin) tabLogin.classList.add('active');
    if (tabSignup) tabSignup.classList.remove('active');
  }
}
function handleAuthSubmit(e, type) {
  e.preventDefault();
  const name = document.getElementById('vjSignupName') ? document.getElementById('vjSignupName').value : 'User';
  alert(type === 'login' ? 'Welcome back! You are logged in.' : 'Account created successfully for ' + name + '! Welcome to Vishit Journey.');
  closeAuthModal();
}
</script>
`;
    content = content.replace('</body>', authModalHtml + '\n</body>');
  }

  fs.writeFileSync(phpFile, content, 'utf8');
  console.log('Updated index.php with Login & Sign Up buttons and Auth modal!');
}

// Update build_clean_static_site.js to preserve nav login/signup buttons and auth modal
const buildScript = 'd:/vishit-journeys/build_clean_static_site.js';
if (fs.existsSync(buildScript)) {
  let scriptContent = fs.readFileSync(buildScript, 'utf8');
  if (!scriptContent.includes('nav-btn-login')) {
    scriptContent = scriptContent.replace(
      '// Inject filterByDestination JS if missing',
      '// Replace nav right actions for Login & Sign Up\nhtml = html.replace(/(<nav[^>]*>[^]*?<ul class="nav-links">[^]*?<\\/ul>\\s*)<div[^>]*>/i, "$1" + \'<div class="nav-right-actions" style="display:flex;align-items:center;gap:.8rem"><button onclick="openAuthModal(\\\'login\\\')" class="nav-btn-login">Login</button><button onclick="openAuthModal(\\\'signup\\\')" class="nav-btn-signup">Sign Up →</button>\');\n\n// Inject filterByDestination JS if missing'
    );
    fs.writeFileSync(buildScript, scriptContent, 'utf8');
    console.log('Updated build_clean_static_site.js!');
  }
}
