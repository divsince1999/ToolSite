/**
 * Generates and initializes the FAQ accordion.
 */
export function renderFAQ(faqData) {
    if (!faqData || faqData.length === 0) return '';

    const html = faqData.map(item => `
        <div class="faq-item">
            <button class="faq-question">${item.question}</button>
            <div class="faq-answer">${item.answer}</div>
        </div>`).join('');

    return `<div class="seo-card"><h2>Frequently Asked Questions</h2><div class="faq-accordion">${html}</div></div>`;
}

export function initFAQAccordion() {
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentNode;
            document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                if (activeItem !== item) activeItem.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });
}
