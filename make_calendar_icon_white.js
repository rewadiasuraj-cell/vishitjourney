const fs = require('fs');

console.log('Making HTML5 date picker calendar icon shape white...');

// 1. Update assets/css/booking.css
const bookingCss = 'd:/vishit-journeys/assets/css/booking.css';
if (fs.existsSync(bookingCss)) {
  let content = fs.readFileSync(bookingCss, 'utf8');
  if (!content.includes('/* MAKE CALENDAR PICKER ICON WHITE */')) {
    content += `\n/* MAKE CALENDAR PICKER ICON WHITE */
input[type="date"] {
  color-scheme: dark !important;
  color: #ffffff !important;
}
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1) brightness(100%) !important;
  cursor: pointer !important;
  opacity: 1 !important;
}
input[type="date"]::-moz-calendar-picker-indicator {
  filter: invert(1) brightness(100%) !important;
  cursor: pointer !important;
  opacity: 1 !important;
}
`;
    fs.writeFileSync(bookingCss, content, 'utf8');
    console.log('Updated booking.css with white calendar icon rule!');
  }
}

// 2. Update index.php
const phpFile = 'd:/vishit-journeys/index.php';
if (fs.existsSync(phpFile)) {
  let content = fs.readFileSync(phpFile, 'utf8');

  const whiteCalendarCss = `
  /* MAKE CALENDAR PICKER ICON WHITE */
  input[type="date"] {
    color-scheme: dark !important;
    color: #ffffff !important;
  }
  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1) brightness(100%) !important;
    cursor: pointer !important;
    opacity: 1 !important;
  }
  input[type="date"]::-moz-calendar-picker-indicator {
    filter: invert(1) brightness(100%) !important;
    cursor: pointer !important;
    opacity: 1 !important;
  }
`;

  if (!content.includes('/* MAKE CALENDAR PICKER ICON WHITE */')) {
    content = content.replace('/* ALL SHAPES CURVED STYLING */', whiteCalendarCss + '\n  /* ALL SHAPES CURVED STYLING */');
    fs.writeFileSync(phpFile, content, 'utf8');
    console.log('Updated index.php with white calendar icon rule!');
  }
}
