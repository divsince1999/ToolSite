/**
 * CSV to JSON Tool Logic
 */
const initCsvToJson = () => {
    const SLUG = 'csv-to-json';
    if (window.toolState.initialized[SLUG]) return;

    const container = document.getElementById(`tool-container-${SLUG}`);
    if (!container) return;

    const input = container.querySelector('#csv-input');
    const output = container.querySelector('#json-output');
    const btnConvert = container.querySelector('#btn-convert');
    const btnCopy = container.querySelector('#btn-copy');
    const btnClear = container.querySelector('#btn-clear');

    const convert = () => {
        const csv = input.value.trim();
        if (!csv) {
            output.value = "";
            return;
        }

        const lines = csv.split('\n');
        if (lines.length < 2) {
            output.value = "Error: CSV must have at least a header row and one data row.";
            return;
        }

        const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
        const result = [];

        for (let i = 1; i < lines.length; i++) {
            const currentLine = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
            if (currentLine.length === headers.length) {
                const obj = {};
                headers.forEach((header, index) => {
                    let value = currentLine[index];
                    // Try to parse booleans first, then numbers
                    if (typeof value === 'string') {
                        const lowVal = value.toLowerCase();
                        if (lowVal === "true") value = true;
                        else if (lowVal === "false") value = false;
                        else if (!isNaN(value) && value !== "") value = Number(value);
                    }
                    
                    obj[header] = value;
                });
                result.push(obj);
            }
        }

        output.value = JSON.stringify(result, null, 4);
    };

    btnConvert.addEventListener('click', convert);

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

if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'csv-to-json') {
    initCsvToJson();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'csv-to-json') initCsvToJson();
});
