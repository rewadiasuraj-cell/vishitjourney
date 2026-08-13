const fs = require('fs');

console.log('Expanding header menu spacing and adding curved button shapes...');

const phpFile = 'd:/vishit-journeys/index.php';
if (fs.existsSync(phpFile)) {
  let content = fs.readFileSync(phpFile, 'utf8');

  // Replace .nav-links and .nav-links a CSS
  const navLinksOld = `.nav-links{display:flex;gap:2rem;list-style:none;justify-content:center}
  .nav-links a{text-decoration:none;font-size:.8rem;letter-spacing:2px;text-transform:uppercase;color:#0d1f3c;transition:color .2s}
  .nav-links a:hover{color:var(--gold)}
  .nav-links a{color:#0d1f3c}`;

  const navLinksNew = `.nav-links{display:flex;gap:2.2rem;list-style:none;justify-content:center;align-items:center}
  .nav-links a{
    text-decoration:none;font-size:.82rem;font-weight:600;letter-spacing:2px;
    text-transform:uppercase;color:#0d1f3c;padding:.6rem 1.4rem;
    border-radius:25px;border:1px solid rgba(201,165,74,0.35);
    background:rgba(13,31,60,0.03);transition:all .25s ease;
    box-shadow:0 2px 8px rgba(0,0,0,0.05);display:inline-block;
  }
  .nav-links a:hover{
    color:#ffffff !important;background:var(--gold);
    border-color:var(--gold);box-shadow:0 4px 15px rgba(201,165,74,0.4);
    transform:translateY(-2px);
  }`;

  if (content.includes('.nav-links{')) {
    content = content.replace(/\.nav-links\{[^]*?\.nav-links a\{color:#0d1f3c\}/gi, navLinksNew);
  }

  // Also append an explicit override to ensure navbar link button curves are applied
  if (!content.includes('/* HEADER CURVED NAV BUTTONS */')) {
    const curvedNavCss = `
  /* HEADER CURVED NAV BUTTONS */
  .nav-links { gap: 2.2rem !important; }
  .nav-links a {
    padding: .6rem 1.4rem !important;
    border-radius: 25px !important;
    border: 1px solid rgba(201, 165, 74, 0.4) !important;
    background: rgba(13, 31, 60, 0.04) !important;
    transition: all .25s ease !important;
    font-weight: 600 !important;
    display: inline-block !important;
  }
  .nav-links a:hover {
    color: #ffffff !important;
    background: var(--gold) !important;
    border-color: var(--gold) !important;
    box-shadow: 0 4px 15px rgba(201, 165, 74, 0.4) !important;
    transform: translateY(-2px) !important;
  }
`;
    content = content.replace('/* ALL SHAPES CURVED STYLING */', curvedNavCss + '\n  /* ALL SHAPES CURVED STYLING */');
  }

  fs.writeFileSync(phpFile, content, 'utf8');
  console.log('Updated index.php with expanded curved header menu buttons!');
}

// Update build_clean_static_site.js to ensure header menu button styling is preserved
const buildScript = 'd:/vishit-journeys/build_clean_static_site.js';
if (fs.existsSync(buildScript)) {
  let scriptContent = fs.readFileSync(buildScript, 'utf8');
  if (!scriptContent.includes('HEADER CURVED NAV BUTTONS')) {
    scriptContent = scriptContent.replace(
      '// Inject executePackageSearch JS if missing',
      '// Inject Header Curved Nav CSS\nif (!html.includes("HEADER CURVED NAV BUTTONS")) {\n  html = html.replace(".nav-links{", ".nav-links{gap:2.2rem!important;");\n}\n\n// Inject executePackageSearch JS if missing'
    );
    fs.writeFileSync(buildScript, scriptContent, 'utf8');
    console.log('Updated build_clean_static_site.js!');
  }
}
