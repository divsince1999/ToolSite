export default {
    title: 'Binary to Text Converter',
    shortName: 'Binary to Text',
    seoTitle: 'Binary to Text Converter - Decipher Binary Code',
    seoDescription: 'Convert binary code back into human-readable text instantly. Free online binary translator for developers and students.',
    description: 'Convert binary code (0s and 1s) back into human-readable text instantly.',
    content: {
        howTo: [
            'Paste your binary code (sequences of 0s and 1s) into the input box.',
            'Ensure there are spaces between 8-bit binary blocks for best results.',
            'The tool will automatically detect and convert the binary into readable text.'
        ]
    },
    about: '<p>The Binary to Text Converter is the reverse of our text-to-binary tool. It takes sequences of binary digits and translates them back into the characters they represent, making it easy to decode binary strings.</p>',
    how: '<ol><li>Paste your binary code (sequences of 0s and 1s) into the input box.</li><li>Ensure there are spaces between 8-bit binary blocks for best results.</li><li>The tool will automatically detect and convert the binary into readable text.</li></ol>',
    why: '<h3>Key Features</h3><ul><li><strong>Smart Detection:</strong> Handles binary strings with or without spaces (8-bit aligned).</li><li><strong>Error Resilience:</strong> Gracefully skips invalid binary sequences.</li><li><strong>High Precision:</strong> Accurate translation for all standard ASCII characters.</li></ul>',
    faq: [
        { question: 'Does it work with binary strings without spaces?', answer: '<p>Yes, as long as the binary string consists of 8-bit blocks (e.g., 0100000101000010), the tool will process it correctly.</p>' },
        { question: 'What happens if the binary is invalid?', answer: '<p>The tool will attempt to decode what it can and ignore non-binary characters.</p>' }
    ],
    relatedTools: ['text-to-binary', 'base64-encoder-decoder']
};