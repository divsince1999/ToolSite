const fs = require('fs');
const path = require('path');

const cspTag = `    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;">`;

const htmlFiles = [
    path.join(__dirname, 'index.html'),
    ...fs.readdirSync(path.join(__dirname, 'tools')).filter(f => f.endsWith('.html')).map(f => path.join(__dirname, 'tools', f))
];

let updatedCount = 0;
htmlFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('Content-Security-Policy')) {
        // Inject after <head> or first <meta charset=...> tag
        content = content.replace(/<meta charset="UTF-8">/, `<meta charset="UTF-8">\n${cspTag}`);
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
        console.log(`CSP added: ${path.basename(filePath)}`);
    } else {
        console.log(`CSP already exists: ${path.basename(filePath)}`);
    }
});

console.log(`\nDone. CSP injected into ${updatedCount} of ${htmlFiles.length} files.`);
