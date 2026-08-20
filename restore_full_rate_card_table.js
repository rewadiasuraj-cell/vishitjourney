const fs = require('fs');
const path = require('path');

const targetFiles = [
  'index.html',
  'Vishit Journey.html',
  'new update/index.html',
  'new update/Vishit Journey.html',
  'NEW CHAT/index.html'
];

const domesticRateCardPackages = [
  {
    id: 11,
    name: "Char Dham Yatra Package",
    badge: "SPIRITUAL",
    badgeBg: "rgba(201,165,74,0.18)",
    badgeColor: "#c9a54a",
    duration: "10D / 9N",
    features: "Yamunotri, Gangotri, Kedarnath, Badrinath + VIP Darshan",
    price: "₹20,000/-",
    priceNum: 20000,
    cat: "domestic"
  },
  {
    id: 10,
    name: "Do Dham Yatra Package",
    badge: "PILGRIMAGE",
    badgeBg: "rgba(0,114,255,0.15)",
    badgeColor: "#0072ff",
    duration: "5D / 4N",
    features: "Kedarnath & Badrinath Tour + Helicopter/Trek Option",
    price: "₹13,000/-",
    priceNum: 13000,
    cat: "domestic"
  },
  {
    id: 9,
    name: "Ek Dham Yatra Package",
    badge: "PILGRIMAGE",
    badgeBg: "rgba(0,114,255,0.15)",
    badgeColor: "#0072ff",
    duration: "3D / 2N",
    features: "Kedarnath or Badrinath Visit + Pooja Assistance",
    price: "₹10,000/-",
    priceNum: 10000,
    cat: "domestic"
  },
  {
    id: 5,
    name: "Kashmir Paradise Package",
    badge: "POPULAR",
    badgeBg: "rgba(16,185,129,0.15)",
    badgeColor: "#059669",
    duration: "6D / 5N",
    features: "Srinagar Houseboat + Gulmarg Gondola + Pahalgam Tour",
    price: "₹14,999/-",
    priceNum: 14999,
    cat: "hills"
  },
  {
    id: 6,
    name: "Manali Package (3N/4D)",
    badge: "BEST SELLER",
    badgeBg: "rgba(238,9,121,0.15)",
    badgeColor: "#ee0979",
    duration: "4D / 3N",
    features: "Solang Valley + Rohtang Pass + Candlelight Dinner",
    price: "₹9,680/-",
    priceNum: 9680,
    cat: "hills"
  },
  {
    id: 7,
    name: "Shimla Manali Package (4N/5D)",
    badge: "HILLS COMBO",
    badgeBg: "rgba(139,92,246,0.15)",
    badgeColor: "#6d28d9",
    duration: "5D / 4N",
    features: "Shimla Ridge + Kufri + Solang + Manali Sightseeing",
    price: "₹12,430/-",
    priceNum: 12430,
    cat: "hills"
  },
  {
    id: 8,
    name: "Kasol + Manali Combo",
    badge: "COMBO",
    badgeBg: "rgba(245,158,11,0.15)",
    badgeColor: "#d97706",
    duration: "6D / 5N",
    features: "Kasol Riverside Stay + Manikaran + Bonfire Night",
    price: "₹9,999/-",
    priceNum: 9999,
    cat: "hills"
  },
  {
    id: 12,
    name: "Agra Overnight Package",
    badge: "HERITAGE",
    badgeBg: "rgba(201,165,74,0.18)",
    badgeColor: "#c9a54a",
    duration: "2D / 1N",
    features: "Taj Mahal Sunrise Tour + Agra Fort + Luxury AC Cab",
    price: "₹7,500/-",
    priceNum: 7500,
    cat: "domestic"
  },
  {
    id: 13,
    name: "Agra Jaipur Combo (2N/3D)",
    badge: "GOLDEN TRIANGLE",
    badgeBg: "rgba(201,165,74,0.22)",
    badgeColor: "#b89035",
    duration: "3D / 2N",
    features: "Taj Mahal + Amber Fort + Jaipur Hawa Mahal Tour",
    price: "₹9,000/-",
    priceNum: 9000,
    cat: "domestic"
  },
  {
    id: 14,
    name: "Rajasthan Royal Package (7N/8D)",
    badge: "ROYAL",
    badgeBg: "rgba(201,165,74,0.3)",
    badgeColor: "#c9a54a",
    duration: "8D / 7N",
    features: "Jaipur + Jodhpur + Jaisalmer Desert Safari + Udaipur",
    price: "₹23,000/-",
    priceNum: 23000,
    cat: "domestic"
  },
  {
    id: 16,
    name: "Kerala Backwaters (5N/6D)",
    badge: "BACKWATERS",
    badgeBg: "rgba(16,185,129,0.15)",
    badgeColor: "#059669",
    duration: "6D / 5N",
    features: "Munnar Tea Gardens + Alleppey Houseboat + Kochi",
    price: "₹19,250/-",
    priceNum: 19250,
    cat: "domestic"
  },
  {
    id: 17,
    name: "Leh Ladakh Adventure",
    badge: "ADVENTURE",
    badgeBg: "rgba(139,92,246,0.18)",
    badgeColor: "#6d28d9",
    duration: "7D / 6N",
    features: "Pangong Lake + Nubra Valley + Khardung La Pass",
    price: "₹22,999/-",
    priceNum: 22999,
    cat: "hills"
  },
  {
    id: 15,
    name: "Assam & Meghalaya (6N/7D)",
    badge: "NORTH EAST",
    badgeBg: "rgba(16,185,129,0.18)",
    badgeColor: "#059669",
    duration: "7D / 6N",
    features: "Kaziranga Rhino Safari + Cherrapunji + Dawki Root Bridge",
    price: "₹19,250/-",
    priceNum: 19250,
    cat: "domestic"
  }
];

function generateTableRows() {
  return domesticRateCardPackages.map(pkg => `
            <tr style="border-bottom: 1px solid rgba(11,27,51,0.08); transition: background 0.2s;" onmouseover="this.style.background='rgba(201,165,74,0.06)'" onmouseout="this.style.background='transparent'">
              <td style="padding: 1.1rem 1.5rem; font-weight: 700; color: #0B1B33;">
                ${pkg.name} <span style="font-size: 0.68rem; background: ${pkg.badgeBg}; color: ${pkg.badgeColor}; padding: 3px 8px; border-radius: 10px; margin-left: 6px; font-weight: 800; letter-spacing: 0.5px;">${pkg.badge}</span>
              </td>
              <td style="padding: 1.1rem 1.5rem; color: #2D3748; font-weight: 600;">${pkg.duration}</td>
              <td style="padding: 1.1rem 1.5rem; color: #5F6B7A; font-size: 0.88rem;">${pkg.features}</td>
              <td style="padding: 1.1rem 1.5rem; font-weight: 700; color: var(--gold); font-size: 1.12rem; text-align: right;">${pkg.price}</td>
              <td style="padding: 1.1rem 1.5rem; text-align: center;">
                <button onclick="openBooking(${pkg.id}, '${pkg.name.replace(/'/g, "\\'")}', ${pkg.priceNum}, '${pkg.duration}', '${pkg.cat}')" style="padding: 0.55rem 1.2rem; background: var(--gold); color: #081428; border: none; border-radius: 20px; font-weight: 700; font-size: 0.82rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 12px rgba(201,165,74,0.3);" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Book Now →</button>
              </td>
            </tr>
  `).join('\n');
}

const fullTableSection = `      <!-- Responsive Table Container -->
      <div style="overflow-x: auto; border-radius: 16px; border: 1px solid #E3E8EF; background: #FFFFFF; box-shadow: 0 10px 30px rgba(11,27,51,0.06);">
        <table style="width: 100%; border-collapse: collapse; color: #0B1B33; font-size: 0.95rem; text-align: left; min-width: 700px;">
          <thead>
            <tr style="background: #F7F9FC; border-bottom: 2px solid rgba(201,165,74,0.35);">
              <th style="padding: 1.1rem 1.5rem; font-size: 0.82rem; font-weight: 800; color: #0B1B33; text-transform: uppercase; letter-spacing: 1px;">Package Name</th>
              <th style="padding: 1.1rem 1.5rem; font-size: 0.82rem; font-weight: 800; color: #0B1B33; text-transform: uppercase; letter-spacing: 1px;">Duration</th>
              <th style="padding: 1.1rem 1.5rem; font-size: 0.82rem; font-weight: 800; color: #0B1B33; text-transform: uppercase; letter-spacing: 1px;">Included Features</th>
              <th style="padding: 1.1rem 1.5rem; font-size: 0.82rem; font-weight: 800; color: #0B1B33; text-transform: uppercase; letter-spacing: 1px; text-align: right;">Starting Price</th>
              <th style="padding: 1.1rem 1.5rem; font-size: 0.82rem; font-weight: 800; color: #0B1B33; text-transform: uppercase; letter-spacing: 1px; text-align: center;">Action</th>
            </tr>
          </thead>
          <tbody>
${generateTableRows()}
          </tbody>
        </table>
      </div>`;

targetFiles.forEach(relPath => {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace table inside #official-rate-and-faq
  content = content.replace(
    /<!-- Responsive Table Container -->[\s\S]*?<\/div>\s*<\/div>\s*<!-- 2\. EXPANSIVE FAQ SECTION/i,
    fullTableSection + '\n    </div>\n\n    <!-- 2. EXPANSIVE FAQ SECTION'
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Restored full rate card table in:', relPath);
});
