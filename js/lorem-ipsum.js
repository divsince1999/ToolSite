/**
 * Lorem Ipsum Generator Tool Logic
 */
const initLoremIpsum = () => {
    if (window.toolState.initialized['lorem-ipsum']) return;

    const container = document.getElementById('tool-container-lorem-ipsum');
    if (!container) return;

    const countInput = container.querySelector('#paragraph-count');
    const output = container.querySelector('#lorem-output');
    const btnGenerate = container.querySelector('#btn-generate');
    const btnCopy = container.querySelector('#btn-copy');

    const loremParagraphs = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.",
        "Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius, adipiscing in, lacinia vel, tellus.",
        "Suspendisse potenti. In eleifend quam a peder. Vivamus a ante. Nullam pretium pede id nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    ];

    btnGenerate.addEventListener('click', () => {
        let count = parseInt(countInput.value);
        if (isNaN(count) || count < 1) count = 1;
        if (count > 50) count = 50;

        let result = "";
        for (let i = 0; i < count; i++) {
            result += loremParagraphs[i % loremParagraphs.length] + "\n\n";
        }
        output.value = result.trim();
    });

    btnCopy.addEventListener('click', () => {
        if (!output.value) return;
        navigator.clipboard.writeText(output.value);
        const originalText = btnCopy.textContent;
        btnCopy.textContent = "Copied!";
        setTimeout(() => btnCopy.textContent = originalText, 2000);
    });

    window.toolState.initialized['lorem-ipsum'] = true;
};

if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'lorem-ipsum') {
    initLoremIpsum();
}
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'lorem-ipsum') initLoremIpsum();
});
