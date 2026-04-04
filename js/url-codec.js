/**
 * URL Encoder / Decoder Tool Logic
 */
const initURLEncode = () => {
    if (window.toolState.initialized['url-encoder-decoder']) return;

    const container = document.getElementById('tool-container-url-encoder-decoder');
    if (!container) return;

    const input = container.querySelector('#input-text');
    const output = container.querySelector('#output-text');
    const btnEncode = container.querySelector('#btn-encode');
    const btnDecode = container.querySelector('#btn-decode');
    const btnCopy = container.querySelector('#btn-copy');
    const btnClear = container.querySelector('#btn-clear');

    btnEncode.addEventListener('click', () => {
        try {
            output.value = encodeURIComponent(input.value);
        } catch (e) {
            output.value = "Error: Could not encode URL.";
        }
    });

    btnDecode.addEventListener('click', () => {
        try {
            output.value = decodeURIComponent(input.value);
        } catch (e) {
            output.value = "Error: Could not decode URL.";
        }
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

    window.toolState.initialized['url-encoder-decoder'] = true;
};

if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'url-encoder-decoder') {
    initURLEncode();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'url-encoder-decoder') initURLEncode();
});
