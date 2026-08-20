const fs = require('fs');
const path = require('path');

const targetFiles = [
  'index.html',
  'Vishit Journey.html',
  'new update/index.html',
  'new update/Vishit Journey.html',
  'NEW CHAT/index.html'
];

targetFiles.forEach(relPath => {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // 1. Fix stray + around floating whatsapp
  content = content.replace(/\+\s*<\/a>\s*\+\s*/g, '</a>\n');

  // 2. Fix script src="assets/js/booking.js" to src="/assets/js/booking.js"
  content = content.replace(/<script src="assets\/js\/booking\.js"><\/script>/g, '<script src="/assets/js/booking.js"></script>');

  // 3. Remove the redirection override in openBooking so the on-page modal opens
  content = content.replace(
    /<script>\s*\/\/ Fail-safe global backup for instant click execution[\s\S]*?<\/script>/g,
    `<script>
// Open On-Page Luxury Booking Modal with Promo support
window.openBooking = function(id, name, price, duration, category) {
  if (typeof window.vjOpenBookingModal === 'function') {
    window.vjOpenBookingModal(id, name, price, duration, category);
  } else if (typeof openBookingModal === 'function') {
    openBookingModal(id, name, price, duration, category);
  }
};
</script>`
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Fixed booking modal & paths in:', relPath);
});
