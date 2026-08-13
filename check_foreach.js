const fs = require('fs');
const content = fs.readFileSync('d:/vishit-journeys/index.php', 'utf8');

const lines = content.split('\n');
lines.forEach((line, i) => {
  if (line.includes('foreach')) {
    console.log('Line', i + 1, ':', line.trim());
  }
});
