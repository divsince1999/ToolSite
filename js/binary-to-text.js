/**
 * Binary to Text Tool Logic
 */
const initBinaryToText = () => {
    const SLUG = 'binary-to-text';
    if (window.toolState.initialized[SLUG]) return;

    const container = document.getElementById(`tool-container-${SLUG}`);
    if (!container) return;

    const input = container.querySelector('#input-text');
    const output = container.querySelector('#output-text');
    const btnCopy = container.querySelector('#btn-copy');
    const btnClear = container.querySelector('#btn-clear');

    const convert = () => {
        const binaryString = input.value.replace(/[^01]/g, ' ').trim();
        if (!binaryString) {
            output.value = "";
            return;
        }

        // Split by spaces or try to chunk 8-bits if no spaces
        let blocks = [];
        if (binaryString.includes(' ')) {
            blocks = binaryString.split(/\s+/);
        } else {
            for (let i = 0; i < binaryString.length; i += 8) {
                blocks.push(binaryString.substring(i, i + 8));
            }
        }

        try {
            const text = blocks.map(bin => {
                if (bin.length > 0) {
                    return String.fromCharCode(parseInt(bin, 2));
                }
                return '';
            }).join('');
            output.value = text;
        } catch (e) {
            output.value = "Error: Invalid binary format.";
        }
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

if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'binary-to-text') {
    initBinaryToText();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'binary-to-text') initBinaryToText();
});
