/**
 * VISHIT JOURNEY - Trip Booking, Itinerary Generator & Details Collection System
 */

let vjCurrentPkg = null;
let vjPricing = null;
let vjCurrentStep = 1;
let vjUserData = {};

// Detailed Package Day-by-Day Itineraries Database
const vjItineraryDatabase = {
  'char dham': [
    { day: 'Day 1', title: 'Arrival in Haridwar / Rishikesh', desc: 'Pickup from Airport/Station and transfer to Haridwar/Rishikesh. Evening Ganga Aarti at Har Ki Pauri.' },
    { day: 'Day 2', title: 'Haridwar to Barkot / Yamunotri Base', desc: 'Scenic drive through Mussoorie & Kempty Falls to Barkot. Hotel check-in & rest.' },
    { day: 'Day 3', title: 'Yamunotri Dham Darshan', desc: 'Drive to Janki Chatti, trek to Yamunotri Temple, holy dip in Surya Kund & VIP Darshan.' },
    { day: 'Day 4', title: 'Barkot to Uttarkashi', desc: 'Drive to Uttarkashi along Bhagirathi river. Visit Kashi Vishwanath Temple.' },
    { day: 'Day 5', title: 'Uttarkashi to Gangotri Dham & Back', desc: 'Drive through Harsil Valley to Gangotri Dham. Offer prayers & return to Uttarkashi.' },
    { day: 'Day 6', title: 'Uttarkashi to Guptkashi / Phata', desc: 'Drive to Guptkashi via Mandakini river valley. Visit Vishwanath Temple at Guptkashi.' },
    { day: 'Day 7', title: 'Guptkashi to Kedarnath Dham', desc: 'Trek or Helicopter ride to Kedarnath Temple. Evening Aarti & overnight stay in Kedarnath.' },
    { day: 'Day 8', title: 'Kedarnath to Badrinath Dham', desc: 'Morning Pooja at Kedarnath, transfer to Badrinath via Chopta/Joshimath.' },
    { day: 'Day 9', title: 'Badrinath Darshan & Mana Village', desc: 'Tapt Kund dip, Badrinath Darshan, Mana Village (last village of India) & Vyas Gufa.' },
    { day: 'Day 10', title: 'Badrinath to Rishikesh / Delhi Departure', desc: 'Return drive via Devprayag confluence. Drop at Rishikesh/Haridwar/Delhi.' }
  ],
  'kashmir': [
    { day: 'Day 1', title: 'Srinagar Airport Arrival & Houseboat Stay', desc: 'Traditional welcome at Srinagar Airport, transfer to Deluxe Houseboat on Dal Lake. 1-Hour complimentary Shikara ride.' },
    { day: 'Day 2', title: 'Srinagar Mughal Gardens Tour', desc: 'Visit Nishat Bagh, Shalimar Bagh, Chashme Shahi, and Shankaracharya Temple.' },
    { day: 'Day 3', title: 'Excursion to Gulmarg', desc: 'Full day trip to Gulmarg. Experience the world-famous Gondola Cable Car ride & snow points.' },
    { day: 'Day 4', title: 'Srinagar to Pahalgam (Valley of Shepherds)', desc: 'Drive to Pahalgam via saffron fields. Visit Betaab Valley, Aru Valley & Chandanwari.' },
    { day: 'Day 5', title: 'Sonmarg Day Excursion', desc: 'Trip to Sonmarg (Meadow of Gold) & Thajiwas Glacier pony ride.' },
    { day: 'Day 6', title: 'Shopping & Srinagar Departure', desc: 'Dry fruit & Kashmiri handicraft shopping, airport drop with unforgettable memories.' }
  ],
  'bali': [
    { day: 'Day 1', title: 'Bali Airport Arrival & Villa Check-in', desc: 'Flower garland welcome at Denpasar Airport, transfer to luxury pool villa.' },
    { day: 'Day 2', title: 'Kintamani Volcano & Ubud Swing Tour', desc: 'Visit Kintamani volcano, Tegalalang rice terraces, Ubud monkey forest & famous Bali swing.' },
    { day: 'Day 3', title: 'Water Sports & Sunset Uluwatu Temple', desc: 'Banana boat & parasailing at Tanjung Benoa, evening Kecak dance at Uluwatu Temple.' },
    { day: 'Day 4', title: 'Nusa Penida Island Tour', desc: 'Speedboat transfer to Nusa Penida. Visit Kelingking T-Rex Beach & Angel Billabong.' },
    { day: 'Day 5', title: 'Spa & Departure', desc: 'Balinese massage session, souvenir shopping, and airport transfer.' }
  ],
  'default': [
    { day: 'Day 1', title: 'Arrival & Welcome Transfer', desc: 'Pickup from Airport/Station, check-in to pre-booked hotel, evening leisure & local market exploration.' },
    { day: 'Day 2', title: 'Full Day Guided Sightseeing', desc: 'Breakfast at hotel, visit top attractions, iconic landmarks, and cultural spots with private cab driver.' },
    { day: 'Day 3', title: 'Excursion & Adventure Activities', desc: 'Full day outdoor excursion, adventure sports, scenic viewpoints, and photography stops.' },
    { day: 'Day 4', title: 'Leisure & Shopping', desc: 'Local market shopping, authentic cuisine dining, and relaxed evening.' },
    { day: 'Day 5', title: 'Check-out & Farewell Departure', desc: 'Breakfast, check-out from hotel, souvenir pickup and drop transfer to Station/Airport.' }
  ]
};

function getItineraryForPackage(pkgName) {
  const nameLower = (pkgName || '').toLowerCase();
  if (nameLower.includes('char dham') || nameLower.includes('dham')) return vjItineraryDatabase['char dham'];
  if (nameLower.includes('kashmir')) return vjItineraryDatabase['kashmir'];
  if (nameLower.includes('bali')) return vjItineraryDatabase['bali'];
  return vjItineraryDatabase['default'];
}

// Open Booking & Itinerary Modal

function openBooking(id, name, price, duration, category) {
  const pkgName = encodeURIComponent(name || 'Travel Package');
  const pkgPrice = encodeURIComponent(price || 0);
  const pkgDur = encodeURIComponent(duration || '');
  window.location.href = '/booking?pkg=' + pkgName + '&price=' + pkgPrice + '&duration=' + pkgDur;
}

async function openBookingModal(pkgId, name, price, duration, category) {
  vjCurrentStep = 1;
  hideError();
  
  vjCurrentPkg = {
    id: pkgId || 1,
    name: name || 'Custom Travel Package',
    price: price || 15000,
    duration: duration || '5D / 4N',
    category: category || 'domestic'
  };

  const titleEl = document.getElementById('vjModalPkgTitle');
  const metaEl = document.getElementById('vjModalPkgMeta');
  if (titleEl) titleEl.textContent = vjCurrentPkg.name;
  if (metaEl) metaEl.textContent = `${vjCurrentPkg.duration} • Starting ₹${Number(vjCurrentPkg.price).toLocaleString('en-IN')}`;

  const modal = document.getElementById('vjBookingModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  // Pre-fill tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateInput = document.getElementById('vjInputDate');
  if (dateInput && !dateInput.value) {
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  showStep(1);
}

function closeBookingModal() {
  const modal = document.getElementById('vjBookingModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function showStep(stepNum) {
  vjCurrentStep = stepNum;
  const s1 = document.getElementById('vjStep1');
  const s2 = document.getElementById('vjStep2');
  const s3 = document.getElementById('vjStep3');

  if (s1) s1.style.display = stepNum === 1 ? 'block' : 'none';
  if (s2) s2.style.display = stepNum === 2 ? 'block' : 'none';
  if (s3) s3.style.display = stepNum === 3 ? 'block' : 'none';
}

// Handle Form Submission (Collect Name, Phone, Location & Show Itinerary)
function handleDetailsSubmit(e) {
  if (e) e.preventDefault();
  hideError();

  const name = (document.getElementById('vjInputName')?.value || '').trim();
  const phone = (document.getElementById('vjInputPhone')?.value || '').trim();
  const location = (document.getElementById('vjInputCity')?.value || document.getElementById('vjInputPickup')?.value || '').trim();
  const travelDate = document.getElementById('vjInputDate')?.value || '';
  const adults = document.getElementById('vjSelectAdults')?.value || '2';
  const children = document.getElementById('vjSelectChildren')?.value || '0';

  if (!name || !phone) {
    showError('Please enter your Full Name and Mobile Phone Number.');
    return;
  }
  if (phone.length < 10) {
    showError('Please enter a valid 10-digit mobile number.');
    return;
  }

  vjUserData = {
    name,
    phone,
    location: location || 'Delhi NCR',
    travelDate,
    adults,
    children,
    pkgName: vjCurrentPkg.name,
    duration: vjCurrentPkg.duration,
    price: vjCurrentPkg.price
  };

  // Save Inquiry lead to local storage / admin store
  try {
    let existing = JSON.parse(localStorage.getItem('vj_admin_inquiries') || '[]');
    existing.unshift({
      id: 'INQ-' + Math.floor(1000 + Math.random() * 9000),
      ...vjUserData,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('vj_admin_inquiries', JSON.stringify(existing));
  } catch(err) {}

  // Render Package Itinerary View
  renderItineraryScreen();
  showStep(2);
}

function renderItineraryScreen() {
  const container = document.getElementById('vjItineraryContent');
  if (!container) return;

  const itineraryList = getItineraryForPackage(vjUserData.pkgName);

  let html = `
    <div style="background:linear-gradient(135deg, #0d1f3c 0%, #1a2b4c 100%); color:#fff; padding:1.2rem; border-radius:16px; margin-bottom:1.2rem; border:1px solid rgba(201,165,74,0.4);">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(201,165,74,0.2); padding-bottom:0.6rem; margin-bottom:0.8rem;">
        <div>
          <span style="font-size:0.7rem; color:#c9a54a; text-transform:uppercase; font-weight:700; letter-spacing:1.5px;">CUSTOMER DETAILS</span>
          <h4 style="font-size:1.1rem; color:#fff; margin-top:2px;">${vjUserData.name}</h4>
        </div>
        <div style="text-align:right;">
          <span style="font-size:0.75rem; color:#dcdcdc; display:block;">📞 ${vjUserData.phone}</span>
          <span style="font-size:0.75rem; color:#c9a54a; display:block;">📍 ${vjUserData.location}</span>
        </div>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:#e0e0e0;">
        <span>🗓 Travel Date: <strong>${vjUserData.travelDate || 'Flexible'}</strong></span>
        <span>👥 Guests: <strong>${vjUserData.adults} Adult(s)${vjUserData.children > 0 ? ', ' + vjUserData.children + ' Child' : ''}</strong></span>
      </div>
    </div>

    <div style="margin-bottom:1.5rem;">
      <h4 style="font-family:'Cormorant Garamond',serif; font-size:1.5rem; color:#0d1f3c; margin-bottom:0.8rem; font-weight:700;">
        📍 Detailed Day-by-Day Itinerary
      </h4>
      <div style="display:flex; flex-direction:column; gap:0.8rem;">
  `;

  itineraryList.forEach(item => {
    html += `
      <div style="background:#f8f6f0; border-left:4px solid #c9a54a; padding:0.9rem 1.1rem; border-radius:0 12px 12px 0;">
        <span style="font-size:0.72rem; font-weight:800; color:#c9a54a; text-transform:uppercase; letter-spacing:1px; display:block; margin-bottom:2px;">${item.day}</span>
        <h5 style="font-size:0.98rem; font-weight:700; color:#0d1f3c; margin-bottom:4px;">${item.title}</h5>
        <p style="font-size:0.85rem; color:#4a5568; margin:0; line-height:1.4;">${item.desc}</p>
      </div>
    `;
  });

  html += `
      </div>
    </div>

    <div style="background:#f0f7ff; border:1px solid #bfdbfe; border-radius:14px; padding:1rem; margin-bottom:1.5rem;">
      <h5 style="font-size:0.9rem; font-weight:700; color:#1e40af; margin-bottom:0.4rem;">✨ Package Inclusions Included:</h5>
      <ul style="font-size:0.82rem; color:#1e3a8a; margin:0; padding-left:1.2rem; line-height:1.6;">
        <li>Private AC Vehicle Transfer for complete tour duration</li>
        <li>Pre-booked Luxury Hotel / Resort accommodation</li>
        <li>Complimentary Daily Breakfast & Dinner meals</li>
        <li>VIP Darshan & Temple Entry assistance (where applicable)</li>
        <li>24/7 Dedicated Vishit Journey Trip Manager Support</li>
      </ul>
    </div>
  `;

  container.innerHTML = html;

  // Set WhatsApp action link
  const waBtn = document.getElementById('vjItineraryWABtn');
  if (waBtn) {
    const text = `Hi Vishit Journey, I filled out my details for ${vjUserData.pkgName}.

*Name:* ${vjUserData.name}
*Phone:* ${vjUserData.phone}
*Location:* ${vjUserData.location}
*Travel Date:* ${vjUserData.travelDate}

Please share customized quotes & PDF itinerary!`;
    waBtn.href = `https://wa.me/919899902890?text=${encodeURIComponent(text)}`;
  }
}

// Download Itinerary as Clean PDF / Printable Sheet
function downloadItineraryPDF() {
  if (!vjUserData || !vjUserData.name) {
    alert('Please fill out your details first.');
    return;
  }

  const itineraryList = getItineraryForPackage(vjUserData.pkgName);
  
  let daysHtml = '';
  itineraryList.forEach(item => {
    daysHtml += `
      <div style="margin-bottom: 12px; padding: 10px 14px; background: #f9f9f9; border-left: 4px solid #c9a54a; border-radius: 4px;">
        <strong style="color: #c9a54a; font-size: 11px; text-transform: uppercase;">${item.day}</strong>
        <h4 style="margin: 2px 0 4px; color: #0d1f3c; font-size: 14px;">${item.title}</h4>
        <p style="margin: 0; color: #555; font-size: 12px; line-height: 1.4;">${item.desc}</p>
      </div>
    `;
  });

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Vishit Journey - ${vjUserData.pkgName} Itinerary</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 25px; color: #333; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #c9a54a; padding-bottom: 15px; margin-bottom: 20px; }
        .brand { font-size: 24px; font-weight: bold; color: #0d1f3c; }
        .brand span { color: #c9a54a; }
        .sub { font-size: 12px; color: #666; }
        .box { background: #0d1f3c; color: #fff; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        .box-grid { display: flex; justify-content: space-between; font-size: 13px; margin-top: 8px; }
        h3 { color: #0d1f3c; margin-top: 20px; border-bottom: 1px solid #ddd; padding-bottom: 6px; }
        .footer { margin-top: 30px; border-top: 1px solid #ddd; padding-top: 12px; font-size: 11px; color: #777; text-align: center; }
        @media print { body { padding: 0; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="brand">VISHIT <span>JOURNEY</span></div>
          <div class="sub">Travel Beyond Limits | Luxury Tour Packages</div>
        </div>
        <div style="text-align: right; font-size: 12px;">
          <strong>Call / WhatsApp:</strong> +91 98999 02890<br>
          <strong>Website:</strong> www.vishitjourney.com
        </div>
      </div>

      <div class="box">
        <div style="font-size: 18px; font-weight: bold; color: #e4c06e;">${vjUserData.pkgName}</div>
        <div style="font-size: 12px; color: #ccc;">Duration: ${vjUserData.duration} • Starting ₹${Number(vjUserData.price).toLocaleString('en-IN')}</div>
        <div class="box-grid">
          <div><strong>Customer Name:</strong> ${vjUserData.name}</div>
          <div><strong>Phone:</strong> ${vjUserData.phone}</div>
          <div><strong>Starting City:</strong> ${vjUserData.location}</div>
          <div><strong>Travel Date:</strong> ${vjUserData.travelDate || 'Flexible'}</div>
        </div>
      </div>

      <h3>Detailed Day-by-Day Itinerary Plan</h3>
      ${daysHtml}

      <h3>Package Inclusions</h3>
      <ul style="font-size: 12px; line-height: 1.6; color: #444;">
        <li>Private AC Vehicle for complete tour transfers</li>
        <li>Luxury Hotel / Resort Accommodation</li>
        <li>Daily Breakfast & Dinner</li>
        <li>Sightseeing & VIP Darshan Assistance</li>
        <li>24/7 Dedicated Trip Manager Support</li>
      </ul>

      <div class="footer">
        Vishit Journey • Office on 1st Floor, Plot No. 2, Metro Pillar 786, Uttam Nagar, New Delhi • Helpline: +91 98999 02890
      </div>

      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

function showError(msg) {
  const el = document.getElementById('vjModalError');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}

function hideError() {
  const el = document.getElementById('vjModalError');
  if (el) { el.style.display = 'none'; }
}


// Attach global window functions for 100% reliable click execution
window.openBooking = openBooking;
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
window.handleDetailsSubmit = handleDetailsSubmit;
window.downloadItineraryPDF = downloadItineraryPDF;
window.showStep = showStep;
