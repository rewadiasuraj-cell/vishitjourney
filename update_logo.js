const fs = require('fs');
const path = require('path');

const files = [
  'd:/vishit-journeys/Vishit Journey.html',
  'd:/vishit-journeys/index.html',
  'd:/vishit-journeys/new update/index.html',
  'd:/vishit-journeys/new update/Vishit Journey.html',
  'd:/vishit-journeys/NEW CHAT/index.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  console.log('Processing:', file);
  let content = fs.readFileSync(file, 'utf8');

  // Replace base64 in img tags
  content = content.replace(/<img([^>]*?)src="data:image\/[a-zA-Z]+;base64,[^"]+"([^>]*?)>/g, (match, p1, p2) => {
    let logoPath = 'Vishit_Journey_Logo.jpg';
    if (p1.includes('navLogo') || p2.includes('navLogo')) {
      return `<img${p1}src="${logoPath}" alt="Vishit Journey"${p2}>`;
    }
    return `<img${p1}src="${logoPath}" alt="Vishit Journey"${p2}>`;
  });

  // Replace >JOURNEYS< with >JOURNEY<
  content = content.replace(/>JOURNEYS</g, '>JOURNEY<');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated:', file);
});
