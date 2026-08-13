const fs = require('fs');

console.log('Applying curved/rounded shapes across all components...');

// 1. Update booking.css for booking modal curved shapes
const bookingCss = 'd:/vishit-journeys/assets/css/booking.css';
if (fs.existsSync(bookingCss)) {
  let content = fs.readFileSync(bookingCss, 'utf8');

  content = content.replace(/border-radius:\s*12px;/g, 'border-radius: 24px;');
  content = content.replace(/border-radius:\s*8px;/g, 'border-radius: 16px;');
  content = content.replace(/border-radius:\s*6px;/g, 'border-radius: 12px;');

  // Make modal inputs, summary cards, and buttons sleek curved
  if (!content.includes('/* Curved Shapes Override */')) {
    content += `\n/* Curved Shapes Override */
.vj-modal-box { border-radius: 24px !important; }
.vj-input, .vj-select, .vj-textarea { border-radius: 14px !important; }
.vj-btn-primary, .vj-btn-secondary { border-radius: 25px !important; }
.vj-price-summary-card { border-radius: 18px !important; }
.vj-step-num { border-radius: 50% !important; }
`;
  }
  fs.writeFileSync(bookingCss, content, 'utf8');
  console.log('Updated booking.css!');
}

// 2. Update index.php for Search Bar & Section Cards Curved Styling
const phpFile = 'd:/vishit-journeys/index.php';
if (fs.existsSync(phpFile)) {
  let content = fs.readFileSync(phpFile, 'utf8');

  // Replace .search-bar CSS
  content = content.replace(
    /\.search-bar\{\s*display:flex;gap:0;max-width:900px;margin:0 auto;\s*border:1px solid rgba\(201,165,74,0\.3\);overflow:hidden;\s*\}/g,
    `.search-bar{
    display:flex;gap:0;max-width:900px;margin:0 auto;
    border:1px solid rgba(201,165,74,0.35);border-radius:30px;overflow:hidden;
    background:rgba(15,23,42,0.6);backdrop-filter:blur(10px);box-shadow:0 8px 32px rgba(0,0,0,0.3);
  }`
  );

  // Replace .search-btn CSS
  content = content.replace(
    /\.search-btn\{\s*padding:1rem 1\.8rem;background:var\(--gold\);border:none;\s*color:var\(--navy\);font-family:'Jost',sans-serif;font-size:\.75rem;\s*font-weight:600;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:background \.2s;\s*\}/g,
    `.search-btn{
    padding:1rem 1.8rem;background:var(--gold);border:none;
    color:var(--navy);font-family:'Jost',sans-serif;font-size:.75rem;
    font-weight:600;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .2s;
    border-radius:0 30px 30px 0;
  }`
  );

  // Inject general curved shapes CSS block if not present
  if (!content.includes('/* ALL SHAPES CURVED STYLING */')) {
    const curvedCss = `
  /* ALL SHAPES CURVED STYLING */
  .search-bar { border-radius: 30px !important; }
  .search-btn { border-radius: 0 30px 30px 0 !important; }
  .search-field:first-child { border-top-left-radius: 30px; border-bottom-left-radius: 30px; }
  .dest-card, .why-card, .testi-card, .contact-card { border-radius: 20px !important; overflow: hidden; }
  .hero-badge, .section-tag { border-radius: 20px !important; }
  .footer-brand > div { border-radius: 16px !important; }
  .footer-col input[type="email"] { border-radius: 20px !important; padding-left: 1rem !important; }
  .footer-col button { border-radius: 20px !important; }
  @media(max-width:768px) {
    .search-bar { flex-direction:column; border-radius: 20px !important; padding: 6px; gap: 6px; }
    .search-field { border-radius: 14px !important; border-right: none !important; }
    .search-btn { border-radius: 20px !important; margin-top: 4px; }
  }
`;
    content = content.replace('/* ── SECTION COMMONS ── */', curvedCss + '\n  /* ── SECTION COMMONS ── */');
  }

  fs.writeFileSync(phpFile, content, 'utf8');
  console.log('Updated index.php with curved shapes!');
}

// 3. Update build_clean_static_site.js to preserve curved styles
const buildScript = 'd:/vishit-journeys/build_clean_static_site.js';
if (fs.existsSync(buildScript)) {
  let scriptContent = fs.readFileSync(buildScript, 'utf8');
  if (!scriptContent.includes('ALL SHAPES CURVED STYLING')) {
    scriptContent = scriptContent.replace(
      '// Replace Journeys text occurrences',
      '// Inject Curved Shapes CSS\nif (!html.includes("ALL SHAPES CURVED STYLING")) {\n  html = html.replace(".search-bar{", ".search-bar{border-radius:30px!important;");\n  html = html.replace(".search-btn{", ".search-btn{border-radius:0 30px 30px 0!important;");\n}\n\n// Replace Journeys text occurrences'
    );
    fs.writeFileSync(buildScript, scriptContent, 'utf8');
    console.log('Updated build_clean_static_site.js!');
  }
}
