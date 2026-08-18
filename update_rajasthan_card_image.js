const fs = require('fs');
const path = require('path');

const rootDir = 'd:\\vishit-journeys';

const newRajasthanImg = '/uploads/packages/rajasthan.jpg';

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace image for Rajasthan Royal Package
  content = content.replace(
    /(<img\s+src=")[^"]+("\s+alt="Rajasthan Royal Package"[^>]*>)/gi,
    `$1${newRajasthanImg}$2`
  );

  // Replace unsplash photo-1524492412937-b28074a5d7da if associated with Rajasthan
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1524492412937-b28074a5d7da\?w=600&q=80/g, newRajasthanImg);

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
console.log('Rajasthan Royal Package card image updated successfully to user uploaded Hawa Mahal photo!');
