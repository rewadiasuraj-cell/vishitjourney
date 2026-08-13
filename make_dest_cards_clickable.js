const fs = require('fs');

console.log('Making Featured Destinations trip cards clickable...');

const phpFile = 'd:/vishit-journeys/index.php';
if (fs.existsSync(phpFile)) {
  let content = fs.readFileSync(phpFile, 'utf8');

  // Replace View All link
  content = content.replace(
    /<a href="#" (style="color:var\(--gold\)[^>]*>View All →<\/a>)/gi,
    '<a href="javascript:void(0)" onclick="filterByDestination(\'all\')" $1'
  );

  // Replace destination cards to add onclick handlers
  content = content.replace(
    /<div class="dest-card">\s*<div class="dest-tag">MOST POPULAR<\/div>\s*<img src="[^"]*" alt="Kashmir">/gi,
    '<div class="dest-card" onclick="filterByDestination(\'kashmir\')" style="cursor:pointer">\n      <div class="dest-tag">MOST POPULAR</div>\n      <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80" alt="Kashmir">'
  );

  content = content.replace(
    /<div class="dest-card">\s*<img src="[^"]*" alt="Goa">/gi,
    '<div class="dest-card" onclick="filterByDestination(\'goa\')" style="cursor:pointer">\n      <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80" alt="Goa">'
  );

  content = content.replace(
    /<div class="dest-card">\s*<img src="[^"]*" alt="Dubai">/gi,
    '<div class="dest-card" onclick="filterByDestination(\'dubai\')" style="cursor:pointer">\n      <img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80" alt="Dubai">'
  );

  content = content.replace(
    /<div class="dest-card">\s*<img src="[^"]*" alt="Manali">/gi,
    '<div class="dest-card" onclick="filterByDestination(\'manali\')" style="cursor:pointer">\n      <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" alt="Manali">'
  );

  content = content.replace(
    /<div class="dest-card">\s*<img src="[^"]*" alt="Thailand">/gi,
    '<div class="dest-card" onclick="filterByDestination(\'thailand\')" style="cursor:pointer">\n      <img src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80" alt="Thailand">'
  );

  // Add filterByDestination JS function
  if (!content.includes('function filterByDestination(')) {
    const filterJs = `
<script>
function filterByDestination(destKey) {
  const destSelect = document.getElementById('searchDest');
  if (destSelect) {
    destSelect.value = destKey;
  }
  if (typeof executePackageSearch === 'function') {
    executePackageSearch();
  }
}
</script>
`;
    content = content.replace('</body>', filterJs + '\n</body>');
  }

  // Ensure CSS hover cursor and transform for .dest-card
  if (!content.includes('.dest-card { cursor: pointer;')) {
    const destCss = `
  /* DESTINATION CARD HOVER & CURSOR */
  .dest-card { cursor: pointer !important; transition: transform .3s ease, box-shadow .3s ease !important; }
  .dest-card:hover { transform: translateY(-6px) scale(1.015) !important; box-shadow: 0 12px 30px rgba(0,0,0,0.45) !important; }
`;
    content = content.replace('/* ALL SHAPES CURVED STYLING */', destCss + '\n  /* ALL SHAPES CURVED STYLING */');
  }

  fs.writeFileSync(phpFile, content, 'utf8');
  console.log('Updated index.php with clickable destination cards!');
}

// 2. Update build_clean_static_site.js to ensure filterByDestination JS is included in builds
const buildScript = 'd:/vishit-journeys/build_clean_static_site.js';
if (fs.existsSync(buildScript)) {
  let scriptContent = fs.readFileSync(buildScript, 'utf8');
  if (!scriptContent.includes('filterByDestination')) {
    scriptContent = scriptContent.replace(
      '// Inject Header Curved Nav CSS',
      '// Inject filterByDestination JS if missing\nif (!html.includes("function filterByDestination")) {\n  const destJsScript = `<script>function filterByDestination(destKey){const destSelect=document.getElementById("searchDest");if(destSelect){destSelect.value=destKey;}if(typeof executePackageSearch==="function"){executePackageSearch();}}</script>`;\n  html = html.replace("</body>", destJsScript + "\\n</body>");\n}\n\n// Inject Header Curved Nav CSS'
    );
    fs.writeFileSync(buildScript, scriptContent, 'utf8');
    console.log('Updated build_clean_static_site.js!');
  }
}
