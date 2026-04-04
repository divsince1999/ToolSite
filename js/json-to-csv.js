/**
 * JSON to CSV Tool Logic
 */
const initJsonToCsv = () => {
    const SLUG = 'json-to-csv';
    if (window.toolState.initialized[SLUG]) return;

    const container = document.getElementById(`tool-container-${SLUG}`);
    if (!container) return;

    const input = container.querySelector('#json-input');
    const output = container.querySelector('#csv-output');
    const btnConvert = container.querySelector('#btn-convert');
    const btnCopy = container.querySelector('#btn-copy');
    const btnClear = container.querySelector('#btn-clear');

    const convert = () => {
        const jsonStr = input.value.trim();
        if (!jsonStr) {
            output.value = "";
            return;
        }

        try {
            const data = JSON.parse(jsonStr);
            const array = Array.isArray(data) ? data : [data];
            
            if (array.length === 0) {
                output.value = "";
                return;
            }

            const headers = Object.keys(array[0]);
            const csvRows = [];
            
            // Add Header
            csvRows.push(headers.join(','));

            // Add Data
            for (const row of array) {
                const values = headers.map(header => {
                    const val = row[header];
                    const escaped = ('' + val).replace(/"/g, '\\"');
                    return `"${escaped}"`;
                });
                csvRows.push(values.join(','));
            }

            output.value = csvRows.join('\n');
        } catch (e) {
            output.value = "Error: Invalid JSON format. Please ensure your input is a valid JSON array or object.";
        }
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

if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'json-to-csv') {
    initJsonToCsv();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'json-to-csv') initJsonToCsv();
});
