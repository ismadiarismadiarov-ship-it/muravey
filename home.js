const CART_KEY = 'muravey_pro_cart';
const FAVORITES_KEY = 'el_moto_home_favorites';
const LIKES_KEY = 'el_moto_product_likes';
const LANG_KEY = 'el_moto_home_lang';

const REPO_OWNER = 'ismadiarismadiarov-ship-it';
const REPO_NAME = 'muravey';
const REPO_BRANCH = 'main';
const RAW_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}`;
const ADS_ENDPOINT = `${RAW_BASE}/ads.json`;
const ADS_REFRESH_MS = 30000;
const IMAGE_FALLBACK = 'assets/products/placeholder.svg';

const I18N = {
    ky: {
        market_note: 'ЭлМОТО: мото тетик, скутер жана трицикл үчүн онлайн маркет.',
        service_link: 'Сервис',
        scope_all: 'Бардыгы',
        scope_tricycles: 'Трициклы',
        scope_scooters: 'Скутеры',
        scope_parts: 'Запчасты',
        scope_service: 'Сервис',
        search_placeholder: 'Мисалы: реле, тормоз, скутер...',
        search_btn: 'Издөө',
        orders_label: 'Заказ',
        favorites_label: 'Избранное',
        cart_label: 'Карзина',
        catalog_toggle: 'Каталог',
        cat_tricycles: 'Трициклы',
        cat_tricycles_desc: 'Жүк жана шаардык моделдер',
        cat_scooters: 'Скутеры',
        cat_scooters_desc: 'Күнүмдүк жүрүүгө ылайыктуу',
        cat_parts: 'Запчасты',
        cat_parts_desc: 'Тетиктер жана расходник',
        cat_service: 'Сервис',
        cat_service_desc: 'Дарек жана байланыш',
        recommended_title: 'Сунушталган товарлар',
        recommended_all: 'Баарын көрүү',
        favorites_board_title: 'Избранное тизмеси',
        favorites_to_orders: 'Заказдарга өтүү',
        order_btn: 'Заказ берүү',
        mobile_home: 'Башкы',
        mobile_catalog: 'Каталог',
        mobile_favorites: 'Избранное',
        mobile_orders: 'Заказы',
        mobile_service: 'Сервис',
        favorites_empty_title: 'Избранное бош',
        favorites_empty_text: 'Жүрөкчөнү басып товар тандасаңыз, бул жерде чыгат.',
        like_label: 'Лайк',
        count_items: 'товар',
        count_orders: 'заказ',
        aria_orders: 'Заказдар',
        aria_favorites: 'Избранное',
        aria_cart: 'Карзина',
        slide_fallback_title: 'Реклама баннер',
        slide_fallback_text: 'Бул баннер үчүн маалымат кошула элек.',
        favorite_aria: 'Избранное, лайк {count}'
    },
    ru: {
        market_note: 'ЭлМОТО: онлайн маркет для мото деталей, скутеров и трициклов.',
        service_link: 'Сервис',
        scope_all: 'Все',
        scope_tricycles: 'Трициклы',
        scope_scooters: 'Скутеры',
        scope_parts: 'Запчасти',
        scope_service: 'Сервис',
        search_placeholder: 'Например: реле, тормоз, скутер...',
        search_btn: 'Поиск',
        orders_label: 'Заказы',
        favorites_label: 'Избранное',
        cart_label: 'Корзина',
        catalog_toggle: 'Каталог',
        cat_tricycles: 'Трициклы',
        cat_tricycles_desc: 'Грузовые и городские модели',
        cat_scooters: 'Скутеры',
        cat_scooters_desc: 'Удобно для ежедневной езды',
        cat_parts: 'Запчасти',
        cat_parts_desc: 'Детали и расходники',
        cat_service: 'Сервис',
        cat_service_desc: 'Адрес и контакты',
        recommended_title: 'Рекомендуемые товары',
        recommended_all: 'Смотреть все',
        favorites_board_title: 'Список избранного',
        favorites_to_orders: 'Перейти к заказам',
        order_btn: 'Оформить заказ',
        mobile_home: 'Главная',
        mobile_catalog: 'Каталог',
        mobile_favorites: 'Избранное',
        mobile_orders: 'Заказы',
        mobile_service: 'Сервис',
        favorites_empty_title: 'Избранное пусто',
        favorites_empty_text: 'Нажмите на сердечко у товара, и он появится здесь.',
        like_label: 'Лайк',
        count_items: 'товар',
        count_orders: 'заказ',
        aria_orders: 'Заказы',
        aria_favorites: 'Избранное',
        aria_cart: 'Корзина',
        slide_fallback_title: 'Рекламный баннер',
        slide_fallback_text: 'Информация для этого баннера не добавлена.',
        favorite_aria: 'Избранное, лайк {count}'
    }
};

const FALLBACK_ADS = [
    {
        id: 1,
        titleKy: 'Передний осс',
        titleRu: 'Передняя ось',
        textKy: 'Жүккө чыдамдуу жана сапаттуу алдыңкы бөлүк.',
        textRu: 'Прочная передняя деталь для высокой нагрузки.',
        imagePath: 'assets/products/front-hub.jpeg',
        imageVersion: 1745486400001
    },
    {
        id: 2,
        titleKy: 'Задный стоп',
        titleRu: 'Задний стоп',
        textKy: 'LED стоп жарыгы, түнкүсүн так көрүнөт.',
        textRu: 'Яркий LED стоп-сигнал, хорошо заметен ночью.',
        imagePath: 'assets/products/rear-stop.jpeg',
        imageVersion: 1745486400002
    },
    {
        id: 3,
        titleKy: 'Реле',
        titleRu: 'Реле',
        textKy: 'Электро системага туруктуу реле.',
        textRu: 'Надежное реле для стабильной электро-системы.',
        imagePath: 'assets/products/relay.jpeg',
        imageVersion: 1745486400003
    },
    {
        id: 4,
        titleKy: 'Тормоз колодкасы',
        titleRu: 'Тормозная колодка',
        textKy: 'Коопсуз токтотуу үчүн жогорку сапат.',
        textRu: 'Высокое качество для безопасного торможения.',
        imagePath: 'assets/products/brake-shoe.jpeg',
        imageVersion: 1745486400004
    }
];

const refs = {};
const state = {
    lang: localStorage.getItem(LANG_KEY) || 'ky',
    ads: []
};

let sliderTimer = null;
let currentSlide = 0;

function $(selector) {
    return document.querySelector(selector);
}

function t(key, params = {}) {
    const dict = I18N[state.lang] || I18N.ky;
    const fallback = I18N.ky;
    let text = dict[key] || fallback[key] || key;

    Object.entries(params).forEach(([name, value]) => {
        text = text.replace(new RegExp(`\\{${name}\\}`, 'g'), String(value));
    });

    return text;
}

function safeParse(raw, fallback) {
    try {
        return JSON.parse(raw);
    } catch (_error) {
        return fallback;
    }
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
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
    const locale = state.lang === 'ru' ? 'ru-RU' : 'ky-KG';
    return `${Number(value || 0).toLocaleString(locale)} сом`;
}

function resolveAssetUrl(path) {
    if (!path) return IMAGE_FALLBACK;
    if (/^https?:\/\//i.test(path)) return path;

    const normalized = String(path).replace(/^\/+/, '');

    if (window.location.hostname.includes('github.io')) {
        return `${RAW_BASE}/${normalized}`;
    }

    return normalized;
}

function withVersion(url, version) {
    const stamp = version || Date.now();
    return `${url}${url.includes('?') ? '&' : '?'}v=${encodeURIComponent(stamp)}`;
}

function normalizeAd(item) {
    return {
        id: Number(item.id || Date.now()),
        titleKy: String(item.titleKy || item.title_ky || item.title?.ky || item.title || '').trim(),
        titleRu: String(item.titleRu || item.title_ru || item.title?.ru || item.title || '').trim(),
        textKy: String(item.textKy || item.text_ky || item.text?.ky || item.text || '').trim(),
        textRu: String(item.textRu || item.text_ru || item.text?.ru || item.text || '').trim(),
        imagePath: item.imagePath || item.image || IMAGE_FALLBACK,
        imageVersion: Number(item.imageVersion || Date.now())
    };
}

function normalizeAdsPayload(payload) {
    const slidesArray = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.slides)
            ? payload.slides
            : Array.isArray(payload?.ads)
                ? payload.ads
                : [];

    return slidesArray.map(normalizeAd);
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

    refs.ordersTool.setAttribute('aria-label', `${t('aria_orders')}: ${cartCount}`);
    refs.cartTool.setAttribute('aria-label', `${t('aria_cart')}: ${cartCount}`);
    refs.favoritesTool.setAttribute('aria-label', `${t('aria_favorites')}: ${favoritesCount}`);
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(node => {
        const key = node.getAttribute('data-i18n');
        node.textContent = t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(node => {
        const key = node.getAttribute('data-i18n-placeholder');
        node.setAttribute('placeholder', t(key));
    });

    syncFavoriteButtons();
    renderFavoritesBoard();
    refreshCounters();
    updateSlideInfo();
}

function setLanguage(lang) {
    state.lang = I18N[lang] ? lang : 'ky';
    localStorage.setItem(LANG_KEY, state.lang);
    document.documentElement.lang = state.lang === 'ru' ? 'ru' : 'ky';

    refs.langButtons.forEach(button => {
        button.classList.toggle('is-active', button.dataset.lang === state.lang);
    });

    applyTranslations();
}

function updateSlideInfo() {
    const slide = refs.slides[currentSlide];
    if (!slide) return;

    const title = state.lang === 'ru' ? slide.dataset.titleRu : slide.dataset.titleKy;
    const text = state.lang === 'ru' ? slide.dataset.textRu : slide.dataset.textKy;

    refs.slideInfoTitle.textContent = title || t('slide_fallback_title');
    refs.slideInfoText.textContent = text || t('slide_fallback_text');
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

function bindDots() {
    refs.dots.forEach(dot => {
        dot.addEventListener('click', () => {
            setSlide(Number(dot.dataset.slide || 0));
            startSlider();
        });
    });
}

function renderSlides(ads) {
    const safeAds = Array.isArray(ads) && ads.length ? ads : FALLBACK_ADS;

    refs.heroSlides.innerHTML = safeAds.map((ad, index) => {
        const imageUrl = withVersion(resolveAssetUrl(ad.imagePath), ad.imageVersion);
        const titleKy = escapeHtml(ad.titleKy || t('slide_fallback_title'));
        const titleRu = escapeHtml(ad.titleRu || ad.titleKy || t('slide_fallback_title'));
        const textKy = escapeHtml(ad.textKy || t('slide_fallback_text'));
        const textRu = escapeHtml(ad.textRu || ad.textKy || t('slide_fallback_text'));

        return `
            <article class="slide${index === 0 ? ' is-active' : ''}" data-title-ky="${titleKy}" data-title-ru="${titleRu}" data-text-ky="${textKy}" data-text-ru="${textRu}">
                <img src="${imageUrl}" alt="${titleKy}" loading="lazy" onerror="this.onerror=null;this.src='${IMAGE_FALLBACK}';">
            </article>
        `;
    }).join('');

    refs.dotsWrap.innerHTML = safeAds.map((_, index) => `
        <button type="button" class="${index === 0 ? 'is-active' : ''}" data-slide="${index}"></button>
    `).join('');

    refs.slides = Array.from(document.querySelectorAll('.slide'));
    refs.dots = Array.from(document.querySelectorAll('#slide-dots button'));
    currentSlide = 0;
    bindDots();
    setSlide(0);
}

async function fetchAds() {
    const response = await fetch(withVersion(ADS_ENDPOINT, Date.now()), {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error(`Ads fetch failed: ${response.status}`);
    }

    return response.json();
}

async function loadAds() {
    try {
        const payload = await fetchAds();
        const ads = normalizeAdsPayload(payload);
        if (!ads.length) return;

        const previous = JSON.stringify(state.ads);
        const next = JSON.stringify(ads);
        if (previous === next) return;

        state.ads = ads;
        renderSlides(state.ads);
        startSlider();
    } catch (error) {
        console.error(error);
        if (!state.ads.length) {
            state.ads = [...FALLBACK_ADS];
            renderSlides(state.ads);
            startSlider();
        }
    }
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
                <strong>${t('favorites_empty_title')}</strong>
                <p>${t('favorites_empty_text')}</p>
            </div>
        `;
        return;
    }

    refs.favoritesGrid.innerHTML = favorites.map(item => `
        <article class="favorite-card">
            <img src="${item.image || IMAGE_FALLBACK}" alt="${escapeHtml(item.name)}" onerror="this.onerror=null;this.src='${IMAGE_FALLBACK}';">
            <div class="favorite-copy">
                <span class="favorite-rank">🔥 ${t('like_label')}: ${Number(item.likeCount || 0)}</span>
                <h3>${escapeHtml(item.name)}</h3>
                <p>${formatMoney(item.price)}</p>
            </div>
            <a href="shop.html?search=${encodeURIComponent(item.name)}">${t('order_btn')}</a>
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
        button.setAttribute('aria-label', t('favorite_aria', { count: likeCount }));
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

function setCatalogOpen(isOpen) {
    if (isOpen) {
        refs.catalogPanel.removeAttribute('hidden');
    } else {
        refs.catalogPanel.setAttribute('hidden', '');
    }

    refs.catalogToggle.setAttribute('aria-expanded', String(isOpen));
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

    refs.langButtons.forEach(button => {
        button.addEventListener('click', () => setLanguage(button.dataset.lang));
    });

    refs.catalogToggle.addEventListener('click', () => {
        const isOpen = refs.catalogPanel.hasAttribute('hidden');
        setCatalogOpen(isOpen);
    });

    if (refs.mobileCatalogToggle) {
        refs.mobileCatalogToggle.addEventListener('click', () => {
            const isOpen = refs.catalogPanel.hasAttribute('hidden');
            setCatalogOpen(isOpen);
            refs.catalogColumn.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    window.addEventListener('storage', () => {
        refreshCounters();
        syncFavoriteButtons();
        renderFavoritesBoard();
    });
}

function initRefs() {
    refs.backButton = $('#go-back-btn');
    refs.searchForm = $('#home-search-form');
    refs.searchScope = $('#home-search-scope');
    refs.searchInput = $('#home-search-input');

    refs.cartCount = $('#cart-count');
    refs.ordersCount = $('#orders-count');
    refs.favoritesCount = $('#favorites-count');

    refs.ordersTool = $('#orders-tool');
    refs.favoritesTool = $('#favorites-tool');
    refs.cartTool = $('#cart-tool');

    refs.heroSlides = $('#hero-slides');
    refs.prevSlide = $('#slide-prev');
    refs.nextSlide = $('#slide-next');
    refs.dotsWrap = $('#slide-dots');

    refs.slides = Array.from(document.querySelectorAll('.slide'));
    refs.dots = Array.from(document.querySelectorAll('#slide-dots button'));

    refs.slideInfoTitle = $('#slide-info-title');
    refs.slideInfoText = $('#slide-info-text');

    refs.favoriteButtons = Array.from(document.querySelectorAll('.fav-toggle'));
    refs.favoritesGrid = $('#favorites-grid');
    refs.favoritesSection = $('#favorites-section');

    refs.langButtons = Array.from(document.querySelectorAll('.lang-btn'));

    refs.catalogColumn = $('.catalog-column');
    refs.catalogToggle = $('#catalog-toggle');
    refs.catalogPanel = $('#catalog-panel');
    refs.mobileCatalogToggle = $('#mobile-catalog-toggle');
}

function initialize() {
    initRefs();
    bindEvents();

    setCatalogOpen(false);
    renderSlides(FALLBACK_ADS);
    bindDots();
    startSlider();

    setLanguage(state.lang);
    syncFavoriteButtons();
    refreshCounters();
    renderFavoritesBoard();

    state.ads = [...FALLBACK_ADS];
    loadAds();
    setInterval(loadAds, ADS_REFRESH_MS);
}

document.addEventListener('DOMContentLoaded', initialize);
