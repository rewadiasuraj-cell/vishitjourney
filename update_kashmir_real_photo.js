const fs = require('fs');
const path = require('path');

// Authentic Kashmir image (Snow mountains, Gulmarg / Shikara on Dal Lake)
const realKashmirUrl = 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80';

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
  console.log('Replacing fake Kashmir image in:', filePath);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace photo-1602216056096-3b40cc0c9944 with real Kashmir photo
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1602216056096-3b40cc0c9944[^\"]*/g, realKashmirUrl);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated Kashmir photo in:', filePath);
});

console.log('Done replacing fake Kashmir photo with real Kashmir photo!');

