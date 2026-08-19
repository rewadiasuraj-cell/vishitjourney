const fs = require('fs');
const https = require('https');
const http = require('http');

// 1. Update sitemap.xml with updated lastmod and complete URLs
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.vishitjourney.com/</loc>
    <lastmod>2026-08-19</lastmod>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://vishitjourney.com/</loc>
    <lastmod>2026-08-19</lastmod>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.vishitjourney.com/favicon.svg</loc>
    <lastmod>2026-08-19</lastmod>
    <changefreq>always</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.vishitjourney.com/favicon-32x32.png</loc>
    <lastmod>2026-08-19</lastmod>
    <changefreq>always</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.vishitjourney.com/favicon.ico</loc>
    <lastmod>2026-08-19</lastmod>
    <changefreq>always</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`.trim();

fs.writeFileSync('d:\\vishit-journeys\\sitemap.xml', sitemapContent, 'utf8');
console.log('Updated sitemap.xml with 2026-08-18 lastmod timestamp.');

// 2. Ping Google and Bing Webmaster Crawlers
const pingUrls = [
  'http://www.google.com/ping?sitemap=https://www.vishitjourney.com/sitemap.xml',
  'http://www.google.com/ping?sitemap=https://vishitjourney.com/sitemap.xml',
  'http://www.bing.com/ping?sitemap=https://www.vishitjourney.com/sitemap.xml'
];

pingUrls.forEach(url => {
  const req = (url.startsWith('https') ? https : http).get(url, (res) => {
    console.log(`Pinged crawler: ${url} => Status: ${res.statusCode}`);
  });
  req.on('error', (e) => {
    console.log(`Ping error for ${url}: ${e.message}`);
  });
});
