export default {
    title: 'JSON to CSV Converter',
    shortName: 'JSON to CSV',
    seoTitle: 'JSON to CSV Converter - Data Migration Tool',
    seoDescription: 'Convert JSON data into CSV format instantly. Free online JSON to CSV translator for data migration and spreadsheet analysis.',
    description: 'Convert JSON data into CSV format instantly. Free online JSON to CSV translator for data migration and spreadsheet analysis.',
    content: {
        howTo: [
            'Paste your JSON array or object list into the input area.',
            'The tool will automatically detect the keys and convert them into CSV headers.',
            'Click "Download CSV" or "Copy Result" to save your transformed data.'
        ]
    },
    about: '<p>The JSON to CSV Converter is an essential tool for data analysts and developers who need to transform structured JSON data into a flat CSV (Comma Separated Values) format. This is perfect for importing data into Excel, Google Sheets, or traditional databases.</p>',
    how: '<ol><li>Paste your JSON array or object list into the input area.</li><li>The tool will automatically detect the keys and convert them into CSV headers.</li><li>Click "Download CSV" or "Copy Result" to save your transformed data.</li></ol>',
    why: '<h3>Key Features</h3><ul><li><strong>Auto-Header Detection:</strong> Automatically extracts column names from your JSON keys.</li><li><strong>Handles Nested Data:</strong> Flattens simple nested objects for clean CSV output.</li><li><strong>Instant Preview:</strong> See your CSV structure as you refine your JSON input.</li><li><strong>Privacy Centric:</strong> No data is ever uploaded; all processing happens in your browser.</li></ul>',
    faq: [
        { question: 'Can I convert complex nested JSON?', answer: '<p>Our tool supports basic nesting. For deeply nested structures, it will represent objects as strings to maintain CSV compatibility.</p>' },
        { question: 'Is there a file size limit?', answer: '<p>The tool can handle large JSON blocks up to several megabytes depending on your browser performance.</p>' }
    ],
    relatedTools: ['csv-to-json', 'url-encoder-decoder']
};
