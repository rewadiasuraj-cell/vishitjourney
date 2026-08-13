const fs = require('fs');
const path = require('path');

const premiumCssInjections = `
  /* ── PREMIUM CURVED EDGES & ELEVATED SHADOWS ── */
  .pkg2 {
    border-radius: 18px !important;
    border: 1px solid rgba(201,165,74,0.25) !important;
    overflow: hidden !important;
    background: var(--navy2) !important;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
    transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  }
  .pkg2:hover {
    transform: translateY(-8px) !important;
    box-shadow: 0 20px 45px rgba(201,165,74,0.2) !important;
    border-color: rgba(201,165,74,0.5) !important;
  }
  .pkg2-img {
    border-top-left-radius: 18px !important;
    border-top-right-radius: 18px !important;
    overflow: hidden !important;
  }
  .pkg2-badge {
    border-radius: 8px !important;
    backdrop-filter: blur(6px) !important;
  }
  .pkg2-price {
    border-radius: 10px !important;
    border: 1px solid rgba(201,165,74,0.4) !important;
    backdrop-filter: blur(8px) !important;
  }
  .pkg2-btn {
    border-radius: 12px !important;
    font-weight: 600 !important;
    transition: all 0.3s ease !important;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important;
  }
  .pkg2-btn:hover {
    border-radius: 12px !important;
    box-shadow: 0 6px 20px rgba(201,165,74,0.35) !important;
  }

  .dest-card {
    border-radius: 20px !important;
    overflow: hidden !important;
    border: 1px solid rgba(201,165,74,0.25) !important;
    box-shadow: 0 12px 35px rgba(0,0,0,0.35) !important;
    transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  }
  .dest-card:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 20px 45px rgba(201,165,74,0.2) !important;
    border-color: rgba(201,165,74,0.5) !important;
  }
  .dest-tag {
    border-radius: 8px !important;
  }

  .pkg-tab, .filter-btn, .tab-btn {
    border-radius: 25px !important;
    padding: .6rem 1.6rem !important;
    border: 1px solid rgba(201,165,74,0.3) !important;
    font-weight: 600 !important;
    box-shadow: 0 4px 15px rgba(0,0,0,0.15) !important;
    transition: all 0.3s ease !important;
  }
  .pkg-tab:hover, .pkg-tab.active {
    box-shadow: 0 6px 20px rgba(201,165,74,0.3) !important;
  }

  .testi-card {
    border-radius: 18px !important;
    border: 1px solid rgba(201,165,74,0.2) !important;
    box-shadow: 0 8px 25px rgba(0,0,0,0.25) !important;
    transition: all 0.3s ease !important;
  }
  .testi-card:hover {
    transform: translateY(-5px) !important;
    border-color: rgba(201,165,74,0.4) !important;
  }

  .why-img, .why-img img {
    border-radius: 20px !important;
  }
  .why-badge {
    border-radius: 14px !important;
  }

  .booking-modal-content, .modal-content {
    border-radius: 20px !important;
    border: 1px solid rgba(201,165,74,0.3) !important;
    box-shadow: 0 25px 60px rgba(0,0,0,0.5) !important;
  }
`;

const targetFiles = [
  'd:/vishit-journeys/Vishit Journey.html',
  'd:/vishit-journeys/index.html',
  'd:/vishit-journeys/new update/index.html',
  'd:/vishit-journeys/new update/Vishit Journey.html',
  'd:/vishit-journeys/NEW CHAT/index.html'
];

targetFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  console.log('Injecting premium curved CSS into:', file);
  let content = fs.readFileSync(file, 'utf8');

  // Inject before </style>
  if (content.includes('</style>')) {
    content = content.replace('</style>', `${premiumCssInjections}\n</style>`);
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated:', file);
});

console.log('Done injecting premium curved edges & elevated shadows!');
