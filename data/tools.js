import loremIpsum from './tools/lorem-ipsum.js';
import passwordGenerator from './tools/password-generator.js';
import randomNumberGenerator from './tools/random-number-generator.js';
import randomStringGenerator from './tools/random-string-generator.js';
import slugGenerator from './tools/slug-generator.js';
import textCaseConverter from './tools/text-case-converter.js';
import removeExtraSpaces from './tools/remove-extra-spaces.js';
import removeLineBreaks from './tools/remove-line-breaks.js';
import base64Codec from './tools/base64-encoder-decoder.js';
import urlCodec from './tools/url-encoder-decoder.js';
import characterCounter from './tools/character-counter.js';
import textReverser from './tools/text-reverser.js';
import textSorter from './tools/text-sorter.js';
import wordCounter from './tools/word-counter.js';
import findAndReplace from './tools/find-and-replace.js';

// New Batch 4 Tools
import textToBinary from './tools/text-to-binary.js';
import binaryToText from './tools/binary-to-text.js';
import hexToRgb from './tools/hex-to-rgb.js';
import jsonToCsv from './tools/json-to-csv.js';
import csvToJson from './tools/csv-to-json.js';

// Central index of all tools
const toolsData = {
    // MIGRATED TOOLS (Using new modular split)
    'lorem-ipsum': loremIpsum,
    'password-generator': passwordGenerator,
    'random-number-generator': randomNumberGenerator,
    'random-string-generator': randomStringGenerator,
    'slug-generator': slugGenerator,
    'text-case-converter': textCaseConverter,
    'remove-extra-spaces': removeExtraSpaces,
    'remove-line-breaks': removeLineBreaks,
    'base64-encoder-decoder': base64Codec,
    'url-encoder-decoder': urlCodec,
    'character-counter': characterCounter,
    'text-reverser': textReverser,
    'text-sorter': textSorter,
    'word-counter': wordCounter,
    'find-and-replace': findAndReplace,
    
    // NEW TOOLS
    'text-to-binary': textToBinary,
    'binary-to-text': binaryToText,
    'hex-to-rgb': hexToRgb,
    'json-to-csv': jsonToCsv,
    'csv-to-json': csvToJson
};

const categoryMap = {
    'Text Tools': ['word-counter', 'character-counter', 'remove-extra-spaces', 'find-and-replace', 'text-case-converter', 'remove-line-breaks', 'text-sorter', 'text-reverser', 'lorem-ipsum'],
    'Developer Tools': ['base64-encoder-decoder', 'url-encoder-decoder', 'slug-generator', 'json-to-csv', 'csv-to-json', 'text-to-binary', 'binary-to-text', 'hex-to-rgb', 'random-string-generator', 'random-number-generator', 'password-generator']
};

// Map Categories and Ensure Automated Circular Back-Linking
Object.keys(toolsData).forEach(slug => {
    const tool = toolsData[slug];
    
    // Assign Category for Breadcrumbs
    for (const [category, slugs] of Object.entries(categoryMap)) {
        if (slugs.includes(slug)) {
            tool.category = category;
            break;
        }
    }

    // Process Outbound Links to ensure symmetrical related tools
    if (tool.relatedTools && Array.isArray(tool.relatedTools)) {
        tool.relatedTools.forEach(relSlug => {
            const relTool = toolsData[relSlug];
            if (relTool) {
                if (!relTool.relatedTools) {
                    relTool.relatedTools = [];
                }
                // If Target doesn't link back to Source, add it!
                if (!relTool.relatedTools.includes(slug)) {
                    relTool.relatedTools.push(slug);
                }
            }
        });
    }
});

export default toolsData;
