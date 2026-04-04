/**
 * Character Counter Tool Logic
 */
const initCharCount = () => {
    if (window.toolState.initialized['character-counter']) return;

    const container = document.getElementById('tool-container-character-counter');
    if (!container) return;

    const input = container.querySelector('#input-text');
    const charCount = container.querySelector('#char-count');
    const charNoSpace = container.querySelector('#char-no-space-count');
    const wordCount = container.querySelector('#word-count');
    const sentenceCount = container.querySelector('#sentence-count');
    const lineCount = container.querySelector('#line-count');
    const paragraphCount = container.querySelector('#paragraph-count');
    const readingTime = container.querySelector('#reading-time');
    const btnCopy = container.querySelector('#btn-copy');
    const btnClear = container.querySelector('#btn-clear');

    const updateStats = () => {
        const text = input.value;
        const chars = text.length;
        const charsNoSpace = text.replace(/\s/g, '').length;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const lines = text ? text.split(/\r\n|\r|\n/).length : 0;
        const paragraphs = text ? text.split(/\n\s*\n/).length : 0;
        const sentences = text ? (text.match(/[^\.!\?]+[\.!\?]+/g) || []).length : 0;
        
        // Reading time based on 225 wpm
        const time = Math.max(1, Math.ceil(words / 225));

        charCount.textContent = chars;
        charNoSpace.textContent = charsNoSpace;
        wordCount.textContent = words;
        lineCount.textContent = lines;
        paragraphCount.textContent = paragraphs;
        sentenceCount.textContent = sentences;
        readingTime.textContent = `${time} min`;
    };

    input.addEventListener('input', updateStats);

    btnCopy.addEventListener('click', () => {
        if (!input.value) return;
        navigator.clipboard.writeText(input.value);
        const originalText = btnCopy.textContent;
        btnCopy.textContent = "Copied!";
        setTimeout(() => btnCopy.textContent = originalText, 2000);
    });

    btnClear.addEventListener('click', () => {
        input.value = "";
        updateStats();
    });

    window.toolState.initialized['character-counter'] = true;
};

if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'character-counter') {
    initCharCount();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'character-counter') initCharCount();
});
