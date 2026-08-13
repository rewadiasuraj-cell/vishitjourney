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
  console.log('Replacing images in:', filePath);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Kasol + Manali Combo: Replace India Gate (photo-1587474260584-136574528ed5) with Manali Kasol snow valley (photo-1626621341517-bbf3d9990a23)
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1587474260584-136574528ed5[^\"]*/g, 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80');

  // 2. Rajasthan Royal Package: Replace Taj Mahal (photo-1524492412937-b28074a5d7da) with Jaipur Hawa Mahal (photo-1477587458883-47145ed94245)
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1524492412937-b28074a5d7da[^\"]*/g, 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80');

  // 3. Shimla Manali Package: Replace wooden fence (photo-1586375300773-8384e3e4916f) with Shimla Snow Hills (photo-1605649487212-47bdab064df7)
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1586375300773-8384e3e4916f[^\"]*/g, 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&q=80');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated 3 cards in:', filePath);
});

console.log('Done fixing the 3 cards!');
