const fs = require('fs');
const path = require('path');

const rootDir = 'd:\\vishit-journeys';

// Official package list with exact pricing
const officialPackages = [
  {
    id: 1,
    name: "Dubai Luxury Package",
    cat: "international",
    price: 39999,
    priceFormatted: "₹39,999",
    days: "5D / 4N",
    daysNum: 5,
    badge: "INTERNATIONAL",
    badgeClass: "",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    list: ["Burj Khalifa Visit", "Desert Safari", "Luxury Hotel Stay", "Airport Transfers"],
    filterCat: "international"
  },
  {
    id: 2,
    name: "Thailand Holiday Package",
    cat: "international",
    price: 29999,
    priceFormatted: "₹29,999",
    days: "6D / 5N",
    daysNum: 6,
    badge: "INTERNATIONAL",
    badgeClass: "",
    img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80",
    list: ["Bangkok & Pattaya Tour", "Coral Island Visit", "Hotel with Breakfast", "Beach Activities"],
    filterCat: "international"
  },
  {
    id: 3,
    name: "Bali Honeymoon Package",
    cat: "honeymoon international",
    price: 44999,
    priceFormatted: "₹44,999",
    days: "5D / 4N",
    daysNum: 5,
    badge: "HONEYMOON",
    badgeClass: "pkg2-badge-gold",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    list: ["Private Villa Stay", "Candle Light Dinner", "Water Sports", "Ubud Sightseeing"],
    filterCat: "honeymoon"
  },
  {
    id: 4,
    name: "Maldives Luxury Package",
    cat: "honeymoon international",
    price: 49999,
    priceFormatted: "₹49,999",
    days: "5D / 4N",
    daysNum: 5,
    badge: "PREMIUM",
    badgeClass: "pkg2-badge-gold",
    img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80",
    list: ["Luxury Water Villa", "Speed Boat Transfers", "All Meals Included", "Private Beach"],
    filterCat: "honeymoon"
  },
  {
    id: 5,
    name: "Kashmir Paradise Package",
    cat: "hills domestic",
    price: 14999,
    priceFormatted: "₹14,999",
    days: "6D / 5N",
    daysNum: 6,
    badge: "POPULAR",
    badgeClass: "",
    img: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=600&q=80",
    list: ["Srinagar Houseboat Stay", "Gulmarg Gondola Ride", "Pahalgam & Sonmarg Tour", "Breakfast & Dinner"],
    filterCat: "hills"
  },
  {
    id: 6,
    name: "Manali Package (3N/4D)",
    cat: "hills domestic honeymoon",
    price: 9680,
    priceFormatted: "₹9,680",
    days: "4D / 3N",
    daysNum: 4,
    badge: "BEST SELLER",
    badgeClass: "pkg2-badge-gold",
    img: "/uploads/packages/manali_honeymoon.jpg",
    list: ["Romantic Room Decoration", "Candle Light Dinner", "Private Cab", "Solang & Snow Point"],
    filterCat: "hills"
  },
  {
    id: 7,
    name: "Shimla Manali Package (4N/5D)",
    cat: "hills domestic",
    price: 12430,
    priceFormatted: "₹12,430",
    days: "5D / 4N",
    daysNum: 5,
    badge: "HILLS COMBO",
    badgeClass: "",
    img: "/uploads/packages/kasol_manali.jpg",
    list: ["Shimla Local Tour", "Manali Sightseeing", "Solang Valley", "Hotel with Meals"],
    filterCat: "hills"
  },
  {
    id: 8,
    name: "Kasol + Manali Combo",
    cat: "hills domestic",
    price: 9999,
    priceFormatted: "₹9,999",
    days: "6D / 5N",
    daysNum: 6,
    badge: "COMBO",
    badgeClass: "",
    img: "/uploads/packages/kasol_manali.jpg",
    list: ["Kasol Riverside Stay", "Manali Sightseeing", "Solang Valley", "Bonfire & Music Night"],
    filterCat: "hills"
  },
  {
    id: 9,
    name: "Ek Dham Yatra Package",
    cat: "pilgrimage domestic",
    price: 10000,
    priceFormatted: "₹10,000",
    days: "3D / 2N",
    daysNum: 3,
    badge: "PILGRIMAGE",
    badgeClass: "",
    img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
    list: ["Kedarnath / Badrinath Visit", "Pooja Assistance", "Hotel Stay & Meals", "Cab Transfers"],
    filterCat: "domestic"
  },
  {
    id: 10,
    name: "Do Dham Yatra Package",
    cat: "pilgrimage domestic",
    price: 13000,
    priceFormatted: "₹13,000",
    days: "5D / 4N",
    daysNum: 5,
    badge: "PILGRIMAGE",
    badgeClass: "",
    img: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=600&q=80",
    list: ["Kedarnath & Badrinath Tour", "Helicopter / Trek Option", "Hotel Stay with Meals", "Dedicated Cab"],
    filterCat: "domestic"
  },
  {
    id: 11,
    name: "Char Dham Yatra Package",
    cat: "pilgrimage domestic",
    price: 20000,
    priceFormatted: "₹20,000",
    days: "10D / 9N",
    daysNum: 10,
    badge: "SPIRITUAL",
    badgeClass: "",
    img: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=600&q=80",
    list: ["Yamunotri, Gangotri, Kedarnath, Badrinath", "Complete AC Vehicle", "Hotels & Meals", "VIP Darshan"],
    filterCat: "domestic"
  },
  {
    id: 12,
    name: "Agra Overnight Package",
    cat: "heritage domestic",
    price: 7500,
    priceFormatted: "₹7,500",
    days: "2D / 1N",
    daysNum: 2,
    badge: "HERITAGE",
    badgeClass: "",
    img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80",
    list: ["Taj Mahal Sunrise Tour", "Agra Fort Visit", "Luxury Hotel Stay", "Private AC Cab"],
    filterCat: "domestic"
  },
  {
    id: 13,
    name: "Agra Jaipur Combo (2N/3D)",
    cat: "heritage domestic",
    price: 9000,
    priceFormatted: "₹9,000",
    days: "3D / 2N",
    daysNum: 3,
    badge: "GOLDEN TRIANGLE",
    badgeClass: "",
    img: "/uploads/packages/rajasthan.jpg",
    list: ["Taj Mahal & Agra Fort", "Jaipur Hawa Mahal & Amber Fort", "Sightseeing Cab", "Hotel with Breakfast"],
    filterCat: "domestic"
  },
  {
    id: 14,
    name: "Rajasthan Royal Package (7N/8D)",
    cat: "domestic heritage",
    price: 23000,
    priceFormatted: "₹23,000",
    days: "8D / 7N",
    daysNum: 8,
    badge: "ROYAL",
    badgeClass: "",
    img: "/uploads/packages/rajasthan.jpg",
    list: ["Jaipur, Jodhpur, Jaisalmer & Udaipur", "Fort & Palace Visits", "Desert Safari", "Heritage Stays & Meals"],
    filterCat: "domestic"
  },
  {
    id: 15,
    name: "Assam & Meghalaya (6N/7D)",
    cat: "nature domestic",
    price: 19250,
    priceFormatted: "₹19,250",
    days: "7D / 6N",
    daysNum: 7,
    badge: "NORTH EAST",
    badgeClass: "",
    img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
    list: ["Kaziranga National Park Rhino Safari", "Shillong & Cherrapunji Waterfalls", "Dawki Living Root Bridge", "Hotel & Cab"],
    filterCat: "domestic"
  },
  {
    id: 16,
    name: "Kerala Backwaters (5N/6D)",
    cat: "domestic backwaters",
    price: 19250,
    priceFormatted: "₹19,250",
    days: "6D / 5N",
    daysNum: 6,
    badge: "BACKWATERS",
    badgeClass: "",
    img: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=600&q=80",
    list: ["Munnar Tea Gardens", "Alleppey Houseboat Cruise", "Kochi & Kovalam Beach", "Breakfast & Houseboat Meals"],
    filterCat: "domestic"
  },
  {
    id: 17,
    name: "Leh Ladakh Adventure",
    cat: "hills domestic",
    price: 22999,
    priceFormatted: "₹22,999",
    days: "7D / 6N",
    daysNum: 7,
    badge: "ADVENTURE",
    badgeClass: "",
    img: "/uploads/packages/leh_ladakh.jpg",
    list: ["Pangong Lake", "Nubra Valley Safari", "Mountain Camps", "Bike/Cab Tour"],
    filterCat: "hills"
  },
  {
    id: 18,
    name: "Goa Beach Package",
    cat: "domestic beach",
    price: 7999,
    priceFormatted: "₹7,999",
    days: "4D / 3N",
    daysNum: 4,
    badge: "BEACH",
    badgeClass: "",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80",
    list: ["Beachside Hotel Stay", "North & South Goa Tour", "Breakfast Included", "Airport Pickup & Drop"],
    filterCat: "domestic"
  },
  {
    id: 19,
    name: "Rishikesh Camping Package",
    cat: "hills domestic",
    price: 5999,
    priceFormatted: "₹5,999",
    days: "3D / 2N",
    daysNum: 3,
    badge: "ADVENTURE",
    badgeClass: "",
    img: "/uploads/packages/rishikesh.jpg",
    list: ["River Rafting", "Camping Stay", "Bonfire & Music", "Adventure Activities"],
    filterCat: "hills"
  },
  {
    id: 20,
    name: "Udaipur Romantic Package",
    cat: "honeymoon domestic",
    price: 11999,
    priceFormatted: "₹11,999",
    days: "4D / 3N",
    daysNum: 4,
    badge: "ROMANTIC",
    badgeClass: "pkg2-badge-gold",
    img: "/uploads/packages/udaipur.jpg",
    list: ["Lake Pichola Boat Ride", "City Palace Visit", "Luxury Hotel", "Candle Light Dinner"],
    filterCat: "honeymoon"
  }
];

// Generate HTML grid string for pkg2 cards
function generatePkgCardsHtml() {
  return officialPackages.map(pkg => `
  <div class="pkg2" data-cat="${pkg.cat}" data-price="${pkg.price}" data-days="${pkg.daysNum}">
    <div class="pkg2-img">
      <img src="${pkg.img}" alt="${pkg.name}" loading="lazy">
      <span class="pkg2-badge ${pkg.badgeClass}">${pkg.badge}</span>
    </div>
    <div class="pkg2-body">
      <h3>${pkg.name}</h3>
      <div class="pkg2-meta"><span>🗓 ${pkg.days}</span></div>
      <ul class="pkg2-list">
        ${pkg.list.map(item => `<li>${item}</li>`).join('\n        ')}
      </ul>
      <div class="pkg2-price-wrap" style="display:flex;align-items:center;justify-content:space-between;margin-top:1rem;padding-top:0.8rem;border-top:1px solid rgba(201,165,74,0.15);">
        <div>
          <span style="font-size:0.68rem;letter-spacing:1px;color:rgba(255,255,255,0.6);text-transform:uppercase;display:block;">Starting From</span>
          <span style="font-size:1.25rem;font-weight:700;color:var(--gold);font-family:'Cormorant Garamond',serif;">${pkg.priceFormatted}</span>
        </div>
        <button onclick="openBooking(${pkg.id}, '${pkg.name.replace(/'/g, "\\'")}', ${pkg.price}, '${pkg.days}', '${pkg.filterCat}')" class="pkg2-btn">Book Now →</button>
      </div>
    </div>
  </div>
  `).join('\n');
}

// Generate Official Price Reference Table HTML for website footer/section
function generateOfficialPriceTableHtml() {
  return `
  <div class="official-price-section" style="margin:4rem auto;max-width:1000px;background:rgba(13,31,60,0.6);border:1px solid rgba(201,165,74,0.3);border-radius:16px;padding:2rem 4%;backdrop-filter:blur(10px);">
    <div style="text-align:center;margin-bottom:1.8rem;">
      <span style="font-size:0.75rem;letter-spacing:3px;color:var(--gold);text-transform:uppercase;font-weight:600;">Official Rate Card</span>
      <h2 style="font-family:'Cormorant Garamond',serif;font-size:2.2rem;color:#ffffff;margin-top:0.3rem;">Vishit Journey Starting Price List</h2>
      <p style="font-size:0.85rem;color:rgba(255,255,255,0.7);margin-top:0.4rem;">Prices are indicative starting prices and may vary based on travel dates, hotel category & inclusions.</p>
    </div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;color:#ffffff;font-size:0.9rem;text-align:left;">
        <thead>
          <tr style="background:rgba(201,165,74,0.15);border-bottom:2px solid var(--gold);">
            <th style="padding:1rem 1.2rem;letter-spacing:1.5px;text-transform:uppercase;font-size:0.8rem;color:var(--gold);">Package Name</th>
            <th style="padding:1rem 1.2rem;letter-spacing:1.5px;text-transform:uppercase;font-size:0.8rem;color:var(--gold);">Duration</th>
            <th style="padding:1rem 1.2rem;letter-spacing:1.5px;text-transform:uppercase;font-size:0.8rem;color:var(--gold);text-align:right;">Starting Price</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
            <td style="padding:0.9rem 1.2rem;font-weight:600;">Ek Dham Yatra</td>
            <td style="padding:0.9rem 1.2rem;color:rgba(255,255,255,0.8);">3D / 2N</td>
            <td style="padding:0.9rem 1.2rem;font-weight:700;color:var(--gold);text-align:right;">₹10,000/-</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
            <td style="padding:0.9rem 1.2rem;font-weight:600;">Do Dham Yatra</td>
            <td style="padding:0.9rem 1.2rem;color:rgba(255,255,255,0.8);">5D / 4N</td>
            <td style="padding:0.9rem 1.2rem;font-weight:700;color:var(--gold);text-align:right;">₹13,000/-</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
            <td style="padding:0.9rem 1.2rem;font-weight:600;">Char Dham Yatra</td>
            <td style="padding:0.9rem 1.2rem;color:rgba(255,255,255,0.8);">10D / 9N</td>
            <td style="padding:0.9rem 1.2rem;font-weight:700;color:var(--gold);text-align:right;">₹20,000/-</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
            <td style="padding:0.9rem 1.2rem;font-weight:600;">Manali Package</td>
            <td style="padding:0.9rem 1.2rem;color:rgba(255,255,255,0.8);">4D / 3N (3N/4D)</td>
            <td style="padding:0.9rem 1.2rem;font-weight:700;color:var(--gold);text-align:right;">₹9,680/-</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
            <td style="padding:0.9rem 1.2rem;font-weight:600;">Shimla Manali Package</td>
            <td style="padding:0.9rem 1.2rem;color:rgba(255,255,255,0.8);">5D / 4N (4N/5D)</td>
            <td style="padding:0.9rem 1.2rem;font-weight:700;color:var(--gold);text-align:right;">₹12,430/-</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
            <td style="padding:0.9rem 1.2rem;font-weight:600;">Agra Overnight Package</td>
            <td style="padding:0.9rem 1.2rem;color:rgba(255,255,255,0.8);">2D / 1N</td>
            <td style="padding:0.9rem 1.2rem;font-weight:700;color:var(--gold);text-align:right;">₹7,500/-</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
            <td style="padding:0.9rem 1.2rem;font-weight:600;">Agra Jaipur Combo</td>
            <td style="padding:0.9rem 1.2rem;color:rgba(255,255,255,0.8);">3D / 2N (2N/3D)</td>
            <td style="padding:0.9rem 1.2rem;font-weight:700;color:var(--gold);text-align:right;">₹9,000/-</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
            <td style="padding:0.9rem 1.2rem;font-weight:600;">Rajasthan Royal Package</td>
            <td style="padding:0.9rem 1.2rem;color:rgba(255,255,255,0.8);">8D / 7N (7N/8D)</td>
            <td style="padding:0.9rem 1.2rem;font-weight:700;color:var(--gold);text-align:right;">₹23,000/-</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
            <td style="padding:0.9rem 1.2rem;font-weight:600;">Assam & Meghalaya Tour</td>
            <td style="padding:0.9rem 1.2rem;color:rgba(255,255,255,0.8);">7D / 6N (6N/7D)</td>
            <td style="padding:0.9rem 1.2rem;font-weight:700;color:var(--gold);text-align:right;">₹19,250/-</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
            <td style="padding:0.9rem 1.2rem;font-weight:600;">Kerala Backwaters Tour</td>
            <td style="padding:0.9rem 1.2rem;color:rgba(255,255,255,0.8);">6D / 5N (5N/6D)</td>
            <td style="padding:0.9rem 1.2rem;font-weight:700;color:var(--gold);text-align:right;">₹19,250/-</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="text-align:center;margin-top:1.2rem;font-size:0.75rem;color:rgba(255,255,255,0.5);">
      Starting Price | Terms & Conditions Apply. Prices are indicative starting prices and may vary based on travel dates, hotel category, number of travellers, vehicle type, availability, seasonality and inclusions.
    </div>
  </div>
  `.trim();
}

// Update HTML files
const htmlFiles = [
  'd:\\vishit-journeys\\index.html',
  'd:\\vishit-journeys\\index.php',
  'd:\\vishit-journeys\\NEW CHAT\\index.html',
  'd:\\vishit-journeys\\new update\\index.html',
  'd:\\vishit-journeys\\new update\\Vishit Journey.html',
  'd:\\vishit-journeys\\Vishit Journey.html'
];

const newPkgCardsHtml = generatePkgCardsHtml();
const newTableHtml = generateOfficialPriceTableHtml();

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace pkg-grid2 container content
    content = content.replace(/(<div class="pkg-grid2"[^>]*>)([\s\S]*?)(<\/div>\s*<\/main>|<\/main>)/i, (match, p1, p2, p3) => {
      return `${p1}\n${newPkgCardsHtml}\n${p3}`;
    });

    // Replace or insert official price table before footer
    if (content.includes('class="official-price-section"')) {
      content = content.replace(/<div class="official-price-section"[\s\S]*?<\/div>\s*<\/div>/i, newTableHtml);
    } else if (content.includes('<footer>') || content.includes('<footer')) {
      content = content.replace(/(<footer[^>]*>)/i, `${newTableHtml}\n\n$1`);
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated package cards & pricing table in:', file);
  }
});

// Update database.sql
const sqlPath = 'd:\\vishit-journeys\\sql\\database.sql';
if (fs.existsSync(sqlPath)) {
  const sqlInserts = officialPackages.map(pkg => 
    `('${pkg.name.replace(/'/g, "''")}','${pkg.filterCat}','${pkg.days}',${pkg.price},'per person','${pkg.list.join('|')}','${pkg.img}','${pkg.badge}')`
  ).join(',\n');
  
  let sqlContent = fs.readFileSync(sqlPath, 'utf8');
  sqlContent = sqlContent.replace(/INSERT INTO packages[\s\S]*?;/i, `INSERT INTO packages (name, category, duration, price, price_label, highlights, image_url, badge) VALUES\n${sqlInserts};`);
  fs.writeFileSync(sqlPath, sqlContent, 'utf8');
  console.log('Updated sql/database.sql with all official pricing packages!');
}

console.log('Official package pricing synchronization complete!');
