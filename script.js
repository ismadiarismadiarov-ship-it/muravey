const TG_TOKEN = "8425959254:AAEX4_b-HxV-scwVXBMH5lXB_l4lIQgjdnI";
const TG_ID = "6552625844";
const CART_KEY = 'muravey_pro_cart';
const SEARCH_KEYWORDS = 'элмото moto мото мото тетиктер motoparts';
const IMAGE_FALLBACK = 'assets/products/placeholder.svg';

const REPO_OWNER = 'ismadiarismadiarov-ship-it';
const REPO_NAME = 'muravey';
const REPO_BRANCH = 'main';
const RAW_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}`;
const PRODUCTS_ENDPOINT = `${RAW_BASE}/products.json`;
const PRODUCTS_REFRESH_MS = 20000;

const FALLBACK_PRODUCTS = [
    {
        id: 101,
        name: 'тормозной колотка',
        price: 400,
        imagePath: 'assets/products/brake-shoe.jpeg',
        imageVersion: 1745486400001,
        updatedAt: '2026-04-24T09:20:00.000Z'
    },
    {
        id: 102,
        name: 'задный стоп',
        price: 500,
        imagePath: 'assets/products/rear-stop.jpeg',
        imageVersion: 1745486400002,
        updatedAt: '2026-04-24T09:20:00.000Z'
    },
    {
        id: 103,
        name: 'реле',
        price: 180,
        imagePath: 'assets/products/relay.jpeg',
        imageVersion: 1745486400003,
        updatedAt: '2026-04-24T09:20:00.000Z'
    },
    {
        id: 104,
        name: 'передный осс',
        price: 1200,
        imagePath: 'assets/products/front-hub.jpeg',
        imageVersion: 1745486400004,
        updatedAt: '2026-04-24T09:20:00.000Z'
    }
];

const state = {
    products: [],
    filteredProducts: [],
    cart: {},
    lastDataStamp: '',
    pendingPanelOpen: false
};

const refs = {};

function $(selector) {
    return document.querySelector(selector);
}

function getLocalData(key, fallback) {
    return JSON.parse(localStorage.getItem(key)) || fallback;
}

function setLocalData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function formatCurrency(value) {
    return `${Number(value || 0).toLocaleString()} сом`;
}

function readRouteState() {
    const params = new URLSearchParams(window.location.search);
    const search = String(params.get('search') || '').trim();
    const panel = String(params.get('panel') || '').trim().toLowerCase();
    return {
        search,
        openCart: panel === 'cart' || panel === 'orders'
    };
}

function showToast(message) {
    const toast = refs.toast;
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast.hideTimer);
    toast.hideTimer = setTimeout(() => toast.classList.remove('show'), 2800);
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

function normalizeProduct(item) {
    const id = Number(item.id || Date.now());
    const imagePath = item.imagePath || item.img || IMAGE_FALLBACK;

    return {
        id,
        name: String(item.name || '').trim() || 'Товар',
        price: Number(item.price || 0),
        imagePath,
        imageVersion: Number(item.imageVersion || 0) || Date.now(),
        updatedAt: item.updatedAt || new Date().toISOString()
    };
}

function normalizeProductsPayload(payload) {
    const productsArray = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.products)
            ? payload.products
            : [];

    return productsArray.map(normalizeProduct);
}

function applyFilter(query = refs.searchInput?.value || '') {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        state.filteredProducts = [...state.products];
        return;
    }

    state.filteredProducts = state.products.filter(product => {
        const searchable = `${product.name} ${SEARCH_KEYWORDS}`.toLowerCase();
        return searchable.includes(normalizedQuery);
    });
}

async function fetchProductsFromServer() {
    const response = await fetch(withVersion(PRODUCTS_ENDPOINT, Date.now()), {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error(`Products fetch failed: ${response.status}`);
    }

    return response.json();
}

async function loadProducts(options = {}) {
    const { silent = false } = options;

    try {
        const payload = await fetchProductsFromServer();
        const products = normalizeProductsPayload(payload);
        const stamp = JSON.stringify(products.map(item => [item.id, item.name, item.price, item.imagePath, item.imageVersion]));

        if (stamp === state.lastDataStamp) {
            return;
        }

        state.lastDataStamp = stamp;
        state.products = products;
        applyFilter();
        renderCatalog();

        if (!silent) {
            showToast('Товарлар жаңыртылды');
        }
    } catch (error) {
        console.error(error);

        if (!state.products.length) {
            state.products = FALLBACK_PRODUCTS.map(normalizeProduct);
            applyFilter();
            renderCatalog();
        }

        if (!silent) {
            showToast('Серверден жүктөөдө ката чыкты, камдык товарлар көрсөтүлдү');
        }
    }
}

function initialize() {
    refs.productList = $('#product-list');
    refs.cartPanel = $('#cart-panel');
    refs.cartItems = $('#cart-items');
    refs.cartCount = $('#cart-count');
    refs.cartSummary = $('#cart-summary');
    refs.totalAmount = $('#total-amount');
    refs.productTotal = $('#product-total');
    refs.searchForm = $('#search-form');
    refs.searchInput = $('#search-input');
    refs.cartOpen = $('#cart-open');
    refs.cartClose = $('#cart-close');
    refs.orderSubmit = $('#order-submit');
    refs.customerName = $('#customer-name');
    refs.customerPhone = $('#customer-phone');
    refs.toast = $('#toast');
    refs.themeToggle = $('#theme-toggle');

    state.cart = getLocalData(CART_KEY, {});
    const routeState = readRouteState();
    state.pendingPanelOpen = routeState.openCart;
    if (routeState.search) {
        refs.searchInput.value = routeState.search;
    }

    bindEvents();
    renderCart();
    loadTheme();
    loadProducts({ silent: true }).then(() => {
        if (state.pendingPanelOpen) {
            toggleCart(true);
            state.pendingPanelOpen = false;
        }
    });

    setInterval(() => loadProducts({ silent: true }), PRODUCTS_REFRESH_MS);
}

function bindEvents() {
    refs.searchForm.addEventListener('submit', event => {
        event.preventDefault();
        handleSearch();
    });

    refs.searchInput.addEventListener('input', handleSearch);
    refs.cartOpen.addEventListener('click', () => toggleCart(true));
    refs.cartClose.addEventListener('click', () => toggleCart(false));
    refs.orderSubmit.addEventListener('click', handleCheckout);
    refs.themeToggle.addEventListener('click', toggleTheme);

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            toggleCart(false);
        }
    });

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            loadProducts({ silent: true });
        }
    });

    window.addEventListener('focus', () => loadProducts({ silent: true }));
}

function handleSearch() {
    applyFilter(refs.searchInput.value);
    renderCatalog();
}

function renderCatalog() {
    refs.productTotal.textContent = state.filteredProducts.length;

    if (!state.filteredProducts.length) {
        refs.productList.innerHTML = `<div class="empty-state"><strong>Товар табылбады</strong><p>Издөөнү башкача жазып көрүңүз.</p></div>`;
        return;
    }

    refs.productList.innerHTML = state.filteredProducts.map(createProductCard).join('');
    refs.productList.querySelectorAll('[data-action="add"]').forEach(button => {
        button.addEventListener('click', handleCartAction);
    });
}

function createProductCard(product) {
    const rawImageUrl = resolveAssetUrl(product.imagePath);
    const imageUrl = withVersion(rawImageUrl, product.imageVersion || product.updatedAt || Date.now());

    return `
        <article class="card">
            <div class="img-container">
                <img src="${imageUrl}" alt="${product.name}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${IMAGE_FALLBACK}';">
            </div>
            <div class="card-body">
                <h3>${product.name}</h3>
                <div class="price">${formatCurrency(product.price)}</div>
                <button class="checkout-btn" data-action="add" data-id="${product.id}">Заказ берүү</button>
            </div>
        </article>
    `;
}

function renderCart() {
    const entries = Object.values(state.cart);
    const totalCount = entries.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    const totalAmount = entries.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.price || 0), 0);

    refs.cartCount.textContent = totalCount;
    refs.cartSummary.textContent = `${totalCount} товар, ${formatCurrency(totalAmount)}`;
    refs.totalAmount.textContent = formatCurrency(totalAmount);

    if (!entries.length) {
        refs.cartItems.innerHTML = `<div class="cart-item"><strong>Заказдар бош</strong><span>Товар тандап, заказ бериңиз.</span></div>`;
        return;
    }

    refs.cartItems.innerHTML = entries.map(createCartRow).join('');
    refs.cartItems.querySelectorAll('[data-action]').forEach(button => {
        button.addEventListener('click', handleCartAction);
    });
}

function createCartRow(item) {
    return `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong>
                <span>${formatCurrency(item.price)} each</span>
            </div>
            <div class="quantity-control">
                <button data-action="decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button data-action="increase" data-id="${item.id}">+</button>
                <button data-action="remove" data-id="${item.id}" style="color:#ff4d4f;">Өчүрүү</button>
            </div>
        </div>
    `;
}

function handleCartAction(event) {
    const action = event.target.dataset.action;
    const id = Number(event.target.dataset.id);

    if (!id) return;

    if (action === 'add') {
        addToCart(id);
    } else if (action === 'increase') {
        changeQuantity(id, 1);
    } else if (action === 'decrease') {
        changeQuantity(id, -1);
    } else if (action === 'remove') {
        removeFromCart(id);
    }
}

function addToCart(id) {
    const product = state.products.find(item => Number(item.id) === id);
    if (!product) {
        showToast('Товар табылбады');
        return;
    }

    if (state.cart[id]) {
        state.cart[id].quantity += 1;
    } else {
        state.cart[id] = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        };
    }

    saveCart();
    renderCart();
    toggleCart(true);
    showToast(`${product.name} заказдарга кошулду`);
}

function changeQuantity(id, delta) {
    if (!state.cart[id]) return;
    state.cart[id].quantity += delta;

    if (state.cart[id].quantity <= 0) {
        delete state.cart[id];
    }

    saveCart();
    renderCart();
}

function removeFromCart(id) {
    delete state.cart[id];
    saveCart();
    renderCart();
}

function saveCart() {
    setLocalData(CART_KEY, state.cart);
}

function handleCheckout() {
    const name = refs.customerName.value.trim();
    const phone = refs.customerPhone.value.trim();
    const cartItems = Object.values(state.cart);

    if (!name || !phone) {
        showToast('Атыңызды жана телефон номерди жазыңыз');
        return;
    }

    if (!validatePhone(phone)) {
        showToast('Телефон форматы туура эмес');
        return;
    }

    if (!cartItems.length) {
        showToast('Заказ берүү үчүн товар тандаңыз');
        return;
    }

    sendOrder(name, phone, cartItems);
}

function validatePhone(value) {
    return /^0\d{8,11}$/.test(value.replace(/\D/g, ''));
}

async function sendOrder(name, phone, cartItems) {
    const itemLines = cartItems.map((item, index) => `${index + 1}. ${item.name} x${item.quantity} - ${formatCurrency(item.price * item.quantity)}`).join('\n');
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const message = `📦 *ЖАҢЫ ЗАКАЗ (ЭлМОТО)*\n\n👤 *Кардар:* ${name}\n📞 *Тел:* ${phone}\n\n*Товарлар:*\n${itemLines}\n\n💰 *Жалпы:* ${formatCurrency(totalAmount)}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TG_ID, text: message, parse_mode: 'Markdown' })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Telegram API error:', errorData);
            throw new Error(`Telegram API error: ${response.status}`);
        }

        showToast('Заказ кабыл алынды!');
        state.cart = {};
        saveCart();
        renderCart();
        refs.customerName.value = '';
        refs.customerPhone.value = '';
        toggleCart(false);
    } catch (error) {
        console.error(error);
        showToast('Заказды жөнөтүүдө ката чыкты');
    }
}

function toggleCart(show) {
    refs.cartPanel.classList.toggle('active', show);
    refs.cartPanel.setAttribute('aria-hidden', String(!show));
}

function loadTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', theme === 'dark');
    refs.themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    const theme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    refs.themeToggle.textContent = isDark ? '☀️' : '🌙';
    showToast(`Тема ${theme === 'dark' ? 'кара' : 'ак'} болуп өзгөртүлдү`);
}

document.addEventListener('DOMContentLoaded', initialize);
