const fs = require('fs');
const path = require('path');

const rootDir = 'd:\\vishit-journeys';

const faviconTags = `
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="shortcut icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
`.trim();

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace old icon link tags if present
  content = content.replace(/<link\s+rel="icon"[^>]*>/gi, '');
  content = content.replace(/<link\s+rel="shortcut icon"[^>]*>/gi, '');
  content = content.replace(/<link\s+rel="apple-touch-icon"[^>]*>/gi, '');
  content = content.replace(/<link\s+rel="manifest"[^>]*>/gi, '');

  // Insert faviconTags after <meta name="viewport"...> or after <head>
  if (content.includes('<meta name="viewport"')) {
    content = content.replace(/(<meta name="viewport"[^>]*>)/i, `$1\n${faviconTags}`);
  } else if (content.includes('<head>')) {
    content = content.replace(/(<head>)/i, `$1\n${faviconTags}`);
  }

  // Clean up any extra empty lines created by replacement
  content = content.replace(/\n\s*\n\s*<link rel="icon"/g, '\n<link rel="icon"');
  content = content.replace(/(<link rel="manifest"[^>]*>)\n\s*\n+/g, '$1\n');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated favicons in:', filePath);
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
    } else if (file.endsWith('.html') || file.endsWith('.php')) {
      processFile(fullPath);
    }
  }
}

walkDir(rootDir);
console.log('Site-wide favicon update complete!');
