const fs = require('fs');
const path = require('path');

const targetFiles = [
  'index.html',
  'Vishit Journey.html',
  'new update/index.html',
  'new update/Vishit Journey.html',
  'NEW CHAT/index.html'
];

const offersHTML = `    <div id="vjOffersTrack" style="display:flex; flex-wrap:nowrap; gap:1.8rem; width:100%; overflow-x:auto; scroll-behavior:smooth; padding:1.6rem 2rem 2.2rem; scrollbar-width:none; -ms-overflow-style:none;" onmouseenter="pauseOffersScroll()" onmouseleave="resumeOffersScroll()">

      <!-- OFFER CARD 1: CHAR DHAM SPECIAL -->
      <div class="offer-card">
        <div style="position:absolute; top:-12px; right:16px; background:linear-gradient(135deg,#e4c06e,#c9a54a); color:#0d1f3c; font-weight:800; font-size:0.63rem; padding:0.28rem 0.85rem; border-radius:20px; letter-spacing:1px; text-transform:uppercase; white-space:nowrap; box-shadow:0 2px 8px rgba(201,165,74,0.3);">FLAT ₹2,000 OFF</div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.6rem; margin-top:0.5rem;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M11 2H13V15H11V2ZM5 4H7V10C7 11.6569 8.34315 13 10 13V15C7.23858 15 5 12.7614 5 10V4ZM19 4H17V10C17 11.6569 15.6569 13 14 13V15C16.7614 15 19 12.7614 19 10V4ZM11 17H13V22H11V17Z" fill="#c9a54a"/></svg>
          <span style="font-size:0.66rem; color:#c9a54a; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">FESTIVE SPECIAL</span>
        </div>
        <h3 style="font-size:1.1rem; font-weight:800; color:#0d1f3c; margin:0 0 0.5rem; line-height:1.3;">Char Dham Yatra Early Bird</h3>
        <p style="font-size:0.86rem; color:#4a5568; line-height:1.6; margin:0; flex-grow:1;">Book Char Dham 10D/9N package early and get ₹2,000 instant discount per family + VIP Darshan assistance included.</p>
        <div style="display:flex; align-items:center; justify-content:space-between; gap:0.6rem; background:#f7f4ef; padding:0.7rem 0.9rem; border-radius:14px; border:1.5px dashed rgba(201,165,74,0.5); margin-top:1rem; flex-shrink:0;">
          <div>
            <span style="font-size:0.6rem; color:#64748b; display:block; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Promo Code</span>
            <span style="font-size:0.9rem; font-weight:700; color:#0d1f3c; font-family:monospace; letter-spacing:1.5px;">CHARDHAM2000</span>
          </div>
          <button onclick="openBooking(11, 'Char Dham Yatra Package (Discounted ₹2,000 Off)', 18000, '10D / 9N', 'domestic')" style="padding:0.5rem 1rem; font-size:0.8rem; background:linear-gradient(135deg,#e4c06e,#c9a54a); color:#0d1f3c; font-weight:800; border:none; border-radius:12px; cursor:pointer; white-space:nowrap; flex-shrink:0;">Claim →</button>
        </div>
      </div>

      <!-- OFFER CARD 2: KASHMIR & LADAKH GROUP OFFER -->
      <div class="offer-card">
        <div style="position:absolute; top:-12px; right:16px; background:linear-gradient(135deg,#00c6ff,#0072ff); color:#fff; font-weight:800; font-size:0.63rem; padding:0.28rem 0.85rem; border-radius:20px; letter-spacing:1px; text-transform:uppercase; white-space:nowrap; box-shadow:0 2px 8px rgba(0,114,255,0.3);">20% GROUP DISCOUNT</div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.6rem; margin-top:0.5rem;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="mg1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#00c6ff"/><stop offset="100%" stop-color="#0072ff"/></linearGradient></defs><path d="M12 3L2 19H22L12 3Z" fill="url(#mg1)"/><path d="M12 3L9 8.5L12 10.5L15 8.5L12 3Z" fill="#fff" opacity="0.9"/></svg>
          <span style="font-size:0.66rem; color:#0072ff; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">SEASONAL SALE</span>
        </div>
        <h3 style="font-size:1.1rem; font-weight:800; color:#0d1f3c; margin:0 0 0.5rem; line-height:1.3;">Kashmir &amp; Ladakh Group Offer</h3>
        <p style="font-size:0.86rem; color:#4a5568; line-height:1.6; margin:0; flex-grow:1;">Book for 4+ travellers and get flat 20% discount on total package + complimentary Shikara ride in Dal Lake.</p>
        <div style="display:flex; align-items:center; justify-content:space-between; gap:0.6rem; background:#f0f7ff; padding:0.7rem 0.9rem; border-radius:14px; border:1.5px dashed rgba(0,114,255,0.35); margin-top:1rem; flex-shrink:0;">
          <div>
            <span style="font-size:0.6rem; color:#64748b; display:block; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Promo Code</span>
            <span style="font-size:0.9rem; font-weight:700; color:#0072ff; font-family:monospace; letter-spacing:1.5px;">SUMMER20</span>
          </div>
          <button onclick="openBooking(5, 'Kashmir Paradise Package (20% Group Discount)', 15999, '6D / 5N', 'domestic')" style="padding:0.5rem 1rem; font-size:0.8rem; background:linear-gradient(135deg,#00c6ff,#0072ff); color:#fff; font-weight:800; border:none; border-radius:12px; cursor:pointer; white-space:nowrap; flex-shrink:0;">Claim →</button>
        </div>
      </div>

      <!-- OFFER CARD 3: MANALI HONEYMOON SPECIAL -->
      <div class="offer-card">
        <div style="position:absolute; top:-12px; right:16px; background:linear-gradient(135deg,#ff6a00,#ee0979); color:#fff; font-weight:800; font-size:0.63rem; padding:0.28rem 0.85rem; border-radius:20px; letter-spacing:1px; text-transform:uppercase; white-space:nowrap; box-shadow:0 2px 8px rgba(238,9,121,0.3);">FREE CANDLELIGHT DINNER</div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.6rem; margin-top:0.5rem;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="url(#hg1)"><defs><linearGradient id="hg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ff0844"/><stop offset="100%" stop-color="#ffb199"/></linearGradient></defs><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          <span style="font-size:0.66rem; color:#ee0979; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">ROMANTIC ESCAPE</span>
        </div>
        <h3 style="font-size:1.1rem; font-weight:800; color:#0d1f3c; margin:0 0 0.5rem; line-height:1.3;">Manali Honeymoon Special Perk</h3>
        <p style="font-size:0.86rem; color:#4a5568; line-height:1.6; margin:0; flex-grow:1;">Free luxury room upgrade, complimentary romantic candlelight dinner & honeymoon cake setup on all Himachal couples packages.</p>
        <div style="display:flex; align-items:center; justify-content:space-between; gap:0.6rem; background:#fff5f7; padding:0.7rem 0.9rem; border-radius:14px; border:1.5px dashed rgba(238,9,121,0.35); margin-top:1rem; flex-shrink:0;">
          <div>
            <span style="font-size:0.6rem; color:#64748b; display:block; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Promo Code</span>
            <span style="font-size:0.9rem; font-weight:700; color:#ee0979; font-family:monospace; letter-spacing:1.5px;">HONEYMOONVIP</span>
          </div>
          <button onclick="openBooking(6, 'Manali Package (3N/4D)', 9680, '4D / 3N', 'hills')" style="padding:0.5rem 1rem; font-size:0.8rem; background:linear-gradient(135deg,#ff6a00,#ee0979); color:#fff; font-weight:800; border:none; border-radius:12px; cursor:pointer; white-space:nowrap; flex-shrink:0;">Claim →</button>
        </div>
      </div>

      <!-- OFFER CARD 4: RAJASTHAN ROYAL DEAL -->
      <div class="offer-card">
        <div style="position:absolute; top:-12px; right:16px; background:linear-gradient(135deg,#f59e0b,#d97706); color:#fff; font-weight:800; font-size:0.63rem; padding:0.28rem 0.85rem; border-radius:20px; letter-spacing:1px; text-transform:uppercase; white-space:nowrap; box-shadow:0 2px 8px rgba(245,158,11,0.3);">FLAT 15% DISCOUNT</div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.6rem; margin-top:0.5rem;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L15 8L22 9L17 14L18 21L12 17.5L6 21L7 14L2 9L9 8L12 2Z" fill="#f59e0b"/></svg>
          <span style="font-size:0.66rem; color:#d97706; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">ROYAL HERITAGE</span>
        </div>
        <h3 style="font-size:1.1rem; font-weight:800; color:#0d1f3c; margin:0 0 0.5rem; line-height:1.3;">Rajasthan Royal Heritage Deal</h3>
        <p style="font-size:0.86rem; color:#4a5568; line-height:1.6; margin:0; flex-grow:1;">Get flat 15% discount on Rajasthan 8D/7N package + complimentary desert camel safari and cultural folk night in Jaisalmer.</p>
        <div style="display:flex; align-items:center; justify-content:space-between; gap:0.6rem; background:#fffbe6; padding:0.7rem 0.9rem; border-radius:14px; border:1.5px dashed rgba(245,158,11,0.45); margin-top:1rem; flex-shrink:0;">
          <div>
            <span style="font-size:0.6rem; color:#64748b; display:block; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Promo Code</span>
            <span style="font-size:0.9rem; font-weight:700; color:#d97706; font-family:monospace; letter-spacing:1.5px;">RAJASTHAN15</span>
          </div>
          <button onclick="openBooking(14, 'Rajasthan Royal Package (7N/8D)', 23000, '8D / 7N', 'domestic')" style="padding:0.5rem 1rem; font-size:0.8rem; background:linear-gradient(135deg,#f59e0b,#d97706); color:#fff; font-weight:800; border:none; border-radius:12px; cursor:pointer; white-space:nowrap; flex-shrink:0;">Claim →</button>
        </div>
      </div>

      <!-- OFFER CARD 5: KERALA BACKWATERS CRUISE -->
      <div class="offer-card" style="border:1.5px solid rgba(16,185,129,0.35);">
        <div style="position:absolute; top:-12px; right:16px; background:linear-gradient(135deg,#10b981,#059669); color:#fff; font-weight:800; font-size:0.63rem; padding:0.28rem 0.85rem; border-radius:20px; letter-spacing:1px; text-transform:uppercase; white-space:nowrap; box-shadow:0 2px 8px rgba(16,185,129,0.3);">FREE HOUSEBOAT UPGRADE</div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.6rem; margin-top:0.5rem;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#10b981" stroke-width="2"/><path d="M12 6V12L16 14" stroke="#10b981" stroke-width="2"/></svg>
          <span style="font-size:0.66rem; color:#059669; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">GOD'S OWN COUNTRY</span>
        </div>
        <h3 style="font-size:1.1rem; font-weight:800; color:#0d1f3c; margin:0 0 0.5rem; line-height:1.3;">Kerala Backwaters Escape</h3>
        <p style="font-size:0.86rem; color:#4a5568; line-height:1.6; margin:0; flex-grow:1;">Book 6D/5N Kerala tour and get free luxury AC premium houseboat upgrade in Alleppey with authentic South Indian meals.</p>
        <div style="display:flex; align-items:center; justify-content:space-between; gap:0.6rem; background:#ecfdf5; padding:0.7rem 0.9rem; border-radius:14px; border:1.5px dashed rgba(16,185,129,0.45); margin-top:1rem; flex-shrink:0;">
          <div>
            <span style="font-size:0.6rem; color:#64748b; display:block; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Promo Code</span>
            <span style="font-size:0.9rem; font-weight:700; color:#059669; font-family:monospace; letter-spacing:1.5px;">KERALAVIP</span>
          </div>
          <button onclick="openBooking(16, 'Kerala Backwaters (5N/6D)', 19250, '6D / 5N', 'domestic')" style="padding:0.5rem 1rem; font-size:0.8rem; background:linear-gradient(135deg,#10b981,#059669); color:#fff; font-weight:800; border:none; border-radius:12px; cursor:pointer; white-space:nowrap; flex-shrink:0;">Claim →</button>
        </div>
      </div>

      <!-- OFFER CARD 6: SPITI ROADTRIP -->
      <div class="offer-card" style="border:1.5px solid rgba(139,92,246,0.35);">
        <div style="position:absolute; top:-12px; right:16px; background:linear-gradient(135deg,#8b5cf6,#6d28d9); color:#fff; font-weight:800; font-size:0.63rem; padding:0.28rem 0.85rem; border-radius:20px; letter-spacing:1px; text-transform:uppercase; white-space:nowrap; box-shadow:0 2px 8px rgba(139,92,246,0.3);">FREE 4x4 SUV UPGRADE</div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.6rem; margin-top:0.5rem;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 17h14M5 12h14M7 7h10" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round"/></svg>
          <span style="font-size:0.66rem; color:#6d28d9; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">ROADTRIP SPECIAL</span>
        </div>
        <h3 style="font-size:1.1rem; font-weight:800; color:#0d1f3c; margin:0 0 0.5rem; line-height:1.3;">Spiti &amp; Manali Roadtrip</h3>
        <p style="font-size:0.86rem; color:#4a5568; line-height:1.6; margin:0; flex-grow:1;">Get free 4x4 SUV vehicle upgrade + complimentary camping bonfire and stargazing session in Spiti Valley.</p>
        <div style="display:flex; align-items:center; justify-content:space-between; gap:0.6rem; background:#f5f3ff; padding:0.7rem 0.9rem; border-radius:14px; border:1.5px dashed rgba(139,92,246,0.45); margin-top:1rem; flex-shrink:0;">
          <div>
            <span style="font-size:0.6rem; color:#64748b; display:block; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Promo Code</span>
            <span style="font-size:0.9rem; font-weight:700; color:#6d28d9; font-family:monospace; letter-spacing:1.5px;">SPITI4X4</span>
          </div>
          <button onclick="openBooking(8, 'Kasol + Manali Combo (Roadtrip Special)', 8999, '6D / 5N', 'hills')" style="padding:0.5rem 1rem; font-size:0.8rem; background:linear-gradient(135deg,#8b5cf6,#6d28d9); color:#fff; font-weight:800; border:none; border-radius:12px; cursor:pointer; white-space:nowrap; flex-shrink:0;">Claim →</button>
        </div>
      </div>

      <!-- ======= DUPLICATE SET FOR INFINITE SCROLL ======= -->

      <div class="offer-card">
        <div style="position:absolute; top:-12px; right:16px; background:linear-gradient(135deg,#e4c06e,#c9a54a); color:#0d1f3c; font-weight:800; font-size:0.63rem; padding:0.28rem 0.85rem; border-radius:20px; letter-spacing:1px; text-transform:uppercase; white-space:nowrap; box-shadow:0 2px 8px rgba(201,165,74,0.3);">FLAT ₹2,000 OFF</div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.6rem; margin-top:0.5rem;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M11 2H13V15H11V2ZM5 4H7V10C7 11.6569 8.34315 13 10 13V15C7.23858 15 5 12.7614 5 10V4ZM19 4H17V10C17 11.6569 15.6569 13 14 13V15C16.7614 15 19 12.7614 19 10V4ZM11 17H13V22H11V17Z" fill="#c9a54a"/></svg><span style="font-size:0.66rem; color:#c9a54a; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">FESTIVE SPECIAL</span></div>
        <h3 style="font-size:1.1rem; font-weight:800; color:#0d1f3c; margin:0 0 0.5rem; line-height:1.3;">Char Dham Yatra Early Bird</h3>
        <p style="font-size:0.86rem; color:#4a5568; line-height:1.6; margin:0; flex-grow:1;">Book Char Dham 10D/9N package early and get ₹2,000 instant discount per family + VIP Darshan assistance included.</p>
        <div style="display:flex; align-items:center; justify-content:space-between; gap:0.6rem; background:#f7f4ef; padding:0.7rem 0.9rem; border-radius:14px; border:1.5px dashed rgba(201,165,74,0.5); margin-top:1rem; flex-shrink:0;">
          <div><span style="font-size:0.6rem; color:#64748b; display:block; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Promo Code</span><span style="font-size:0.9rem; font-weight:700; color:#0d1f3c; font-family:monospace; letter-spacing:1.5px;">CHARDHAM2000</span></div>
          <button onclick="openBooking(11, 'Char Dham Yatra Package (Discounted ₹2,000 Off)', 18000, '10D / 9N', 'domestic')" style="padding:0.5rem 1rem; font-size:0.8rem; background:linear-gradient(135deg,#e4c06e,#c9a54a); color:#0d1f3c; font-weight:800; border:none; border-radius:12px; cursor:pointer; white-space:nowrap; flex-shrink:0;">Claim →</button>
        </div>
      </div>

      <div class="offer-card">
        <div style="position:absolute; top:-12px; right:16px; background:linear-gradient(135deg,#00c6ff,#0072ff); color:#fff; font-weight:800; font-size:0.63rem; padding:0.28rem 0.85rem; border-radius:20px; letter-spacing:1px; text-transform:uppercase; white-space:nowrap; box-shadow:0 2px 8px rgba(0,114,255,0.3);">20% GROUP DISCOUNT</div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.6rem; margin-top:0.5rem;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="mg2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#00c6ff"/><stop offset="100%" stop-color="#0072ff"/></linearGradient></defs><path d="M12 3L2 19H22L12 3Z" fill="url(#mg2)"/><path d="M12 3L9 8.5L12 10.5L15 8.5L12 3Z" fill="#fff" opacity="0.9"/></svg><span style="font-size:0.66rem; color:#0072ff; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">SEASONAL SALE</span></div>
        <h3 style="font-size:1.1rem; font-weight:800; color:#0d1f3c; margin:0 0 0.5rem; line-height:1.3;">Kashmir &amp; Ladakh Group Offer</h3>
        <p style="font-size:0.86rem; color:#4a5568; line-height:1.6; margin:0; flex-grow:1;">Book for 4+ travellers and get flat 20% discount on total package + complimentary Shikara ride in Dal Lake.</p>
        <div style="display:flex; align-items:center; justify-content:space-between; gap:0.6rem; background:#f0f7ff; padding:0.7rem 0.9rem; border-radius:14px; border:1.5px dashed rgba(0,114,255,0.35); margin-top:1rem; flex-shrink:0;">
          <div><span style="font-size:0.6rem; color:#64748b; display:block; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Promo Code</span><span style="font-size:0.9rem; font-weight:700; color:#0072ff; font-family:monospace; letter-spacing:1.5px;">SUMMER20</span></div>
          <button onclick="openBooking(5, 'Kashmir Paradise Package (20% Group Discount)', 15999, '6D / 5N', 'domestic')" style="padding:0.5rem 1rem; font-size:0.8rem; background:linear-gradient(135deg,#00c6ff,#0072ff); color:#fff; font-weight:800; border:none; border-radius:12px; cursor:pointer; white-space:nowrap; flex-shrink:0;">Claim →</button>
        </div>
      </div>

      <div class="offer-card">
        <div style="position:absolute; top:-12px; right:16px; background:linear-gradient(135deg,#ff6a00,#ee0979); color:#fff; font-weight:800; font-size:0.63rem; padding:0.28rem 0.85rem; border-radius:20px; letter-spacing:1px; text-transform:uppercase; white-space:nowrap; box-shadow:0 2px 8px rgba(238,9,121,0.3);">FREE CANDLELIGHT DINNER</div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.6rem; margin-top:0.5rem;"><svg width="20" height="20" viewBox="0 0 24 24" fill="url(#hg2)"><defs><linearGradient id="hg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ff0844"/><stop offset="100%" stop-color="#ffb199"/></linearGradient></defs><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg><span style="font-size:0.66rem; color:#ee0979; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">ROMANTIC ESCAPE</span></div>
        <h3 style="font-size:1.1rem; font-weight:800; color:#0d1f3c; margin:0 0 0.5rem; line-height:1.3;">Manali Honeymoon Special Perk</h3>
        <p style="font-size:0.86rem; color:#4a5568; line-height:1.6; margin:0; flex-grow:1;">Free luxury room upgrade, complimentary romantic candlelight dinner &amp; honeymoon cake setup on all Himachal couples packages.</p>
        <div style="display:flex; align-items:center; justify-content:space-between; gap:0.6rem; background:#fff5f7; padding:0.7rem 0.9rem; border-radius:14px; border:1.5px dashed rgba(238,9,121,0.35); margin-top:1rem; flex-shrink:0;">
          <div><span style="font-size:0.6rem; color:#64748b; display:block; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Promo Code</span><span style="font-size:0.9rem; font-weight:700; color:#ee0979; font-family:monospace; letter-spacing:1.5px;">HONEYMOONVIP</span></div>
          <button onclick="openBooking(6, 'Manali Package (3N/4D)', 9680, '4D / 3N', 'hills')" style="padding:0.5rem 1rem; font-size:0.8rem; background:linear-gradient(135deg,#ff6a00,#ee0979); color:#fff; font-weight:800; border:none; border-radius:12px; cursor:pointer; white-space:nowrap; flex-shrink:0;">Claim →</button>
        </div>
      </div>

      <div class="offer-card">
        <div style="position:absolute; top:-12px; right:16px; background:linear-gradient(135deg,#f59e0b,#d97706); color:#fff; font-weight:800; font-size:0.63rem; padding:0.28rem 0.85rem; border-radius:20px; letter-spacing:1px; text-transform:uppercase; white-space:nowrap; box-shadow:0 2px 8px rgba(245,158,11,0.3);">FLAT 15% DISCOUNT</div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.6rem; margin-top:0.5rem;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L15 8L22 9L17 14L18 21L12 17.5L6 21L7 14L2 9L9 8L12 2Z" fill="#f59e0b"/></svg><span style="font-size:0.66rem; color:#d97706; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">ROYAL HERITAGE</span></div>
        <h3 style="font-size:1.1rem; font-weight:800; color:#0d1f3c; margin:0 0 0.5rem; line-height:1.3;">Rajasthan Royal Heritage Deal</h3>
        <p style="font-size:0.86rem; color:#4a5568; line-height:1.6; margin:0; flex-grow:1;">Get flat 15% discount on Rajasthan 8D/7N package + complimentary desert camel safari and cultural folk night in Jaisalmer.</p>
        <div style="display:flex; align-items:center; justify-content:space-between; gap:0.6rem; background:#fffbe6; padding:0.7rem 0.9rem; border-radius:14px; border:1.5px dashed rgba(245,158,11,0.45); margin-top:1rem; flex-shrink:0;">
          <div><span style="font-size:0.6rem; color:#64748b; display:block; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Promo Code</span><span style="font-size:0.9rem; font-weight:700; color:#d97706; font-family:monospace; letter-spacing:1.5px;">RAJASTHAN15</span></div>
          <button onclick="openBooking(14, 'Rajasthan Royal Package (7N/8D)', 23000, '8D / 7N', 'domestic')" style="padding:0.5rem 1rem; font-size:0.8rem; background:linear-gradient(135deg,#f59e0b,#d97706); color:#fff; font-weight:800; border:none; border-radius:12px; cursor:pointer; white-space:nowrap; flex-shrink:0;">Claim →</button>
        </div>
      </div>

      <div class="offer-card" style="border:1.5px solid rgba(16,185,129,0.35);">
        <div style="position:absolute; top:-12px; right:16px; background:linear-gradient(135deg,#10b981,#059669); color:#fff; font-weight:800; font-size:0.63rem; padding:0.28rem 0.85rem; border-radius:20px; letter-spacing:1px; text-transform:uppercase; white-space:nowrap; box-shadow:0 2px 8px rgba(16,185,129,0.3);">FREE HOUSEBOAT UPGRADE</div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.6rem; margin-top:0.5rem;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#10b981" stroke-width="2"/><path d="M12 6V12L16 14" stroke="#10b981" stroke-width="2"/></svg><span style="font-size:0.66rem; color:#059669; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">GOD'S OWN COUNTRY</span></div>
        <h3 style="font-size:1.1rem; font-weight:800; color:#0d1f3c; margin:0 0 0.5rem; line-height:1.3;">Kerala Backwaters Escape</h3>
        <p style="font-size:0.86rem; color:#4a5568; line-height:1.6; margin:0; flex-grow:1;">Book 6D/5N Kerala tour and get free luxury AC premium houseboat upgrade in Alleppey with authentic South Indian meals.</p>
        <div style="display:flex; align-items:center; justify-content:space-between; gap:0.6rem; background:#ecfdf5; padding:0.7rem 0.9rem; border-radius:14px; border:1.5px dashed rgba(16,185,129,0.45); margin-top:1rem; flex-shrink:0;">
          <div><span style="font-size:0.6rem; color:#64748b; display:block; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Promo Code</span><span style="font-size:0.9rem; font-weight:700; color:#059669; font-family:monospace; letter-spacing:1.5px;">KERALAVIP</span></div>
          <button onclick="openBooking(16, 'Kerala Backwaters (5N/6D)', 19250, '6D / 5N', 'domestic')" style="padding:0.5rem 1rem; font-size:0.8rem; background:linear-gradient(135deg,#10b981,#059669); color:#fff; font-weight:800; border:none; border-radius:12px; cursor:pointer; white-space:nowrap; flex-shrink:0;">Claim →</button>
        </div>
      </div>

      <div class="offer-card" style="border:1.5px solid rgba(139,92,246,0.35);">
        <div style="position:absolute; top:-12px; right:16px; background:linear-gradient(135deg,#8b5cf6,#6d28d9); color:#fff; font-weight:800; font-size:0.63rem; padding:0.28rem 0.85rem; border-radius:20px; letter-spacing:1px; text-transform:uppercase; white-space:nowrap; box-shadow:0 2px 8px rgba(139,92,246,0.3);">FREE 4x4 SUV UPGRADE</div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.6rem; margin-top:0.5rem;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 17h14M5 12h14M7 7h10" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round"/></svg><span style="font-size:0.66rem; color:#6d28d9; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">ROADTRIP SPECIAL</span></div>
        <h3 style="font-size:1.1rem; font-weight:800; color:#0d1f3c; margin:0 0 0.5rem; line-height:1.3;">Spiti &amp; Manali Roadtrip</h3>
        <p style="font-size:0.86rem; color:#4a5568; line-height:1.6; margin:0; flex-grow:1;">Get free 4x4 SUV vehicle upgrade + complimentary camping bonfire and stargazing session in Spiti Valley.</p>
        <div style="display:flex; align-items:center; justify-content:space-between; gap:0.6rem; background:#f5f3ff; padding:0.7rem 0.9rem; border-radius:14px; border:1.5px dashed rgba(139,92,246,0.45); margin-top:1rem; flex-shrink:0;">
          <div><span style="font-size:0.6rem; color:#64748b; display:block; text-transform:uppercase; letter-spacing:1px; font-weight:600;">Promo Code</span><span style="font-size:0.9rem; font-weight:700; color:#6d28d9; font-family:monospace; letter-spacing:1.5px;">SPITI4X4</span></div>
          <button onclick="openBooking(8, 'Kasol + Manali Combo (Roadtrip Special)', 8999, '6D / 5N', 'hills')" style="padding:0.5rem 1rem; font-size:0.8rem; background:linear-gradient(135deg,#8b5cf6,#6d28d9); color:#fff; font-weight:800; border:none; border-radius:12px; cursor:pointer; white-space:nowrap; flex-shrink:0;">Claim →</button>
        </div>
      </div>

    </div>`;

const destinationsHTML = `<section class="destinations" id="destinations">
  <div class="dest-header">
    <div>
      <div class="section-tag">Where Will You Go?</div>
      <h2 class="section-title">Trending <em>Destinations</em></h2>
      <div class="gold-line"></div>
    </div>
    <a href="javascript:void(0)" onclick="filterByDestination('all')" style="color:var(--gold);font-size:.75rem;letter-spacing:2px;text-decoration:none;text-transform:uppercase;border-bottom:1px solid var(--gold);padding-bottom:2px">View All →</a>
  </div>
  <div class="dest-grid">

    <div class="dest-card" onclick="filterByDestination('chardham')" style="cursor:pointer">
      <div class="dest-tag">CHAR DHAM YATRA</div>
      <img src="assets/images/chardham_banner.jpg" alt="Char Dham Yatra">
      <div class="dest-overlay">
        <div class="dest-name">Char Dham Yatra</div>
        <div class="dest-sub">Sacred Uttarakhand Pilgrimage</div>
      </div>
    </div>

    <div class="dest-card" onclick="filterByDestination('kashmir')" style="cursor:pointer">
      <div class="dest-tag">MOST POPULAR</div>
      <img src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80" alt="Kashmir">
      <div class="dest-overlay">
        <div class="dest-name">Kashmir</div>
        <div class="dest-sub">Heaven on Earth</div>
      </div>
    </div>

    <div class="dest-card" onclick="filterByDestination('goa')" style="cursor:pointer">
      <div class="dest-tag">BEACH & NIGHTLIFE</div>
      <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80" alt="Goa">
      <div class="dest-overlay">
        <div class="dest-name">Goa</div>
        <div class="dest-sub">Sun & Surf</div>
      </div>
    </div>

    <div class="dest-card" onclick="filterByDestination('manali')" style="cursor:pointer">
      <div class="dest-tag">HILLS & SNOW</div>
      <img src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80" alt="Manali">
      <div class="dest-overlay">
        <div class="dest-name">Manali</div>
        <div class="dest-sub">Adventure Awaits</div>
      </div>
    </div>

  </div>
</section>`;

const destGridCSS = `
  /* ── DESTINATIONS (LUXURY 4-COLUMN UNIFORM GRID) ── */
  .destinations {
    background: #ffffff;
    padding: 4rem 5%;
  }
  .dest-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .dest-grid {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 20px !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
  .dest-card {
    position: relative !important;
    overflow: hidden !important;
    cursor: pointer !important;
    border-radius: 16px !important;
    border: 1px solid rgba(201,165,74,0.2) !important;
    height: 320px !important;
    box-shadow: 0 8px 24px rgba(11,27,51,0.06) !important;
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease !important;
  }
  .dest-card:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 16px 36px rgba(11,27,51,0.16) !important;
  }
  .dest-card img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    display: block !important;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }
  .dest-card:hover img {
    transform: scale(1.08) !important;
  }
  .dest-overlay {
    position: absolute !important;
    inset: 0 !important;
    background: linear-gradient(to top, rgba(8,20,40,0.92) 0%, rgba(8,20,40,0.2) 60%, transparent 100%) !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-end !important;
    padding: 1.4rem !important;
    transition: all 0.3s ease !important;
  }
  .dest-name {
    font-family: 'Cormorant Garamond', serif !important;
    font-size: 1.5rem !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    line-height: 1.2 !important;
  }
  .dest-sub {
    font-size: 0.72rem !important;
    letter-spacing: 1.5px !important;
    text-transform: uppercase !important;
    color: var(--gold) !important;
    margin-top: 4px !important;
    font-weight: 600 !important;
  }
  .dest-tag {
    position: absolute !important;
    top: 14px !important;
    right: 14px !important;
    background: var(--gold) !important;
    color: var(--navy) !important;
    font-size: 0.62rem !important;
    font-weight: 800 !important;
    letter-spacing: 1px !important;
    padding: 4px 10px !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2) !important;
  }

  @media (max-width: 1024px) {
    .dest-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 16px !important;
    }
    .dest-card {
      height: 260px !important;
    }
  }

  @media (max-width: 600px) {
    .dest-grid {
      grid-template-columns: 1fr !important;
      gap: 14px !important;
    }
    .dest-card {
      height: 220px !important;
    }
  }
`;

targetFiles.forEach(relPath => {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // 1. Replace the entire #vjOffersTrack inner HTML
  content = content.replace(
    /<div id="vjOffersTrack"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<script>/i,
    offersHTML + '\n  </div>\n\n  <script>'
  );

  // 2. Replace the entire #destinations section
  content = content.replace(
    /<section class="destinations" id="destinations">[\s\S]*?<\/section>/i,
    destinationsHTML
  );

  // 3. Update or inject dest-grid CSS in style block
  if (content.includes('/* ── DESTINATIONS ── */')) {
    content = content.replace(
      /\/\* ── DESTINATIONS ── \*\/[\s\S]*?(?=\/\* ── WHY VISHIT ── \*\/)/,
      destGridCSS + '\n'
    );
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Fixed offers and destinations in:', relPath);
});
