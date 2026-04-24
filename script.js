const TG_TOKEN = "8425959254:AAEX4_b-HxV-scwVXBMH5lXB_l4lIQgjdnI"; // Мисал токен, өндүрүш үчүн бекитилсин
const TG_ID = "6552625844"; // Telegram chat_id
const ADMIN_PASS = "2026";
const DB_KEY = 'muravey_pro_db';
const CART_KEY = 'muravey_pro_cart';
const SEARCH_KEYWORDS = 'элмото moto мото мото тетиктер motoparts';
const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: 'Электр гайканы',
        price: 350,
        img: 'https://images.unsplash.com/photo-1514843566547-2a98de7e7c72?auto=format&fit=crop&w=640&q=80'
    },
    {
        id: 2,
        name: 'Металл плитка',
        price: 1120,
        img: 'https://images.unsplash.com/photo-1555696955-6cef30c8d441?auto=format&fit=crop&w=640&q=80'
    },
    {
        id: 3,
        name: 'Кабель жиптери',
        price: 220,
        img: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=640&q=80'
    },
    {
        id: 4,
        name: 'Мотор контроллери',
        price: 2950,
        img: 'https://images.unsplash.com/photo-1593637931181-32f41d8f2073?auto=format&fit=crop&w=640&q=80'
    }
];

const state = {
    products: [],
    cart: {},
    selectedImage: null,
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
    refs.adminOpen = $('#admin-open');
    refs.loginModal = $('#login-modal');
    refs.adminPanel = $('#admin-panel');
    refs.adminClose = $('#admin-close');
    refs.loginClose = $('#login-close');
    refs.adminLogin = $('#admin-login');
    refs.adminPassword = $('#admin-password');
    refs.productName = $('#product-name');
    refs.productPrice = $('#product-price');
    refs.productImage = $('#product-image');
    refs.uploadStatus = $('#upload-status');
    refs.imagePreview = $('#image-preview');
    refs.addProduct = $('#add-product');
    refs.adminList = $('#admin-list');
    refs.toast = $('#toast');
    refs.themeToggle = $('#theme-toggle');

    state.products = getLocalData(DB_KEY, DEFAULT_PRODUCTS);
    state.filteredProducts = [...state.products];
    state.cart = getLocalData(CART_KEY, {});

    bindEvents();
    renderCatalog();
    renderCart();
    renderAdminList();
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
    refs.adminOpen.addEventListener('click', () => toggleModal(refs.loginModal, true));
    refs.loginClose.addEventListener('click', () => toggleModal(refs.loginModal, false));
    refs.adminClose.addEventListener('click', () => toggleModal(refs.adminPanel, false));
    refs.adminLogin.addEventListener('click', handleAdminLogin);
    refs.productImage.addEventListener('change', handleImageUpload);
    refs.addProduct.addEventListener('click', handleProductCreate);
    refs.themeToggle.addEventListener('click', toggleTheme);

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            toggleCart(false);
            toggleModal(refs.loginModal, false);
            toggleModal(refs.adminPanel, false);
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
        refs.productList.innerHTML = `<div class="empty-state"><strong>Товар табылбады</strong><p>Сөздү башкача жазып көрүңүз же жаңы товар кошуңуз.</p></div>`;
        return;
    }

    refs.productList.innerHTML = state.filteredProducts.map(createProductCard).join('');
    refs.productList.querySelectorAll('[data-action="add"]').forEach(button => {
        button.addEventListener('click', handleCartAction);
    });
}

function createProductCard(product) {
    return `
        <article class="card">
            <div class="img-container">
                <img src="${product.img}" alt="${product.name}">
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

        const data = await response.json();
        console.log('Telegram response:', data);

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

function toggleModal(modal, show) {
    modal.classList.toggle('active', show);
    modal.setAttribute('aria-hidden', String(!show));
}

function handleAdminLogin() {
    const password = refs.adminPassword.value;
    if (password === ADMIN_PASS) {
        refs.adminPassword.value = '';
        toggleModal(refs.loginModal, false);
        toggleModal(refs.adminPanel, true);
        renderAdminList();
    } else {
        showToast('Пароль туура эмес');
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        state.selectedImage = reader.result;
        refs.uploadStatus.textContent = '✅ Сүрөт тандалды';
        refs.imagePreview.style.backgroundImage = `url(${state.selectedImage})`;
        refs.imagePreview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
}

function handleProductCreate() {
    const name = refs.productName.value.trim();
    const price = Number(refs.productPrice.value);

    if (!name || !price || !state.selectedImage) {
        showToast('Баарын туура толтуруңуз');
        return;
    }

    const newProduct = {
        id: Date.now(),
        name,
        price,
        img: state.selectedImage
    };

    state.products.unshift(newProduct);
    setLocalData(DB_KEY, state.products);
    state.filteredProducts = [...state.products];
    renderCatalog();
    renderAdminList();

    refs.productName.value = '';
    refs.productPrice.value = '';
    refs.productImage.value = '';
    refs.uploadStatus.textContent = '📸 Сүрөт тандаңыз';
    refs.imagePreview.style.backgroundImage = '';
    refs.imagePreview.classList.add('hidden');
    state.selectedImage = null;

    showToast('Товар базага кошулду');
}

function renderAdminList() {
    if (!refs.adminList) return;

    refs.adminList.innerHTML = state.products.map(product => `
        <div class="admin-item">
            <div>
                <strong>${product.name}</strong>
                <span>${formatCurrency(product.price)}</span>
            </div>
            <button data-action="delete" data-id="${product.id}">Өчүрүү</button>
        </div>
    `).join('');

    refs.adminList.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', event => {
            const id = Number(event.target.dataset.id);
            handleProductDelete(id);
        });
    });
}

function handleProductDelete(id) {
    const confirmed = confirm('Товарды чындыгында өчүрөсүзбү?');
    if (!confirmed) return;

    state.products = state.products.filter(item => item.id !== id);
    setLocalData(DB_KEY, state.products);
    state.filteredProducts = state.filteredProducts.filter(item => item.id !== id);
    renderCatalog();
    renderAdminList();
    showToast('Товар өчүрүлдү');
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
