const CART_KEY = 'muravey_pro_cart';
const FAVORITES_KEY = 'el_moto_home_favorites';
const LIKES_KEY = 'el_moto_product_likes';

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

function getLikesMap() {
    const raw = localStorage.getItem(LIKES_KEY);
    const parsed = safeParse(raw, {});
    return parsed && typeof parsed === 'object' ? parsed : {};
}

function setLikesMap(map) {
    localStorage.setItem(LIKES_KEY, JSON.stringify(map));
}

function getLikeCount(id) {
    const map = getLikesMap();
    return Number(map[String(id)] || 0);
}

function increaseLikeCount(id) {
    const key = String(id);
    const map = getLikesMap();
    map[key] = Number(map[key] || 0) + 1;
    setLikesMap(map);
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

function updateSlideInfo() {
    const slide = refs.slides[currentSlide];
    if (!slide) return;

    refs.slideInfoTitle.textContent = slide.dataset.infoTitle || 'Товар жөнүндө маалымат';
    refs.slideInfoText.textContent = slide.dataset.infoText || 'Бул баннер үчүн маалымат кошула элек.';
}

function setSlide(index) {
    if (!refs.slides.length) return;
    currentSlide = (index + refs.slides.length) % refs.slides.length;
    refs.slides.forEach((slide, idx) => slide.classList.toggle('is-active', idx === currentSlide));
    refs.dots.forEach((dot, idx) => dot.classList.toggle('is-active', idx === currentSlide));
    updateSlideInfo();
}

function startSlider() {
    clearInterval(sliderTimer);
    sliderTimer = setInterval(() => setSlide(currentSlide + 1), 5000);
}

function navigateToTarget(target) {
    if (target === 'orders' || target === 'cart') {
        window.location.href = `shop.html?panel=${encodeURIComponent(target)}`;
        return;
    }

    if (target === 'favorites') {
        refs.favoritesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function renderFavoritesBoard() {
    const favorites = getFavorites()
        .map(item => ({
            ...item,
            likeCount: getLikeCount(item.id)
        }))
        .sort((a, b) => {
            if (b.likeCount !== a.likeCount) return b.likeCount - a.likeCount;
            return String(a.name).localeCompare(String(b.name));
        });

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
                <span class="favorite-rank">🔥 Лайк: ${Number(item.likeCount || 0)}</span>
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
        const likeCount = getLikeCount(button.dataset.favId);
        button.classList.toggle('is-active', active);
        button.dataset.likeCount = String(likeCount);
        button.setAttribute('aria-label', `Избранное, лайк ${likeCount}`);
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

    if (!exists) {
        increaseLikeCount(id);
    }

    setFavorites(next);
    syncFavoriteButtons();
    refreshCounters();
    renderFavoritesBoard();
}

function resolveSearchTarget(scope, query) {
    const map = {
        tricycles: 'tricycles.html',
        scooters: 'scooters.html',
        parts: 'zapchasty.html',
        service: 'server.html'
    };

    const page = map[scope] || 'shop.html';
    if (!query) return page;
    return `${page}?search=${encodeURIComponent(query)}`;
}

function bindEvents() {
    if (refs.backButton) {
        refs.backButton.addEventListener('click', () => {
            if (window.history.length > 1) {
                window.history.back();
                return;
            }

            window.location.href = 'shop.html?panel=orders';
        });
    }

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

    refs.infoButton.addEventListener('click', () => {
        const hidden = refs.infoBox.hasAttribute('hidden');
        if (hidden) {
            refs.infoBox.removeAttribute('hidden');
        } else {
            refs.infoBox.setAttribute('hidden', '');
        }
    });

    refs.searchForm.addEventListener('submit', event => {
        event.preventDefault();
        const query = refs.searchInput.value.trim();
        const scope = refs.searchScope.value;
        const target = resolveSearchTarget(scope, query);
        window.location.href = target;
    });

    document.querySelectorAll('[data-nav-target]').forEach(control => {
        control.addEventListener('click', () => navigateToTarget(control.dataset.navTarget));
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
    refs.backButton = document.getElementById('go-back-btn');
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

    refs.infoButton = document.getElementById('slide-info-btn');
    refs.infoBox = document.getElementById('slide-info-box');
    refs.slideInfoTitle = document.getElementById('slide-info-title');
    refs.slideInfoText = document.getElementById('slide-info-text');

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
