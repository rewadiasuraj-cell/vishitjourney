const fs = require('fs');

console.log('Curving Why Vishit / About Us section image & badge shape edges...');

const phpFile = 'd:/vishit-journeys/index.php';
if (fs.existsSync(phpFile)) {
  let content = fs.readFileSync(phpFile, 'utf8');

  // Inject CSS override for .why-img, .why-badge, and .why-icon curved shapes
  const whyCurvedCss = `
  /* WHY VISHIT CURVED SHAPES & BADGE EDGES */
  .why-img {
    position: relative !important;
    border-radius: 24px !important;
    overflow: hidden !important;
    border: 1px solid rgba(201, 165, 74, 0.3) !important;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4) !important;
  }
  .why-img img {
    width: 100% !important;
    display: block !important;
    border-radius: 24px !important;
    transition: transform .5s ease !important;
  }
  .why-img:hover img {
    transform: scale(1.03) !important;
  }
  .why-badge {
    position: absolute !important;
    bottom: 1.2rem !important;
    right: 1.2rem !important;
    background: var(--gold) !important;
    color: var(--navy) !important;
    padding: 1.2rem 1.6rem !important;
    text-align: center !important;
    min-width: 130px !important;
    border-radius: 18px !important;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4) !important;
    border: 1.5px solid rgba(255, 255, 255, 0.3) !important;
  }
  .why-icon {
    width: 46px !important;
    height: 46px !important;
    min-width: 46px !important;
    border: 1px solid rgba(201, 165, 74, 0.4) !important;
    border-radius: 14px !important;
    background: rgba(201, 165, 74, 0.08) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 1.2rem !important;
  }
`;

  if (!content.includes('WHY VISHIT CURVED SHAPES & BADGE EDGES')) {
    content = content.replace('/* ALL SHAPES CURVED STYLING */', whyCurvedCss + '\n  /* ALL SHAPES CURVED STYLING */');
  }

  fs.writeFileSync(phpFile, content, 'utf8');
  console.log('Updated index.php with curved Why section shapes!');
}

// 2. Update build_clean_static_site.js to preserve why curved styles in all static builds
const buildScript = 'd:/vishit-journeys/build_clean_static_site.js';
if (fs.existsSync(buildScript)) {
  let scriptContent = fs.readFileSync(buildScript, 'utf8');
  console.log('Rebuilding static site...');
}
