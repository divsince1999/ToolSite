/**
 * Password Generator Tool Logic
 */
const initPasswordGen = () => {
    if (window.toolState.initialized['password-generator']) return;

    const container = document.getElementById('tool-container-password-generator');
    if (!container) return;

    const lengthSlider = container.querySelector('#length-slider');
    const lengthVal = container.querySelector('#length-val');
    const incUpper = container.querySelector('#inc-upper');
    const incLower = container.querySelector('#inc-lower');
    const incNumbers = container.querySelector('#inc-numbers');
    const incSymbols = container.querySelector('#inc-symbols');
    const output = container.querySelector('#password-output');
    const btnGenerate = container.querySelector('#btn-generate');
    const btnCopy = container.querySelector('#btn-copy');

    if (lengthSlider) {
        lengthSlider.addEventListener('input', () => {
            lengthVal.textContent = lengthSlider.value;
        });
    }

    const generate = () => {
        const length = parseInt(lengthSlider.value);
        let charset = "";
        if (incUpper.checked) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (incLower.checked) charset += "abcdefghijklmnopqrstuvwxyz";
        if (incNumbers.checked) charset += "0123456789";
        if (incSymbols.checked) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        if (charset === "") {
            output.textContent = "Select characters";
            return;
        }

        let retVal = "";
        for (let i = 0; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        output.textContent = retVal;
        output.style.color = 'var(--text-main)';
    };

    btnGenerate.addEventListener('click', generate);

    btnCopy.addEventListener('click', () => {
        const text = output.textContent;
        if (text === "********" || text === "Select characters") return;
        navigator.clipboard.writeText(text);
        const originalText = btnCopy.textContent;
        btnCopy.textContent = "Copied!";
        setTimeout(() => btnCopy.textContent = originalText, 2000);
    });

    window.toolState.initialized['password-generator'] = true;
};

if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'password-generator') {
    initPasswordGen();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'password-generator') initPasswordGen();
});
