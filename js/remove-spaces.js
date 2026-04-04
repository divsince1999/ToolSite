/**
 * Remove Extra Spaces Tool Logic
 */
const initRemoveSpaces = () => {
    if (window.toolState.initialized['remove-extra-spaces']) return;

    const container = document.getElementById('tool-container-remove-extra-spaces');
    if (!container) return;

    const input = container.querySelector('#input-text');
    const output = container.querySelector('#output-text');
    const resultsPanel = container.querySelector('#results-panel');
    const btnRemove = container.querySelector('#btn-remove-spaces');
    const btnClear = container.querySelector('#btn-clear');
    const btnCopyInput = container.querySelector('#btn-copy');
    const btnCopyResult = container.querySelector('#btn-copy-result');

    btnRemove.addEventListener('click', () => {
        const text = input.value.replace(/\s+/g, ' ').trim();
        output.textContent = text;
        resultsPanel.style.display = 'block';
    });

    btnClear.addEventListener('click', () => {
        input.value = "";
        output.textContent = "";
        resultsPanel.style.display = 'none';
    });

    btnCopyInput.addEventListener('click', () => {
        if (!input.value) return;
        navigator.clipboard.writeText(input.value);
        const originalText = btnCopyInput.textContent;
        btnCopyInput.textContent = "Copied!";
        setTimeout(() => btnCopyInput.textContent = originalText, 2000);
    });

    btnCopyResult.addEventListener('click', () => {
        if (!output.textContent) return;
        navigator.clipboard.writeText(output.textContent);
        const originalText = btnCopyResult.textContent;
        btnCopyResult.textContent = "Copied!";
        setTimeout(() => btnCopyResult.textContent = originalText, 2000);
    });

    window.toolState.initialized['remove-extra-spaces'] = true;
};

if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'remove-extra-spaces') {
    initRemoveSpaces();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'remove-extra-spaces') initRemoveSpaces();
});
