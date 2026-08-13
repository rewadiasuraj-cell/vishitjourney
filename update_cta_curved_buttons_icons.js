const fs = require('fs');

console.log('Updating Call Us Now and WhatsApp Us buttons to curved shape with vector SVG icons...');

const phpFile = 'd:/vishit-journeys/index.php';
if (fs.existsSync(phpFile)) {
  let content = fs.readFileSync(phpFile, 'utf8');

  // Replace CTA section buttons with curved shapes and vector SVG icons
  const ctaOld = `<a href="tel:919899902890" class="btn-gold">📞 Call Us Now</a>
    <a href="https://wa.me/919999999999" class="btn-outline">💬 WhatsApp Us</a>`;

  const phoneSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.11-.27c1.21.49 2.53.76 3.88.76.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.35.27 2.67.76 3.88.13.31.06.69-.2.95l-2.24 2.24z"/></svg>`;
  
  const whatsappSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

  const ctaNew = `<a href="tel:919899902890" class="btn-gold">${phoneSvg} CALL US NOW</a>
    <a href="https://wa.me/919899902890" target="_blank" class="btn-outline">${whatsappSvg} WHATSAPP US</a>`;

  content = content.replace(/<a href="tel:919899902890" class="btn-gold">[^]*?<\/a>\s*<a href="https:\/\/wa\.me\/[^]*?<\/a>/gi, ctaNew);

  // Inject CSS override to enforce curved rounded shapes and flex alignment for .btn-gold & .btn-outline
  const curvedBtnCss = `
  /* CURVED BUTTON SHAPES & VECTOR SVG ALIGNMENT */
  .btn-gold {
    padding: .9rem 2.2rem !important;
    background: var(--gold) !important;
    color: var(--navy) !important;
    font-size: .8rem !important;
    font-weight: 700 !important;
    letter-spacing: 2px !important;
    text-transform: uppercase !important;
    text-decoration: none !important;
    border: none !important;
    cursor: pointer !important;
    transition: all .25s ease !important;
    border-radius: 30px !important;
    clip-path: none !important;
    box-shadow: 0 4px 15px rgba(201, 165, 74, 0.35) !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: .6rem !important;
  }
  .btn-gold:hover {
    background: var(--gold2) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 20px rgba(201, 165, 74, 0.5) !important;
  }
  .btn-outline {
    padding: .9rem 2.2rem !important;
    background: rgba(255, 255, 255, 0.05) !important;
    color: var(--white) !important;
    font-size: .8rem !important;
    font-weight: 600 !important;
    letter-spacing: 2px !important;
    text-transform: uppercase !important;
    text-decoration: none !important;
    border: 1.5px solid rgba(255, 255, 255, 0.4) !important;
    cursor: pointer !important;
    transition: all .25s ease !important;
    border-radius: 30px !important;
    clip-path: none !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: .6rem !important;
  }
  .btn-outline:hover {
    border-color: var(--gold) !important;
    color: var(--gold) !important;
    background: rgba(201, 165, 74, 0.1) !important;
    transform: translateY(-2px) !important;
  }
`;

  if (!content.includes('CURVED BUTTON SHAPES & VECTOR SVG ALIGNMENT')) {
    content = content.replace('/* ALL SHAPES CURVED STYLING */', curvedBtnCss + '\n  /* ALL SHAPES CURVED STYLING */');
  }

  fs.writeFileSync(phpFile, content, 'utf8');
  console.log('Updated index.php with curved CTA buttons and vector SVG icons!');
}
