const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'tools');
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

files.forEach(file => {
    const filePath = path.join(toolsDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    
    // Replace <script src="..."> that lack "defer"
    let updated = original.replace(/<script([^>]*?)src="([^"]+)"([^>]*?)>/g, (match, p1, p2, p3) => {
        if (!match.includes('defer')) {
            return `<script${p1}src="${p2}"${p3} defer>`;
        }
        return match;
    });

    if (original !== updated) {
        fs.writeFileSync(filePath, updated, 'utf8');
        updatedCount++;
        console.log(`Updated scripts in: ${file}`);
    }
});

console.log(`Finished processing. Updated ${updatedCount} files.`);
