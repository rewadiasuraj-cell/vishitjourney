const fs = require('fs');
const path = require('path');

// 18 Packages dataset from database.sql
const packages = [
  { id: 1, name: 'Dubai Luxury Package', category: 'international', duration: '5D / 4N', price: 39999, price_label: 'per person', highlights: ['Burj Khalifa Visit','Desert Safari','Luxury Hotel Stay','Airport Transfers'], image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', badge: 'INTERNATIONAL' },
  { id: 2, name: 'Thailand Holiday Package', category: 'international', duration: '6D / 5N', price: 29999, price_label: 'per person', highlights: ['Bangkok & Pattaya Tour','Coral Island Visit','Hotel with Breakfast','Private Transfers'], image_url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80', badge: 'INTERNATIONAL' },
  { id: 3, name: 'Bali Honeymoon Package', category: 'honeymoon', duration: '5D / 4N', price: 44999, price_label: 'per couple', highlights: ['Private Villa Stay','Romantic Candle Light Dinner','Water Sports','Ubud Sightseeing'], image_url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', badge: 'HONEYMOON' },
  { id: 4, name: 'Maldives Luxury Package', category: 'honeymoon', duration: '5D / 4N', price: 49999, price_label: 'per person', highlights: ['Luxury Water Villa Stay','Speed Boat Transfers','All Meals Included','Private Beach'], image_url: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80', badge: 'PREMIUM' },
  { id: 5, name: 'Kashmir Paradise Package', category: 'hills', duration: '6D / 5N', price: 14999, price_label: 'per person', highlights: ['Srinagar Houseboat Stay','Gulmarg Gondola Ride','Pahalgam & Sonmarg Tour','Breakfast & Dinner'], image_url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80"pkg2" data-cat="${cats}">
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

const phpContent = fs.readFileSync('d:/vishit-journeys/index.php', 'utf8');
const htmlStartIndex = phpContent.indexOf('<!DOCTYPE html>');
let html = phpContent.substring(htmlStartIndex);

// Replace PHP package loop
const pkgLoopStart = html.indexOf('<?php foreach($packages_raw as $p):');
if (pkgLoopStart !== -1) {
  const pkgLoopEnd = html.indexOf('<?php endforeach; ?>', pkgLoopStart);
  if (pkgLoopEnd !== -1) {
    const staticCardsHtml = generatePackageCardsHtml(packages);
    html = html.substring(0, pkgLoopStart) + staticCardsHtml + '\n' + html.substring(pkgLoopEnd + '<?php endforeach; ?>'.length);
    console.log('Replaced PHP package loop with 18 static package cards!');
  }
} else {
  console.log('PHP package loop start marker not found');
}

// Update Title tag
html = html.replace(/<title>.*?<\/title>/gi, '<title>Vishit Journey — Travel Beyond Limits</title>');

// Update Address in Footer
html = html.replace(/📍\s*Your City, India/g, '📍 1st Floor Plot no. 2 Metro Pillar 786 Dwarka Mor New Delhi.');
html = html.replace(/📍\s*Delhi, Dwarka/g, '📍 1st Floor Plot no. 2 Metro Pillar 786 Dwarka Mor New Delhi.');

// Replace Testimonials section with infinite marquee slider
html = html.replace(/<section class="testimonials">[^]*?<\/section>/gi, `
<!-- TESTIMONIALS (NON-STOP INFINITE MARQUEE SLIDER) -->
<section class="testimonials" id="reviews" style="overflow:hidden;padding:4rem 0">
  <div style="text-align:center;margin-bottom:2.5rem">
    <div class="section-tag">✦ What Our Travellers Say</div>
    <h2 class="section-title">Real <em>Journey</em>, Real Smiles</h2>
    <div class="gold-line" style="margin:1rem auto"></div>
    <p class="section-sub" style="margin:0 auto">Trusted by 10,000+ happy travellers across India & Worldwide</p>
  </div>

  <div class="testi-marquee-wrapper">
    <div class="testi-marquee-track">
      
    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Vishit Journey made our Kashmir trip absolutely magical. The Innova was spotless, driver was professional, and every hotel was perfectly arranged.</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" alt="Rahul Kumar" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Rahul Kumar</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Delhi → Kashmir</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Booked a group bus for 25 people to Shimla. Best decision ever! The bus was luxurious, on time, and the team handled everything perfectly.</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80" alt="Priya Sharma" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Priya Sharma</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Corporate Trip • Shimla</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Honeymoon in Dubai planned by Vishit was beyond our expectations. Visa, flights, hotel, cab — everything was sorted. Pure luxury at great price!</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80" alt="Anjali & Mohit" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Anjali & Mohit</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Honeymoon • Dubai</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">The Leh Ladakh cab package with Vishit Journey was mind-blowing! Extremely reliable SUV, experienced mountain driver, and top-class stays.</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80" alt="Vikram Singh" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Vikram Singh</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Adventure • Leh Ladakh</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">We booked a 4-day Goa family package. Super smooth pickup from airport, beautiful beachside resort, and very polite driver. 10/10 recommended!</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80" alt="Sneha Roy" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Sneha Roy</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Family Vacation • Goa</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Organized a 7-day Rajasthan tour for my family. The Tempo Traveller was super comfortable with AC and recliner seats. Exceptional service!</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80" alt="Amit Patel" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Amit Patel</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Heritage Tour • Rajasthan</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Our Manali trip with Vishit Journey was unforgettable! Snow activities, Solang Valley cab, hotel with mountain view — everything was flawless.</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80" alt="Neha Verma" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Neha Verma</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Friends Trip • Manali</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Quick weekend getaway to Rishikesh for river rafting & camping. Vishit Journey arranged everything in just 2 hours! Unbelievable speed & hospitality.</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80" alt="Rohan Gupta" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Rohan Gupta</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Weekend Rafting • Rishikesh</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Kerala Backwaters & Munnar tea gardens tour was heavenly. The houseboat arrangement by Vishit Journey was the highlight of our vacation.</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80" alt="Kavita Joshi" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Kavita Joshi</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Nature Tour • Kerala</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Booked a sedan cab for Delhi-Agra-Jaipur. Driver Ramesh ji was punctual, knowledgeable, and drove very safely. Highly satisfied with Vishit!</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80" alt="Sandeep Malhotra" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Sandeep Malhotra</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Golden Triangle • Agra & Jaipur</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Phuket & Bangkok tour arranged seamlessly. Zero hassle with transfers or bookings. Vishit Journey is our go-to travel partner now!</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80" alt="Megha Saxena" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Megha Saxena</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">International • Thailand</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Our dream Maldives water villa honeymoon became a reality thanks to Vishit Journey. Special candle light dinner and sunset cruise were included!</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80" alt="Kunal & Swati" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Kunal & Swati</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Honeymoon • Maldives</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Booked a luxury bus for our extended family trip to Himachal. Spotless vehicle, polite staff, and clear pricing with no hidden charges.</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80" alt="Rajesh Agarwal" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Rajesh Agarwal</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Family Bus Trip • Himachal</div>
        </div>
      </div>
    </div>
      
    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Vishit Journey made our Kashmir trip absolutely magical. The Innova was spotless, driver was professional, and every hotel was perfectly arranged.</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" alt="Rahul Kumar" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Rahul Kumar</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Delhi → Kashmir</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Booked a group bus for 25 people to Shimla. Best decision ever! The bus was luxurious, on time, and the team handled everything perfectly.</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80" alt="Priya Sharma" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Priya Sharma</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Corporate Trip • Shimla</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Honeymoon in Dubai planned by Vishit was beyond our expectations. Visa, flights, hotel, cab — everything was sorted. Pure luxury at great price!</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80" alt="Anjali & Mohit" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Anjali & Mohit</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Honeymoon • Dubai</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">The Leh Ladakh cab package with Vishit Journey was mind-blowing! Extremely reliable SUV, experienced mountain driver, and top-class stays.</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80" alt="Vikram Singh" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Vikram Singh</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Adventure • Leh Ladakh</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">We booked a 4-day Goa family package. Super smooth pickup from airport, beautiful beachside resort, and very polite driver. 10/10 recommended!</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80" alt="Sneha Roy" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Sneha Roy</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Family Vacation • Goa</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Organized a 7-day Rajasthan tour for my family. The Tempo Traveller was super comfortable with AC and recliner seats. Exceptional service!</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80" alt="Amit Patel" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Amit Patel</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Heritage Tour • Rajasthan</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Our Manali trip with Vishit Journey was unforgettable! Snow activities, Solang Valley cab, hotel with mountain view — everything was flawless.</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80" alt="Neha Verma" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Neha Verma</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Friends Trip • Manali</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Quick weekend getaway to Rishikesh for river rafting & camping. Vishit Journey arranged everything in just 2 hours! Unbelievable speed & hospitality.</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80" alt="Rohan Gupta" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Rohan Gupta</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Weekend Rafting • Rishikesh</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Kerala Backwaters & Munnar tea gardens tour was heavenly. The houseboat arrangement by Vishit Journey was the highlight of our vacation.</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80" alt="Kavita Joshi" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Kavita Joshi</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Nature Tour • Kerala</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Booked a sedan cab for Delhi-Agra-Jaipur. Driver Ramesh ji was punctual, knowledgeable, and drove very safely. Highly satisfied with Vishit!</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80" alt="Sandeep Malhotra" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Sandeep Malhotra</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Golden Triangle • Agra & Jaipur</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Phuket & Bangkok tour arranged seamlessly. Zero hassle with transfers or bookings. Vishit Journey is our go-to travel partner now!</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80" alt="Megha Saxena" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Megha Saxena</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">International • Thailand</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Our dream Maldives water villa honeymoon became a reality thanks to Vishit Journey. Special candle light dinner and sunset cruise were included!</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80" alt="Kunal & Swati" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Kunal & Swati</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Honeymoon • Maldives</div>
        </div>
      </div>
    </div>

    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">Booked a luxury bus for our extended family trip to Himachal. Spotless vehicle, polite staff, and clear pricing with no hidden charges.</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80" alt="Rajesh Agarwal" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">Rajesh Agarwal</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">Family Bus Trip • Himachal</div>
        </div>
      </div>
    </div>
    </div>
  </div>
</section>`);

// Inject filterByDestination JS if missing
if (!html.includes("function filterByDestination")) {
  const destJsScript = `<script>function filterByDestination(destKey){const destSelect=document.getElementById("searchDest");if(destSelect){destSelect.value=destKey;}if(typeof executePackageSearch==="function"){executePackageSearch();}}</script>`;
  html = html.replace("</body>", destJsScript + "\n</body>");
}

// Inject Header Curved Nav CSS
if (!html.includes("HEADER CURVED NAV BUTTONS")) {
  html = html.replace(".nav-links{", ".nav-links{gap:2.2rem!important;");
}

// Inject executePackageSearch JS if missing
if (!html.includes("function executePackageSearch()")) {
  const searchJsScript = `<script>function executePackageSearch(){const destSelect=document.getElementById("searchDest");const destVal=destSelect?destSelect.value.toLowerCase():"all";const pkgCards=document.querySelectorAll(".pkg2");let matchCount=0;document.querySelectorAll(".pkg-tab").forEach(t=>t.classList.remove("active"));pkgCards.forEach(card=>{const title=(card.querySelector("h3")?card.querySelector("h3").innerText:"").toLowerCase();const cats=(card.getAttribute("data-cat")||"").toLowerCase();const text=card.innerText.toLowerCase();if(destVal==="all"||title.includes(destVal)||cats.includes(destVal)||text.includes(destVal)){card.classList.remove("hidden");card.style.display="";matchCount++;}else{card.classList.add("hidden");card.style.display="none";}});const pkgSection=document.getElementById("packages");if(pkgSection){pkgSection.scrollIntoView({behavior:"smooth"});}}</script>`;
  html = html.replace("<!-- BOOKING MODAL -->", searchJsScript + "\n<!-- BOOKING MODAL -->");
}

// Inject Curved Shapes CSS
if (!html.includes("ALL SHAPES CURVED STYLING")) {
  html = html.replace(".search-bar{", ".search-bar{border-radius:30px!important;");
  html = html.replace(".search-btn{", ".search-btn{border-radius:0 30px 30px 0!important;");
}

// Replace Journeys text occurrences
html = html.replace(/✦ VISHIT JOURNEYS BOOKING/g, "✦ VISHIT JOURNEY BOOKING");
html = html.replace(/Vishit Journeys/g, "Vishit Journey");
html = html.replace(/Real <em>Journeys<\/em>/g, "Real <em>Journey<\/em>");

// Replace header and footer logos
html = html = html.replace(/(<div class="footer-brand">\s*<div[^>]*>\s*)<img src="[^"]*"[^>]*>(\s*<\/div>)/gi, `$1<img src="Vishit_Journey_Logo.jpg" alt="Vishit Journey" style="height:128px;width:auto;display:block">$2`);
html = html.replace(/(<a href="#" class="logo">\s*)[^]*?(<\/a>)/i, `$1<img src="Vishit_Journey_Logo.jpg" alt="Vishit Journey" style="height:104px;width:auto;display:block;">$2`);


const targetFiles = [
  'd:/vishit-journeys/Vishit Journey.html',
  'd:/vishit-journeys/index.html',
  'd:/vishit-journeys/new update/index.html',
  'd:/vishit-journeys/new update/Vishit Journey.html',
  'd:/vishit-journeys/NEW CHAT/index.html'
];

targetFiles.forEach(filePath => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  if (filePath.includes('new update') || filePath.includes('NEW CHAT')) {
    const subLogoPath = path.join(dir, 'Vishit_Journey_Logo.jpg');
    fs.copyFileSync('d:/vishit-journeys/Vishit_Journey_Logo.jpg', subLogoPath);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Built clean static file:', filePath);
});

console.log('Done building static site with top logo & package cards restored!');
