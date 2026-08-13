const fs = require('fs');

console.log('Making "Find Your Perfect Journey" search button functional...');

// 1. Update index.php search bar HTML & JavaScript
const phpFile = 'd:/vishit-journeys/index.php';
if (fs.existsSync(phpFile)) {
  let content = fs.readFileSync(phpFile, 'utf8');

  // Replace search-bar HTML block
  const searchBarOld = `<div class="search-section">
  <div class="search-label">✦ Find Your Perfect Journey ✦</div>
  <div class="search-bar">
    <div class="search-field">
      <label>Destination</label>
      <select>
        <option>Kashmir, India</option>
        <option>Goa, India</option>
        <option>Manali, India</option>
        <option>Dubai, UAE</option>
        <option>Thailand</option>
        <option>Maldives</option>
      </select>
    </div>
    <div class="search-field">
      <label>Travel Date</label>
      <input type="date" />
    </div>
    <div class="search-field">
      <label>Travellers</label>
      <select>
        <option>2 Persons</option>
        <option>4 Persons</option>
        <option>6 Persons</option>
        <option>Group (10+)</option>
      </select>
    </div>
    <div class="search-field">
      <label>Transport</label>
      <select>
        <option>Cab (Sedan)</option>
        <option>SUV / Innova</option>
        <option>Tempo Traveller</option>
        <option>Luxury Bus</option>
      </select>
    </div>
    <button class="search-btn">Search →</button>
  </div>
</div>`;

  const searchBarNew = `<div class="search-section">
  <div class="search-label">✦ Find Your Perfect Journey ✦</div>
  <div class="search-bar">
    <div class="search-field">
      <label>Destination</label>
      <select id="searchDest">
        <option value="all">All Destinations</option>
        <option value="kashmir">Kashmir, India</option>
        <option value="manali">Manali, Himachal Pradesh</option>
        <option value="shimla">Shimla, Himachal Pradesh</option>
        <option value="goa">Goa, India</option>
        <option value="dubai">Dubai, UAE</option>
        <option value="thailand">Thailand</option>
        <option value="maldives">Maldives</option>
        <option value="bali">Bali, Indonesia</option>
        <option value="dharamshala">Dharamshala & McLeodganj</option>
        <option value="dalhousie">Dalhousie & Khajjiar</option>
        <option value="ladakh">Leh Ladakh</option>
        <option value="rajasthan">Rajasthan & Udaipur</option>
        <option value="kerala">Kerala Backwaters</option>
        <option value="andaman">Andaman Islands</option>
        <option value="rishikesh">Rishikesh</option>
      </select>
    </div>
    <div class="search-field">
      <label>Travel Date</label>
      <input type="date" id="searchDate" />
    </div>
    <div class="search-field">
      <label>Travellers</label>
      <select id="searchTravellers">
        <option value="all">Any Travellers</option>
        <option value="2">2 Persons</option>
        <option value="4">4 Persons</option>
        <option value="6">6 Persons</option>
        <option value="group">Group (10+)</option>
      </select>
    </div>
    <div class="search-field">
      <label>Transport</label>
      <select id="searchTransport">
        <option value="all">Any Vehicle / Cab</option>
        <option value="sedan">Cab (Sedan)</option>
        <option value="innova">SUV / Innova</option>
        <option value="tempo">Tempo Traveller</option>
        <option value="bus">Luxury Bus</option>
      </select>
    </div>
    <button class="search-btn" onclick="executePackageSearch()">Search →</button>
  </div>
</div>`;

  if (content.includes('class="search-section"')) {
    content = content.replace(/<div class="search-section">[^]*?<\/div>\s*<\/div>/gi, searchBarNew);
  }

  // Inject executePackageSearch JS function if not already present
  if (!content.includes('function executePackageSearch()')) {
    const searchJs = `
<script>
function executePackageSearch() {
  const destSelect = document.getElementById('searchDest');
  const destVal = destSelect ? destSelect.value.toLowerCase() : 'all';
  const pkgCards = document.querySelectorAll('.pkg2');
  let matchCount = 0;

  // Reset active category tabs
  document.querySelectorAll('.pkg-tab').forEach(t => t.classList.remove('active'));

  pkgCards.forEach(card => {
    const title = (card.querySelector('h3') ? card.querySelector('h3').innerText : '').toLowerCase();
    const cats = (card.getAttribute('data-cat') || '').toLowerCase();
    const text = card.innerText.toLowerCase();

    if (destVal === 'all' || title.includes(destVal) || cats.includes(destVal) || text.includes(destVal)) {
      card.classList.remove('hidden');
      card.style.display = '';
      matchCount++;
    } else {
      card.classList.add('hidden');
      card.style.display = 'none';
    }
  });

  // Smooth scroll to packages section
  const pkgSection = document.getElementById('packages');
  if (pkgSection) {
    pkgSection.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>
`;
    content = content.replace('<!-- BOOKING MODAL -->', searchJs + '\n<!-- BOOKING MODAL -->');
  }

  fs.writeFileSync(phpFile, content, 'utf8');
  console.log('Updated index.php search bar and JS!');
}

// 2. Update build_clean_static_site.js to ensure search bar and JS are in static files
const buildScript = 'd:/vishit-journeys/build_clean_static_site.js';
if (fs.existsSync(buildScript)) {
  let scriptContent = fs.readFileSync(buildScript, 'utf8');
  if (!scriptContent.includes('executePackageSearch()')) {
    scriptContent = scriptContent.replace(
      '// Inject Curved Shapes CSS',
      '// Inject executePackageSearch JS if missing\nif (!html.includes("function executePackageSearch()")) {\n  const searchJsScript = `<script>function executePackageSearch(){const destSelect=document.getElementById("searchDest");const destVal=destSelect?destSelect.value.toLowerCase():"all";const pkgCards=document.querySelectorAll(".pkg2");let matchCount=0;document.querySelectorAll(".pkg-tab").forEach(t=>t.classList.remove("active"));pkgCards.forEach(card=>{const title=(card.querySelector("h3")?card.querySelector("h3").innerText:"").toLowerCase();const cats=(card.getAttribute("data-cat")||"").toLowerCase();const text=card.innerText.toLowerCase();if(destVal==="all"||title.includes(destVal)||cats.includes(destVal)||text.includes(destVal)){card.classList.remove("hidden");card.style.display="";matchCount++;}else{card.classList.add("hidden");card.style.display="none";}});const pkgSection=document.getElementById("packages");if(pkgSection){pkgSection.scrollIntoView({behavior:"smooth"});}}</script>`;\n  html = html.replace("<!-- BOOKING MODAL -->", searchJsScript + "\\n<!-- BOOKING MODAL -->");\n}\n\n// Inject Curved Shapes CSS'
    );
    fs.writeFileSync(buildScript, scriptContent, 'utf8');
    console.log('Updated build_clean_static_site.js!');
  }
}
