const fs = require('fs');
const path = require('path');

const rootDir = 'd:\\vishit-journeys';

const newRishikeshImg = '/uploads/packages/rishikesh.jpg';

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace image for Rishikesh Camping Package
  content = content.replace(
    /(<img\s+src=")[^"]+("\s+alt="Rishikesh Camping Package"[^>]*>)/gi,
    `$1${newRishikeshImg}$2`
  );

  // Replace unsplash photo-1544550581-1bcabf842b77 if associated with Rishikesh
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1544550581-1bcabf842b77\?w=600&q=80/g, newRishikeshImg);

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
console.log('Rishikesh Camping Package card image updated successfully to user uploaded mountain camping photo!');
