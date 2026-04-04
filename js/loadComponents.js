/**
 * Loads and injects global components like Header and Footer.
 */
export async function loadGlobalComponents() {
    const headerContainer = document.getElementById('header');
    if (headerContainer) {
        try {
            const res = await fetch('../components/header.html');
            if (res.ok) headerContainer.innerHTML = await res.text();
        } catch (e) { console.error('Error loading header:', e); }
    }

    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
        try {
            const res = await fetch('../components/footer.html');
            if (res.ok) footerContainer.innerHTML = await res.text();
        } catch (e) { console.error('Error loading footer:', e); }
    }
}
