const fs = require('fs');
const path = require('path');

const rootDir = 'd:\\vishit-journeys';

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Update header background opacity (lower opacity to 0.88)
  content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.95\)/g, 'rgba(255, 255, 255, 0.88)');
  content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.78\)/g, 'rgba(255, 255, 255, 0.88)');

  // 2. Update logo image references from Vishit_Journey_Logo.jpg to Vishit_Journey_Logo.png or logo_transparent.png
  // And remove 
  content = content.replace(/src="Vishit_Journey_Logo\.jpg"/g, 'src="Vishit_Journey_Logo.png"');
  content = content.replace(/src="\/Vishit_Journey_Logo\.jpg"/g, 'src="/Vishit_Journey_Logo.png"');
  content = content.replace(/href="\/Vishit_Journey_Logo\.jpg"/g, 'href="/Vishit_Journey_Logo.png"');
  content = content.replace(/mix-blend-mode:\s*multiply;?/g, '');

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
    } else if (file.endsWith('.html') || file.endsWith('.php') || file.endsWith('.js') || file.endsWith('.css')) {
      processFile(fullPath);
    }
  }
}

walkDir(rootDir);
console.log('All files processed successfully!');
