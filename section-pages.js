function normalize(value) {
    return String(value || '').trim().toLowerCase();
}

function filterCards(query) {
    const normalized = normalize(query);
    const cards = Array.from(document.querySelectorAll('.product-card[data-name]'));

    if (!cards.length) return;

    cards.forEach(card => {
        const name = normalize(card.dataset.name);
        card.hidden = normalized ? !name.includes(normalized) : false;
    });
}

function initializeSearch() {
    const form = document.getElementById('page-search-form');
    const input = document.getElementById('page-search-input');
    if (!form || !input) return;

    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get('search') || '';
    input.value = initialQuery;
    filterCards(initialQuery);

    form.addEventListener('submit', event => {
        event.preventDefault();
        const query = input.value.trim();
        const nextUrl = query ? `?search=${encodeURIComponent(query)}` : window.location.pathname.split('/').pop();
        history.replaceState(null, '', nextUrl);
        filterCards(query);
    });

    input.addEventListener('input', () => filterCards(input.value));
}

document.addEventListener('DOMContentLoaded', initializeSearch);
