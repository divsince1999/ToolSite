/**
 * Word Counter Tool Logic
 */
const initWordCounter = () => {
    // Prevent multiple initializations
    if (window.toolState.initialized['word-counter']) return;
    window.toolState.initialized['word-counter'] = true;

    // Scoped queries to prevent conflicts
    const container = document.getElementById(`tool-container-word-counter`);
    if (!container) return;

    const inputText = container.querySelector('#input-text');
    const wordCount = container.querySelector('#word-count');
    const charCount = container.querySelector('#char-count');
    const sentenceCount = container.querySelector('#sentence-count');
    const paragraphCount = container.querySelector('#paragraph-count');
    const btnCopy = container.querySelector('#btn-copy');
    const btnClear = container.querySelector('#btn-clear');

    if (!inputText) return;

    const updateStats = () => {
        const text = inputText.value.trim();
        
        // Word count
        const words = text ? text.split(/\s+/).length : 0;
        wordCount.textContent = words;

        // Character count
        charCount.textContent = text.length;

        // Sentence count
        const sentences = text ? text.split(/[.!?]+/).filter(Boolean).length : 0;
        sentenceCount.textContent = sentences;

        // Paragraph count
        const paragraphs = text ? text.split(/\n+/).filter(Boolean).length : 0;
        paragraphCount.textContent = paragraphs;
    };

    inputText.addEventListener('input', updateStats);

    // Initial clear
    btnClear.addEventListener('click', () => {
        inputText.value = '';
        updateStats();
        inputText.focus();
    });

    // Copy functionality
    btnCopy.addEventListener('click', () => {
        if (!inputText.value) return;
        navigator.clipboard.writeText(inputText.value);
        const originalText = btnCopy.textContent;
        btnCopy.textContent = 'Copied!';
        setTimeout(() => btnCopy.textContent = originalText, 2000);
    });
};

// Robust Initialization Pattern
if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'word-counter') {
    initWordCounter();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'word-counter') initWordCounter();
});
