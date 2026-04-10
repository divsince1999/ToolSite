const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'tools');
const dataDir = path.join(__dirname, 'data', 'tools');
const baseUrl = 'https://divsince1999.github.io/ToolSite/tools/';

const htmlFiles = fs.readdirSync(toolsDir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    const slug = path.basename(file, '.html');
    const htmlPath = path.join(toolsDir, file);
    const dataPath = path.join(dataDir, `${slug}.js`);

    if (!fs.existsSync(dataPath)) {
        console.warn(`Data module not found for: ${slug}`);
        return;
    }

    const dataContent = fs.readFileSync(dataPath, 'utf8');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Extracting fields using regex to handle basic JS objects
    // Handles single, double, and backtick quotes
    const extract = (prop) => {
        const regex = new RegExp(`${prop}:\\s*['"\`]([\\s\\S]*?)['"\`]`);
        const match = dataContent.match(regex);
        return match ? match[1].trim() : null;
    };

    const seoTitle = extract('seoTitle');
    const seoDescription = extract('seoDescription');
    const description = extract('description');

    if (!seoTitle || !seoDescription) {
        console.warn(`Missing metadata in ${slug}.js`);
        return;
    }

    let updatedHtml = htmlContent;

    // 1. Update <title>
    updatedHtml = updatedHtml.replace(
        /<title>([\s\S]*?)<\/title>/,
        `<title>${seoTitle}</title>`
    );

    // 2. Update <meta name="description">
    updatedHtml = updatedHtml.replace(
        /<meta name="description" content="([\s\S]*?)">/,
        `<meta name="description" content="${seoDescription}">`
    );

    // 3. Update <link rel="canonical">
    const canonicalUrl = `${baseUrl}${file}`;
    updatedHtml = updatedHtml.replace(
        /<link rel="canonical" href="([\s\S]*?)" id="canonical-link">/,
        `<link rel="canonical" href="${canonicalUrl}" id="canonical-link">`
    );

    // 4. Update <noscript> block in body
    const noscriptTag = `\n        <noscript>\n            <div class="container text-center section">\n                <p>${description || seoDescription}</p>\n                <p>Please enable JavaScript to use the ${seoTitle.split(' - ')[0]} tool.</p>\n            </div>\n        </noscript>`;

    // Check if noscript already exists specifically in the app div or body area
    const appIndex = updatedHtml.indexOf('<div id="app">');
    const bodyNoscriptIndex = updatedHtml.indexOf('<noscript>', appIndex);

    if (bodyNoscriptIndex === -1) {
        // Not found in body after app div start, safe to inject
        updatedHtml = updatedHtml.replace(
            /(<div id="app">)(\s*)(<!-- Static SEO Fallback -->)/,
            `$1$2${noscriptTag}$2$3`
        );
    } else {
        // Found one, let's update it if it's the simple one we might have added before
        // For now, let's just assume we want to re-inject if it doesn't look like our tool description
        // Actually, if it's already there, we might want to skip or replace.
        // For simplicity during this sync, let's just force replace if it's the one we expect.
    }

    fs.writeFileSync(htmlPath, updatedHtml, 'utf8');
    console.log(`Successfully updated: ${file}`);
});

console.log('Sync complete.');
