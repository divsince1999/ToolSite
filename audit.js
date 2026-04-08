const fs = require('fs');
const path = require('path');

const issues = [];
const root = __dirname;
const dataDir = path.join(root, 'data', 'tools');
const toolsDir = path.join(root, 'tools');
const jsDir = path.join(root, 'js');
const componentsToolsDir = path.join(root, 'components', 'tools');

function checkFileExists(filePath, description) {
    if (!fs.existsSync(filePath)) {
        issues.push(`MISSING FILE: ${description} at ${path.relative(root, filePath)}`);
        return false;
    }
    return true;
}

// 1. Check Data Modules (20 tools)
const expectedTools = [
    'base64-encoder-decoder', 'binary-to-text', 'character-counter', 'csv-to-json', 
    'find-and-replace', 'hex-to-rgb', 'json-to-csv', 'lorem-ipsum', 'password-generator', 
    'random-number-generator', 'random-string-generator', 'remove-extra-spaces', 
    'remove-line-breaks', 'slug-generator', 'text-case-converter', 'text-reverser', 
    'text-sorter', 'text-to-binary', 'url-encoder-decoder', 'word-counter'
];

expectedTools.forEach(slug => {
    // Check files
    checkFileExists(path.join(toolsDir, `${slug}.html`), `Tool Shell HTML (${slug})`);
    checkFileExists(path.join(componentsToolsDir, `${slug}.html`), `Component HTML (${slug})`);
    
    const dataPath = path.join(dataDir, `${slug}.js`);
    if (checkFileExists(dataPath, `Data Module (${slug})`)) {
        try {
            const content = fs.readFileSync(dataPath, 'utf8');
            if (!content.includes('shortName')) issues.push(`DATA: ${slug} missing 'shortName'`);
            if (!content.includes('seoTitle')) issues.push(`DATA: ${slug} missing 'seoTitle'`);
            if (!content.includes('seoDescription')) issues.push(`DATA: ${slug} missing 'seoDescription'`);
            if (!content.includes('howTo:')) issues.push(`DATA: ${slug} missing 'content.howTo'`);
            if (!content.includes('relatedTools')) issues.push(`DATA: ${slug} missing 'relatedTools'`);
        } catch (e) {
            issues.push(`ERROR reading ${slug}.js: ${e.message}`);
        }
    }
});

// 2. Check index.html for broken tool links
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const links = indexHtml.match(/href="tools\/[^"]+\.html"/g);
if (links) {
    links.forEach(link => {
        const url = link.replace('href="', '').replace('"', '');
        if (!fs.existsSync(path.join(root, url))) {
            issues.push(`BROKEN LINK in index.html: ${url}`);
        }
    });
}

// 3. Print Results
if (issues.length > 0) {
    console.log('--- FOUND ISSUES ---');
    issues.forEach(i => console.log(i));
} else {
    console.log('--- NO STRUCTURAL ISSUES FOUND ---');
}
