const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// The pattern is:
// <h3>Tool Name</h3>
// <p ...>...</p>
// <div ...>
//     Open Tool &rarr;  (or Open Tool -> or Open Tool →)
// </div>

const regex = /<h3>(.*?)<\/h3>([\s\S]*?)<div([^>]*)>[\s]*Open Tool[\s]*[→\u2192&rarr;]+[\s]*<\/div>/g;

const updatedContent = content.replace(regex, (match, title, middle, divAttrs) => {
    return `<h3>${title}</h3>${middle}<div${divAttrs}>\n                            Open ${title} &rarr;\n                        </div>`;
});

fs.writeFileSync(indexPath, updatedContent, 'utf8');
console.log('Homepage anchor text updated successfully.');
