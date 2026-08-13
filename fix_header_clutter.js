const fs = require('fs');

console.log('Fixing header layout clutter and cleaning up navbar markup...');

const phpFile = 'd:/vishit-journeys/index.php';
if (fs.existsSync(phpFile)) {
  let content = fs.readFileSync(phpFile, 'utf8');

  // 1. Clean up <nav> markup completely
  const cleanNavHtml = `<nav>
  <a href="#" class="logo">
    <img src="Vishit_Journey_Logo.jpg" alt="Vishit Journey" style="height:104px;width:auto;display:block;">
  </a>
  <ul class="nav-links">
    <li><a href="#destinations">Destinations</a></li>
    <li><a href="#packages">Packages</a></li>
    <li><a href="#why">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <div class="nav-right-actions">
    <button onclick="openAuthModal('login')" class="nav-btn-login">Login</button>
    <button onclick="openAuthModal('signup')" class="nav-btn-signup">Sign Up →</button>
    <button class="mob-menu-btn" onclick="document.getElementById('mobDrawer').classList.add('open')" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;

  content = content.replace(/<nav>[^]*?<\/nav>/gi, cleanNavHtml);

  // 2. Remove any old conflicting CSS overrides
  content = content.replace(/\/\* HEADER CURVED NAV BUTTONS \*\/[^]*?\/\* TOP RIGHT LOGIN & SIGN UP BUTTONS \*\//gi, '');

  // 3. Inject clean Header CSS
  const cleanHeaderCss = `
  /* CLEAN UNCLUTTERED HEADER NAVBAR */
  nav {
    position: fixed !important;
    top: 0 !important; left: 0 !important; right: 0 !important;
    z-index: 100 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: .5rem 4% !important;
    background: #ffffff !important;
    border-bottom: 2px solid rgba(201, 165, 74, 0.3) !important;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08) !important;
  }
  .nav-links {
    display: flex !important;
    gap: 2rem !important;
    list-style: none !important;
    align-items: center !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  .nav-links a {
    text-decoration: none !important;
    font-size: .8rem !important;
    font-weight: 600 !important;
    letter-spacing: 2px !important;
    text-transform: uppercase !important;
    color: #0d1f3c !important;
    padding: .5rem 1rem !important;
    border-radius: 20px !important;
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
    transition: all .2s ease !important;
    white-space: nowrap !important;
  }
  .nav-links a:hover {
    color: var(--gold) !important;
    background: rgba(201, 165, 74, 0.08) !important;
    transform: none !important;
  }
  .nav-right-actions {
    display: flex !important;
    align-items: center !important;
    gap: .8rem !important;
  }
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
    white-space: nowrap !important;
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
    white-space: nowrap !important;
  }
  .nav-btn-signup:hover {
    background: #0d1f3c !important;
    color: var(--gold) !important;
    border-color: #0d1f3c !important;
    box-shadow: 0 4px 15px rgba(13, 31, 60, 0.4) !important;
    transform: translateY(-2px) !important;
  }
`;

  if (!content.includes('CLEAN UNCLUTTERED HEADER NAVBAR')) {
    content = content.replace('/* ALL SHAPES CURVED STYLING */', cleanHeaderCss + '\n  /* ALL SHAPES CURVED STYLING */');
  } else {
    content = content.replace(/\/\* CLEAN UNCLUTTERED HEADER NAVBAR \*\/[^]*?\.nav-btn-signup:hover\{[^]*?\}/gi, cleanHeaderCss);
  }

  fs.writeFileSync(phpFile, content, 'utf8');
  console.log('Fixed index.php header layout!');
}

// 4. Update build_clean_static_site.js to prevent broken regex injections
const buildScript = 'd:/vishit-journeys/build_clean_static_site.js';
if (fs.existsSync(buildScript)) {
  let scriptContent = fs.readFileSync(buildScript, 'utf8');
  // Remove messy navbar replacement regex
  scriptContent = scriptContent.replace(/\/\/ Replace nav right actions for Login & Sign Up[^]*?\/\/ Inject filterByDestination JS if missing/gi, '// Inject filterByDestination JS if missing');
  fs.writeFileSync(buildScript, scriptContent, 'utf8');
  console.log('Cleaned build_clean_static_site.js!');
}
