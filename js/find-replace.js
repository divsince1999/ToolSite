/**
 * Find and Replace Tool Logic
 */
const initFindReplace = () => {
    // Prevent multiple initializations
    if (window.toolState.initialized['find-and-replace']) return;
    window.toolState.initialized['find-and-replace'] = true;

    // Scoped selectors
    const container = document.getElementById('tool-container-find-and-replace');
    if (!container) return;

    const inputText = container.querySelector('#input-text');
    const findText = container.querySelector('#find-text');
    const replaceText = container.querySelector('#replace-text');
    const matchCase = container.querySelector('#match-case');
    const btnReplace = container.querySelector('#btn-replace');
    const btnClear = container.querySelector('#btn-clear');
    const outputText = container.querySelector('#output-text');
    const btnCopy = container.querySelector('#btn-copy');

    if (!btnReplace) return;

    btnReplace.addEventListener('click', () => {
        const text = inputText.value;
        const find = findText.value;
        const replace = replaceText.value;

        if (!find) return;

        const flags = matchCase.checked ? 'g' : 'gi';
        const escapedFind = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape regex
        const regex = new RegExp(escapedFind, flags);
        
        const newText = text.replace(regex, replace);
        outputText.value = newText;
    });

    btnClear.addEventListener('click', () => {
        inputText.value = '';
        findText.value = '';
        replaceText.value = '';
        outputText.value = '';
        inputText.focus();
    });

    btnCopy.addEventListener('click', () => {
        if (!outputText.value) return;
        navigator.clipboard.writeText(outputText.value);
        const originalText = btnCopy.textContent;
        btnCopy.textContent = 'Copied!';
        setTimeout(() => btnCopy.textContent = originalText, 2000);
    });
};

// Robust Initialization Pattern
if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'find-and-replace') {
    initFindReplace();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'find-and-replace') initFindReplace();
});
