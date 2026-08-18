const fs = require('fs');
const path = require('path');

const rootDir = 'd:\\vishit-journeys';

const newManaliImg = '/uploads/packages/manali_honeymoon.jpg';

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace image for Manali Honeymoon Package
  content = content.replace(
    /(<img\s+src=")[^"]+("\s+alt="Manali Honeymoon Package"[^>]*>)/gi,
    `$1${newManaliImg}$2`
  );

  // Replace unsplash photo-1571536802807-30451e3955d8 if associated with Manali
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1571536802807-30451e3955d8\?w=800&q=80/g, newManaliImg);

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
console.log('Manali Honeymoon Package card image updated successfully to reference 2 image!');
