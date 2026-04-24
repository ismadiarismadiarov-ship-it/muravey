const ADMIN_PASS = '2026';
const ADMIN_SESSION_KEY = 'el_moto_admin_session';
const DB_KEY = 'muravey_pro_db';
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
    selectedImage: null
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
    refs.toast.textContent = message;
    refs.toast.classList.add('show');
    clearTimeout(refs.toast.hideTimer);
    refs.toast.hideTimer = setTimeout(() => refs.toast.classList.remove('show'), 2800);
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

function initialize() {
    refs.loginCard = $('#login-card');
    refs.adminPanel = $('#admin-panel');
    refs.password = $('#admin-password');
    refs.loginBtn = $('#admin-login-btn');
    refs.logoutBtn = $('#admin-logout');
    refs.productName = $('#product-name');
    refs.productPrice = $('#product-price');
    refs.productImage = $('#product-image');
    refs.uploadStatus = $('#upload-status');
    refs.imagePreview = $('#image-preview');
    refs.addProduct = $('#add-product');
    refs.adminList = $('#admin-list');
    refs.toast = $('#toast');

    state.products = migrateProducts(getLocalData(DB_KEY, DEFAULT_PRODUCTS));
    bindEvents();
    renderAdminList();

    const isAuthorized = sessionStorage.getItem(ADMIN_SESSION_KEY) === '1';
    setAuthView(isAuthorized);
}

function bindEvents() {
    refs.loginBtn.addEventListener('click', handleLogin);
    refs.password.addEventListener('keydown', event => {
        if (event.key === 'Enter') handleLogin();
    });

    refs.logoutBtn.addEventListener('click', handleLogout);
    refs.productImage.addEventListener('change', handleImageUpload);
    refs.addProduct.addEventListener('click', handleProductCreate);
}

function setAuthView(authorized) {
    refs.loginCard.classList.toggle('admin-hidden', authorized);
    refs.adminPanel.classList.toggle('admin-hidden', !authorized);
}

function handleLogin() {
    if (refs.password.value.trim() !== ADMIN_PASS) {
        showToast('Пароль туура эмес');
        return;
    }

    sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
    refs.password.value = '';
    setAuthView(true);
    renderAdminList();
    showToast('Админ панель ачылды');
}

function handleLogout() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setAuthView(false);
    showToast('Админден чыктыңыз');
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

    if (!name || !price || price <= 0 || !state.selectedImage) {
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
    renderAdminList();

    refs.productName.value = '';
    refs.productPrice.value = '';
    refs.productImage.value = '';
    refs.uploadStatus.textContent = '📸 Сүрөт тандаңыз';
    refs.imagePreview.style.backgroundImage = '';
    refs.imagePreview.classList.add('hidden');
    state.selectedImage = null;

    showToast('Товар кошулду');
}

function renderAdminList() {
    if (!state.products.length) {
        refs.adminList.innerHTML = `<div class="empty-state"><strong>Товар жок</strong><p>Жаңы товар кошуңуз.</p></div>`;
        return;
    }

    refs.adminList.innerHTML = state.products.map(product => {
        const imagePath = typeof product.img === 'string' && product.img.trim() ? product.img : IMAGE_FALLBACK;
        return `
            <div class="admin-item-card">
                <img src="${imagePath}" alt="${product.name}" onerror="this.onerror=null;this.src='${IMAGE_FALLBACK}';">
                <div class="admin-item-info">
                    <strong>${product.name}</strong>
                    <span>${formatCurrency(product.price)}</span>
                </div>
                <button data-action="delete" data-id="${product.id}">Өчүрүү</button>
            </div>
        `;
    }).join('');

    refs.adminList.querySelectorAll('[data-action="delete"]').forEach(btn => {
        btn.addEventListener('click', event => {
            const id = Number(event.target.dataset.id);
            handleProductDelete(id);
        });
    });
}

function handleProductDelete(id) {
    const confirmed = confirm('Товарды чындап өчүрөсүзбү?');
    if (!confirmed) return;

    state.products = state.products.filter(item => item.id !== id);
    setLocalData(DB_KEY, state.products);
    renderAdminList();
    showToast('Товар өчүрүлдү');
}

document.addEventListener('DOMContentLoaded', initialize);
