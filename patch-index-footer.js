const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Rename "Explore" header to "Legal"
content = content.replace(
    /<h3 style="margin-bottom: 1rem; font-size: 1.1rem;">Explore<\/h3>/,
    '<h3 style="margin-bottom: 1rem; font-size: 1.1rem;">Legal</h3>'
);

// Add Privacy Policy link before "View All Tools"
content = content.replace(
    '<li><a href="/index.html#tools" style="color: var(--primary); text-decoration: none; font-weight: 600;">View All Tools &rarr;</a></li>',
    '<li style="margin-bottom: 0.5rem;"><a href="/privacy.html" style="color: var(--text-muted); text-decoration: none;">Privacy Policy</a></li>\n                    <li><a href="/index.html#tools" style="color: var(--primary); text-decoration: none; font-weight: 600;">View All Tools &rarr;</a></li>'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('index.html footer updated.');
