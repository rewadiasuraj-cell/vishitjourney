const fs = require('fs');

console.log('Building non-stop infinite horizontal review marquee slider with 13 customer reviews & DP photos...');

const reviews = [
  {
    name: 'Rahul Kumar',
    loc: 'Delhi → Kashmir',
    text: 'Vishit Journey made our Kashmir trip absolutely magical. The Innova was spotless, driver was professional, and every hotel was perfectly arranged.',
    dp: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80'
  },
  {
    name: 'Priya Sharma',
    loc: 'Corporate Trip • Shimla',
    text: 'Booked a group bus for 25 people to Shimla. Best decision ever! The bus was luxurious, on time, and the team handled everything perfectly.',
    dp: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80'
  },
  {
    name: 'Anjali & Mohit',
    loc: 'Honeymoon • Dubai',
    text: 'Honeymoon in Dubai planned by Vishit was beyond our expectations. Visa, flights, hotel, cab — everything was sorted. Pure luxury at great price!',
    dp: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80'
  },
  {
    name: 'Vikram Singh',
    loc: 'Adventure • Leh Ladakh',
    text: 'The Leh Ladakh cab package with Vishit Journey was mind-blowing! Extremely reliable SUV, experienced mountain driver, and top-class stays.',
    dp: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80'
  },
  {
    name: 'Sneha Roy',
    loc: 'Family Vacation • Goa',
    text: 'We booked a 4-day Goa family package. Super smooth pickup from airport, beautiful beachside resort, and very polite driver. 10/10 recommended!',
    dp: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80'
  },
  {
    name: 'Amit Patel',
    loc: 'Heritage Tour • Rajasthan',
    text: 'Organized a 7-day Rajasthan tour for my family. The Tempo Traveller was super comfortable with AC and recliner seats. Exceptional service!',
    dp: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80'
  },
  {
    name: 'Neha Verma',
    loc: 'Friends Trip • Manali',
    text: 'Our Manali trip with Vishit Journey was unforgettable! Snow activities, Solang Valley cab, hotel with mountain view — everything was flawless.',
    dp: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80'
  },
  {
    name: 'Rohan Gupta',
    loc: 'Weekend Rafting • Rishikesh',
    text: 'Quick weekend getaway to Rishikesh for river rafting & camping. Vishit Journey arranged everything in just 2 hours! Unbelievable speed & hospitality.',
    dp: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80'
  },
  {
    name: 'Kavita Joshi',
    loc: 'Nature Tour • Kerala',
    text: 'Kerala Backwaters & Munnar tea gardens tour was heavenly. The houseboat arrangement by Vishit Journey was the highlight of our vacation.',
    dp: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80'
  },
  {
    name: 'Sandeep Malhotra',
    loc: 'Golden Triangle • Agra & Jaipur',
    text: 'Booked a sedan cab for Delhi-Agra-Jaipur. Driver Ramesh ji was punctual, knowledgeable, and drove very safely. Highly satisfied with Vishit!',
    dp: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80'
  },
  {
    name: 'Megha Saxena',
    loc: 'International • Thailand',
    text: 'Phuket & Bangkok tour arranged seamlessly. Zero hassle with transfers or bookings. Vishit Journey is our go-to travel partner now!',
    dp: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80'
  },
  {
    name: 'Kunal & Swati',
    loc: 'Honeymoon • Maldives',
    text: 'Our dream Maldives water villa honeymoon became a reality thanks to Vishit Journey. Special candle light dinner and sunset cruise were included!',
    dp: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80'
  },
  {
    name: 'Rajesh Agarwal',
    loc: 'Family Bus Trip • Himachal',
    text: 'Booked a luxury bus for our extended family trip to Himachal. Spotless vehicle, polite staff, and clear pricing with no hidden charges.',
    dp: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80'
  }
];

function generateReviewCard(r) {
  return `
    <div class="testi-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="stars" style="color:#c9a54a;font-size:0.9rem">★★★★★</div>
        <div style="color:rgba(201,165,74,0.3);font-size:1.5rem;font-family:serif">“</div>
      </div>
      <p class="testi-text" style="font-size:0.85rem;color:rgba(255,255,255,0.8);line-height:1.6;margin:0.8rem 0;height:4.2rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">${r.text}</p>
      <div class="testi-author" style="display:flex;align-items:center;gap:0.8rem;margin-top:1rem">
        <img src="${r.dp}" alt="${r.name}" class="testi-avatar-img">
        <div>
          <div class="testi-name" style="font-size:0.85rem;font-weight:600;color:#ffffff">${r.name}</div>
          <div class="testi-loc" style="font-size:0.7rem;color:#c9a54a">${r.loc}</div>
        </div>
      </div>
    </div>`;
}

// Build cards HTML (set 1 + duplicated set 2 for seamless infinite marquee loop)
const cardsSet = reviews.map(generateReviewCard).join('\n');
const marqueeHtml = `
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
      ${cardsSet}
      ${cardsSet}
    </div>
  </div>
</section>`;

const phpFile = 'd:/vishit-journeys/index.php';
if (fs.existsSync(phpFile)) {
  let content = fs.readFileSync(phpFile, 'utf8');

  // Replace old testimonials section
  content = content.replace(/<section class="testimonials">[^]*?<\/section>/gi, marqueeHtml);

  // Inject Marquee CSS animation rules
  const marqueeCss = `
  /* INFINITE REVIEWS HORIZONTAL MARQUEE SLIDER */
  .testi-marquee-wrapper {
    overflow: hidden !important;
    width: 100% !important;
    position: relative !important;
    padding: 1rem 0 !important;
  }
  .testi-marquee-wrapper::before,
  .testi-marquee-wrapper::after {
    content: '' !important;
    position: absolute !important;
    top: 0 !important;
    bottom: 0 !important;
    width: 120px !important;
    z-index: 2 !important;
    pointer-events: none !important;
  }
  .testi-marquee-wrapper::before {
    left: 0 !important;
    background: linear-gradient(to right, var(--navy2), transparent) !important;
  }
  .testi-marquee-wrapper::after {
    right: 0 !important;
    background: linear-gradient(to left, var(--navy2), transparent) !important;
  }
  .testi-marquee-track {
    display: flex !important;
    gap: 1.5rem !important;
    width: max-content !important;
    animation: marqueeScroll 60s linear infinite !important;
  }
  .testi-marquee-track:hover {
    animation-play-state: paused !important;
  }
  @keyframes marqueeScroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .testi-card {
    width: 360px !important;
    flex-shrink: 0 !important;
    background: var(--navy) !important;
    border: 1px solid rgba(201, 165, 74, 0.25) !important;
    border-radius: 20px !important;
    padding: 1.6rem !important;
    transition: transform 0.3s ease, border-color 0.3s ease !important;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25) !important;
  }
  .testi-card:hover {
    transform: translateY(-5px) !important;
    border-color: var(--gold) !important;
  }
  .testi-avatar-img {
    width: 48px !important;
    height: 48px !important;
    border-radius: 50% !important;
    object-fit: cover !important;
    border: 2px solid var(--gold) !important;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3) !important;
    flex-shrink: 0 !important;
  }
`;

  if (!content.includes('INFINITE REVIEWS HORIZONTAL MARQUEE SLIDER')) {
    content = content.replace('/* ALL SHAPES CURVED STYLING */', marqueeCss + '\n  /* ALL SHAPES CURVED STYLING */');
  }

  fs.writeFileSync(phpFile, content, 'utf8');
  console.log('Updated index.php with infinite review marquee slider & DP photos!');
}

// Update build_clean_static_site.js to ensure the review marquee HTML is injected into static HTML builds
const buildScript = 'd:/vishit-journeys/build_clean_static_site.js';
if (fs.existsSync(buildScript)) {
  let scriptContent = fs.readFileSync(buildScript, 'utf8');
  if (!scriptContent.includes('testi-marquee-track')) {
    scriptContent = scriptContent.replace(
      '// Inject filterByDestination JS if missing',
      '// Replace Testimonials section with infinite marquee slider\nhtml = html.replace(/<section class="testimonials">[^]*?<\\/section>/gi, `' + marqueeHtml.replace(/`/g, '\\`') + '`);\n\n// Inject filterByDestination JS if missing'
    );
    fs.writeFileSync(buildScript, scriptContent, 'utf8');
    console.log('Updated build_clean_static_site.js!');
  }
}
