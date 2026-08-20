const fs = require('fs');
const path = require('path');

const targetFiles = [
  'index.html',
  'Vishit Journey.html',
  'new update/index.html',
  'new update/Vishit Journey.html',
  'NEW CHAT/index.html'
];

const updatedOffersCSS = `
    /* 1. OFFERS & DISCOUNTS CAROUSEL (SMOOTH 60FPS INFINITE SCROLLING ANIMATION) */
    .special-offers {
      width: 100% !important;
      max-width: 100vw !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
      position: relative !important;
    }

    #vjOffersTrack {
      display: flex !important;
      flex-wrap: nowrap !important;
      gap: 1.5rem !important;
      width: 100% !important;
      max-width: 100% !important;
      overflow-x: auto !important;
      scroll-behavior: auto !important;
      -webkit-overflow-scrolling: touch !important;
      padding: 1.6rem 1.5rem 2.2rem !important;
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
      box-sizing: border-box !important;
      cursor: grab !important;
    }

    #vjOffersTrack::-webkit-scrollbar {
      display: none !important;
      height: 0 !important;
      width: 0 !important;
    }

    .offer-card {
      flex: 0 0 330px !important;
      min-width: 330px !important;
      max-width: 330px !important;
      width: 330px !important;
      box-sizing: border-box !important;
      margin: 0 !important;
      position: relative !important;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease !important;
    }

    .offer-card:hover {
      transform: translateY(-6px) scale(1.02) !important;
      box-shadow: 0 14px 35px rgba(11, 27, 51, 0.12) !important;
      z-index: 10 !important;
    }

    .offers-nav-btn {
      position: absolute !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      z-index: 99 !important;
      background: #ffffff !important;
      color: #c9a54a !important;
      border: 2px solid #c9a54a !important;
      width: 46px !important;
      height: 46px !important;
      border-radius: 50% !important;
      cursor: pointer !important;
      font-size: 1.4rem !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25) !important;
      transition: all 0.2s ease !important;
    }
    .offers-nav-btn:hover {
      background: #c9a54a !important;
      color: #0d1f3c !important;
      transform: translateY(-50%) scale(1.08) !important;
    }

    @media (max-width: 768px) {
      .offer-card {
        flex: 0 0 290px !important;
        min-width: 290px !important;
        max-width: 290px !important;
        width: 290px !important;
      }
      #vjOffersTrack {
        padding: 1.4rem 1rem 1.8rem !important;
        gap: 1.2rem !important;
      }
    }
`;

const updatedOffersJS = `
  <script>
    let isOffersPaused = false;
    let offersAnimationFrame = null;
    let offersResumeTimeout = null;

    function autoScrollOffersLoop() {
      const track = document.getElementById('vjOffersTrack');
      if (track && !isOffersPaused) {
        track.scrollLeft += 1.0;
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0 && track.scrollLeft >= halfWidth - 2) {
          track.scrollLeft -= halfWidth;
        }
      }
      offersAnimationFrame = requestAnimationFrame(autoScrollOffersLoop);
    }

    function pauseOffersScroll() {
      isOffersPaused = true;
      if (offersResumeTimeout) clearTimeout(offersResumeTimeout);
    }

    function resumeOffersScroll(delay = 0) {
      if (offersResumeTimeout) clearTimeout(offersResumeTimeout);
      if (delay > 0) {
        offersResumeTimeout = setTimeout(() => {
          isOffersPaused = false;
        }, delay);
      } else {
        isOffersPaused = false;
      }
    }

    function scrollOffersManual(direction) {
      pauseOffersScroll();
      const track = document.getElementById('vjOffersTrack');
      if (track) {
        const card = track.querySelector('.offer-card');
        const scrollAmount = (card ? card.offsetWidth : 330) + 24;
        track.scrollLeft += direction * scrollAmount;
      }
      resumeOffersScroll(3500);
    }

    window.addEventListener('DOMContentLoaded', () => {
      const carouselWrap = document.querySelector('.special-offers');
      const track = document.getElementById('vjOffersTrack');
      
      if (carouselWrap) {
        carouselWrap.addEventListener('mouseenter', pauseOffersScroll);
        carouselWrap.addEventListener('mouseleave', () => resumeOffersScroll(600));
        carouselWrap.addEventListener('touchstart', pauseOffersScroll, { passive: true });
        carouselWrap.addEventListener('touchend', () => resumeOffersScroll(2500), { passive: true });
      }

      if (track) {
        track.addEventListener('mouseenter', pauseOffersScroll);
        track.addEventListener('mouseleave', () => resumeOffersScroll(600));
      }
    });

    window.addEventListener('load', () => {
      if (offersAnimationFrame) cancelAnimationFrame(offersAnimationFrame);
      autoScrollOffersLoop();
    });
  </script>
`;

targetFiles.forEach(relPath => {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // 1. Update navigation buttons class
  content = content.replace(
    /<button onclick="scrollOffersManual\(-1\)"[^>]*>/g,
    '<button class="offers-nav-btn" onclick="scrollOffersManual(-1)" style="left:15px;" aria-label="Previous Offer">'
  );
  content = content.replace(
    /<button onclick="scrollOffersManual\(1\)"[^>]*>/g,
    '<button class="offers-nav-btn" onclick="scrollOffersManual(1)" style="right:15px;" aria-label="Next Offer">'
  );

  // 2. Replace CSS
  content = content.replace(
    /\/\*\s*1\.\s*OFFERS & DISCOUNTS CAROUSEL[\s\S]*?(?=\/\*\s*2\.\s*OFFICIAL PRICING TABLE)/,
    updatedOffersCSS + '\n    '
  );

  // 3. Replace JS
  content = content.replace(
    /<script>\s*let isOffersPaused[\s\S]*?autoScrollOffersLoop\(\);\s*\}\);\s*<\/script>/,
    updatedOffersJS.trim()
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Updated:', relPath);
});
