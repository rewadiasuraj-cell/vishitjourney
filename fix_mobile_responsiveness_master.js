const fs = require('fs');
const path = require('path');

const targetFiles = [
  'index.html',
  'Vishit Journey.html',
  'new update/index.html',
  'new update/Vishit Journey.html',
  'NEW CHAT/index.html'
];

const masterMobileCSS = `
  <style id="vjUltimateMobileResponsiveEngine">
    /* ════════════════════════════════════════════════════════════
       VISHIT JOURNEY — MASTER MOBILE RESPONSIVE ENGINE
       (Flawless UX on 375px iPhone SE, 390px iPhone 12/13/14, 428px Pro Max & Tablets)
       ════════════════════════════════════════════════════════════ */

    /* 0. GLOBAL RESET & VIEWPORT INTEGRITY */
    *, *::before, *::after {
      box-sizing: border-box !important;
    }

    html, body {
      width: 100% !important;
      max-width: 100vw !important;
      overflow-x: hidden !important;
      position: relative !important;
      margin: 0 !important;
      padding: 0 !important;
      -webkit-text-size-adjust: 100% !important;
    }

    img, svg, video, iframe, canvas {
      max-width: 100% !important;
      height: auto;
    }

    /* 1. OFFERS & DISCOUNTS CAROUSEL (TOUCH SNAP UX) */
    .special-offers {
      width: 100% !important;
      max-width: 100vw !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
    }

    #vjOffersTrack {
      display: flex !important;
      flex-wrap: nowrap !important;
      gap: 1.2rem !important;
      width: 100% !important;
      max-width: 100% !important;
      overflow-x: auto !important;
      scroll-behavior: smooth !important;
      scroll-snap-type: x mandatory !important;
      -webkit-overflow-scrolling: touch !important;
      padding: 1.6rem 1rem 2rem !important;
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
      box-sizing: border-box !important;
    }

    #vjOffersTrack::-webkit-scrollbar {
      display: none !important;
    }

    .offer-card {
      scroll-snap-align: center !important;
      flex: 0 0 calc(100vw - 3rem) !important;
      min-width: 280px !important;
      max-width: 360px !important;
      width: calc(100vw - 3rem) !important;
      box-sizing: border-box !important;
      margin: 0 !important;
      position: relative !important;
    }

    @media (min-width: 769px) {
      .offer-card {
        flex: 0 0 350px !important;
        min-width: 350px !important;
        max-width: 350px !important;
        scroll-snap-align: start !important;
      }
    }

    /* 2. OFFICIAL PRICING TABLE — RESPONSIVE MOBILE LUXURY CARDS */
    @media (max-width: 768px) {
      #official-rate-and-faq {
        padding: 3rem 1rem !important;
        width: 100% !important;
        max-width: 100vw !important;
        box-sizing: border-box !important;
      }

      #official-rate-and-faq div[style*="overflow-x"],
      .vj-pricing-table-wrap {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        overflow-x: visible !important;
        padding: 0 !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }

      #official-rate-and-faq table,
      #official-rate-and-faq tbody,
      .vj-pricing-table {
        display: block !important;
        width: 100% !important;
        min-width: 0 !important;
      }

      #official-rate-and-faq thead {
        display: none !important;
      }

      #official-rate-and-faq tbody tr {
        display: flex !important;
        flex-direction: column !important;
        background: #FFFFFF !important;
        border: 1.5px solid rgba(201, 165, 74, 0.35) !important;
        border-radius: 18px !important;
        padding: 1.3rem 1.1rem !important;
        margin-bottom: 1.3rem !important;
        box-shadow: 0 8px 24px rgba(11, 27, 51, 0.06) !important;
        gap: 0.55rem !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }

      #official-rate-and-faq td {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding: 0.45rem 0 !important;
        border: none !important;
        border-bottom: 1px dashed rgba(201, 165, 74, 0.2) !important;
        font-size: 0.9rem !important;
        text-align: left !important;
        width: 100% !important;
        box-sizing: border-box !important;
        overflow-wrap: break-word !important;
        word-break: break-word !important;
      }

      #official-rate-and-faq td:first-child {
        font-size: 1.15rem !important;
        font-weight: 800 !important;
        color: #0B1B33 !important;
        padding-bottom: 0.6rem !important;
        border-bottom: 1.5px solid rgba(201, 165, 74, 0.35) !important;
      }

      #official-rate-and-faq td:nth-child(2)::before {
        content: "Duration:";
        font-weight: 700;
        color: #5F6B7A;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      #official-rate-and-faq td:nth-child(3) {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 0.25rem !important;
      }

      #official-rate-and-faq td:nth-child(3)::before {
        content: "Included Features:";
        font-weight: 700;
        color: #5F6B7A;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      #official-rate-and-faq td:nth-child(4)::before {
        content: "Starting Price:";
        font-weight: 700;
        color: #5F6B7A;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      #official-rate-and-faq td:last-child {
        border-bottom: none !important;
        padding-top: 0.8rem !important;
        display: block !important;
        width: 100% !important;
      }

      #official-rate-and-faq td:last-child button {
        width: 100% !important;
        padding: 0.8rem 1rem !important;
        font-size: 0.9rem !important;
        border-radius: 14px !important;
        font-weight: 800 !important;
      }
    }

    /* 3. FAQ SECTION — 100% RESPONSIVE TEXT WRAP & PADDING */
    #vj-geo-faq-section {
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
      padding: 1rem 0 !important;
    }

    #vj-geo-faq-section div[style*="grid-template-columns"],
    .vj-faq-grid,
    .faq-grid {
      display: grid !important;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)) !important;
      gap: 1.2rem !important;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
    }

    @media (max-width: 768px) {
      #vj-geo-faq-section div[style*="grid-template-columns"],
      .vj-faq-grid,
      .faq-grid {
        grid-template-columns: 1fr !important;
      }
    }

    #vj-geo-faq-section article,
    .faq-card,
    .faq-item {
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      padding: 1.4rem 1.2rem !important;
      overflow-wrap: break-word !important;
      word-break: break-word !important;
      hyphens: auto !important;
    }

    #vj-geo-faq-section article h3,
    .faq-question {
      font-size: 1.05rem !important;
      line-height: 1.4 !important;
      overflow-wrap: break-word !important;
      word-break: break-word !important;
      margin-bottom: 0.6rem !important;
    }

    #vj-geo-faq-section article p,
    .faq-answer {
      font-size: 0.88rem !important;
      line-height: 1.65 !important;
      overflow-wrap: break-word !important;
      word-break: break-word !important;
    }

    #vj-geo-faq-section > div > div:nth-child(2) {
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      padding: 1.4rem 1.2rem !important;
      overflow-wrap: break-word !important;
      word-break: break-word !important;
    }

    /* 4. GENERAL SECTIONS (HEADER, HERO, STATS, CARDS, FOOTER) */
    @media (max-width: 768px) {
      nav {
        padding: 0.4rem 3% !important;
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        width: 100% !important;
        max-width: 100vw !important;
        box-sizing: border-box !important;
      }

      .logo img {
        height: 42px !important;
        max-width: 175px !important;
      }

      .hero {
        padding: 85px 4% 2rem !important;
        min-height: auto !important;
        width: 100% !important;
        max-width: 100vw !important;
        box-sizing: border-box !important;
      }

      .hero h1 {
        font-size: clamp(1.85rem, 7.5vw, 2.5rem) !important;
        line-height: 1.18 !important;
        overflow-wrap: break-word !important;
        word-break: break-word !important;
      }

      .hero p {
        font-size: 0.9rem !important;
        line-height: 1.55 !important;
        max-width: 100% !important;
      }

      .hero-btns {
        flex-direction: column !important;
        width: 100% !important;
        gap: 0.6rem !important;
      }

      .btn-gold, .btn-outline {
        width: 100% !important;
        max-width: 320px !important;
        text-align: center !important;
        padding: 0.75rem 1rem !important;
        font-size: 0.8rem !important;
        box-sizing: border-box !important;
      }

      .hero > div[style*="CAB SERVICE"] {
        flex-wrap: wrap !important;
        gap: 0.5rem !important;
        justify-content: center !important;
      }

      .hero-trust-strip {
        width: 100% !important;
        max-width: 100% !important;
        flex-direction: column !important;
        gap: 0.4rem !important;
        padding: 0.6rem 0.8rem !important;
        margin: 1rem auto 0 !important;
        box-sizing: border-box !important;
      }

      .trust-badge-divider {
        display: none !important;
      }

      .trust-badge-item {
        font-size: 0.75rem !important;
        justify-content: center !important;
      }

      .hero-stats {
        gap: 0.8rem !important;
        margin-top: 1.2rem !important;
        justify-content: space-around !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }

      .stat-num {
        font-size: 1.3rem !important;
      }

      .stat-label {
        font-size: 0.55rem !important;
        letter-spacing: 1px !important;
      }

      .pkg-grid2 {
        grid-template-columns: 1fr !important;
        gap: 1.2rem !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }

      .pkg2 {
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }

      .pkg2-img {
        height: 200px !important;
      }

      /* Booking Social Proof Toast: Prevent WhatsApp Overlap */
      .booking-toast {
        bottom: 14px !important;
        left: 12px !important;
        right: auto !important;
        max-width: calc(100vw - 82px) !important;
        padding: 0.65rem 0.9rem !important;
        border-radius: 14px !important;
      }

      .toast-avatar {
        width: 36px !important;
        height: 36px !important;
        font-size: 0.95rem !important;
      }

      .toast-title {
        font-size: 0.75rem !important;
      }

      .toast-desc {
        font-size: 0.7rem !important;
      }

      /* Floating WhatsApp Button */
      .whatsapp-float, 
      [href*="wa.me"],
      a[href*="whatsapp.com"] {
        bottom: 14px !important;
        right: 14px !important;
        width: 48px !important;
        height: 48px !important;
        z-index: 99999 !important;
      }

      section {
        padding: 3rem 1rem !important;
        width: 100% !important;
        max-width: 100vw !important;
        box-sizing: border-box !important;
      }

      .section-title {
        font-size: clamp(1.75rem, 6vw, 2.3rem) !important;
        overflow-wrap: break-word !important;
      }

      .section-sub {
        font-size: 0.9rem !important;
        line-height: 1.5 !important;
      }

      /* Hide manual navigation arrows on mobile */
      button[onclick*="scrollOffersManual"] {
        display: none !important;
      }
    }
  </style>
`;

const updatedCarouselJS = `
  <script>
    let isOffersPaused = false;
    let offersAnimationFrame = null;

    function isMobileOrTouch() {
      return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth <= 768);
    }

    function autoScrollOffersLoop() {
      const track = document.getElementById('vjOffersTrack');
      // On desktop only; on mobile touch screen, let native swipe & scroll-snap handle the UX
      if (track && !isOffersPaused && !isMobileOrTouch()) {
        track.scrollLeft += 1.2;
        if (track.scrollLeft >= (track.scrollWidth / 2) - 2) {
          track.scrollLeft = 0;
        }
      }
      offersAnimationFrame = requestAnimationFrame(autoScrollOffersLoop);
    }

    function pauseOffersScroll() {
      isOffersPaused = true;
    }

    function resumeOffersScroll() {
      isOffersPaused = false;
    }

    function scrollOffersManual(direction) {
      pauseOffersScroll();
      const track = document.getElementById('vjOffersTrack');
      if (track) {
        const card = track.querySelector('.offer-card');
        const cardWidth = card ? card.offsetWidth : 320;
        track.scrollBy({ left: direction * (cardWidth + 20), behavior: 'smooth' });
      }
      setTimeout(resumeOffersScroll, 4000);
    }

    window.addEventListener('DOMContentLoaded', () => {
      const track = document.getElementById('vjOffersTrack');
      if (track) {
        track.addEventListener('touchstart', pauseOffersScroll, { passive: true });
        track.addEventListener('touchend', () => setTimeout(resumeOffersScroll, 3000), { passive: true });
      }
    });

    window.addEventListener('load', () => {
      cancelAnimationFrame(offersAnimationFrame);
      autoScrollOffersLoop();
    });
  </script>
`;

targetFiles.forEach(relPath => {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log('Skipping (not found):', relPath);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  // 1. Remove any previous vjUltimateMobileResponsiveEngine or insert before </head>
  if (content.includes('id="vjUltimateMobileResponsiveEngine"')) {
    content = content.replace(/<style id="vjUltimateMobileResponsiveEngine">[\s\S]*?<\/style>/g, '');
  }

  if (content.includes('</head>')) {
    content = content.replace('</head>', `${masterMobileCSS}\n</head>`);
  }

  // 2. Update FAQ grid style: replace minmax(450px, 1fr) with minmax(min(100%, 340px), 1fr)
  content = content.replace(
    /grid-template-columns:\s*repeat\(auto-fit,\s*minmax\(450px,\s*1fr\)\);/g,
    'grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); width: 100%; box-sizing: border-box;'
  );

  // 3. Update carousel JS
  if (content.includes('function autoScrollOffersLoop()')) {
    content = content.replace(/<script>\s*let isOffersPaused[\s\S]*?autoScrollOffersLoop\(\);\s*\}\);\s*<\/script>/, updatedCarouselJS);
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Successfully updated:', relPath);
});
