const fs = require('fs');
const path = require('path');

// 18 Packages with 100% location-accurate images
const packages = [
  { id: 1, name: 'Dubai Luxury Package', category: 'international', duration: '5D / 4N', price: 39999, price_label: 'per person', highlights: ['Burj Khalifa Visit','Desert Safari','Luxury Hotel Stay','Airport Transfers'], image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', badge: 'INTERNATIONAL' },
  { id: 2, name: 'Thailand Holiday Package', category: 'international', duration: '6D / 5N', price: 29999, price_label: 'per person', highlights: ['Bangkok & Pattaya Tour','Coral Island Visit','Hotel with Breakfast','Private Transfers'], image_url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80', badge: 'INTERNATIONAL' },
  { id: 3, name: 'Bali Honeymoon Package', category: 'honeymoon', duration: '5D / 4N', price: 44999, price_label: 'per couple', highlights: ['Private Villa Stay','Romantic Candle Light Dinner','Water Sports','Ubud Sightseeing'], image_url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', badge: 'HONEYMOON' },
  { id: 4, name: 'Maldives Luxury Package', category: 'honeymoon', duration: '5D / 4N', price: 49999, price_label: 'per person', highlights: ['Luxury Water Villa Stay','Speed Boat Transfers','All Meals Included','Private Beach'], image_url: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80', badge: 'PREMIUM' },
  { id: 5, name: 'Kashmir Paradise Package', category: 'hills', duration: '6D / 5N', price: 14999, price_label: 'per person', highlights: ['Srinagar Houseboat Stay','Gulmarg Gondola Ride','Pahalgam & Sonmarg Tour','Breakfast & Dinner'], image_url: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=600&q=80', badge: 'POPULAR' },
  { id: 6, name: 'Manali Volvo Package', category: 'hills', duration: '5D / 4N', price: 6999, price_label: 'per person', highlights: ['Delhi-Manali Volvo Ticket','3 Nights Hotel','Solang Valley','Local Manali Tour'], image_url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80', badge: 'BEST SELLER' },
  { id: 7, name: 'Manali Honeymoon Package', category: 'honeymoon', duration: '4D / 3N', price: 8499, price_label: 'per person', highlights: ['Romantic Room Decoration','Candle Light Dinner','Private Cab','Snow Point Visit'], image_url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&q=80', badge: 'HONEYMOON' },
  { id: 8, name: 'Kasol + Manali Combo', category: 'hills', duration: '6D / 5N', price: 9999, price_label: 'per person', highlights: ['Kasol Riverside Stay','Manali Sightseeing','Solang Valley','Bonfire & Music Night'], image_url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80', badge: 'COMBO' },
  { id: 9, name: 'Dharamshala Package', category: 'hills', duration: '4D / 3N', price: 8499, price_label: 'per person', highlights: ['McLeodganj Sightseeing','Dalai Lama Temple','Bhagsu Waterfall','Breakfast & Dinner'], image_url: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=600&q=80', badge: 'HILLS' },
  { id: 10, name: 'Dalhousie Khajjiar Package', category: 'hills', duration: '5D / 4N', price: 9999, price_label: 'per person', highlights: ['Khajjiar Mini Switzerland','Dalhousie Sightseeing','Hotel with Meals','Scenic Views'], image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', badge: 'HILLS' },
  { id: 11, name: 'Goa Beach Package', category: 'domestic', duration: '4D / 3N', price: 7999, price_label: 'per person', highlights: ['Beachside Hotel Stay','North & South Goa Tour','Breakfast Included','Airport Pickup & Drop'], image_url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80', badge: 'BEACH' },
  { id: 12, name: 'Leh Ladakh Adventure', category: 'hills', duration: '7D / 6N', price: 22999, price_label: 'per person', highlights: ['Pangong Lake','Nubra Valley Safari','Mountain Camps','Bike/Cab Tour'], image_url: 'https://images.unsplash.com/photo-1581791538302-0353709899a0?w=600&q=80', badge: 'ADVENTURE' },
  { id: 13, name: 'Rajasthan Royal Package', category: 'domestic', duration: '6D / 5N', price: 18999, price_label: 'per person', highlights: ['Jaipur, Jodhpur & Udaipur','Fort & Palace Visits','Desert Safari','Hotel with Meals'], image_url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80', badge: 'ROYAL' },
  { id: 14, name: 'Kerala Backwaters Package', category: 'domestic', duration: '5D / 4N', price: 16999, price_label: 'per person', highlights: ['Munnar Tea Gardens','Alleppey Houseboat','Kochi Sightseeing','Breakfast Included'], image_url: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=600&q=80', badge: 'BACKWATERS' },
  { id: 15, name: 'Andaman Tour Package', category: 'domestic', duration: '5D / 4N', price: 24999, price_label: 'per person', highlights: ['Cellular Jail Visit','Havelock Island','Beach Resort Stay','Cruise Transfers'], image_url: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80', badge: 'ISLAND' },
  { id: 16, name: 'Rishikesh Camping Package', category: 'hills', duration: '3D / 2N', price: 5999, price_label: 'per person', highlights: ['River Rafting','Camping Stay','Bonfire & Music','Adventure Activities'], image_url: '/uploads/packages/rishikesh.jpg', badge: 'ADVENTURE' },
  { id: 17, name: 'Udaipur Romantic Package', category: 'honeymoon', duration: '4D / 3N', price: 11999, price_label: 'per couple', highlights: ['Lake Pichola Boat Ride','City Palace Visit','Luxury Hotel','Candle Light Dinner'], image_url: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=600&q=80', badge: 'ROMANTIC' },
  { id: 18, name: 'Shimla Manali Package', category: 'hills', duration: '5D / 4N', price: 10999, price_label: 'per person', highlights: ['Shimla Local Tour','Manali Sightseeing','Solang Valley','Hotel with Meals'], image_url: 'https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=600&q=80', badge: 'HILLS COMBO' }
];

function generatePackageCardsHtml(pkgs) {
  return pkgs.map(p => {
    let cats = p.category;
    if (p.category === 'honeymoon') cats = 'honeymoon domestic';
    if (p.category === 'hills') cats = 'hills domestic';
    const isGoldBadge = ['HONEYMOON','ROMANTIC','PREMIUM'].includes(p.badge);
    const badgeCls = isGoldBadge ? 'pkg2-badge pkg2-badge-gold' : 'pkg2-badge';
    const formattedPrice = '₹' + p.price.toLocaleString('en-IN');
    const highlightsList = p.highlights.map(hl => `<li>${hl}</li>`).join('\n        ');

    return `
  <div class="pkg2" data-cat="${cats}">
    <div class="pkg2-img">
      <img src="${p.image_url}" alt="${p.name}" loading="lazy">
      <span class="${badgeCls}">${p.badge}</span>
      <span class="pkg2-price">${formattedPrice}<small>/${p.price_label}</small></span>
    </div>
    <div class="pkg2-body">
      <h3>${p.name}</h3>
      <div class="pkg2-meta"><span>🗓 ${p.duration}</span></div>
      <ul class="pkg2-list">
        ${highlightsList}
      </ul>
      <button onclick="openBooking(${p.id}, '${p.name.replace(/'/g, "\\'")}', ${p.price}, '${p.duration}', '${p.category}')" class="pkg2-btn">Book Now →</button>
    </div>
  </div>`;
  }).join('\n');
}

const targetFiles = [
  'd:/vishit-journeys/Vishit Journey.html',
  'd:/vishit-journeys/index.html',
  'd:/vishit-journeys/new update/index.html',
  'd:/vishit-journeys/new update/Vishit Journey.html',
  'd:/vishit-journeys/NEW CHAT/index.html'
];

targetFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  console.log('Processing:', filePath);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Fix Kashmir card in Featured Destinations section
  content = content.replace(/(<div class="dest-card[^>]*?>\s*<img src=")[^"]+(" alt="Kashmir"[^>]*?>)/gi, '$1https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&q=80$2');
  content = content.replace(/(<img src=")[^"]+(" alt="Kashmir")/gi, '$1https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&q=80$2');

  // 2. Direct exact image replacements for packages 17 & 18 if they exist
  content = content.replace('/uploads/packages/udaipur.jpg', 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=600&q=80'); // Udaipur
  content = content.replace('https://images.unsplash.com/photo-1467173572719-f14b9fb86e5f?w=600&q=80', 'https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=600&q=80'); // Shimla

  // 3. Replace Package cards container content cleanly
  const pkgContainerStart = content.indexOf('<div class="packages-grid"');
  if (pkgContainerStart !== -1) {
    const gridOpenEnd = content.indexOf('>', pkgContainerStart) + 1;
    const nextSectionStart = content.indexOf('</section>', gridOpenEnd);
    if (nextSectionStart !== -1) {
      // Find the last </div> before </section>
      const gridCloseStart = content.lastIndexOf('</div>', nextSectionStart);
      if (gridCloseStart > pkgContainerStart) {
        const staticCardsHtml = generatePackageCardsHtml(packages);
        content = content.substring(0, gridOpenEnd) + '\n' + staticCardsHtml + '\n' + content.substring(gridCloseStart);
      }
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully fixed mismatched images in:', filePath);
});

console.log('Done fixing all destination and package images completely!');
