export default {
    title: 'Random Number Generator',
    shortName: 'Number Gen',
    seoTitle: 'Random Number Generator - Instant Randomizer',
    seoDescription: 'Generate random numbers within any range instantly. Perfect for games, testing, and math experiments for students and developers. 100% private — no data saved. All processing is done locally in your browser.',
    description: 'Generate random numbers within a custom range instantly for games, testing, simulations, and decision-making.',
    content: {
        howTo: [
            'Enter the minimum value for your range.',
            'Enter the maximum value.',
            'Click the generate button.',
            'The tool will instantly display a random number within your selected range.'
        ]
    },

    about: '<p>The Random Number Generator is a powerful utility that allows you to generate numbers within a defined range quickly and efficiently. Whether you are working on software testing, running simulations, or making unbiased decisions, this tool provides a reliable solution.</p><p>Random numbers play a critical role in programming, gaming, statistics, and data analysis. Instead of manually choosing numbers, this tool ensures fair and automated randomization.</p><p>It is especially useful for developers, students, educators, and anyone who needs quick access to random values without complexity.</p>',

    how: '<ol><li>Enter the minimum value for your range.</li><li>Enter the maximum value.</li><li>Click the generate button.</li><li>The tool will instantly display a random number within your selected range.</li></ol><p>Tip: Use appropriate ranges based on your use case for better control over results.</p>',

    why: '<h3>Key Features</h3><ul><li><strong>Custom Range Support:</strong> Define your own minimum and maximum values.</li><li><strong>Instant Results:</strong> Generate numbers without delay.</li><li><strong>Simple Interface:</strong> Easy to use for all users.</li><li><strong>Lightweight Tool:</strong> Works efficiently across devices.</li></ul><h3>Benefits</h3><ul><li>Eliminates bias in number selection</li><li>Useful for testing and simulations</li><li>Saves time and effort</li><li>Applicable across multiple domains</li></ul>',

    useCases: '<h3>Common Use Cases</h3><ul><li><strong>Games and Lotteries:</strong> Generate fair and random outcomes.</li><li><strong>Software Testing:</strong> Create random inputs for testing systems.</li><li><strong>Decision Making:</strong> Make unbiased choices quickly.</li><li><strong>Education:</strong> Learn probability and randomness concepts.</li></ul>',

    faq: [
        { question: 'Are the numbers truly random?', answer: '<p>The tool uses pseudo-random algorithms which are suitable for most practical applications.</p>' },
        { question: 'Can I generate multiple numbers at once?', answer: '<p>Depending on the tool version, multiple number generation may be supported.</p>' },
        { question: 'Is there a limit to the range?', answer: '<p>Most implementations support large ranges, but extremely large values may affect performance.</p>' },
        { question: 'Can I use this for secure applications?', answer: '<p>For highly secure use cases, consider cryptographic random generators.</p>' }
    ],

    relatedTools: ['random-string-generator', 'password-generator', 'lorem-ipsum-generator']
};