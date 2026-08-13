const fs = require('fs');

const file = 'd:/vishit-journeys/index.php';
if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace base64 logo or old logo img in navbar
  content = content.replace(
    /<a href="#" class="logo">\s*<img src="[^"]*" alt="Vishit Journeys"[^>]*>\s*<\/a>/gi,
    '<a href="#" class="logo">\n    <img src="Vishit_Journey_Logo.jpg" alt="Vishit Journeys" style="height:104px;width:auto;display:block;">\n  </a>'
  );
  content = content.replace(
    /<a href="#" class="logo">\s*<img src="[^"]*" alt="Vishit Journey"[^>]*>\s*<\/a>/gi,
    '<a href="#" class="logo">\n    <img src="Vishit_Journey_Logo.jpg" alt="Vishit Journeys" style="height:104px;width:auto;display:block;">\n  </a>'
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated logo image in index.php!');
}
