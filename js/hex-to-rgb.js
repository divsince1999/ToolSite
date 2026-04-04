/**
 * HEX to RGB Tool Logic
 */
const initHexToRgb = () => {
    const SLUG = 'hex-to-rgb';
    if (window.toolState.initialized[SLUG]) return;

    const container = document.getElementById(`tool-container-${SLUG}`);
    if (!container) return;

    const hexInput = container.querySelector('#hex-input');
    const rgbOutput = container.querySelector('#rgb-output');
    const colorBox = container.querySelector('#color-box');
    const previewText = container.querySelector('#rgb-preview-text');
    const btnCopy = container.querySelector('#btn-copy');
    const btnClear = container.querySelector('#btn-clear');

    const hexToRgb = (hex) => {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => {
            return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const updateColor = () => {
        const hex = hexInput.value.trim();
        const rgb = hexToRgb(hex);

        if (rgb) {
            const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            rgbOutput.value = rgbStr;
            colorBox.style.backgroundColor = rgbStr;
            previewText.textContent = rgbStr;
        } else {
            rgbOutput.value = "";
            if (hex.length > 0) {
                previewText.textContent = "Invalid HEX";
            } else {
                previewText.textContent = "Waiting...";
            }
        }
    };

    hexInput.addEventListener('input', updateColor);

    btnCopy.addEventListener('click', () => {
        if (!rgbOutput.value) return;
        navigator.clipboard.writeText(rgbOutput.value);
        const originalText = btnCopy.textContent;
        btnCopy.textContent = "Copied!";
        setTimeout(() => btnCopy.textContent = originalText, 2000);
    });

    btnClear.addEventListener('click', () => {
        hexInput.value = "";
        updateColor();
        hexInput.focus();
    });

    // Initial run
    updateColor();

    window.toolState.initialized[SLUG] = true;
};

if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'hex-to-rgb') {
    initHexToRgb();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'hex-to-rgb') initHexToRgb();
});
