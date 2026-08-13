const fs = require('fs');

const targetFiles = [
  'd:/vishit-journeys/Vishit Journey.html',
  'd:/vishit-journeys/index.html',
  'd:/vishit-journeys/new update/index.html',
  'd:/vishit-journeys/new update/Vishit Journey.html',
  'd:/vishit-journeys/NEW CHAT/index.html'
];

targetFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  console.log('Fixing Featured Destinations Kashmir in:', filePath);
  let content = fs.readFileSync(filePath, 'utf8');

  // Find dest-card section for Kashmir and replace Kerala houseboat image with real Kashmir Dal Lake Shikara
  content = content.replace(/(<div class="dest-card[^>]*?>\s*<img src=")[^"]+(" alt="Kashmir")/gi, '$1https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80$2');

  // Also replace any img alt="Kashmir" with Kerala houseboat URL
  content = content.replace(/<img src="https:\/\/images\.unsplash\.com\/photo-1593693411515-c20261bcad6e\?w=800&q=80" alt="Kashmir">/g, '<img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80" alt="Kashmir">');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated Kashmir featured destination image in:', filePath);
});

console.log('Done.');
