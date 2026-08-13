const fs = require('fs');

// Real Shimla-Manali Himachal Pradesh Hill Station image (Scenic Shimla town, pine hills & Himalayan mountains)
const realShimlaManaliUrl = 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800&q=80';

const targetFiles = [
  'd:/vishit-journeys/Vishit Journey.html',
  'd:/vishit-journeys/index.html',
  'd:/vishit-journeys/index.php',
  'd:/vishit-journeys/build_clean_static_site.js',
  'd:/vishit-journeys/new update/index.html',
  'd:/vishit-journeys/new update/Vishit Journey.html',
  'd:/vishit-journeys/NEW CHAT/index.html',
  'd:/vishit-journeys/sql/database.sql'
];

targetFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  console.log('Replacing fake starry night photo in Shimla Manali Package with real Shimla-Manali hill station photo in:', filePath);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace photo-1586375300773-8384e3e4916f or any img for alt="Shimla Manali Package"
  content = content.replace(/(<img\s+src=")[^"]+("\s+alt="Shimla Manali Package"[^>]*>)/gi, `$1${realShimlaManaliUrl}$2`);

  // Also replace photo-1586375300773-8384e3e4916f if used anywhere else
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1586375300773-8384e3e4916f[^\"]*/g, realShimlaManaliUrl);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated Shimla Manali Package photo in:', filePath);
});

console.log('Done replacing fake night photo with real Shimla-Manali hill station location image!');
