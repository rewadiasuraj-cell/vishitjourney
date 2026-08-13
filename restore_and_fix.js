const fs = require('fs');
const path = require('path');

const phpContent = fs.readFileSync('d:/vishit-journeys/index.php', 'utf8');

// Find DOCTYPE start
const htmlStartIndex = phpContent.indexOf('<!DOCTYPE html>');
if (htmlStartIndex === -1) {
  console.error('DOCTYPE not found');
  process.exit(1);
}

let html = phpContent.substring(htmlStartIndex);

// Update company address in footer
html = html.replace(/📍\s*Your City, India/g, '📍 1st Floor Plot no. 2 Metro Pillar 786 Dwarka Mor New Delhi.');
html = html.replace(/📍\s*Delhi, Dwarka/g, '📍 1st Floor Plot no. 2 Metro Pillar 786 Dwarka Mor New Delhi.');

// Update Title tag
html = html.replace('<title>Vishit Journeys — Travel Beyond Limits</title>', '<title>Vishit Journey — Travel Beyond Limits</title>');

// Only replace top navbar logo inside <a href="#" class="logo"> ... </a>
// Regex targets ONLY the img tag inside <a href="#" class="logo">
html = html.replace(/(<a href="#" class="logo">\s*)<img[^>]+>/i, (match, p1) => {
  return `${p1}<img id="navLogoDark" src="Vishit_Journey_Logo.jpg" alt="Vishit Journey" style="height:52px;width:auto;"><img id="navLogo" src="Vishit_Journey_Logo.jpg" alt="Vishit Journey" style="height:52px;width:auto;">`;
});

// Target list of files to update
const targetFiles = [
  'd:/vishit-journeys/Vishit Journey.html',
  'd:/vishit-journeys/index.html',
  'd:/vishit-journeys/new update/index.html',
  'd:/vishit-journeys/new update/Vishit Journey.html',
  'd:/vishit-journeys/NEW CHAT/index.html'
];

targetFiles.forEach(filePath => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // For subdirectories, calculate relative logo path
  let relativeLogoPath = 'Vishit_Journey_Logo.jpg';
  let fileHtml = html;

  if (filePath.includes('new update') || filePath.includes('NEW CHAT')) {
    // Copy logo file into subdirectories as well
    const subLogoPath = path.join(dir, 'Vishit_Journey_Logo.jpg');
    fs.copyFileSync('d:/vishit-journeys/Vishit_Journey_Logo.jpg', subLogoPath);
  }

  fs.writeFileSync(filePath, fileHtml, 'utf8');
  console.log('Restored and updated:', filePath);
});

console.log('Done restoring and updating HTML files.');
