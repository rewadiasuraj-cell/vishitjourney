const fs = require('fs');

const targetFiles = [
  'd:/vishit-journeys/Vishit Journey.html',
  'd:/vishit-journeys/index.html',
  'd:/vishit-journeys/new update/index.html',
  'd:/vishit-journeys/new update/Vishit Journey.html',
  'd:/vishit-journeys/NEW CHAT/index.html',
  'd:/vishit-journeys/sql/database.sql'
];

targetFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  console.log('Fixing Leh Ladakh image in:', filePath);
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/(<img[^>]*?alt="Leh Ladakh Adventure"[^>]*?>)/gi, '<img src="/uploads/packages/leh_ladakh.jpg" alt="Leh Ladakh Adventure" loading="lazy">');
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1581791538302-0353709899a0[^\"]*/g, '/uploads/packages/leh_ladakh.jpg');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated Leh Ladakh image in:', filePath);
});

console.log('Done.');
