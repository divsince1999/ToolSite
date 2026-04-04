const findReplace = {
    title: 'Find and Replace Text',
    shortName: 'Find & Replace',
    seoTitle: 'Find and Replace Text - Professional Text Editing',
    seoDescription: 'Find and replace specific words or phrases in your text instantly. Save time on large-scale text edits with our free online tool.',
    description: 'Quickly find specific words or phrases in your text and replace them instantly. Free online find and replace tool.',
    content: {
        howTo: [
            'Paste the source text into the primary "Input Text" area.',
            'Enter the word or phrase you want to change in the "Find Text" field.',
            'Enter your new word or phrase in the "Replace With" field.',
            'Check "Match Case" if you need the replacement to be case-sensitive.',
            'Click "Replace All" to update your text and copy the result.'
        ]
    },
    about: '<p>The Find and Replace tool is an essential utility for editing documents, code, or large blocks of text directly in your browser. Instead of manually scanning paragraphs to change a specific name, formatting error, or misspelled word, this tool automates the process instantly across your entire text.</p>',
    how: '<ol><li>Paste the source text into the primary "Input Text" area.</li><li>Enter the word or phrase you want to change in the "Find Text" field.</li><li>Enter your new word or phrase in the "Replace With" field.</li><li>Check "Match Case" if you need the replacement to be case-sensitive.</li><li>Click "Replace All" to update your text and copy the result.</li></ol>',
    why: '<h3>Key Features</h3><ul><li><strong>Bulk Replacement:</strong> Update hundreds of occurrences across your document with a single click.</li><li><strong>Case Sensitivity:</strong> Use "Match Case" for surgical precision when replacing specific capitalized terms.</li><li><strong>Real-Time Result:</strong> No waiting—your updated text is generated instantly in the output panel.</li><li><strong>Zero Lag:</strong> Optimized for high performance, even when processing long-form manuscripts or code files.</li></ul><h3>Benefits</h3><ul><li><strong>Brand Consistency:</strong> Quickly update outdated company names or product terminology across all your content.</li><li><strong>Error Elimination:</strong> Fix recurring spelling mistakes or formatting errors globally in seconds.</li><li><strong>Privacy Guaranteed:</strong> Like all our utilities, your text stays in your browser and is never uploaded.</li><li><strong>Seamless Workflow:</strong> Clean, minimalist interface designed to help you finish your task faster.</li></ul>',
    faq: [
        { question: 'Does it support case-insensitive replacement?', answer: '<p>Yes. By default, it replaces all matches regardless of case, unless you tick the "Match Case" box.</p>' },
        { question: 'Can I replace blank spaces?', answer: '<p>Yes, you can find specific space patterns and replace them with other characters or symbols as needed.</p>' },
        { question: 'Is it safe for sensitive data?', answer: '<p>Yes, the tool runs entirely on your local machine using JavaScript, so your data is never uploaded to any server.</p>' }
    ],
    relatedTools: ['text-sorter', 'word-counter', 'character-counter']
};

export default findReplace;
