const fs = require('fs');
const path = require('path');

const rootDir = 'd:\\vishit-journeys';

const newKasolImg = '/uploads/packages/kasol_manali.jpg';

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace image for Kasol + Manali Combo
  content = content.replace(
    /(<img\s+src=")[^"]+("\s+alt="Kasol \+ Manali Combo"[^>]*>)/gi,
    `$1${newKasolImg}$2`
  );

  // Replace unsplash photo-1597074866923-dc0589150358 if associated with Kasol + Manali
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1597074866923-dc0589150358\?w=800&q=80/g, newKasolImg);

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === '.git' || file === 'node_modules') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.html') || file.endsWith('.php') || file.endsWith('.js') || file.endsWith('.sql')) {
      processFile(fullPath);
    }
  }
}

walkDir(rootDir);
console.log('Kasol + Manali Combo card image updated successfully to user uploaded image!');
