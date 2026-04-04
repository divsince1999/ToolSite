/**
 * Base64 Encoder / Decoder Tool Logic
 */
const initBase64 = () => {
    if (window.toolState.initialized['base64-encoder-decoder']) return;

    const container = document.getElementById('tool-container-base64-encoder-decoder');
    if (!container) return;

    const input = container.querySelector('#input-text');
    const output = container.querySelector('#output-text');
    const btnEncode = container.querySelector('#btn-encode');
    const btnDecode = container.querySelector('#btn-decode');
    const btnCopy = container.querySelector('#btn-copy');
    const btnClear = container.querySelector('#btn-clear');

    const encode = (str) => {
        try {
            return btoa(unescape(encodeURIComponent(str)));
        } catch (e) {
            return "Error: Could not encode string.";
        }
    };

    const decode = (str) => {
        try {
            return decodeURIComponent(escape(atob(str)));
        } catch (e) {
            return "Error: Invalid Base64 string.";
        }
    };

    btnEncode.addEventListener('click', () => {
        output.value = encode(input.value);
    });

    btnDecode.addEventListener('click', () => {
        output.value = decode(input.value);
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

    window.toolState.initialized['base64-encoder-decoder'] = true;
};

if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'base64-encoder-decoder') {
    initBase64();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'base64-encoder-decoder') initBase64();
});
