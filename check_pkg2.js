const fs = require('fs');
const content = fs.readFileSync('d:/vishit-journeys/index.php', 'utf8');

const start = content.indexOf('class="pkg2"');
if (start !== -1) {
  console.log(content.substring(start - 200, start + 800));
} else {
  console.log('class="pkg2" not found in index.php');
}
