const fs = require('fs');

// Real Manali Himachal Pradesh image (snow-capped Himalayan peaks, pine valley & cottages)
const realManaliUrl = 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80';
const realManaliHoneymoon = '/uploads/packages/manali_honeymoon.jpg';
const realKasolManali = 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800&q=80';
const realShimlaManali = 'https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=800&q=80';

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
  console.log('Updating Manali images in:', filePath);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Manali Destination Card (alt="Manali")
  content = content.replace(/(<img\s+src=")[^"]+("\s+alt="Manali">)/gi, `$1${realManaliUrl}$2`);

  // 2. Manali Volvo Package card
  content = content.replace(/(<img\s+src=")[^"]+("\s+alt="Manali Volvo Package"[^>]*>)/gi, `$1${realManaliUrl}$2`);

  // 3. Manali Honeymoon Package card
  content = content.replace(/(<img\s+src=")[^"]+("\s+alt="Manali Honeymoon Package"[^>]*>)/gi, `$1${realManaliHoneymoon}$2`);

  // 4. Kasol + Manali Combo card
  content = content.replace(/(<img\s+src=")[^"]+("\s+alt="Kasol \+ Manali Combo"[^>]*>)/gi, `$1${realKasolManali}$2`);

  // 5. Shimla Manali Package card
  content = content.replace(/(<img\s+src=")[^"]+("\s+alt="Shimla Manali Package"[^>]*>)/gi, `$1${realShimlaManali}$2`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated Manali photos in:', filePath);
});

console.log('Done updating all Manali photos with authentic Himachal Pradesh images!');

