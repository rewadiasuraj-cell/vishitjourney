const fs = require('fs');
const path = require('path');

const targetFiles = [
  'd:/vishit-journeys/Vishit Journey.html',
  'd:/vishit-journeys/index.html',
  'd:/vishit-journeys/new update/index.html',
  'd:/vishit-journeys/new update/Vishit Journey.html',
  'd:/vishit-journeys/NEW CHAT/index.html'
];

targetFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  console.log('Updating footer logo in:', file);
  let content = fs.readFileSync(file, 'utf8');

  // Replace old base64 or img tag inside footer-brand with Vishit_Journey_Logo.jpg
  content = content.replace(/(<div class="footer-brand">\s*<div[^>]*?>\s*)<img[^>]+>/gi, (match, p1) => {
    return `${p1}<img src="Vishit_Journey_Logo.jpg" alt="Vishit Journey" style="height:60px;width:auto;display:block;">`;
  });

  // Backup fallback: if footer-brand has plain <img ...>
  content = content.replace(/(<div class="footer-brand">\s*)<img[^>]+>/gi, (match, p1) => {
    return `${p1}<div style="background:#fff;display:inline-block;padding:10px 16px;border-radius:8px;margin-bottom:.8rem;border:1px solid rgba(201,165,74,0.2)"><img src="Vishit_Journey_Logo.jpg" alt="Vishit Journey" style="height:60px;width:auto;display:block;"></div>`;
  });

  // Ensure "Vishit Journeys" in footer text is "Vishit Journey" where needed
  content = content.replace(/© 2024 Vishit Journeys/g, '© 2024 Vishit Journey');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated footer logo in:', file);
});
