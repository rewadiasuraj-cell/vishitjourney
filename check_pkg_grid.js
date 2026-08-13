const fs = require('fs');
const content = fs.readFileSync('d:/vishit-journeys/index.php', 'utf8');

const start = content.indexOf('id="packagesGrid"');
if (start !== -1) {
  console.log(content.substring(start - 50, start + 800));
} else {
  console.log('packagesGrid not found');
}
