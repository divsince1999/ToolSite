import { renderFAQ } from './renderFAQ.js';

const CACHE_VERSION = 'v1';
const uiCache = {}; // In-memory cache for tool UI templates

/**
 * Auto-injects SEO metadata into the head of the document.
 */
function injectMetadata(data) {
    if (!data) return;

    // 1. Update Document Title
    document.title = data.seoTitle ? `${data.seoTitle} | ToolBox` : `${data.title} - ToolBox`;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', data.seoDescription || data.description);

    // 3. Update Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);

    // 4. Update Open Graph Tags
    const ogTags = {
        'og:title': data.seoTitle || data.title,
        'og:description': data.seoDescription || data.description,
        'og:url': window.location.href,
        'og:type': 'website'
    };

    for (const [property, content] of Object.entries(ogTags)) {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('property', property);
            document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
    }
}

function injectSchema(data) {
    if (!data) return;

    // 1. Cleanup: Remove existing tool schema scripts
    const oldSchema = document.getElementById('tool-schema');
    if (oldSchema) {
        oldSchema.remove();
    }

    // 2. Map SoftwareApplication Schema
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": data.shortName || data.title,
        "description": data.seoDescription || data.description,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    // 3. Map HowTo Integration (Conditional)
    if (data.content && data.content.howTo && Array.isArray(data.content.howTo)) {
        const howToSchema = {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": `How to use ${data.shortName || data.title}`,
            "step": data.content.howTo.map((stepText, index) => ({
                "@type": "HowToStep",
                "name": `Step ${index + 1}`,
                "text": stepText
            }))
        };
        // Use an array if multiple schemas exist
        const schemaWrapper = [softwareSchema, howToSchema];
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'tool-schema';
        script.textContent = JSON.stringify(schemaWrapper, null, 2);
        document.head.appendChild(script);
    } else {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'tool-schema';
        script.textContent = JSON.stringify(softwareSchema, null, 2);
        document.head.appendChild(script);
    }
}

/**
 * Renders the main tool layout and content.
 */
export async function renderToolLayout(slug, data, toolsData) {
    const appRoot = document.getElementById('app');
    if (!appRoot) return;

    // 1. Tool Validation
    if (!data) {
        console.error(`Tool not found: ${slug}`);
        appRoot.innerHTML = `
            <div class="container text-center section">
                <div class="card p-lg">
                    <h2>Tool Not Found</h2>
                    <p class="text-muted mt-md">The tool you are looking for does not exist or has been moved.</p>
                    <a href="../index.html" class="btn btn-primary mt-lg">Return to Homepage</a>
                </div>
            </div>`;
        return;
    }

    // 2. Inject SEO Metadata and Schema (Early injection to prevent flickering)
    injectMetadata(data);
    injectSchema(data);

    // 3. Set Loading State
    appRoot.innerHTML = `
        <div class="container text-center section">
            <div class="loading-placeholder">
                <p class="text-muted">Loading tool interface...</p>
            </div>
        </div>`;

    // 4. Fetch/Cache UI Template
    let uiHtml = '';
    const cacheKey = `${slug}-${CACHE_VERSION}`;

    if (uiCache[cacheKey]) {
        uiHtml = uiCache[cacheKey];
    } else {
        try {
            const res = await fetch(`../components/tools/${slug}.html`);
            if (res.ok) {
                uiHtml = await res.text();
                uiCache[cacheKey] = uiHtml; // Save to versioned cache
            } else {
                throw new Error(`Failed to load UI component (Status: ${res.status})`);
            }
        } catch (e) {
            console.error('Error loading tool UI:', e);
            // Fallback for tools not yet migrated or network errors
            uiHtml = data.uiTemplate || `
                <div class="card p-lg text-center" style="border: 2px dashed var(--border);">
                    <p class="text-muted"><strong>Error:</strong> Failed to load the tool interface.</p>
                    <button class="btn btn-outline mt-md" id="btn-retry-load">Retry Connection</button>
                </div>`;
        }
    }

    // 5. Build Related Tools
    let relatedHtml = '';
    if (data.relatedTools && data.relatedTools.length > 0) {
        const cards = data.relatedTools.map(relSlug => {
            const rel = toolsData[relSlug];
            if (!rel) return '';
            return `
            <a href="${relSlug}" class="card">
                <h3>${rel.title}</h3>
                <p class="text-muted mt-sm">${rel.description}</p>
                <div class="mt-md" style="color: var(--primary); font-weight: 700; font-size: 0.9rem;">Open ${rel.title} &rarr;</div>
            </a>`;
        }).join('');
        relatedHtml = `
        <nav class="section related-section" aria-label="Related Tools">
            <div class="container">
                <h2 class="text-center mb-lg">Related Tools</h2>
                <div class="tool-grid">${cards}</div>
            </div>
        </nav>`;
    }

    // 6. Build SEO/About section
    const faqHtml = renderFAQ(data.faq);
    const seoHtml = `
        <section class="section seo-section">
            <div class="seo-container">
                ${data.about ? `<div class="seo-card"><h2>About This Tool</h2>${data.about}</div>` : ''}
                ${data.how ? `<div class="seo-card"><h2>How to Use This Tool</h2>${data.how}</div>` : ''}
                ${data.why ? `<div class="seo-card"><h2>Why Use This Tool</h2>${data.why}</div>` : ''}
                ${faqHtml}
            </div>
        </section>`;

    // 7. Mount to App root
    let categoryName = data.category || 'Utilities';
    let breadcrumbHtml = `
        <nav aria-label="breadcrumb" class="container mt-md" style="margin-top: 1rem;">
            <p class="text-muted" style="font-size: 0.9rem;">
                <a href="../index" style="color: var(--primary); text-decoration: none;">Home</a> > 
                ${categoryName} > 
                <strong>${data.title}</strong>
            </p>
        </nav>`;

    appRoot.innerHTML = `
        ${breadcrumbHtml}
        <section class="section pb-0">
            <div class="container text-center">
                <div class="content-readable">
                    <h1>${data.title}</h1>
                    <p class="text-muted">${data.description}</p>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <div class="content-readable">
                    <!-- Scoped container for the tool UI -->
                    <div id="tool-container-${slug}" class="tool-main-container">
                        ${uiHtml}
                    </div>
                    <!-- Privacy Badge -->
                    <div style="margin-top: 1rem; padding: 0.75rem 1rem; background: rgba(99,102,241,0.06); border: 1px solid rgba(99,102,241,0.2); border-radius: 8px; display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; color: var(--text-muted);">
                        <span style="font-size: 1.1rem;">🔒</span>
                        <span><strong style="color: var(--text-main);">Privacy Guarantee:</strong> Your data is processed locally and never leaves your device. No data is saved or sent to any server. <a href="../privacy" style="color: var(--primary); text-decoration: none;">Learn more</a></span>
                    </div>
                </div>
            </div>
        </section>

        ${relatedHtml}
        ${seoHtml}`;

    // 8. Event Listeners (Retry mechanism)
    const btnRetry = document.getElementById('btn-retry-load');
    if (btnRetry) {
        btnRetry.addEventListener('click', () => {
            btnRetry.disabled = true;
            btnRetry.textContent = 'Retrying...';
            // Simple approach: trigger a reload of the layout
            setTimeout(() => {
                renderToolLayout(slug, data, toolsData);
            }, 500);
        });
    }

    // 9. Signal System Ready
    const readyEvent = new CustomEvent('tool-ui-ready', {
        detail: { slug: slug }
    });
    window.dispatchEvent(readyEvent);
}
