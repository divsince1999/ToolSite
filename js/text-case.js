/**
 * Text Case Converter Tool Logic
 */
const initTextCase = () => {
    if (window.toolState.initialized['text-case-converter']) return;

    const container = document.getElementById('tool-container-text-case-converter');
    if (!container) return;

    const input = container.querySelector('#input-text');
    const output = container.querySelector('#output-text');
    const resultsPanel = container.querySelector('#results-panel');
    const btnUpper = container.querySelector('#btn-upper');
    const btnLower = container.querySelector('#btn-lower');
    const btnSentence = container.querySelector('#btn-sentence');
    const btnCapitalize = container.querySelector('#btn-capitalize');
    const btnClear = container.querySelector('#btn-clear');
    const btnCopy = container.querySelector('#btn-copy');

    const showResult = (text) => {
        output.textContent = text;
        resultsPanel.style.display = 'block';
    };

    btnUpper.addEventListener('click', () => {
        showResult(input.value.toUpperCase());
    });

    btnLower.addEventListener('click', () => {
        showResult(input.value.toLowerCase());
    });

    btnSentence.addEventListener('click', () => {
        const text = input.value.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
        showResult(text);
    });

    btnCapitalize.addEventListener('click', () => {
        const text = input.value.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        showResult(text);
    });

    btnClear.addEventListener('click', () => {
        input.value = "";
        output.textContent = "";
        resultsPanel.style.display = 'none';
    });

    btnCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(output.textContent);
        const originalText = btnCopy.textContent;
        btnCopy.textContent = "Copied!";
        setTimeout(() => btnCopy.textContent = originalText, 2000);
    });

    window.toolState.initialized['text-case-converter'] = true;
};

if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'text-case-converter') {
    initTextCase();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'text-case-converter') initTextCase();
});
