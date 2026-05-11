const ADMIN_PASS = '2026';
const ADMIN_SESSION_KEY = 'el_moto_admin_session';
const GITHUB_TOKEN_KEY = 'el_moto_github_pat';
const ADMIN_LANG_KEY = 'el_moto_admin_lang';

const REPO_OWNER = 'ismadiarismadiarov-ship-it';
const REPO_NAME = 'muravey';
const REPO_BRANCH = 'main';
const PRODUCTS_PATH = 'products.json';
const UPLOADS_DIR = 'assets/uploads';

const RAW_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}`;
const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;
const IMAGE_FALLBACK = 'assets/products/placeholder.svg';

const I18N = {
    ky: {
        admin_panel_label: 'админ панели',
        back_to_site: 'Сайтка кайтуу',
        login_title: 'Админ кирүү',
        login_text: 'Админ пароль киргизиңиз.',
        password_placeholder: 'Пароль',
        login_btn: 'КИРҮҮ',
        products_manage: 'Товар башкаруу',
        products_manage_text: 'Товарлар жана сүрөттөр GitHub серверинде сакталат.',
        logout_btn: 'Чыгуу',
        kpi_products: 'Товар',
        kpi_value: 'Жалпы сумма',
        kpi_updated: 'Акыркы синхрон',
        server_connect_title: 'Сервер туташуу (GitHub API)',
        server_connect_text: 'Repo укугу бар Personal Access Token киргизиңиз. Бул токен админ браузеринде гана сакталат.',
        token_placeholder: 'GitHub token (ghp_...)',
        connect_btn: 'Туташуу',
        refresh_btn: 'Азыр жаңыртуу',
        search_placeholder: 'Товар издөө...',
        sort_new: 'Жаңы биринчи',
        sort_old: 'Эски биринчи',
        sort_price_desc: 'Баасы кымбат биринчи',
        sort_price_asc: 'Баасы арзан биринчи',
        sort_name: 'Аты боюнча',
        product_name_placeholder: 'Товардын аталышы',
        product_price_placeholder: 'Баасы (сом)',
        add_product_btn: 'Товар кошуу',
        upload_pick: '📸 Сүрөт тандаңыз',
        upload_selected: '✅ {file}',
        save_btn: 'Сактоо',
        change_image_btn: 'Сүрөт алмаштыруу',
        delete_btn: 'Өчүрүү',
        empty_title: 'Товар жок',
        empty_text: 'Жаңы товар кошуңуз.',
        wrong_password: 'Пароль туура эмес',
        token_required: 'GitHub token жазыңыз',
        token_first: 'Алгач GitHub token туташтырыңыз',
        fill_required: 'Аталыш, баа жана сүрөт толтуруңуз',
        invalid_fields: 'Аталыш же баа туура эмес',
        confirm_delete: 'Товарды чындап өчүрөсүзбү?',
        toast_connected: 'GitHub туташты',
        toast_connect_error: 'GitHub туташуу катасы',
        toast_products_refreshed: 'Товарлар серверден жаңырды',
        toast_saved: 'Товар серверге сакталды',
        toast_save_error: 'Сактоодо ката чыкты',
        toast_updated: 'Товар жаңыртылды',
        toast_update_error: 'Жаңыртууда ката',
        toast_deleted: 'Товар өчүрүлдү',
        toast_delete_error: 'Өчүрүүдө ката',
        toast_image_updated: 'Сүрөт жаңырды жана серверге сакталды',
        toast_image_error: 'Сүрөт жаңыртууда ката',
        sync_waiting: 'Синхрон күтүүдө...',
        sync_need_token: 'GitHub token киргизиңиз',
        sync_loading: 'Серверден товарлар жүктөлүүдө...',
        sync_ok: 'Синхрон OK: {time}',
        sync_read_error: 'Синхрон катасы: products.json окулбай калды',
        sync_connect_ok: 'GitHub API туташты. Эми өзгөртүүлөр серверге сакталат.',
        sync_token_error: 'Token же repo уруксат туура эмес',
        sync_save_error: 'Товар сактоодо ката чыкты',
        sync_update_error: 'Товар жаңыртууда ката чыкты',
        sync_delete_error: 'Өчүрүүдө ката чыкты',
        sync_image_error: 'Сүрөт жаңыртууда ката чыкты',
        sync_token_found: 'GitHub token табылды, синхрон даяр',
        sync_login_waiting: 'Админ кирүүнү күтүүдө...',
        need_token_error: 'Алгач GitHub token киргизиңиз',
        fallback_name: 'Товар'
    },
    ru: {
        admin_panel_label: 'панель администратора',
        back_to_site: 'Вернуться на сайт',
        login_title: 'Вход администратора',
        login_text: 'Введите пароль администратора.',
        password_placeholder: 'Пароль',
        login_btn: 'ВОЙТИ',
        products_manage: 'Управление товарами',
        products_manage_text: 'Товары и изображения хранятся на сервере GitHub.',
        logout_btn: 'Выйти',
        kpi_products: 'Товары',
        kpi_value: 'Общая сумма',
        kpi_updated: 'Последняя синхронизация',
        server_connect_title: 'Подключение к серверу (GitHub API)',
        server_connect_text: 'Введите Personal Access Token с правами на репозиторий. Токен хранится только в браузере администратора.',
        token_placeholder: 'GitHub token (ghp_...)',
        connect_btn: 'Подключить',
        refresh_btn: 'Обновить сейчас',
        search_placeholder: 'Поиск товара...',
        sort_new: 'Сначала новые',
        sort_old: 'Сначала старые',
        sort_price_desc: 'Сначала дороже',
        sort_price_asc: 'Сначала дешевле',
        sort_name: 'По названию',
        product_name_placeholder: 'Название товара',
        product_price_placeholder: 'Цена (сом)',
        add_product_btn: 'Добавить товар',
        upload_pick: '📸 Выберите изображение',
        upload_selected: '✅ {file}',
        save_btn: 'Сохранить',
        change_image_btn: 'Заменить фото',
        delete_btn: 'Удалить',
        empty_title: 'Товаров нет',
        empty_text: 'Добавьте новый товар.',
        wrong_password: 'Неверный пароль',
        token_required: 'Введите GitHub token',
        token_first: 'Сначала подключите GitHub token',
        fill_required: 'Заполните название, цену и изображение',
        invalid_fields: 'Некорректное название или цена',
        confirm_delete: 'Точно удалить товар?',
        toast_connected: 'GitHub подключен',
        toast_connect_error: 'Ошибка подключения к GitHub',
        toast_products_refreshed: 'Товары обновлены с сервера',
        toast_saved: 'Товар сохранен на сервер',
        toast_save_error: 'Ошибка при сохранении',
        toast_updated: 'Товар обновлен',
        toast_update_error: 'Ошибка обновления',
        toast_deleted: 'Товар удален',
        toast_delete_error: 'Ошибка удаления',
        toast_image_updated: 'Изображение обновлено и сохранено',
        toast_image_error: 'Ошибка обновления изображения',
        sync_waiting: 'Ожидание синхронизации...',
        sync_need_token: 'Введите GitHub token',
        sync_loading: 'Загрузка товаров с сервера...',
        sync_ok: 'Синхронизация OK: {time}',
        sync_read_error: 'Ошибка синхронизации: не удалось прочитать products.json',
        sync_connect_ok: 'GitHub API подключен. Изменения будут сохраняться на сервер.',
        sync_token_error: 'Неверный token или нет доступа к репозиторию',
        sync_save_error: 'Ошибка сохранения товара',
        sync_update_error: 'Ошибка обновления товара',
        sync_delete_error: 'Ошибка удаления товара',
        sync_image_error: 'Ошибка обновления изображения',
        sync_token_found: 'GitHub token найден, синхронизация готова',
        sync_login_waiting: 'Ожидание входа администратора...',
        need_token_error: 'Сначала введите GitHub token',
        fallback_name: 'Товар'
    }
};

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
    busy: false,
    lang: localStorage.getItem(ADMIN_LANG_KEY) || 'ky',
    syncMessage: { key: 'sync_waiting', status: '', params: {} },
    filterQuery: '',
    sortMode: 'new'
};

const refs = {};

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

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(node => {
        const key = node.getAttribute('data-i18n');
        node.textContent = t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(node => {
        const key = node.getAttribute('data-i18n-placeholder');
        node.setAttribute('placeholder', t(key));
    });

    refs.uploadStatus.textContent = state.selectedImageFile
        ? t('upload_selected', { file: state.selectedImageFile.name })
        : t('upload_pick');

    setSyncStatusByKey(state.syncMessage.key, state.syncMessage.status, state.syncMessage.params);
    renderAdminList();
    updateKpis();
}

function setLanguage(lang) {
    state.lang = I18N[lang] ? lang : 'ky';
    localStorage.setItem(ADMIN_LANG_KEY, state.lang);
    document.documentElement.lang = state.lang === 'ru' ? 'ru' : 'ky';

    refs.langButtons.forEach(button => {
        button.classList.toggle('is-active', button.dataset.lang === state.lang);
    });

    applyTranslations();
}

function showToast(message) {
    refs.toast.textContent = message;
    refs.toast.classList.add('show');
    clearTimeout(refs.toast.hideTimer);
    refs.toast.hideTimer = setTimeout(() => refs.toast.classList.remove('show'), 2800);
}

function setSyncStatusByKey(key, status = '', params = {}) {
    state.syncMessage = { key, status, params };
    refs.syncStatus.textContent = t(key, params);
    refs.syncStatus.classList.remove('ok', 'warn', 'err');
    if (status) refs.syncStatus.classList.add(status);
}

function setBusy(isBusy) {
    state.busy = isBusy;
    document.querySelectorAll('button, input, select').forEach(el => {
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

function formatMoney(value) {
    const locale = state.lang === 'ru' ? 'ru-RU' : 'ky-KG';
    return `${Number(value || 0).toLocaleString(locale)} сом`;
}

function formatTime(value) {
    if (!value) return '--:--';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '--:--';
    const locale = state.lang === 'ru' ? 'ru-RU' : 'ky-KG';
    return date.toLocaleString(locale, { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
}

function normalizeProduct(item) {
    return {
        id: Number(item.id || Date.now()),
        name: String(item.name || '').trim() || t('fallback_name'),
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
        throw new Error(t('need_token_error'));
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

    if (sha) body.sha = sha;

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

function updateKpis() {
    const total = state.products.length;
    const totalValue = state.products.reduce((sum, item) => sum + Number(item.price || 0), 0);
    const lastUpdated = state.products.reduce((latest, item) => {
        const ts = new Date(item.updatedAt || 0).getTime();
        return ts > latest ? ts : latest;
    }, 0);

    refs.kpiProducts.textContent = String(total);
    refs.kpiValue.textContent = formatMoney(totalValue);
    refs.kpiUpdated.textContent = formatTime(lastUpdated);
}

function getVisibleProducts() {
    const query = state.filterQuery.trim().toLowerCase();
    const visible = query
        ? state.products.filter(item => {
            const hit = `${item.name} ${item.price} ${item.id}`.toLowerCase();
            return hit.includes(query);
        })
        : [...state.products];

    switch (state.sortMode) {
        case 'old':
            visible.sort((a, b) => Number(a.id) - Number(b.id));
            break;
        case 'price_desc':
            visible.sort((a, b) => Number(b.price) - Number(a.price));
            break;
        case 'price_asc':
            visible.sort((a, b) => Number(a.price) - Number(b.price));
            break;
        case 'name_asc':
            visible.sort((a, b) => String(a.name).localeCompare(String(b.name), state.lang));
            break;
        case 'new':
        default:
            visible.sort((a, b) => Number(b.id) - Number(a.id));
            break;
    }

    return visible;
}

async function refreshProducts(showToastAfter = false) {
    try {
        setSyncStatusByKey('sync_loading', 'warn');

        const payload = await fetchProductsRaw();
        const products = normalizeProductsPayload(payload);

        state.products = products;
        renderAdminList();
        updateKpis();
        setSyncStatusByKey('sync_ok', 'ok', { time: new Date().toLocaleTimeString() });

        if (showToastAfter) {
            showToast(t('toast_products_refreshed'));
        }
    } catch (error) {
        console.error(error);

        if (!state.products.length) {
            state.products = FALLBACK_PRODUCTS.map(normalizeProduct);
            renderAdminList();
            updateKpis();
        }

        setSyncStatusByKey('sync_read_error', 'err');
        if (showToastAfter) {
            showToast(t('toast_connect_error'));
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
        showToast(t('wrong_password'));
        return;
    }

    sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
    refs.password.value = '';
    setAuthView(true);
    setSyncStatusByKey('sync_need_token', 'warn');

    const savedToken = localStorage.getItem(GITHUB_TOKEN_KEY) || '';
    refs.githubToken.value = savedToken;
    state.token = savedToken;

    refreshProducts(false);
}

function handleLogout() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setAuthView(false);
    setSyncStatusByKey('sync_waiting');
}

async function handleSaveToken() {
    const token = refs.githubToken.value.trim();
    if (!token) {
        showToast(t('token_required'));
        return;
    }

    state.token = token;
    localStorage.setItem(GITHUB_TOKEN_KEY, token);

    setBusy(true);
    try {
        await githubRequest(`/contents/${PRODUCTS_PATH}?ref=${REPO_BRANCH}`);
        setSyncStatusByKey('sync_connect_ok', 'ok');
        showToast(t('toast_connected'));
        await refreshProducts(false);
    } catch (error) {
        console.error(error);
        setSyncStatusByKey('sync_token_error', 'err');
        showToast(t('toast_connect_error'));
    } finally {
        setBusy(false);
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    state.selectedImageFile = file;
    refs.uploadStatus.textContent = t('upload_selected', { file: file.name });

    const localUrl = URL.createObjectURL(file);
    refs.imagePreview.style.backgroundImage = `url(${localUrl})`;
    refs.imagePreview.classList.remove('hidden');
}

async function handleAddProduct() {
    const name = refs.productName.value.trim();
    const price = Number(refs.productPrice.value);

    if (!name || !price || price <= 0 || !state.selectedImageFile) {
        showToast(t('fill_required'));
        return;
    }

    if (!state.token) {
        showToast(t('token_first'));
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
        refs.uploadStatus.textContent = t('upload_pick');
        refs.imagePreview.style.backgroundImage = '';
        refs.imagePreview.classList.add('hidden');
        state.selectedImageFile = null;

        showToast(t('toast_saved'));
    } catch (error) {
        console.error(error);
        setSyncStatusByKey('sync_save_error', 'err');
        showToast(t('toast_save_error'));
    } finally {
        setBusy(false);
    }
}

function renderAdminList() {
    const visibleProducts = getVisibleProducts();

    if (!visibleProducts.length) {
        refs.adminList.innerHTML = `<div class="empty-state"><strong>${t('empty_title')}</strong><p>${t('empty_text')}</p></div>`;
        return;
    }

    refs.adminList.innerHTML = visibleProducts.map(product => {
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
                        <button data-action="save" data-id="${product.id}">${t('save_btn')}</button>
                        <button data-action="change-image" data-id="${product.id}">${t('change_image_btn')}</button>
                        <button data-action="delete" data-id="${product.id}" class="danger">${t('delete_btn')}</button>
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
        showToast(t('invalid_fields'));
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
        showToast(t('toast_updated'));
    } catch (error) {
        console.error(error);
        setSyncStatusByKey('sync_update_error', 'err');
        showToast(t('toast_update_error'));
    } finally {
        setBusy(false);
    }
}

async function handleDeleteProduct(id) {
    const confirmed = confirm(t('confirm_delete'));
    if (!confirmed) return;

    state.products = state.products.filter(item => Number(item.id) !== Number(id));

    setBusy(true);
    try {
        await saveProductsToGithub(`delete product ${id}`);
        await refreshProducts(false);
        showToast(t('toast_deleted'));
    } catch (error) {
        console.error(error);
        setSyncStatusByKey('sync_delete_error', 'err');
        showToast(t('toast_delete_error'));
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
        showToast(t('toast_image_updated'));
    } catch (error) {
        console.error(error);
        setSyncStatusByKey('sync_image_error', 'err');
        showToast(t('toast_image_error'));
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

function bindLangEvents() {
    refs.langButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (state.busy) return;
            setLanguage(button.dataset.lang);
        });
    });
}

function bindFilterEvents() {
    refs.adminSearch.addEventListener('input', () => {
        state.filterQuery = refs.adminSearch.value;
        renderAdminList();
    });

    refs.adminSort.addEventListener('change', () => {
        state.sortMode = refs.adminSort.value;
        renderAdminList();
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
    refs.langButtons = Array.from(document.querySelectorAll('.lang-btn'));
    refs.adminSearch = $('#admin-search');
    refs.adminSort = $('#admin-sort');
    refs.kpiProducts = $('#kpi-products');
    refs.kpiValue = $('#kpi-value');
    refs.kpiUpdated = $('#kpi-updated');

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
    bindLangEvents();
    bindFilterEvents();

    const isAuthorized = sessionStorage.getItem(ADMIN_SESSION_KEY) === '1';
    setAuthView(isAuthorized);

    const savedToken = localStorage.getItem(GITHUB_TOKEN_KEY) || '';
    refs.githubToken.value = savedToken;
    state.token = savedToken;

    refs.adminSort.value = state.sortMode;
    setLanguage(state.lang);

    if (isAuthorized) {
        refreshProducts(false);
        setSyncStatusByKey(savedToken ? 'sync_token_found' : 'sync_need_token', savedToken ? 'ok' : 'warn');
    } else {
        setSyncStatusByKey('sync_login_waiting');
    }
}

document.addEventListener('DOMContentLoaded', initialize);
