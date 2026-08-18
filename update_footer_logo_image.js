const fs = require('fs');
const path = require('path');

// 1. Copy master logo image to all target logo filenames
const masterLogo = 'd:/vishit-journeys/Vishit_Journey_Logo.jpg';
const otherLogos = [
  'd:/vishit-journeys/Vishit_Journey_Logo.png',
  'd:/vishit-journeys/dark logo png.png',
  'd:/vishit-journeys/logodark.png',
  'd:/vishit-journeys/logodark 2.png',
  'd:/vishit-journeys/dark logo 1.png'
];

otherLogos.forEach(logoPath => {
  try {
    fs.copyFileSync(masterLogo, logoPath);
    console.log('Synced logo image to:', logoPath);
  } catch (err) {
    console.error('Error copying to', logoPath, err.message);
  }
});

// 2. Update index.php to use 128px (2x size) for footer logo
const phpFile = 'd:/vishit-journeys/index.php';
if (fs.existsSync(phpFile)) {
  let content = fs.readFileSync(phpFile, 'utf8');

  // Update .footer-brand img CSS rules if present
  content = content.replace(/\.footer-brand img\{\s*height:\s*\d+px\s*(!important)?\s*\}/g, '.footer-brand img{ height:128px !important; }');

  // Replace image tag in footer-brand
  content = content.replace(
    /(<div class="footer-brand">\s*<div[^>]*>\s*)<img src="[^"]*"[^>]*>(\s*<\/div>)/gi,
    `$1<img src="Vishit_Journey_Logo.png" alt="Vishit Journey" style="height:128px;width:auto;display:block">$2`
  );

  fs.writeFileSync(phpFile, content, 'utf8');
  console.log('Updated 2x footer logo image in index.php!');
}

// 3. Update build_clean_static_site.js to use 128px height for footer logo
const buildScript = 'd:/vishit-journeys/build_clean_static_site.js';
if (fs.existsSync(buildScript)) {
  let scriptContent = fs.readFileSync(buildScript, 'utf8');
  scriptContent = scriptContent.replace(
    /style="height:\d+px;width:auto;display:block"/g,
    'style="height:128px;width:auto;display:block"'
  );
  scriptContent = scriptContent.replace(
    /style="height:64px;width:auto;display:block"/g,
    'style="height:128px;width:auto;display:block"'
  );
  // Ensure footer replacement in build script uses 128px
  scriptContent = scriptContent.replace(
    /html\.replace\(\/\(<div class="footer-brand">\\s\*<div\[\^>\]\*\>\\s\*\)<img src="\[\^"\]\*"\[\^>\]\*>\(\\s\*<\\\/div>\)\/gi, `\$1<img src="Vishit_Journey_Logo\.jpg" alt="Vishit Journey" style="height:\d+px;width:auto;display:block">\$2`\);/g,
    'html = html.replace(/(<div class="footer-brand">\\s*<div[^>]*>\\s*)<img src="[^"]*"[^>]*>(\\s*<\\/div>)/gi, `$1<img src="Vishit_Journey_Logo.png" alt="Vishit Journey" style="height:128px;width:auto;display:block">$2`);'
  );
  fs.writeFileSync(buildScript, scriptContent, 'utf8');
  console.log('Updated build_clean_static_site.js with 128px footer logo!');
}
