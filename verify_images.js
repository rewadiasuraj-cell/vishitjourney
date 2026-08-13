const fs = require('fs');

const content = fs.readFileSync('d:/vishit-journeys/Vishit Journey.html', 'utf8');

['Kashmir Paradise Package', 'Kasol + Manali Combo', 'Rajasthan Royal Package', 'Udaipur Romantic Package', 'Shimla Manali Package'].forEach(name => {
  const idx = content.indexOf(name);
  if (idx !== -1) {
    const block = content.substring(idx - 300, idx + 50);
    const srcStart = block.indexOf('src="') + 5;
    const srcEnd = block.indexOf('"', srcStart);
    console.log(name, '=> Image URL:', block.substring(srcStart, srcEnd));
  }
});
