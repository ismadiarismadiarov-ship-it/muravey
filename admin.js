const ADMIN_PASS = '2026';
const ADMIN_SESSION_KEY = 'el_moto_admin_session';
const GITHUB_TOKEN_KEY = 'el_moto_github_pat';

const REPO_OWNER = 'ismadiarismadiarov-ship-it';
const REPO_NAME = 'muravey';
const REPO_BRANCH = 'main';
const PRODUCTS_PATH = 'products.json';
const UPLOADS_DIR = 'assets/uploads';

const RAW_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}`;
const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;
const IMAGE_FALLBACK = 'assets/products/placeholder.svg';

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
    selectedImageFile: null,
    token: '',
    busy: false
};

const refs = {};

function $(selector) {
    return document.querySelector(selector);
}

function showToast(message) {
    refs.toast.textContent = message;
    refs.toast.classList.add('show');
    clearTimeout(refs.toast.hideTimer);
    refs.toast.hideTimer = setTimeout(() => refs.toast.classList.remove('show'), 2800);
}

function setSyncStatus(text, status = '') {
    refs.syncStatus.textContent = text;
    refs.syncStatus.classList.remove('ok', 'warn', 'err');
    if (status) refs.syncStatus.classList.add(status);
}

function setBusy(isBusy) {
    state.busy = isBusy;
    document.querySelectorAll('button, input').forEach(el => {
        if (el.id === 'admin-password' && sessionStorage.getItem(ADMIN_SESSION_KEY) !== '1') return;
        el.disabled = isBusy;
    });
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function normalizeProduct(item) {
    return {
        id: Number(item.id || Date.now()),
        name: String(item.name || '').trim() || 'Товар',
        price: Number(item.price || 0),
        imagePath: item.imagePath || item.img || IMAGE_FALLBACK,
        imageVersion: Number(item.imageVersion || Date.now()),
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

function resolveImageUrl(product) {
    const imagePath = product.imagePath || IMAGE_FALLBACK;
    const base = /^https?:\/\//i.test(imagePath)
        ? imagePath
        : `${RAW_BASE}/${String(imagePath).replace(/^\/+/, '')}`;
    const version = product.imageVersion || product.updatedAt || Date.now();
    return `${base}${base.includes('?') ? '&' : '?'}v=${encodeURIComponent(version)}`;
}

function utf8ToBase64(text) {
    const bytes = new TextEncoder().encode(text);
    let binary = '';
    bytes.forEach(byte => {
        binary += String.fromCharCode(byte);
    });
    return btoa(binary);
}

function base64ToUtf8(base64) {
    const binary = atob(base64.replace(/\n/g, ''));
    const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
}

function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    bytes.forEach(byte => {
        binary += String.fromCharCode(byte);
    });
    return btoa(binary);
}

function getExt(fileName) {
    const cleaned = String(fileName || '').toLowerCase();
    const parts = cleaned.split('.');
    const ext = parts.length > 1 ? parts.pop() : 'jpg';
    return ext.replace(/[^a-z0-9]/g, '') || 'jpg';
}

function getAuthHeaders() {
    if (!state.token) {
        throw new Error('Алгач GitHub token киргизиңиз');
    }

    return {
        Authorization: `Bearer ${state.token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
    };
}

async function githubRequest(path, options = {}) {
    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            ...(options.headers || {}),
            ...getAuthHeaders()
        }
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`GitHub API ${response.status}: ${text}`);
    }

    return response.json();
}

async function getFileMeta(path) {
    try {
        const data = await githubRequest(`/contents/${path}?ref=${REPO_BRANCH}`);
        return { sha: data.sha, data };
    } catch (error) {
        if (String(error.message).includes('404')) {
            return null;
        }
        throw error;
    }
}

async function putFile(path, contentBase64, message, sha = null) {
    const body = {
        message,
        content: contentBase64,
        branch: REPO_BRANCH
    };

    if (sha) {
        body.sha = sha;
    }

    return githubRequest(`/contents/${path}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
}

async function fetchProductsRaw() {
    const response = await fetch(`${RAW_BASE}/${PRODUCTS_PATH}?v=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error(`Raw products fetch failed: ${response.status}`);
    }
    return response.json();
}

async function refreshProducts(showToastAfter = false) {
    try {
        setSyncStatus('Серверден товарлар жүктөлүүдө...', 'warn');

        const payload = await fetchProductsRaw();
        const products = normalizeProductsPayload(payload);

        state.products = products;
        renderAdminList();
        setSyncStatus(`Синхрон OK: ${new Date().toLocaleTimeString()}`, 'ok');

        if (showToastAfter) {
            showToast('Товарлар серверден жаңырды');
        }
    } catch (error) {
        console.error(error);

        if (!state.products.length) {
            state.products = FALLBACK_PRODUCTS.map(normalizeProduct);
            renderAdminList();
        }

        setSyncStatus('Синхрон катасы: products.json окулбай калды', 'err');
        if (showToastAfter) {
            showToast('Серверден окууда ката чыкты');
        }
    }
}

async function saveProductsToGithub(message) {
    const payload = {
        updatedAt: new Date().toISOString(),
        products: state.products
    };

    const content = utf8ToBase64(JSON.stringify(payload, null, 2));
    const meta = await getFileMeta(PRODUCTS_PATH);
    const sha = meta?.sha || null;

    await putFile(PRODUCTS_PATH, content, message, sha);
}

async function uploadImageFile(file, productId) {
    const ext = getExt(file.name);
    const version = Date.now();
    const imagePath = `${UPLOADS_DIR}/product-${productId}-${version}.${ext}`;

    const buffer = await file.arrayBuffer();
    const content = arrayBufferToBase64(buffer);

    await putFile(imagePath, content, `upload image for product ${productId}`);
    return { imagePath, imageVersion: version };
}

function setAuthView(authorized) {
    refs.loginCard.classList.toggle('admin-hidden', authorized);
    refs.adminPanel.classList.toggle('admin-hidden', !authorized);
}

function handleLogin() {
    const password = refs.password.value.trim();
    if (password !== ADMIN_PASS) {
        showToast('Пароль туура эмес');
        return;
    }

    sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
    refs.password.value = '';
    setAuthView(true);
    setSyncStatus('GitHub token киргизиңиз', 'warn');

    const savedToken = localStorage.getItem(GITHUB_TOKEN_KEY) || '';
    refs.githubToken.value = savedToken;
    state.token = savedToken;

    refreshProducts(false);
}

function handleLogout() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setAuthView(false);
    setSyncStatus('Синхрон күтүүдө...');
}

async function handleSaveToken() {
    const token = refs.githubToken.value.trim();
    if (!token) {
        showToast('GitHub token жазыңыз');
        return;
    }

    state.token = token;
    localStorage.setItem(GITHUB_TOKEN_KEY, token);

    setBusy(true);
    try {
        await githubRequest(`/contents/${PRODUCTS_PATH}?ref=${REPO_BRANCH}`);
        setSyncStatus('GitHub API туташты. Эми өзгөртүүлөр серверге сакталат.', 'ok');
        showToast('GitHub туташты');
        await refreshProducts(false);
    } catch (error) {
        console.error(error);
        setSyncStatus('Token же repo уруксат туура эмес', 'err');
        showToast('GitHub туташуу катасы');
    } finally {
        setBusy(false);
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    state.selectedImageFile = file;
    refs.uploadStatus.textContent = `✅ ${file.name}`;

    const localUrl = URL.createObjectURL(file);
    refs.imagePreview.style.backgroundImage = `url(${localUrl})`;
    refs.imagePreview.classList.remove('hidden');
}

async function handleAddProduct() {
    const name = refs.productName.value.trim();
    const price = Number(refs.productPrice.value);

    if (!name || !price || price <= 0 || !state.selectedImageFile) {
        showToast('Аталыш, баа жана сүрөт толтуруңуз');
        return;
    }

    if (!state.token) {
        showToast('Алгач GitHub token туташтырыңыз');
        return;
    }

    const newId = Date.now();

    setBusy(true);
    try {
        const image = await uploadImageFile(state.selectedImageFile, newId);

        const product = {
            id: newId,
            name,
            price,
            imagePath: image.imagePath,
            imageVersion: image.imageVersion,
            updatedAt: new Date().toISOString()
        };

        state.products.unshift(product);
        await saveProductsToGithub(`add product ${newId}`);
        await refreshProducts(false);

        refs.productName.value = '';
        refs.productPrice.value = '';
        refs.productImage.value = '';
        refs.uploadStatus.textContent = '📸 Сүрөт тандаңыз';
        refs.imagePreview.style.backgroundImage = '';
        refs.imagePreview.classList.add('hidden');
        state.selectedImageFile = null;

        showToast('Товар серверге сакталды');
    } catch (error) {
        console.error(error);
        setSyncStatus('Товар сактоодо ката чыкты', 'err');
        showToast('Сактоодо ката чыкты');
    } finally {
        setBusy(false);
    }
}

function renderAdminList() {
    if (!state.products.length) {
        refs.adminList.innerHTML = `<div class="empty-state"><strong>Товар жок</strong><p>Жаңы товар кошуңуз.</p></div>`;
        return;
    }

    refs.adminList.innerHTML = state.products.map(product => {
        const imageUrl = resolveImageUrl(product);
        return `
            <div class="admin-item-card">
                <img src="${imageUrl}" alt="${escapeHtml(product.name)}" onerror="this.onerror=null;this.src='${IMAGE_FALLBACK}';">
                <div class="admin-item-body">
                    <div class="admin-item-fields">
                        <input type="text" value="${escapeHtml(product.name)}" data-field="name" data-id="${product.id}">
                        <input type="number" value="${product.price}" data-field="price" data-id="${product.id}">
                    </div>
                    <div class="admin-item-actions">
                        <button data-action="save" data-id="${product.id}">Сактоо</button>
                        <button data-action="change-image" data-id="${product.id}">Сүрөт алмаштыруу</button>
                        <button data-action="delete" data-id="${product.id}" class="danger">Өчүрүү</button>
                        <input class="hidden-input" type="file" accept="image/*" data-file-id="${product.id}">
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function findProductIndex(id) {
    return state.products.findIndex(item => Number(item.id) === Number(id));
}

async function handleSaveProduct(id) {
    const index = findProductIndex(id);
    if (index < 0) return;

    const nameInput = refs.adminList.querySelector(`input[data-field="name"][data-id="${id}"]`);
    const priceInput = refs.adminList.querySelector(`input[data-field="price"][data-id="${id}"]`);

    const nextName = String(nameInput?.value || '').trim();
    const nextPrice = Number(priceInput?.value || 0);

    if (!nextName || !nextPrice || nextPrice <= 0) {
        showToast('Аталыш же баа туура эмес');
        return;
    }

    state.products[index] = {
        ...state.products[index],
        name: nextName,
        price: nextPrice,
        updatedAt: new Date().toISOString()
    };

    setBusy(true);
    try {
        await saveProductsToGithub(`update product ${id}`);
        await refreshProducts(false);
        showToast('Товар жаңыртылды');
    } catch (error) {
        console.error(error);
        setSyncStatus('Товар жаңыртууда ката чыкты', 'err');
        showToast('Жаңыртууда ката');
    } finally {
        setBusy(false);
    }
}

async function handleDeleteProduct(id) {
    const confirmed = confirm('Товарды чындап өчүрөсүзбү?');
    if (!confirmed) return;

    state.products = state.products.filter(item => Number(item.id) !== Number(id));

    setBusy(true);
    try {
        await saveProductsToGithub(`delete product ${id}`);
        await refreshProducts(false);
        showToast('Товар өчүрүлдү');
    } catch (error) {
        console.error(error);
        setSyncStatus('Өчүрүүдө ката чыкты', 'err');
        showToast('Өчүрүүдө ката');
    } finally {
        setBusy(false);
    }
}

async function handleReplaceImage(id, file) {
    if (!file) return;

    const index = findProductIndex(id);
    if (index < 0) return;

    setBusy(true);
    try {
        const image = await uploadImageFile(file, id);

        state.products[index] = {
            ...state.products[index],
            imagePath: image.imagePath,
            imageVersion: image.imageVersion,
            updatedAt: new Date().toISOString()
        };

        await saveProductsToGithub(`replace image for product ${id}`);
        await refreshProducts(false);
        showToast('Сүрөт жаңырды жана серверге сакталды');
    } catch (error) {
        console.error(error);
        setSyncStatus('Сүрөт жаңыртууда ката чыкты', 'err');
        showToast('Сүрөт жаңыртууда ката');
    } finally {
        setBusy(false);
    }
}

function bindAdminListEvents() {
    refs.adminList.addEventListener('click', event => {
        const button = event.target.closest('button[data-action]');
        if (!button || state.busy) return;

        const action = button.dataset.action;
        const id = Number(button.dataset.id);

        if (action === 'save') {
            handleSaveProduct(id);
        } else if (action === 'delete') {
            handleDeleteProduct(id);
        } else if (action === 'change-image') {
            const fileInput = refs.adminList.querySelector(`input[data-file-id="${id}"]`);
            if (fileInput) fileInput.click();
        }
    });

    refs.adminList.addEventListener('change', event => {
        const input = event.target.closest('input[type="file"][data-file-id]');
        if (!input || !input.files?.length) return;

        const id = Number(input.dataset.fileId);
        const file = input.files[0];
        handleReplaceImage(id, file);
        input.value = '';
    });
}

function initialize() {
    refs.loginCard = $('#login-card');
    refs.adminPanel = $('#admin-panel');
    refs.password = $('#admin-password');
    refs.loginBtn = $('#admin-login-btn');
    refs.logoutBtn = $('#admin-logout');
    refs.githubToken = $('#github-token');
    refs.saveTokenBtn = $('#save-token');
    refs.syncNowBtn = $('#sync-now');
    refs.syncStatus = $('#sync-status');
    refs.productName = $('#product-name');
    refs.productPrice = $('#product-price');
    refs.productImage = $('#product-image');
    refs.uploadStatus = $('#upload-status');
    refs.imagePreview = $('#image-preview');
    refs.addProduct = $('#add-product');
    refs.adminList = $('#admin-list');
    refs.toast = $('#toast');

    refs.loginBtn.addEventListener('click', handleLogin);
    refs.password.addEventListener('keydown', event => {
        if (event.key === 'Enter') handleLogin();
    });

    refs.logoutBtn.addEventListener('click', handleLogout);
    refs.saveTokenBtn.addEventListener('click', handleSaveToken);
    refs.syncNowBtn.addEventListener('click', () => refreshProducts(true));
    refs.productImage.addEventListener('change', handleImageUpload);
    refs.addProduct.addEventListener('click', handleAddProduct);

    bindAdminListEvents();

    const isAuthorized = sessionStorage.getItem(ADMIN_SESSION_KEY) === '1';
    setAuthView(isAuthorized);

    const savedToken = localStorage.getItem(GITHUB_TOKEN_KEY) || '';
    refs.githubToken.value = savedToken;
    state.token = savedToken;

    if (isAuthorized) {
        refreshProducts(false);
        setSyncStatus(savedToken ? 'GitHub token табылды, синхрон даяр' : 'GitHub token киргизиңиз', savedToken ? 'ok' : 'warn');
    } else {
        setSyncStatus('Админ кирүүнү күтүүдө...');
    }
}

document.addEventListener('DOMContentLoaded', initialize);
