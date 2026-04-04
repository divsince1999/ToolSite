/**
 * Text Reverser Tool Logic
 */
const initTextReverse = () => {
    if (window.toolState.initialized['text-reverser']) return;

    const container = document.getElementById('tool-container-text-reverser');
    if (!container) return;

    const input = container.querySelector('#input-text');
    const output = container.querySelector('#output-text');
    const btnReverse = container.querySelector('#btn-reverse');
    const btnCopy = container.querySelector('#btn-copy');
    const btnClear = container.querySelector('#btn-clear');

    const reverseString = (str) => {
        return [...str].reverse().join("");
    };

    btnReverse.addEventListener('click', () => {
        output.value = reverseString(input.value);
    });

    btnCopy.addEventListener('click', () => {
        if (!output.value) return;
        navigator.clipboard.writeText(output.value);
        const originalText = btnCopy.textContent;
        btnCopy.textContent = "Copied!";
        setTimeout(() => btnCopy.textContent = originalText, 2000);
    });

    btnClear.addEventListener('click', () => {
        input.value = "";
        output.value = "";
    });

    window.toolState.initialized['text-reverser'] = true;
};

if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'text-reverser') {
    initTextReverse();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'text-reverser') initTextReverse();
});
