const fs = require('fs');
const https = require('https');
const http = require('http');

// 1. Update sitemap.xml with updated lastmod and complete URLs
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.vishitjourney.com/</loc>
    <lastmod>2026-08-18</lastmod>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://vishitjourney.com/</loc>
    <lastmod>2026-08-18</lastmod>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.vishitjourney.com/blog.html</loc>
    <lastmod>2026-08-18</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.vishitjourney.com/about.html</loc>
    <lastmod>2026-08-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.vishitjourney.com/contact.html</loc>
    <lastmod>2026-08-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.vishitjourney.com/favicon-48x48.png</loc>
    <lastmod>2026-08-18</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.vishitjourney.com/favicon.ico</loc>
    <lastmod>2026-08-18</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
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
