const fs = require('fs');
const path = require('path');

const rootDir = 'd:\\vishit-journeys';

const fullAddressText = "Metro Pillar No. 786, Jai Bharat ENC, Office On First Floor, Plot No. 2, 55 Feet Rd, Near Aggarwal Sweets, Bhagwati Garden, Uttam Nagar, New Delhi, Delhi - 110059";

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Replace contact-row address occurrences
  content = content.replace(/📍\s*1st Floor Plot no\. 2 Metro Pillar 786 Dwarka Mor New Delhi\./g, `📍 ${fullAddressText}`);
  content = content.replace(/📍\s*Your City, India/g, `📍 ${fullAddressText}`);
  content = content.replace(/📍\s*Delhi, Dwarka/g, `📍 ${fullAddressText}`);

  // 2. Replace Metro Pillar No. 786, Jai Bharat ENC, Office On First Floor, Plot No. 2, 55 Feet Rd, Near Aggarwal Sweets, Bhagwati Garden, Uttam Nagar, New Delhi, Delhi - 110059 in contact page info cards
  content = content.replace(/Vishit Journey Travel Agency,\s*New Delhi\s*\/\s*NCR,\s*India/g, fullAddressText);

  // 3. Update Google Organization Schema if present
  if (content.includes('"@type": "Organization"') && !content.includes('"PostalAddress"')) {
    const schemaAddress = `,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Office On First Floor, Plot No. 2, Metro Pillar No. 786, 55 Feet Rd, Near Aggarwal Sweets, Jai Bharat ENC, Bhagwati Garden",
    "addressLocality": "Uttam Nagar, New Delhi",
    "addressRegion": "Delhi",
    "postalCode": "110059",
    "addressCountry": "IN"
  }`;
    content = content.replace(/("url":\s*"https:\/\/www\.vishitjourney\.com"[^}]*)/g, `$1${schemaAddress}`);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated full address in:', filePath);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === '.git' || file === 'node_modules') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.html') || file.endsWith('.php') || file.endsWith('.js') || file.endsWith('.json')) {
      processFile(fullPath);
    }
  }
}

walkDir(rootDir);
console.log('Full address update across entire site complete!');
