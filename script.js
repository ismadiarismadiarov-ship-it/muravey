const TG_TOKEN = "8425959254:AAEX4_b-HxV-scwVXBMH5lXB_l4lIQgjdnI";
const TG_ID = "6552625844";
const DB_KEY = 'muravey_pro_db';
const CART_KEY = 'muravey_pro_cart';
const SEARCH_KEYWORDS = 'элмото moto мото мото тетиктер motoparts';
const IMAGE_FALLBACK = 'assets/products/placeholder.svg';
const PRODUCT_IMAGE_MAP = {
    1: 'assets/products/product-1.svg',
    2: 'assets/products/product-2.svg',
    3: 'assets/products/product-3.svg',
    4: 'assets/products/product-4.svg'
};

const DEFAULT_PRODUCTS = [
    { id: 1, name: 'Электр гайканы', price: 350, img: PRODUCT_IMAGE_MAP[1] },
    { id: 2, name: 'Металл плитка', price: 1120, img: PRODUCT_IMAGE_MAP[2] },
    { id: 3, name: 'Кабель жиптери', price: 220, img: PRODUCT_IMAGE_MAP[3] },
    { id: 4, name: 'Мотор контроллери', price: 2950, img: PRODUCT_IMAGE_MAP[4] }
];

const state = {
    products: [],
    cart: {},
    filteredProducts: []
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

function getDefaultImage(id) {
    return PRODUCT_IMAGE_MAP[id] || IMAGE_FALLBACK;
}

function migrateProducts(products) {
    if (!Array.isArray(products) || !products.length) {
        return [...DEFAULT_PRODUCTS];
    }

    let changed = false;
    const migrated = products.map((product, index) => {
        const next = { ...product };
        const currentImg = typeof next.img === 'string' ? next.img.trim() : '';

        if (!currentImg) {
            next.img = getDefaultImage(next.id || DEFAULT_PRODUCTS[index % DEFAULT_PRODUCTS.length].id);
            changed = true;
            return next;
        }

        if (currentImg.includes('images.unsplash.com')) {
            next.img = getDefaultImage(next.id);
            changed = true;
        }

        return next;
    });

    if (changed) {
        setLocalData(DB_KEY, migrated);
    }

    return migrated;
}

function formatCurrency(value) {
    return `${value.toLocaleString()} сом`;
}

function showToast(message) {
    const toast = refs.toast;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast.hideTimer);
    toast.hideTimer = setTimeout(() => toast.classList.remove('show'), 2800);
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

    state.products = migrateProducts(getLocalData(DB_KEY, DEFAULT_PRODUCTS));
    state.filteredProducts = [...state.products];
    state.cart = getLocalData(CART_KEY, {});

    bindEvents();
    renderCatalog();
    renderCart();
    loadTheme();
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
}

function handleSearch() {
    const query = refs.searchInput.value.trim().toLowerCase();
    state.filteredProducts = state.products.filter(product => {
        const searchable = `${product.name} ${SEARCH_KEYWORDS}`.toLowerCase();
        return searchable.includes(query);
    });
    renderCatalog();
}

function renderCatalog() {
    refs.productTotal.textContent = state.filteredProducts.length;

    if (!state.filteredProducts.length) {
        refs.productList.innerHTML = `<div class="empty-state"><strong>Товар табылбады</strong><p>Сөздү башкача жазып көрүңүз.</p></div>`;
        return;
    }

    refs.productList.innerHTML = state.filteredProducts.map(createProductCard).join('');
    refs.productList.querySelectorAll('[data-action="add"]').forEach(button => {
        button.addEventListener('click', handleCartAction);
    });
}

function createProductCard(product) {
    const imagePath = typeof product.img === 'string' && product.img.trim() ? product.img : IMAGE_FALLBACK;

    return `
        <article class="card">
            <div class="img-container">
                <img src="${imagePath}" alt="${product.name}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${IMAGE_FALLBACK}';">
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
    const totalCount = entries.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = entries.reduce((sum, item) => sum + item.quantity * item.price, 0);

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
    const product = state.products.find(item => item.id === id);
    if (!product) {
        showToast('Товар табылбады');
        return;
    }

    if (state.cart[id]) {
        state.cart[id].quantity += 1;
    } else {
        state.cart[id] = { ...product, quantity: 1 };
    }

    saveCart();
    renderCart();
    toggleCart(true);
    showToast(`${product.name} заказдарга кошулду`);
}

function changeQuantity(id, delta) {
    if (!state.cart[id]) return;
    state.cart[id].quantity += delta;
    if (state.cart[id].quantity <= 0) delete state.cart[id];
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
