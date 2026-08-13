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
  console.log('Fixing Kashmir image in:', filePath);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace any computer/code image or bad Kashmir image in Featured Destinations with real Kashmir photo
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1566837945700-30057527ade0[^\"]*/g, 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated Kashmir image in:', filePath);
});

console.log('Kashmir image fix completed.');
