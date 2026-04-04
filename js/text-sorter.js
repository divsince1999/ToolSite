/**
 * Text Sorter Tool Logic
 */
const initTextSorter = () => {
    if (window.toolState.initialized['text-sorter']) return;

    const container = document.getElementById('tool-container-text-sorter');
    if (!container) return;

    const input = container.querySelector('#input-text');
    const output = container.querySelector('#output-text');
    const ignoreCase = container.querySelector('#ignore-case');
    const btnSortAZ = container.querySelector('#btn-sort-az');
    const btnSortZA = container.querySelector('#btn-sort-za');
    const btnSortNum = container.querySelector('#btn-sort-num');
    const btnReverse = container.querySelector('#btn-reverse');
    const btnUnique = container.querySelector('#btn-unique');
    const btnCopy = container.querySelector('#btn-copy');
    const btnClear = container.querySelector('#btn-clear');

    const getLines = () => input.value.split(/\r\n|\r|\n/).filter(line => line.length > 0);
    const setLines = (lines) => output.value = lines.join("\n");

    btnSortAZ.addEventListener('click', () => {
        let lines = getLines();
        lines.sort((a, b) => {
            if (ignoreCase.checked) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            }
            return a.localeCompare(b);
        });
        setLines(lines);
    });

    btnSortZA.addEventListener('click', () => {
        let lines = getLines();
        lines.sort((a, b) => {
            if (ignoreCase.checked) {
                return b.toLowerCase().localeCompare(a.toLowerCase());
            }
            return b.localeCompare(a);
        });
        setLines(lines);
    });

    btnSortNum.addEventListener('click', () => {
        let lines = getLines();
        lines.sort((a, b) => {
            const numA = parseFloat(a.replace(/[^\d\.-]/g, '')) || 0;
            const numB = parseFloat(b.replace(/[^\d\.-]/g, '')) || 0;
            return numA - numB;
        });
        setLines(lines);
    });

    btnReverse.addEventListener('click', () => {
        setLines(getLines().reverse());
    });

    btnUnique.addEventListener('click', () => {
        setLines([...new Set(getLines())]);
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

    window.toolState.initialized['text-sorter'] = true;
};

if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'text-sorter') {
    initTextSorter();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'text-sorter') initTextSorter();
});
