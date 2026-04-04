/**
 * Random Number Generator Tool Logic
 */
const initRandomNum = () => {
    if (window.toolState.initialized['random-number-generator']) return;

    const container = document.getElementById('tool-container-random-number-generator');
    if (!container) return;

    const minNum = container.querySelector('#min-num');
    const maxNum = container.querySelector('#max-num');
    const output = container.querySelector('#number-output');
    const btnGenerate = container.querySelector('#btn-generate');
    const btnCopy = container.querySelector('#btn-copy');

    btnGenerate.addEventListener('click', () => {
        const min = parseInt(minNum.value);
        const max = parseInt(maxNum.value);
        if (isNaN(min) || isNaN(max)) return;
        const result = Math.floor(Math.random() * (max - min + 1)) + min;
        output.textContent = result;
    });

    btnCopy.addEventListener('click', () => {
        const text = output.textContent;
        if (text === "?") return;
        navigator.clipboard.writeText(text);
        const originalText = btnCopy.textContent;
        btnCopy.textContent = "Copied!";
        setTimeout(() => btnCopy.textContent = originalText, 2000);
    });

    window.toolState.initialized['random-number-generator'] = true;
};

if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'random-number-generator') {
    initRandomNum();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'random-number-generator') initRandomNum();
});
