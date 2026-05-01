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
    if (!refs.slides.length) return;
    currentSlide = (index + refs.slides.length) % refs.slides.length;
    refs.slides.forEach((slide, idx) => slide.classList.toggle('is-active', idx === currentSlide));
    refs.dots.forEach((dot, idx) => dot.classList.toggle('is-active', idx === currentSlide));
}

function startSlider() {
    clearInterval(sliderTimer);
    sliderTimer = setInterval(() => setSlide(currentSlide + 1), 5000);
}

function navigateToShop(target) {
    if (target === 'orders' || target === 'cart') {
        window.location.href = `shop.html?panel=${encodeURIComponent(target)}`;
        return;
    }

    if (target === 'favorites') {
        refs.favoritesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function renderFavoritesBoard() {
    const favorites = getFavorites();

    if (!favorites.length) {
        refs.favoritesGrid.innerHTML = `
            <div class="favorites-empty">
                <strong>Избранное бош</strong>
                <p>Жүрөкчөнү басып товар тандасаңыз, бул жерде көрүнөт.</p>
            </div>
        `;
        return;
    }

    refs.favoritesGrid.innerHTML = favorites.map(item => `
        <article class="favorite-card">
            <img src="${item.image || 'assets/products/placeholder.svg'}" alt="${item.name}">
            <div class="favorite-copy">
                <h3>${item.name}</h3>
                <p>${formatMoney(item.price)}</p>
            </div>
            <a href="shop.html?search=${encodeURIComponent(item.name)}">Заказ берүү</a>
        </article>
    `).join('');
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
    renderFavoritesBoard();
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

    document.querySelectorAll('[data-nav-target]').forEach(control => {
        control.addEventListener('click', () => navigateToShop(control.dataset.navTarget));
    });

    refs.favoriteButtons.forEach(button => {
        button.addEventListener('click', () => toggleFavorite(button));
    });

    window.addEventListener('storage', () => {
        refreshCounters();
        syncFavoriteButtons();
        renderFavoritesBoard();
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

    refs.favoriteButtons = Array.from(document.querySelectorAll('.fav-toggle'));
    refs.favoritesGrid = document.getElementById('favorites-grid');
    refs.favoritesSection = document.getElementById('favorites-section');
}

function initialize() {
    initRefs();
    bindEvents();
    setSlide(0);
    startSlider();
    syncFavoriteButtons();
    refreshCounters();
    renderFavoritesBoard();
}

document.addEventListener('DOMContentLoaded', initialize);
