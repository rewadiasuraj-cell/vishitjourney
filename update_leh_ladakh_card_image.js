const fs = require('fs');
const path = require('path');

const rootDir = 'd:\\vishit-journeys';

const newLadakhImg = '/uploads/packages/leh_ladakh.jpg';

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace image for Leh Ladakh Adventure
  content = content.replace(
    /(<img\s+src=")[^"]+("\s+alt="Leh Ladakh Adventure"[^>]*>)/gi,
    `$1${newLadakhImg}$2`
  );

  // Replace unsplash photo-1598091383021-15ddea10925d if associated with Leh Ladakh
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1598091383021-15ddea10925d\?w=600&q=80/g, newLadakhImg);

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
console.log('Leh Ladakh Adventure card image updated successfully to user uploaded bike expedition photo!');
