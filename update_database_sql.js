const fs = require('fs');

let sql = fs.readFileSync('d:/vishit-journeys/sql/database.sql', 'utf8');

// Replace mismatched image URLs in SQL dump
sql = sql.replace(/https:\/\/images\.unsplash\.com\/photo-1602216056096-3b40cc0c9944\?w=600&q=80/g, 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=600&q=80'); // Kashmir
sql = sql.replace(/https:\/\/images\.unsplash\.com\/photo-1599661046289-e31897846e41\?w=600&q=80/g, 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&q=80'); // Manali Honeymoon
sql = sql.replace(/https:\/\/images\.unsplash\.com\/photo-1587474260584-136574528ed5\?w=600&q=80/g, 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80'); // Kasol
sql = sql.replace(/https:\/\/images\.unsplash\.com\/photo-1524492412937-b28074a5d7da\?w=600&q=80/g, 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80'); // Rajasthan
sql = sql.replace(/https:\/\/images\.unsplash\.com\/photo-1570168007204-dfb528c6958f\?w=600&q=80/g, 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=600&q=80'); // Udaipur
sql = sql.replace(/https:\/\/images\.unsplash\.com\/photo-1467173572719-f14b9fb86e5f\?w=600&q=80/g, 'https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=600&q=80'); // Shimla

fs.writeFileSync('d:/vishit-journeys/sql/database.sql', sql, 'utf8');
console.log('Updated database.sql with correct location images.');
