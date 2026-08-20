const fs = require('fs');
const path = require('path');

const targetFiles = [
  'index.html',
  'Vishit Journey.html',
  'new update/index.html',
  'new update/Vishit Journey.html',
  'NEW CHAT/index.html',
  'about.html',
  'contact.html',
  'booking.html',
  'chardham_itinerary.html',
  'blog.html'
];

function processFile(relPath) {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // 1. Remove International tab from package filter tabs
  content = content.replace(
    /<button class="pkg-tab" onclick="filterPkg\('international',this\)">International<\/button>\s*/gi,
    '<button class="pkg-tab" onclick="filterPkg(\'heritage\',this)">Heritage</button>\n          '
  );
  content = content.replace(
    /<button class="pkg-tab" data-cat="international"[^>]*>International<\/button>\s*/gi,
    '<button class="pkg-tab" data-cat="heritage">Heritage</button>\n          '
  );

  // 2. Remove International Package Cards (Dubai, Thailand, Bali, Maldives)
  // Match any .pkg2 card with data-cat including international or with Dubai/Thailand/Bali/Maldives
  const pkg2Regex = /<div class="pkg2"[^>]*onclick="openBooking\([1-4],\s*'(?:Dubai|Thailand|Bali|Maldives)[^']*'[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/gi;
  content = content.replace(pkg2Regex, '');

  // Also remove standalone international pkg2 blocks by data-cat="international"
  const pkg2CatRegex = /<div class="pkg2"[^>]*data-cat="international"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/gi;
  content = content.replace(pkg2CatRegex, '');

  // 3. Replace International Destination Cards (Dubai, Thailand) with Domestic Destinations (Udaipur, Rishikesh)
  content = content.replace(
    /<div class="dest-card" onclick="filterByDestination\('dubai'\)" style="cursor:pointer">[\s\S]*?<div class="dest-name">Dubai<\/div>[\s\S]*?<\/div>\s*<\/div>/gi,
    `<div class="dest-card" onclick="filterByDestination('udaipur')" style="cursor:pointer">
      <img src="assets/images/udaipur.jpg" alt="Udaipur">
      <div class="dest-tag">ROYAL HERITAGE</div>
      <div class="dest-overlay">
        <div class="dest-name">Udaipur</div>
        <div class="dest-sub">City of Lakes</div>
      </div>
    </div>`
  );

  content = content.replace(
    /<div class="dest-card" onclick="filterByDestination\('thailand'\)" style="cursor:pointer">[\s\S]*?<div class="dest-name">Thailand<\/div>[\s\S]*?<\/div>\s*<\/div>/gi,
    `<div class="dest-card" onclick="filterByDestination('rishikesh')" style="cursor:pointer">
      <img src="assets/images/rishikesh.jpg" alt="Rishikesh">
      <div class="dest-tag">YOGA & ADVENTURE</div>
      <div class="dest-overlay">
        <div class="dest-name">Rishikesh</div>
        <div class="dest-sub">Spiritual & Rafting Capital</div>
      </div>
    </div>`
  );

  // 4. Update Offers Carousel: Replace International Cards with Domestic Cards
  // Replace Offer Card 3 (Bali) with Manali & Shimla Honeymoon Perk
  const domesticOffer3 = `<!-- OFFER CARD 3: MANALI HONEYMOON SPECIAL -->
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
      </div>`;

  // Replace Offer Card 4 (Dubai) with Rajasthan Royal Deal
  const domesticOffer4 = `<!-- OFFER CARD 4: RAJASTHAN ROYAL FAMILY DEAL -->
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
      </div>`;

  // Replace Offer Card 5 (Thailand) with Kerala Backwaters Deal
  const domesticOffer5 = `<!-- OFFER CARD 5: KERALA BACKWATERS CRUISE -->
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
      </div>`;

  // Replace Bali in offers
  content = content.replace(/<!-- OFFER CARD 3: BALI HONEYMOON SPECIAL -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i, domesticOffer3);
  content = content.replace(/<!-- OFFER CARD 4: DUBAI LUXURY FAMILY DEAL -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i, domesticOffer4);
  content = content.replace(/<!-- OFFER CARD 5: THAILAND SUNSHINE ADVENTURE -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i, domesticOffer5);

  // Replace duplicate set occurrences if any
  content = content.replace(/<div class="offer-card">[\s\S]*?Bali &amp; Manali Honeymoon Perk[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, domesticOffer3);
  content = content.replace(/<div class="offer-card">[\s\S]*?Dubai Family Special Deal[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, domesticOffer4);
  content = content.replace(/<div class="offer-card"[^>]*>[\s\S]*?Thailand Sunshine Adventure[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, domesticOffer5);

  // 5. Rate Card Table: Remove Dubai and Bali, replace with Kerala and Rajasthan
  content = content.replace(
    /<tr[^>]*>[\s\S]*?Dubai Luxury Package[\s\S]*?<\/tr>/gi,
    `<tr style="border-bottom: 1px solid rgba(255,255,255,0.08); transition: background 0.2s;" onmouseover="this.style.background='rgba(201,165,74,0.08)'" onmouseout="this.style.background='transparent'">
      <td style="padding: 1.1rem 1.5rem; font-weight: 700; color: #0B1B33;">
        Kerala Backwaters Package <span style="font-size: 0.7rem; background: rgba(16,185,129,0.15); color: #059669; padding: 2px 8px; border-radius: 10px; margin-left: 6px; font-weight:700;">NATURE</span>
      </td>
      <td style="padding: 1.1rem 1.5rem; color: #2D3748;">6D / 5N</td>
      <td style="padding: 1.1rem 1.5rem; color: #5F6B7A; font-size: 0.88rem;">Munnar + Alleppey Houseboat + Kochi</td>
      <td style="padding: 1.1rem 1.5rem; font-weight: 700; color: var(--gold); font-size: 1.1rem; text-align: right;">₹19,250/-</td>
      <td style="padding: 1.1rem 1.5rem; text-align: center;">
        <button onclick="openBooking(16, 'Kerala Backwaters (5N/6D)', 19250, '6D / 5N', 'domestic')" style="padding: 0.5rem 1.1rem; background: var(--gold); color: #081428; border: none; border-radius: 20px; font-weight: 700; font-size: 0.82rem; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Book Now →</button>
      </td>
    </tr>`
  );

  content = content.replace(
    /<tr[^>]*>[\s\S]*?Bali Honeymoon Package[\s\S]*?<\/tr>/gi,
    `<tr style="border-bottom: 1px solid rgba(255,255,255,0.08); transition: background 0.2s;" onmouseover="this.style.background='rgba(201,165,74,0.08)'" onmouseout="this.style.background='transparent'">
      <td style="padding: 1.1rem 1.5rem; font-weight: 700; color: #0B1B33;">
        Rajasthan Royal Package <span style="font-size: 0.7rem; background: rgba(201,165,74,0.3); color: var(--gold); padding: 2px 8px; border-radius: 10px; margin-left: 6px; font-weight:800;">HERITAGE</span>
      </td>
      <td style="padding: 1.1rem 1.5rem; color: #2D3748;">8D / 7N</td>
      <td style="padding: 1.1rem 1.5rem; color: #5F6B7A; font-size: 0.88rem;">Jaipur + Jodhpur + Jaisalmer + Udaipur</td>
      <td style="padding: 1.1rem 1.5rem; font-weight: 700; color: var(--gold); font-size: 1.15rem; text-align: right;">₹23,000/-</td>
      <td style="padding: 1.1rem 1.5rem; text-align: center;">
        <button onclick="openBooking(14, 'Rajasthan Royal Package (7N/8D)', 23000, '8D / 7N', 'domestic')" style="padding: 0.5rem 1.1rem; background: var(--gold); color: #081428; border: none; border-radius: 20px; font-weight: 700; font-size: 0.82rem; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Book Now →</button>
      </td>
    </tr>`
  );

  // 6. Search Dropdown Options: Remove International Options
  content = content.replace(/<option value="dubai"[^>]*>.*?<\/option>\s*/gi, '');
  content = content.replace(/<option value="thailand"[^>]*>.*?<\/option>\s*/gi, '');
  content = content.replace(/<option value="bali"[^>]*>.*?<\/option>\s*/gi, '');
  content = content.replace(/<option value="maldives"[^>]*>.*?<\/option>\s*/gi, '');
  content = content.replace(/<option value="international"[^>]*>.*?<\/option>\s*/gi, '');

  // 7. FAQ & Hero mentions: replace international mentions
  content = content.replace(/domestic & international/gi, 'domestic & pan-India');
  content = content.replace(/domestic and international/gi, 'domestic and pan-India');
  content = content.replace(/and international holidays \([^)]*\)/gi, 'and bespoke holiday packages (Goa, Rajasthan, Kerala, Leh Ladakh, North East)');
  content = content.replace(/and international \([^)]*\)/gi, 'and pan-India (Goa, Rajasthan, Kerala, Leh Ladakh, North East)');

  // 8. Social Proof Toast: Replace Dubai/Bali with Domestic
  content = content.replace(
    /package:\s*'(?:Dubai Luxury Package|Bali Honeymoon Package)'/gi,
    "package: 'Kerala Backwaters Package'"
  );

  // 9. Update package count if present
  content = content.replace(/Showing <strong id="pkgCount" class="gold-txt">\d+<\/strong> Packages/gi, 'Showing <strong id="pkgCount" class="gold-txt">14</strong> Packages');

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Processed and removed international packages from:', relPath);
}

targetFiles.forEach(processFile);
