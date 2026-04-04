/**
 * Slug Generator Tool Logic
 */
const initSlugGen = () => {
    if (window.toolState.initialized['slug-generator']) return;

    const container = document.getElementById('tool-container-slug-generator');
    if (!container) return;

    const input = container.querySelector('#input-text');
    const output = container.querySelector('#output-text');
    const btnProcess = container.querySelector('#btn-process');
    const btnCopy = container.querySelector('#btn-copy');
    const btnClear = container.querySelector('#btn-clear');

    const generateSlug = (text) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-');        // Replace multiple - with single -
    };

    btnProcess.addEventListener('click', () => {
        output.value = generateSlug(input.value);
    });

    input.addEventListener('input', () => {
        output.value = generateSlug(input.value);
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

    window.toolState.initialized['slug-generator'] = true;
};

if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'slug-generator') {
    initSlugGen();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'slug-generator') initSlugGen();
});
