export default {
    title: 'CSV to JSON Converter',
    shortName: 'CSV to JSON',
    seoTitle: 'CSV to JSON Converter - Modern Data Formatting',
    seoDescription: 'Convert CSV text into JSON format instantly. Clean, fast, and easy online CSV to JSON translator for web developers.',
    description: 'Convert CSV (Comma Separated Values) text into JSON format instantly. Clean, fast, and easy online CSV to JSON translator.',
    content: {
        howTo: [
            'Paste your CSV text into the input field (ensure the first row contains headers).',
            'Choose your preferred JSON format (Array of Objects).',
            'Copy the generated JSON code for use in your project.'
        ]
    },
    about: '<p>The CSV to JSON Converter turns your spreadsheet-style comma-separated data into structured JSON arrays. This is extremely useful for developers who need to convert export files from Excel or databases into data formats usable in web applications and APIs.</p>',
    how: '<ol><li>Paste your CSV text into the input field (ensure the first row contains headers).</li><li>Choose your preferred JSON format (Array of Objects).</li><li>Copy the generated JSON code for use in your project.</li></ol>',
    why: '<h3>Key Features</h3><ul><li><strong>Header Integration:</strong> Uses the first row of your CSV as keys for the resulting JSON objects.</li><li><strong>Dynamic Parsing:</strong> Handles various delimiters and quoted strings effectively.</li><li><strong>Clean Formatting:</strong> Outputs beautiful, indented JSON for easy reading.</li><li><strong>Local Execution:</strong> Your data remains confidential and never leaves your machine.</li></ul>',
    faq: [
        { question: 'Does the first row need to be a header?', answer: '<p>Yes, our tool uses the first row to determine the keys for each JSON object in the output array.</p>' },
        { question: 'What delimiters are supported?', answer: '<p>Currently, the tool supports standard commas. We are working on support for semicolons and tabs in future updates.</p>' }
    ],
    relatedTools: ['json-to-csv', 'url-encoder-decoder']
};
