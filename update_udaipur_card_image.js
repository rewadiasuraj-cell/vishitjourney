const fs = require('fs');
const path = require('path');

const rootDir = 'd:\\vishit-journeys';

const newUdaipurImg = '/uploads/packages/udaipur.jpg';

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace image for Udaipur Romantic Package
  content = content.replace(
    /(<img\s+src=")[^"]+("\s+alt="Udaipur Romantic Package"[^>]*>)/gi,
    `$1${newUdaipurImg}$2`
  );

  // Replace unsplash photo-1570168007204-dfb528c6958f if associated with Udaipur
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1570168007204-dfb528c6958f\?w=600&q=80/g, newUdaipurImg);

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
console.log('Udaipur Romantic Package card image updated successfully to user uploaded Lake Pichola dinner photo!');
