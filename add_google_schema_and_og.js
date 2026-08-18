const fs = require('fs');

const ogAndSchema = `
<meta property="og:site_name" content="Vishit Journey">
<meta property="og:title" content="Vishit Journey — Travel Beyond Limits">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.vishitjourney.com/">
<meta property="og:image" content="https://www.vishitjourney.com/favicon.png">
<meta property="og:image:width" content="512">
<meta property="og:image:height" content="512">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Vishit Journey",
  "url": "https://www.vishitjourney.com",
  "logo": "https://www.vishitjourney.com/favicon.png"
,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Office On First Floor, Plot No. 2, Metro Pillar No. 786, 55 Feet Rd, Near Aggarwal Sweets, Jai Bharat ENC, Bhagwati Garden",
    "addressLocality": "Uttam Nagar, New Delhi",
    "addressRegion": "Delhi",
    "postalCode": "110059",
    "addressCountry": "IN"
  }}
</script>
`.trim();

['d:\\vishit-journeys\\index.html', 'd:\\vishit-journeys\\index.php'].forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('schema.org')) {
      content = content.replace(/(<link rel="manifest"[^>]*>)/i, `$1\n${ogAndSchema}`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Added Google Organization schema & OpenGraph logo tags to:', filePath);
    }
  }
});
