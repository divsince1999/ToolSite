const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data', 'tools');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.js'));
const privacySuffix = ' 100% private — no data saved. All processing is done locally in your browser.';

let updatedCount = 0;
files.forEach(file => {
    const filePath = path.join(dataDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Only update if privacy phrase isn't already present
    if (!content.includes('100% private')) {
        content = content.replace(
            /(seoDescription:\s*')([^']+)(')/,
            (match, pre, desc, post) => `${pre}${desc}${privacySuffix}${post}`
        );
        content = content.replace(
            /(seoDescription:\s*")([^"]+)(")/,
            (match, pre, desc, post) => `${pre}${desc}${privacySuffix}${post}`
        );
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
        console.log(`Updated: ${file}`);
    } else {
        console.log(`Skipped (already has privacy): ${file}`);
    }
});

console.log(`\nDone. Updated ${updatedCount} of ${files.length} files.`);
