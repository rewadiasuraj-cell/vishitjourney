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
  console.log('Fixing Manali Honeymoon & Leh Ladakh images in:', filePath);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Manali Honeymoon Package: Replace beach resort (photo-1571003123894-1f0594d2b5d9) with Manali Snow Valley (photo-1626621341517-bbf3d9990a23)
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1571003123894-1f0594d2b5d9[^\"]*/g, 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80');

  // 2. Leh Ladakh Adventure: Replace canyon gorge (photo-1506197603052-3cc9c3a201bd) with Pangong Lake & Ladakh blue lake desert mountains (photo-1581791538302-0353709899a0)
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1506197603052-3cc9c3a201bd[^\"]*/g, 'https://images.unsplash.com/photo-1581791538302-0353709899a0?w=600&q=80');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated images in:', filePath);
});

console.log('Done fixing Manali Honeymoon & Leh Ladakh images!');
