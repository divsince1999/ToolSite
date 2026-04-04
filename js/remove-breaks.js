/**
 * Remove Line Breaks Tool Logic
 */
const initRemoveBreaks = () => {
    if (window.toolState.initialized['remove-line-breaks']) return;

    const container = document.getElementById('tool-container-remove-line-breaks');
    if (!container) return;

    const input = container.querySelector('#input-text');
    const output = container.querySelector('#output-text');
    const btnProcess = container.querySelector('#btn-process');
    const btnCopy = container.querySelector('#btn-copy');
    const btnClear = container.querySelector('#btn-clear');

    btnProcess.addEventListener('click', () => {
        const text = input.value.replace(/(\r\n|\n|\r)/gm, " ").replace(/\s+/g, ' ').trim();
        output.value = text;
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

    window.toolState.initialized['remove-line-breaks'] = true;
};

if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'remove-line-breaks') {
    initRemoveBreaks();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'remove-line-breaks') initRemoveBreaks();
});
