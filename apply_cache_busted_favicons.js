const fs = require('fs');
const path = require('path');

const faviconBlock = `<link rel="icon" href="/favicon.ico?v=2" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2">
<link rel="manifest" href="/site.webmanifest?v=2">
<meta name="theme-color" content="#0a2540">`;

function getAllHtmlAndPhpFiles(dir, fileList = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      if (item !== 'node_modules' && item !== '.git' && item !== '.gemini' && item !== 'api' && item !== 'config') {
        getAllHtmlAndPhpFiles(fullPath, fileList);
      }
    } else {
      if (item.endsWith('.html') || item.endsWith('.php')) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

const files = getAllHtmlAndPhpFiles(__dirname);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Only process files that have a <head> section
  if (!content.includes('<head>')) return;

  // 1. Remove all old/duplicate favicon, shortcut icon, apple-touch-icon, manifest, theme-color tags
  content = content.replace(/<link\s+rel="(?:icon|shortcut icon|apple-touch-icon|manifest)"[^>]*>\s*/gi, '');
  content = content.replace(/<meta\s+name="theme-color"[^>]*>\s*/gi, '');

  // 2. Insert standard cache-busted favicon block right after <meta name="viewport"...> or right after <head>
  if (content.includes('<meta name="viewport"')) {
    content = content.replace(
      /(<meta name="viewport"[^>]*>)/i,
      `$1\n${faviconBlock}`
    );
  } else {
    content = content.replace(
      /<head>/i,
      `<head>\n${faviconBlock}`
    );
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated cache-busted favicon tags in:', path.relative(__dirname, file));
});
