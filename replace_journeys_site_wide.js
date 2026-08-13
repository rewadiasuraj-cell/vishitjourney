const fs = require('fs');
const path = require('path');

console.log('Starting site-wide update of "Journeys" -> "Journey"...');

// 1. Update index.php
const phpFile = 'd:/vishit-journeys/index.php';
if (fs.existsSync(phpFile)) {
  let content = fs.readFileSync(phpFile, 'utf8');

  content = content.replace(/<title>Vishit Journeys/g, '<title>Vishit Journey');
  content = content.replace(/alt="Vishit Journeys"/g, 'alt="Vishit Journey"');
  content = content.replace(/Vishit Journeys brings/g, 'Vishit Journey brings');
  content = content.replace(/Real <em>Journeys<\/em>/g, 'Real <em>Journey<\/em>');
  content = content.replace(/Vishit Journeys made/g, 'Vishit Journey made');
  content = content.replace(/© 2024 Vishit Journeys/g, '© 2024 Vishit Journey');
  content = content.replace(/✦ VISHIT JOURNEYS BOOKING/g, '✦ VISHIT JOURNEY BOOKING');
  content = content.replace(/choosing Vishit Journeys!/g, 'choosing Vishit Journey!');

  fs.writeFileSync(phpFile, content, 'utf8');
  console.log('Updated index.php!');
}

// 2. Update config/config.php
const configFile = 'd:/vishit-journeys/config/config.php';
if (fs.existsSync(configFile)) {
  let content = fs.readFileSync(configFile, 'utf8');
  content = content.replace("define('SITE_NAME', 'Vishit Journeys');", "define('SITE_NAME', 'Vishit Journey');");
  fs.writeFileSync(configFile, content, 'utf8');
  console.log('Updated config/config.php!');
}

// 3. Update assets/js/booking.js
const bookingJs = 'd:/vishit-journeys/assets/js/booking.js';
if (fs.existsSync(bookingJs)) {
  let content = fs.readFileSync(bookingJs, 'utf8');
  content = content.replace(/name: 'Vishit Journeys'/g, "name: 'Vishit Journey'");
  content = content.replace(/VISHIT JOURNEYS/g, "VISHIT JOURNEY");
  content = content.replace(/Hi Vishit Journeys/g, "Hi Vishit Journey");
  fs.writeFileSync(bookingJs, content, 'utf8');
  console.log('Updated assets/js/booking.js!');
}

// 4. Update admin files
const adminFiles = ['d:/vishit-journeys/admin/login.php', 'd:/vishit-journeys/admin/bookings.php'];
adminFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/Vishit Journeys/g, 'Vishit Journey');
    content = content.replace(/Vishit\+Journeys/g, 'Vishit+Journey');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', file);
  }
});

// 5. Update build_clean_static_site.js to ensure replacements during build
const buildScript = 'd:/vishit-journeys/build_clean_static_site.js';
if (fs.existsSync(buildScript)) {
  let scriptContent = fs.readFileSync(buildScript, 'utf8');
  if (!scriptContent.includes('✦ VISHIT JOURNEY BOOKING')) {
    scriptContent = scriptContent.replace(
      '// Replace header and footer logos',
      '// Replace Journeys text occurrences\nhtml = html.replace(/✦ VISHIT JOURNEYS BOOKING/g, "✦ VISHIT JOURNEY BOOKING");\nhtml = html.replace(/Vishit Journeys/g, "Vishit Journey");\nhtml = html.replace(/Real <em>Journeys<\\/em>/g, "Real <em>Journey<\\/em>");\n\n// Replace header and footer logos'
    );
    fs.writeFileSync(buildScript, scriptContent, 'utf8');
    console.log('Updated build_clean_static_site.js!');
  }
}
