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
  console.log('Fixing 3 package images in:', filePath);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Manali Honeymoon Package: Replace Amber Fort (photo-1599661046289-e31897846e41) with Romantic Manali Snow Resort (photo-1571003123894-1f0594d2b5d9)
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1599661046289-e31897846e41[^\"]*/g, 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80');

  // 2. Leh Ladakh Adventure: Replace Kashmir horse photo (photo-1598091383021-15ddea10925d) with Pangong Tso Lake & Ladakh mountains (photo-1506197603052-3cc9c3a201bd)
  // Note: Only replace inside Leh Ladakh card
  content = content.replace(/(<img src=")[^"]+(" alt="Leh Ladakh Adventure")/gi, '$1https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=600&q=80$2');

  // 3. Rishikesh Camping Package: Replace tropical island water (photo-1544550581-1bcabf842b77) with Ganges River Rafting & Mountain Camping (photo-1530541930197-ff16ac917b0e)
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1544550581-1bcabf842b77[^\"]*/g, 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=600&q=80');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated images in:', filePath);
});

console.log('Done fixing Manali Honeymoon, Leh Ladakh, and Rishikesh images!');
