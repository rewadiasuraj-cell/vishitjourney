const fs = require('fs');

const phpContent = fs.readFileSync('d:/vishit-journeys/index.php', 'utf8');

// Find DOCTYPE start
const htmlStartIndex = phpContent.indexOf('<!DOCTYPE html>');
if (htmlStartIndex === -1) {
  console.error('DOCTYPE not found in index.php');
  process.exit(1);
}

let html = phpContent.substring(htmlStartIndex);

// Print header logo section
const logoIndex = html.indexOf('class="logo"');
console.log('Logo section in index.php:\n', html.substring(logoIndex - 100, logoIndex + 400));
