const fs = require('fs');
const path = require('path');

// Fix index.html — at root, so /index.html -> index.html, /privacy.html -> privacy.html
const indexPath = path.join(__dirname, 'index.html');
let index = fs.readFileSync(indexPath, 'utf8');
index = index.replace(/href="\/index\.html"/g, 'href="index.html"');
index = index.replace(/href="\/index\.html#tools"/g, 'href="#tools"');
index = index.replace(/href="\/privacy\.html"/g, 'href="privacy.html"');
fs.writeFileSync(indexPath, index, 'utf8');
console.log('index.html paths fixed.');

// Fix privacy.html — at root, so /index.html -> index.html
const privacyPath = path.join(__dirname, 'privacy.html');
let privacy = fs.readFileSync(privacyPath, 'utf8');
privacy = privacy.replace(/href="\/index\.html"/g, 'href="index.html"');
privacy = privacy.replace(/href="\/index\.html#tools"/g, 'href="index.html#tools"');
privacy = privacy.replace(/href="\/privacy\.html"/g, 'href="privacy.html"');
fs.writeFileSync(privacyPath, privacy, 'utf8');
console.log('privacy.html paths fixed.');

// Fix renderTool.js — breadcrumb link: ../index.html is already correct (used in tool page context)
// but privacy badge links to ../privacy.html which is correct — no changes needed.
console.log('All path fixes applied.');
