const CART_KEY = 'muravey_pro_cart';
const FAVORITES_KEY = 'el_moto_home_favorites';

const refs = {};
let sliderTimer = null;
let currentSlide = 0;

function safeParse(raw, fallback) {
    try {
        return JSON.parse(raw);
    } catch (_error) {
        return fallback;
    }
}

function getCartEntries() {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = safeParse(raw, {});
    return Object.values(parsed || {});
}

function getFavorites() {
    const raw = localStorage.getItem(FAVORITES_KEY);
    const parsed = safeParse(raw, []);
    return Array.isArray(parsed) ? parsed : [];
}

function setFavorites(items) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
}

function formatMoney(value) {
    return `${Number(value || 0).toLocaleString()} сом`;
}

function getCartCount() {
    return getCartEntries().reduce((sum, item) => sum + Number(item.quantity || 0), 0);
}

function refreshCounters() {
    const cartCount = getCartCount();
    const favoritesCount = getFavorites().length;

    refs.cartCount.textContent = cartCount;
    refs.ordersCount.textContent = cartCount;
    refs.favoritesCount.textContent = favoritesCount;

    refs.cartCountTile.textContent = `${cartCount} товар`;
    refs.ordersCountTile.textContent = `${cartCount} заказ`;
    refs.favoritesCountTile.textContent = `${favoritesCount} товар`;
}

function setSlide(index) {
    const slides = refs.slides;
    const dots = refs.dots;
    if (!slides.length) return;

    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, idx) => slide.classList.toggle('is-active', idx === currentSlide));
    dots.forEach((dot, idx) => dot.classList.toggle('is-active', idx === currentSlide));
}

function startSlider() {
    clearInterval(sliderTimer);
    sliderTimer = setInterval(() => setSlide(currentSlide + 1), 5000);
}

function buildPanelRows(type) {
    if (type === 'cart' || type === 'orders') {
        const entries = getCartEntries();
        if (!entries.length) {
            return '<div class="panel-item">Азырынча товар кошула элек.</div>';
        }

        const total = entries.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);
        const rows = entries.map(item => (
            `<div class="panel-item"><strong>${item.name}</strong><br><span>${item.quantity} x ${formatMoney(item.price)} = ${formatMoney(item.quantity * item.price)}</span></div>`
        )).join('');

        return `${rows}<div class="panel-item"><strong>Жалпы: ${formatMoney(total)}</strong></div>`;
    }

    const favorites = getFavorites();
    if (!favorites.length) {
        return '<div class="panel-item">Избранное тизмеси бош.</div>';
    }

    return favorites.map(item => (
        `<div class="panel-item"><strong>${item.name}</strong><br><span>${formatMoney(item.price)}</span></div>`
    )).join('');
}

function openPanel(type) {
    const titleMap = {
        cart: 'Карзина',
        orders: 'Заказы',
        favorites: 'Избранное'
    };

    const safeType = titleMap[type] ? type : 'orders';
    refs.panelTitle.textContent = titleMap[safeType];
    refs.panelBody.innerHTML = buildPanelRows(safeType);
    refs.quickPanel.hidden = false;
    document.body.style.overflow = 'hidden';
}

function closePanel() {
    refs.quickPanel.hidden = true;
    document.body.style.overflow = '';
}

function isFavorite(id) {
    return getFavorites().some(item => String(item.id) === String(id));
}

function syncFavoriteButtons() {
    refs.favoriteButtons.forEach(button => {
        const active = isFavorite(button.dataset.favId);
        button.classList.toggle('is-active', active);
        button.textContent = active ? '♥' : '♡';
    });
}

function toggleFavorite(button) {
    const id = button.dataset.favId;
    const name = button.dataset.name;
    const price = Number(button.dataset.price || 0);
    const image = button.dataset.image || '';
    const favorites = getFavorites();
    const exists = favorites.find(item => String(item.id) === String(id));

    const next = exists
        ? favorites.filter(item => String(item.id) !== String(id))
        : [...favorites, { id, name, price, image }];

    setFavorites(next);
    syncFavoriteButtons();
    refreshCounters();
}

function bindEvents() {
    refs.nextSlide.addEventListener('click', () => {
        setSlide(currentSlide + 1);
        startSlider();
    });

    refs.prevSlide.addEventListener('click', () => {
        setSlide(currentSlide - 1);
        startSlider();
    });

    refs.dots.forEach(dot => {
        dot.addEventListener('click', () => {
            setSlide(Number(dot.dataset.slide || 0));
            startSlider();
        });
    });

    refs.searchForm.addEventListener('submit', event => {
        event.preventDefault();
        const query = refs.searchInput.value.trim();
        const scope = refs.searchScope.value;
        const preparedQuery = scope === 'all' ? query : `${scope} ${query}`.trim();
        const target = query ? `shop.html?search=${encodeURIComponent(preparedQuery)}` : 'shop.html';
        window.location.href = target;
    });

    document.querySelectorAll('[data-panel-open]').forEach(control => {
        control.addEventListener('click', () => {
            openPanel(control.dataset.panelOpen);
        });
    });

    refs.panelClose.addEventListener('click', closePanel);
    refs.quickPanel.addEventListener('click', event => {
        if (event.target === refs.quickPanel) closePanel();
    });

    refs.favoriteButtons.forEach(button => {
        button.addEventListener('click', () => toggleFavorite(button));
    });

    window.addEventListener('storage', refreshCounters);
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closePanel();
    });
}

function initRefs() {
    refs.searchForm = document.getElementById('home-search-form');
    refs.searchScope = document.getElementById('home-search-scope');
    refs.searchInput = document.getElementById('home-search-input');
    refs.cartCount = document.getElementById('cart-count');
    refs.ordersCount = document.getElementById('orders-count');
    refs.favoritesCount = document.getElementById('favorites-count');
    refs.cartCountTile = document.getElementById('cart-count-tile');
    refs.ordersCountTile = document.getElementById('orders-count-tile');
    refs.favoritesCountTile = document.getElementById('favorites-count-tile');

    refs.nextSlide = document.getElementById('slide-next');
    refs.prevSlide = document.getElementById('slide-prev');
    refs.slides = Array.from(document.querySelectorAll('.slide'));
    refs.dots = Array.from(document.querySelectorAll('#slide-dots button'));

    refs.quickPanel = document.getElementById('quick-panel');
    refs.panelTitle = document.getElementById('panel-title');
    refs.panelBody = document.getElementById('panel-body');
    refs.panelClose = document.getElementById('panel-close');
    refs.favoriteButtons = Array.from(document.querySelectorAll('.fav-toggle'));
}

function initialize() {
    initRefs();
    bindEvents();
    setSlide(0);
    startSlider();
    syncFavoriteButtons();
    refreshCounters();
}

document.addEventListener('DOMContentLoaded', initialize);
