/**
 * Text to Binary Tool Logic
 */
const initTextToBinary = () => {
    const SLUG = 'text-to-binary';
    if (window.toolState.initialized[SLUG]) return;

    const container = document.getElementById(`tool-container-${SLUG}`);
    if (!container) return;

    const input = container.querySelector('#input-text');
    const output = container.querySelector('#output-text');
    const btnCopy = container.querySelector('#btn-copy');
    const btnClear = container.querySelector('#btn-clear');

    const convert = () => {
        const text = input.value;
        if (!text) {
            output.value = "";
            return;
        }
        
        const binary = text.split('').map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join(' ');
        
        output.value = binary;
    };

    input.addEventListener('input', convert);

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
        input.focus();
    });

    window.toolState.initialized[SLUG] = true;
};

if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'text-to-binary') {
    initTextToBinary();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'text-to-binary') initTextToBinary();
});
