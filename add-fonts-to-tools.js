const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'tools');
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.html'));

const fontTags = `    <!-- Preconnect to Font Servers -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <!-- Non-blocking Google Fonts Link -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
`;

let updatedCount = 0;

files.forEach(file => {
    const filePath = path.join(toolsDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    
    if (!original.includes('fonts.googleapis.com')) {
        let updated = original.replace(
            '        <!-- Critical CSS for Instant First Paint -->',
            fontTags + '        <!-- Critical CSS for Instant First Paint -->'
        );
        
        fs.writeFileSync(filePath, updated, 'utf8');
        updatedCount++;
        console.log(`Injected fonts in: ${file}`);
    }
});

console.log(`Finished processing. Updated ${updatedCount} files.`);
