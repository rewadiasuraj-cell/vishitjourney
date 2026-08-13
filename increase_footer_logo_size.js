const fs = require('fs');
const path = require('path');

const targetFiles = [
  'd:/vishit-journeys/Vishit Journey.html',
  'd:/vishit-journeys/index.html',
  'd:/vishit-journeys/new update/index.html',
  'd:/vishit-journeys/new update/Vishit Journey.html',
  'd:/vishit-journeys/NEW CHAT/index.html'
];

targetFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  console.log('Enlarging footer logo size in:', file);
  let content = fs.readFileSync(file, 'utf8');

  // Replace height:60px or similar in footer logo with height:110px
  content = content.replace(/(<div class="footer-brand">\s*<div[^>]*?>\s*<img[^>]*?style=")(height:\s*\d+px;)/gi, '$1height:110px;');

  // Update CSS for .footer-brand img
  content = content.replace(/\.footer-brand img\s*\{\s*height:\s*\d+px(?:\s*!important)?;?\s*\}/gi, '.footer-brand img { height: 110px !important; }');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully enlarged footer logo in:', file);
});
