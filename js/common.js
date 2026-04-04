// common.js - Entry Point Orchestrator
import toolsData from '../data/tools.js';
import { loadGlobalComponents } from './loadComponents.js';
import { renderToolLayout } from './renderTool.js';
import { initFAQAccordion } from './renderFAQ.js';

// 0. Initialize Structured State Immediately (Avoid null pointer errors in tool logic)
window.toolState = {
    uiReady: false,
    currentTool: typeof currentToolSlug !== 'undefined' ? currentToolSlug : null,
    initialized: {}
};

// Analytics Hook for future use
const logEvent = (name, data) => {
    console.log(`[Analytics] ${name}:`, data);
};

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Check if we are on a tool page
    if (!window.toolState.currentTool) return;

    const data = toolsData[currentToolSlug];
    if (!data) {
        console.warn(`No data found for tool slug: ${currentToolSlug}`);
        return;
    }

    // 2. Prepare dynamic component initialization
    window.addEventListener('tool-ui-ready', (e) => {
        window.toolState.uiReady = true;
        logEvent('Tool Loaded', { slug: e.detail.slug });
        
        initFAQAccordion();
        // Additional global tool-page initializations can go here
    });

    // 3. Render the Tool Layout (Hero + UI + Related + SEO)
    await renderToolLayout(window.toolState.currentTool, data, toolsData);

    // 4. Load Global Header/Footer
    await loadGlobalComponents();
});
