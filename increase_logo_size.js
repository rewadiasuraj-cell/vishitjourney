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
  let content = fs.readFileSync(file, 'utf8');

  // Replace inline logo height to 104px (2x)
  content = content.replace(/style="height:\s*\d+px;width:auto;display:block;"/g, 'style="height:104px;width:auto;display:block;"');
  content = content.replace(/style="height:\s*\d+px;width:auto;"/g, 'style="height:104px;width:auto;display:block;"');

  // Also update CSS rules for .logo img
  content = content.replace(/\.logo img\{\s*height:\s*\d+px\s*(!important)?\s*\}/g, '.logo img{ height:104px !important; }');
  content = content.replace(/#navLogo,\s*#navLogoDark\s*\{\s*height:\s*\d+px\s*!important;\s*\}/g, '#navLogo, #navLogoDark { height: 104px !important; }');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated logo size to 104px (2x) in:', file);

});
