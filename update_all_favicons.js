const fs = require('fs');
const path = require('path');

const faviconBlock = `<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`;

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.gemini') {
        getAllFiles(filePath, fileList);
      }
    } else {
      if (file.endsWith('.html') || file.endsWith('.php')) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

const allFiles = getAllFiles(__dirname);

allFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if file has a <head> tag
  if (!content.includes('<head>')) return;

  // Remove existing favicon/manifest links
  content = content.replace(/<link\s+rel="(?:icon|shortcut icon|apple-touch-icon|manifest)"[^>]*>\s*/gi, '');

  // Insert standard favicon block right after <head> or right after <meta name="viewport"...>
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

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated favicons in:', path.relative(__dirname, filePath));
});
