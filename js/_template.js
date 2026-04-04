/**
 * TOOL LOGIC TEMPLATE (Robust Version)
 * -------------------
 * This file is executed after the shared layout is rendered.
 * It uses a double-check pattern to ensure initialization happens
 * correctly regardless of event timing.
 */
const initTool = () => {
    // 1. UNIQUE SLUG for this tool
    const MY_SLUG = 'new-tool-slug';

    // 2. Prevent multiple initializations
    if (window.toolState.initialized[MY_SLUG]) return;
    window.toolState.initialized[MY_SLUG] = true;

    // 3. Use scoped selectors within the auto-generated container
    const container = document.getElementById(`tool-container-${MY_SLUG}`);
    if (!container) return;

    // --- YOUR TOOL LOGIC HERE ---
    
    // Example:
    // const input = container.querySelector('#input-id');
    
    console.log(`${MY_SLUG} logic initialized.`);
};

// --- ROBUST INITIALIZATION PATTERN ---
// CASE 1: UI is already ready when this script loads
if (window.toolState && window.toolState.uiReady && window.toolState.currentTool === 'new-tool-slug') {
    initTool();
}

// CASE 2: UI becomes ready after this script loads
window.addEventListener('tool-ui-ready', (e) => {
    if (e.detail.slug === 'new-tool-slug') {
        initTool();
    }
});
