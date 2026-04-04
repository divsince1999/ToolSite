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

export default toolsData;
