const fs = require('fs');
const path = require('path');

const targetFiles = [
  'index.html',
  'Vishit Journey.html',
  'new update/index.html',
  'new update/Vishit Journey.html',
  'NEW CHAT/index.html'
];

const vjOffersSectionHTML = `<!-- EXCLUSIVE OFFERS & DISCOUNTS (DYNAMIC VJ OFFER CAROUSEL) -->
<section class="vj-offers-section" id="offers">
  
  <div class="vj-offers-header">
    <div class="vj-section-tag">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      LIMITED TIME SPECIAL OFFERS
    </div>
    <h2 class="vj-section-title">
      Exclusive <em>Offers &amp; Discounts</em>
    </h2>
    <div class="vj-gold-line"></div>
    <p class="vj-section-sub">Book your dream holiday package today and save big with active promo codes &amp; VIP perks!</p>
  </div>

  <!-- 100% EDGE-TO-EDGE CAROUSEL WRAPPER -->
  <div class="vj-carousel-wrapper">
    <!-- Navigation Buttons -->
    <button class="vj-nav-btn vj-nav-prev" onclick="vjScrollOffers(-1)" aria-label="Previous Offer">‹</button>
    <button class="vj-nav-btn vj-nav-next" onclick="vjScrollOffers(1)" aria-label="Next Offer">›</button>

    <!-- Edge-to-Edge Dynamic Track -->
    <div id="vjOffersTrack" class="vj-offers-track" onmouseenter="vjPauseOffers()" onmouseleave="vjResumeOffers()">
      <!-- Cards rendered dynamically via JavaScript -->
    </div>
  </div>

  <!-- Floating Toast for Promo Claim -->
  <div id="vjClaimToast" class="vj-claim-toast">
    <div class="vj-toast-icon">✨</div>
    <div class="vj-toast-content">
      <div class="vj-toast-title">Promo Code Copied!</div>
      <div class="vj-toast-desc" id="vjToastDesc">Opening booking details...</div>
    </div>
  </div>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,600&family=Manrope:wght@500;600;700;800&display=swap');

    .vj-offers-section {
      padding: 4.5rem 0 3.5rem;
      width: 100%;
      max-width: 100vw;
      background: linear-gradient(180deg, #ffffff 0%, #f9f7f2 100%);
      border-bottom: 1px solid rgba(201,165,74,0.22);
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      font-family: 'Manrope', sans-serif;
    }

    .vj-offers-header {
      text-align: center;
      max-width: 850px;
      margin: 0 auto 2.5rem;
      padding: 0 1.2rem;
    }

    .vj-section-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(201,165,74,0.12);
      border: 1px solid rgba(201,165,74,0.4);
      color: #0d1f3c;
      padding: 0.45rem 1.4rem;
      border-radius: 24px;
      font-size: 0.76rem;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-family: 'Manrope', sans-serif;
    }

    .vj-section-title {
      font-family: 'Fraunces', 'Cormorant Garamond', serif;
      font-size: clamp(2.2rem, 3.8vw, 3.2rem);
      color: #0d1f3c;
      margin: 0.7rem 0 0;
      font-weight: 700;
      line-height: 1.2;
    }

    .vj-section-title em {
      font-style: italic;
      color: #c9a54a;
    }

    .vj-gold-line {
      width: 80px;
      height: 3px;
      background: linear-gradient(90deg, transparent, #c9a54a, transparent);
      margin: 0.9rem auto;
      border-radius: 2px;
    }

    .vj-section-sub {
      color: #5a6a85;
      font-size: 0.98rem;
      font-weight: 500;
      margin: 0 auto;
      line-height: 1.6;
    }

    .vj-carousel-wrapper {
      width: 100%;
      position: relative;
      overflow: hidden;
      padding: 1rem 0 1.8rem;
    }

    .vj-offers-track {
      display: flex;
      flex-wrap: nowrap;
      gap: 1.6rem;
      width: 100%;
      max-width: 100%;
      overflow-x: auto;
      scroll-behavior: auto;
      -webkit-overflow-scrolling: touch;
      padding: 1.8rem 2rem 2.2rem;
      scrollbar-width: none;
      -ms-overflow-style: none;
      box-sizing: border-box;
      cursor: grab;
    }

    .vj-offers-track::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
    }

    .vj-card {
      flex: 0 0 340px;
      min-width: 340px;
      max-width: 340px;
      background: #ffffff;
      border: 1.5px solid rgba(201,165,74,0.28);
      border-radius: 22px;
      padding: 1.4rem 1.3rem;
      box-shadow: 0 10px 30px rgba(13,31,60,0.06);
      display: flex;
      flex-direction: column;
      position: relative;
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
      box-sizing: border-box;
      user-select: none;
    }

    .vj-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 45px rgba(13,31,60,0.14);
      border-color: #c9a54a;
      z-index: 10;
    }

    .vj-card-badge {
      position: absolute;
      top: -12px;
      right: 18px;
      color: #ffffff;
      font-weight: 800;
      font-size: 0.64rem;
      padding: 0.32rem 0.95rem;
      border-radius: 20px;
      letter-spacing: 1px;
      text-transform: uppercase;
      white-space: nowrap;
      box-shadow: 0 4px 12px rgba(0,0,0,0.18);
      font-family: 'Manrope', sans-serif;
    }

    .vj-card-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 0.75rem;
      margin-top: 0.2rem;
    }

    .vj-card-icon {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(201,165,74,0.12);
      color: #c9a54a;
      flex-shrink: 0;
    }

    .vj-card-tagline {
      font-size: 0.68rem;
      color: #c9a54a;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }

    .vj-card-photo {
      width: 100%;
      height: 140px;
      border-radius: 14px;
      overflow: hidden;
      margin-bottom: 0.9rem;
      position: relative;
      background: #0d1f3c;
    }

    .vj-card-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.5s ease;
    }

    .vj-card:hover .vj-card-photo img {
      transform: scale(1.08);
    }

    .vj-card-title {
      font-family: 'Fraunces', 'Cormorant Garamond', serif;
      font-size: 1.22rem;
      font-weight: 700;
      color: #0d1f3c;
      margin: 0 0 0.45rem;
      line-height: 1.3;
    }

    .vj-card-desc {
      font-size: 0.84rem;
      color: #55657d;
      line-height: 1.55;
      margin: 0 0 0.9rem;
      flex-grow: 1;
    }

    /* 3-Pill Stats */
    .vj-card-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      margin-bottom: 1rem;
      padding: 0.5rem 0.6rem;
      background: #f8fafc;
      border-radius: 12px;
      border: 1px solid #eef2f6;
    }

    .vj-stat-item {
      text-align: center;
    }

    .vj-stat-val {
      font-size: 0.85rem;
      font-weight: 800;
      color: #0d1f3c;
      display: block;
      font-family: 'Fraunces', serif;
    }

    .vj-stat-lbl {
      font-size: 0.58rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #7b8a9e;
      font-weight: 700;
      display: block;
      margin-top: 1px;
    }

    /* Promo Claim Bar */
    .vj-card-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.6rem;
      background: #fdfbf7;
      padding: 0.65rem 0.85rem;
      border-radius: 14px;
      border: 1.5px dashed rgba(201,165,74,0.5);
      margin-top: auto;
      flex-shrink: 0;
    }

    .vj-promo-left {
      display: flex;
      flex-direction: column;
    }

    .vj-promo-lbl {
      font-size: 0.58rem;
      color: #7b8a9e;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 700;
    }

    .vj-promo-code {
      font-size: 0.92rem;
      font-weight: 800;
      color: #0d1f3c;
      font-family: monospace;
      letter-spacing: 1.5px;
    }

    .vj-claim-btn {
      padding: 0.55rem 1.15rem;
      font-size: 0.82rem;
      background: linear-gradient(135deg, #e4c06e, #c9a54a);
      color: #0d1f3c;
      font-weight: 800;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      font-family: 'Manrope', sans-serif;
      box-shadow: 0 4px 14px rgba(201,165,74,0.35);
      transition: all 0.2s ease;
    }

    .vj-claim-btn:hover {
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 6px 18px rgba(201,165,74,0.5);
      background: linear-gradient(135deg, #f0cf7e, #d8b255);
    }

    /* Navigation Arrows */
    .vj-nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 50;
      background: #ffffff;
      color: #c9a54a;
      border: 2px solid #c9a54a;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 20px rgba(0,0,0,0.18);
      transition: all 0.2s ease;
      font-family: serif;
    }

    .vj-nav-btn:hover {
      background: #c9a54a;
      color: #0d1f3c;
      transform: translateY(-50%) scale(1.1);
    }

    .vj-nav-prev { left: 16px; }
    .vj-nav-next { right: 16px; }

    /* Toast Notification */
    .vj-claim-toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #0d1f3c;
      color: #ffffff;
      border: 1.5px solid #c9a54a;
      border-radius: 16px;
      padding: 0.85rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.35);
      z-index: 999999;
      opacity: 0;
      pointer-events: none;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .vj-claim-toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
      pointer-events: auto;
    }

    .vj-toast-icon {
      font-size: 1.3rem;
    }

    .vj-toast-title {
      font-size: 0.9rem;
      font-weight: 800;
      color: #c9a54a;
    }

    .vj-toast-desc {
      font-size: 0.76rem;
      color: rgba(255,255,255,0.85);
    }

    @media (max-width: 768px) {
      .vj-offers-section {
        padding: 3rem 0 2.5rem;
      }
      .vj-card {
        flex: 0 0 295px;
        min-width: 295px;
        max-width: 295px;
        padding: 1.2rem 1.1rem;
      }
      .vj-offers-track {
        padding: 1.4rem 1rem 1.8rem;
        gap: 1.2rem;
      }
      .vj-nav-btn {
        width: 38px;
        height: 38px;
        font-size: 1.2rem;
      }
      .vj-nav-prev { left: 8px; }
      .vj-nav-next { right: 8px; }
    }
  </style>

  <script>
    const vjOffers = [
      {
        badge: "FLAT ₹2,000 OFF",
        badgeBg: "linear-gradient(135deg,#e4c06e,#c9a54a)",
        tagline: "FESTIVE SPECIAL",
        icon: "temple",
        photo: "assets/images/chardham_banner.jpg",
        title: "Char Dham Yatra<br>Early Bird",
        desc: "Book Char Dham 10D/9N package early and get ₹2,000 instant discount per family + VIP Darshan assistance included.",
        stats: [["10D/9N","Duration"],["₹2,000","Instant Off"],["VIP","Darshan"]],
        code: "CHARDHAM2000",
        pkgId: 11,
        pkgName: "Char Dham Yatra Package (Discounted ₹2,000 Off)",
        price: 18000,
        duration: "10D / 9N",
        cat: "domestic"
      },
      {
        badge: "20% GROUP DISCOUNT",
        badgeBg: "linear-gradient(135deg,#00c6ff,#0072ff)",
        tagline: "SEASONAL SALE",
        icon: "mountain",
        photo: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80",
        title: "Kashmir & Ladakh<br>Group Offer",
        desc: "Book for 4+ travellers and get flat 20% discount on total package + complimentary Shikara ride in Dal Lake.",
        stats: [["4+","Travelers"],["20% OFF","Package"],["FREE","Shikara Ride"]],
        code: "SUMMER20",
        pkgId: 5,
        pkgName: "Kashmir Paradise Package (20% Group Discount)",
        price: 15999,
        duration: "6D / 5N",
        cat: "domestic"
      },
      {
        badge: "FREE CANDLELIGHT DINNER",
        badgeBg: "linear-gradient(135deg,#ff6a00,#ee0979)",
        tagline: "ROMANTIC ESCAPE",
        icon: "heart",
        photo: "/uploads/packages/manali_honeymoon.jpg",
        title: "Manali Honeymoon<br>Special Perk",
        desc: "Free luxury room upgrade, complimentary romantic candlelight dinner & honeymoon cake setup on all couples packages.",
        stats: [["4D/3N","Duration"],["FREE","Candlelight"],["VIP","Room Upgrade"]],
        code: "HONEYMOONVIP",
        pkgId: 6,
        pkgName: "Manali Package (3N/4D - Honeymoon VIP)",
        price: 9680,
        duration: "4D / 3N",
        cat: "hills"
      },
      {
        badge: "FLAT 15% DISCOUNT",
        badgeBg: "linear-gradient(135deg,#f59e0b,#d97706)",
        tagline: "ROYAL HERITAGE",
        icon: "sun",
        photo: "/uploads/packages/rajasthan.jpg",
        title: "Rajasthan Royal<br>Heritage Deal",
        desc: "Get flat 15% discount on Rajasthan 8D/7N package + complimentary desert camel safari and cultural folk night in Jaisalmer.",
        stats: [["8D/7N","Duration"],["15% OFF","Heritage"],["FREE","Camel Safari"]],
        code: "RAJASTHAN15",
        pkgId: 14,
        pkgName: "Rajasthan Royal Package (7N/8D - 15% Off)",
        price: 23000,
        duration: "8D / 7N",
        cat: "domestic"
      },
      {
        badge: "FREE HOUSEBOAT UPGRADE",
        badgeBg: "linear-gradient(135deg,#10b981,#059669)",
        tagline: "GOD'S OWN COUNTRY",
        icon: "family",
        photo: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=600&q=80",
        title: "Kerala Backwaters<br>Luxury Escape",
        desc: "Book 6D/5N Kerala tour and get free luxury AC premium houseboat upgrade in Alleppey with authentic South Indian meals.",
        stats: [["6D/5N","Duration"],["FREE","Houseboat"],["ALL","Meals Incl."]],
        code: "KERALAVIP",
        pkgId: 16,
        pkgName: "Kerala Backwaters (5N/6D - Houseboat Upgrade)",
        price: 19250,
        duration: "6D / 5N",
        cat: "domestic"
      },
      {
        badge: "FREE 4x4 SUV UPGRADE",
        badgeBg: "linear-gradient(135deg,#8b5cf6,#6d28d9)",
        tagline: "ROADTRIP SPECIAL",
        icon: "mountain",
        photo: "/uploads/packages/leh_ladakh.jpg",
        title: "Spiti & Manali<br>Roadtrip Special",
        desc: "Get free 4x4 SUV vehicle upgrade + complimentary camping bonfire and stargazing session in Spiti Valley.",
        stats: [["6D/5N","Duration"],["FREE","4x4 SUV"],["FREE","Bonfire Night"]],
        code: "SPITI4X4",
        pkgId: 8,
        pkgName: "Kasol + Manali Combo (Roadtrip Special)",
        price: 8999,
        duration: "6D / 5N",
        cat: "hills"
      }
    ];

    function vjGetIconSVG(type) {
      switch(type) {
        case 'mountain':
          return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>';
        case 'sun':
          return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
        case 'heart':
          return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
        case 'family':
          return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>';
        case 'temple':
        default:
          return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2H13V15H11V2ZM5 4H7V10C7 11.6569 8.34315 13 10 13V15C7.23858 15 5 12.7614 5 10V4ZM19 4H17V10C17 11.6569 15.6569 13 14 13V15C16.7614 15 19 12.7614 19 10V4ZM11 17H13V22H11V17Z"/></svg>';
      }
    }

    function vjRenderOffers() {
      const track = document.getElementById('vjOffersTrack');
      if (!track) return;

      // Duplicate list for infinite smooth loop
      const combined = [...vjOffers, ...vjOffers];
      
      track.innerHTML = combined.map((item, idx) => {
        const originalIdx = idx % vjOffers.length;
        const statsHtml = item.stats.map(s => \`
          <div class="vj-stat-item">
            <span class="vj-stat-val">\${s[0]}</span>
            <span class="vj-stat-lbl">\${s[1]}</span>
          </div>
        \`).join('');

        return \`
          <div class="vj-card">
            <div class="vj-card-badge" style="background: \${item.badgeBg}">\${item.badge}</div>
            
            <div class="vj-card-header">
              <div class="vj-card-icon">\${vjGetIconSVG(item.icon)}</div>
              <span class="vj-card-tagline">\${item.tagline}</span>
            </div>

            <div class="vj-card-photo">
              <img src="\${item.photo}" alt="\${item.title.replace('<br>', ' ')}" loading="lazy">
            </div>

            <h3 class="vj-card-title">\${item.title}</h3>
            <p class="vj-card-desc">\${item.desc}</p>

            <div class="vj-card-stats">
              \${statsHtml}
            </div>

            <div class="vj-card-bottom">
              <div class="vj-promo-left">
                <span class="vj-promo-lbl">Promo Code</span>
                <span class="vj-promo-code">\${item.code}</span>
              </div>
              <button class="vj-claim-btn" onclick="vjClaim(\${originalIdx})">Claim Offer →</button>
            </div>
          </div>
        \`;
      }).join('');
    }

    function vjClaim(index) {
      const offer = vjOffers[index];
      if (!offer) return;

      // 1. Copy code to clipboard
      try {
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(offer.code);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = offer.code;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
      } catch(e) {}

      // 2. Show luxury toast
      const toast = document.getElementById('vjClaimToast');
      const toastDesc = document.getElementById('vjToastDesc');
      if (toast && toastDesc) {
        toastDesc.textContent = \`Promo code "\${offer.code}" applied! Opening booking...\`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
      }

      // 3. Open booking modal with pre-selected package & promo
      setTimeout(() => {
        if (typeof openBookingModal === 'function') {
          openBookingModal(offer.pkgId, offer.pkgName, offer.price, offer.duration, offer.cat);
        } else if (typeof openBooking === 'function') {
          openBooking(offer.pkgId, offer.pkgName, offer.price, offer.duration, offer.cat);
        } else {
          window.location.href = \`/booking?pkg=\${encodeURIComponent(offer.pkgName)}&price=\${offer.price}&duration=\${encodeURIComponent(offer.duration)}&promo=\${encodeURIComponent(offer.code)}\`;
        }

        const noteInput = document.getElementById('vjInputNotes') || document.getElementById('inputNotes');
        if (noteInput) {
          noteInput.value = \`Applied Promo Code: \${offer.code} (\${offer.badge})\`;
        }
      }, 250);
    }

    // Auto-Scroll Engine
    let vjOffersPaused = false;
    let vjOffersAnimId = null;
    let vjResumeTimer = null;

    function vjAutoScrollLoop() {
      const track = document.getElementById('vjOffersTrack');
      if (track && !vjOffersPaused) {
        track.scrollLeft += 1.0;
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0 && track.scrollLeft >= halfWidth - 2) {
          track.scrollLeft -= halfWidth;
        }
      }
      vjOffersAnimId = requestAnimationFrame(vjAutoScrollLoop);
    }

    function vjPauseOffers() {
      vjOffersPaused = true;
      if (vjResumeTimer) clearTimeout(vjResumeTimer);
    }

    function vjResumeOffers(delay = 0) {
      if (vjResumeTimer) clearTimeout(vjResumeTimer);
      if (delay > 0) {
        vjResumeTimer = setTimeout(() => {
          vjOffersPaused = false;
        }, delay);
      } else {
        vjOffersPaused = false;
      }
    }

    function vjScrollOffers(direction) {
      vjPauseOffers();
      const track = document.getElementById('vjOffersTrack');
      if (track) {
        const card = track.querySelector('.vj-card');
        const scrollAmount = (card ? card.offsetWidth : 340) + 26;
        track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
      }
      vjResumeOffers(3500);
    }

    document.addEventListener('DOMContentLoaded', () => {
      vjRenderOffers();
      
      const carouselWrap = document.querySelector('.vj-carousel-wrapper');
      const track = document.getElementById('vjOffersTrack');
      
      if (carouselWrap) {
        carouselWrap.addEventListener('mouseenter', vjPauseOffers);
        carouselWrap.addEventListener('mouseleave', () => vjResumeOffers(600));
        carouselWrap.addEventListener('touchstart', vjPauseOffers, { passive: true });
        carouselWrap.addEventListener('touchend', () => vjResumeOffers(2500), { passive: true });
      }

      if (track) {
        track.addEventListener('mouseenter', vjPauseOffers);
        track.addEventListener('mouseleave', () => vjResumeOffers(600));
      }
    });

    window.addEventListener('load', () => {
      if (vjOffersAnimId) cancelAnimationFrame(vjOffersAnimId);
      vjAutoScrollLoop();
    });
  </script>
</section>`;

targetFiles.forEach(relPath => {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace existing special-offers section or vj-offers-section
  content = content.replace(
    /<!-- EXCLUSIVE OFFERS & DISCOUNT[\s\S]*?<\/section>/i,
    vjOffersSectionHTML
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Integrated dynamic VJ Offer Carousel in:', relPath);
});
