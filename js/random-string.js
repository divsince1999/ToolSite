/**
 * Random String Generator Tool Logic
 */
const initRandomString = () => {
    if (window.toolState.initialized['random-string-generator']) return;

    const container = document.getElementById('tool-container-random-string-generator');
    if (!container) return;

    const lengthInput = container.querySelector('#string-length');
    const charType = container.querySelector('#char-type');
    const output = container.querySelector('#string-output');
    const btnGenerate = container.querySelector('#btn-generate');
    const btnCopy = container.querySelector('#btn-copy');

    btnGenerate.addEventListener('click', () => {
        const length = parseInt(lengthInput.value);
        const type = charType.value;
        let charset = "";
        if (type === "alphanumeric") charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        else if (type === "letters") charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        else if (type === "numbers") charset = "0123456789";

        let result = "";
        for (let i = 0; i < length; i++) {
            result += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        output.textContent = result;
        output.style.color = 'var(--text-main)';
    });

    btnCopy.addEventListener('click', () => {
        const text = output.textContent.trim();
        if (text === "Waiting...") return;
        navigator.clipboard.writeText(text);
        const originalText = btnCopy.textContent;
        btnCopy.textContent = "Copied!";
        setTimeout(() => btnCopy.textContent = originalText, 2000);
    });

    window.toolState.initialized['random-string-generator'] = true;
};

if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'random-string-generator') {
    initRandomString();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'random-string-generator') initRandomString();
});
