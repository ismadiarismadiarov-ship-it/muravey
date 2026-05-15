const ADMIN_PASS = '2026';
const ADMIN_SESSION_KEY = 'el_moto_admin_session';
const GITHUB_TOKEN_KEY = 'el_moto_github_pat';
const ADMIN_LANG_KEY = 'el_moto_admin_lang';
const ADMIN_TAB_KEY = 'el_moto_admin_tab';

const REPO_OWNER = 'ismadiarismadiarov-ship-it';
const REPO_NAME = 'muravey';
const REPO_BRANCH = 'main';
const PRODUCTS_PATH = 'products.json';
const ADS_PATH = 'ads.json';
const PRODUCT_UPLOADS_DIR = 'assets/uploads';
const ADS_UPLOADS_DIR = 'assets/uploads/ads';

const RAW_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}`;
const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;
const IMAGE_FALLBACK = 'assets/products/placeholder.svg';

const I18N = {
    ky: {
        admin_panel_label: 'админ панели', back_to_site: 'Сайтка кайтуу', login_title: 'Админ кирүү', login_text: 'Админ пароль киргизиңиз.',
        password_placeholder: 'Пароль', login_btn: 'КИРҮҮ', content_manage: 'Контент башкаруу', content_manage_text: 'Баннер рекламаны жана товарларды өзүнчө башкарасыз.',
        logout_btn: 'Чыгуу', kpi_products: 'Товар', kpi_ads: 'Баннер', kpi_value: 'Жалпы сумма', kpi_updated: 'Акыркы синхрон',
        server_connect_title: 'Сервер туташуу (GitHub API)', server_connect_text: 'Repo укугу бар Personal Access Token киргизиңиз. Бул токен админ браузеринде гана сакталат.',
        token_placeholder: 'GitHub token (ghp_...)', connect_btn: 'Туташуу', refresh_btn: 'Азыр жаңыртуу', tab_ads: 'Баннер реклама', tab_products: 'Товарлар',
        ads_manage: 'Баннер реклама башкаруу', ads_manage_text: 'Башкы беттеги чоң баннерге чыга турган рекламаларды ушул жерден кошосуз.',
        ad_title_ky_placeholder: 'Баннер аталышы (кыргызча)', ad_title_ru_placeholder: 'Название баннера (русский)', ad_text_ky_placeholder: 'Баннер кыска тексти (кыргызча)', ad_text_ru_placeholder: 'Короткий текст баннера (русский)',
        add_ad_btn: 'Баннер кошуу', products_manage: 'Товар башкаруу', products_manage_text: 'Товарлар жана сүрөттөр GitHub серверинде сакталат.', search_placeholder: 'Товар издөө...',
        sort_new: 'Жаңы биринчи', sort_old: 'Эски биринчи', sort_price_desc: 'Баасы кымбат биринчи', sort_price_asc: 'Баасы арзан биринчи', sort_name: 'Аты боюнча',
        product_name_placeholder: 'Товардын аталышы', product_price_placeholder: 'Баасы (сом)', add_product_btn: 'Товар кошуу',
        save_btn: 'Сактоо', change_image_btn: 'Сүрөт алмаштыруу', delete_btn: 'Өчүрүү', upload_pick: '📸 Сүрөт тандаңыз', ad_upload_pick: '📸 Баннер сүрөт тандаңыз',
        empty_title: 'Товар жок', empty_text: 'Жаңы товар кошуңуз.', ad_empty_title: 'Баннер жок', ad_empty_text: 'Жаңы баннер кошуңуз.'
    },
    ru: {
        admin_panel_label: 'панель администратора', back_to_site: 'Вернуться на сайт', login_title: 'Вход администратора', login_text: 'Введите пароль администратора.',
        password_placeholder: 'Пароль', login_btn: 'ВОЙТИ', content_manage: 'Управление контентом', content_manage_text: 'Баннерная реклама и товары управляются отдельно.',
        logout_btn: 'Выйти', kpi_products: 'Товары', kpi_ads: 'Баннеры', kpi_value: 'Общая сумма', kpi_updated: 'Последняя синхронизация',
        server_connect_title: 'Подключение к серверу (GitHub API)', server_connect_text: 'Введите Personal Access Token с правами на репозиторий. Токен хранится только в браузере администратора.',
        token_placeholder: 'GitHub token (ghp_...)', connect_btn: 'Подключить', refresh_btn: 'Обновить сейчас', tab_ads: 'Баннер реклама', tab_products: 'Товары',
        ads_manage: 'Управление баннерами', ads_manage_text: 'Здесь добавляются рекламные баннеры для главной страницы.',
        ad_title_ky_placeholder: 'Название баннера (кыргызча)', ad_title_ru_placeholder: 'Название баннера (русский)', ad_text_ky_placeholder: 'Короткий текст баннера (кыргызча)', ad_text_ru_placeholder: 'Короткий текст баннера (русский)',
        add_ad_btn: 'Добавить баннер', products_manage: 'Управление товарами', products_manage_text: 'Товары и изображения хранятся на сервере GitHub.', search_placeholder: 'Поиск товара...',
        sort_new: 'Сначала новые', sort_old: 'Сначала старые', sort_price_desc: 'Сначала дороже', sort_price_asc: 'Сначала дешевле', sort_name: 'По названию',
        product_name_placeholder: 'Название товара', product_price_placeholder: 'Цена (сом)', add_product_btn: 'Добавить товар',
        save_btn: 'Сохранить', change_image_btn: 'Заменить фото', delete_btn: 'Удалить', upload_pick: '📸 Выберите изображение', ad_upload_pick: '📸 Выберите изображение баннера',
        empty_title: 'Товаров нет', empty_text: 'Добавьте новый товар.', ad_empty_title: 'Баннеров нет', ad_empty_text: 'Добавьте новый баннер.'
    }
};

const FALLBACK_PRODUCTS = [
    { id: 101, name: 'тормозной колотка', price: 400, imagePath: 'assets/products/brake-shoe.jpeg', imageVersion: 1745486400001, updatedAt: '2026-04-24T09:20:00.000Z' },
    { id: 102, name: 'задный стоп', price: 500, imagePath: 'assets/products/rear-stop.jpeg', imageVersion: 1745486400002, updatedAt: '2026-04-24T09:20:00.000Z' },
    { id: 103, name: 'реле', price: 180, imagePath: 'assets/products/relay.jpeg', imageVersion: 1745486400003, updatedAt: '2026-04-24T09:20:00.000Z' },
    { id: 104, name: 'передный осс', price: 1200, imagePath: 'assets/products/front-hub.jpeg', imageVersion: 1745486400004, updatedAt: '2026-04-24T09:20:00.000Z' }
];

const FALLBACK_ADS = [
    { id: 1, titleKy: 'Передний осс', titleRu: 'Передняя ось', textKy: 'Жүккө чыдамдуу жана сапаттуу алдыңкы бөлүк.', textRu: 'Прочная передняя деталь для высокой нагрузки.', imagePath: 'assets/products/front-hub.jpeg', imageVersion: 1745486400001, updatedAt: '2026-04-24T09:20:00.000Z' },
    { id: 2, titleKy: 'Задный стоп', titleRu: 'Задний стоп', textKy: 'LED стоп жарыгы, түнкүсүн так көрүнөт.', textRu: 'Яркий LED стоп-сигнал, хорошо заметен ночью.', imagePath: 'assets/products/rear-stop.jpeg', imageVersion: 1745486400002, updatedAt: '2026-04-24T09:20:00.000Z' },
    { id: 3, titleKy: 'Реле', titleRu: 'Реле', textKy: 'Электро системага туруктуу реле.', textRu: 'Надежное реле для стабильной электро-системы.', imagePath: 'assets/products/relay.jpeg', imageVersion: 1745486400003, updatedAt: '2026-04-24T09:20:00.000Z' },
    { id: 4, titleKy: 'Тормоз колодкасы', titleRu: 'Тормозная колодка', textKy: 'Коопсуз токтотуу үчүн жогорку сапат.', textRu: 'Высокое качество для безопасного торможения.', imagePath: 'assets/products/brake-shoe.jpeg', imageVersion: 1745486400004, updatedAt: '2026-04-24T09:20:00.000Z' }
];

const state = {
    products: [], ads: [], selectedImageFile: null, selectedAdImageFile: null, token: '', busy: false,
    lang: localStorage.getItem(ADMIN_LANG_KEY) || 'ky', activeTab: localStorage.getItem(ADMIN_TAB_KEY) || 'ads', filterQuery: '', sortMode: 'new'
};

const refs = {};
const M = {
    ky: { wrong_password: 'Пароль туура эмес', token_required: 'GitHub token жазыңыз', token_first: 'Алгач GitHub token туташтырыңыз', fill_required: 'Аталыш, баа жана сүрөт толтуруңуз', ad_fill_required: 'Баннер аталышын жана сүрөтүн толтуруңуз', invalid_fields: 'Аталыш же баа туура эмес', invalid_ad_fields: 'Баннер аталышын толтуруңуз', confirm_delete: 'Товарды чындап өчүрөсүзбү?', confirm_delete_ad: 'Баннерди чындап өчүрөсүзбү?', connected: 'GitHub туташты', connect_error: 'GitHub туташуу катасы', refreshed: 'Маалыматтар серверден жаңырды', saved: 'Товар сакталды', updated: 'Товар жаңыртылды', deleted: 'Товар өчүрүлдү', image_updated: 'Сүрөт жаңырды', save_error: 'Сактоодо ката', update_error: 'Жаңыртууда ката', delete_error: 'Өчүрүүдө ката', image_error: 'Сүрөт жаңыртууда ката', ad_saved: 'Баннер сакталды', ad_updated: 'Баннер жаңыртылды', ad_deleted: 'Баннер өчүрүлдү', ad_image_updated: 'Баннер сүрөтү жаңырды', ad_save_error: 'Баннер сактоодо ката', ad_update_error: 'Баннер жаңыртууда ката', ad_delete_error: 'Баннер өчүрүүдө ката', ad_image_error: 'Баннер сүрөтүн жаңыртууда ката', sync_need_token: 'GitHub token киргизиңиз', sync_loading: 'Серверден маалымат жүктөлүүдө...', sync_ok: 'Синхрон OK', sync_error: 'Синхрон катасы', sync_login_wait: 'Админ кирүүнү күтүүдө...', upload_selected: '✅ {file}', ad_upload_selected: '✅ {file}' },
    ru: { wrong_password: 'Неверный пароль', token_required: 'Введите GitHub token', token_first: 'Сначала подключите GitHub token', fill_required: 'Заполните название, цену и изображение', ad_fill_required: 'Заполните название баннера и изображение', invalid_fields: 'Некорректное название или цена', invalid_ad_fields: 'Заполните название баннера', confirm_delete: 'Точно удалить товар?', confirm_delete_ad: 'Точно удалить баннер?', connected: 'GitHub подключен', connect_error: 'Ошибка подключения к GitHub', refreshed: 'Данные обновлены с сервера', saved: 'Товар сохранен', updated: 'Товар обновлен', deleted: 'Товар удален', image_updated: 'Изображение обновлено', save_error: 'Ошибка сохранения', update_error: 'Ошибка обновления', delete_error: 'Ошибка удаления', image_error: 'Ошибка обновления изображения', ad_saved: 'Баннер сохранен', ad_updated: 'Баннер обновлен', ad_deleted: 'Баннер удален', ad_image_updated: 'Изображение баннера обновлено', ad_save_error: 'Ошибка сохранения баннера', ad_update_error: 'Ошибка обновления баннера', ad_delete_error: 'Ошибка удаления баннера', ad_image_error: 'Ошибка обновления изображения баннера', sync_need_token: 'Введите GitHub token', sync_loading: 'Загрузка данных с сервера...', sync_ok: 'Синхронизация OK', sync_error: 'Ошибка синхронизации', sync_login_wait: 'Ожидание входа администратора...', upload_selected: '✅ {file}', ad_upload_selected: '✅ {file}' }
};

function $(selector) { return document.querySelector(selector); }
function t(key) { return (I18N[state.lang] && I18N[state.lang][key]) || I18N.ky[key] || key; }
function msg(key, params = {}) { let s = (M[state.lang] && M[state.lang][key]) || M.ky[key] || key; Object.entries(params).forEach(([k, v]) => { s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v)); }); return s; }
function escapeHtml(v) { return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function formatMoney(v) { return `${Number(v || 0).toLocaleString(state.lang === 'ru' ? 'ru-RU' : 'ky-KG')} сом`; }
function formatTime(v) { if (!v) return '--:--'; const d = new Date(v); if (Number.isNaN(d.getTime())) return '--:--'; return d.toLocaleString(state.lang === 'ru' ? 'ru-RU' : 'ky-KG', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }); }
function resolveImageUrl(item) { const path = item.imagePath || IMAGE_FALLBACK; const base = /^https?:\/\//i.test(path) ? path : `${RAW_BASE}/${String(path).replace(/^\/+/, '')}`; const ver = item.imageVersion || item.updatedAt || Date.now(); return `${base}${base.includes('?') ? '&' : '?'}v=${encodeURIComponent(ver)}`; }
function normalizeProduct(i) { return { id: Number(i.id || Date.now()), name: String(i.name || '').trim() || 'Товар', price: Number(i.price || 0), imagePath: i.imagePath || i.img || IMAGE_FALLBACK, imageVersion: Number(i.imageVersion || Date.now()), updatedAt: i.updatedAt || new Date().toISOString() }; }
function normalizeAd(i) { const ky = String(i.titleKy || i.title_ky || i.title || '').trim(); const ru = String(i.titleRu || i.title_ru || i.title || '').trim(); return { id: Number(i.id || Date.now()), titleKy: ky || 'Реклама баннер', titleRu: ru || ky || 'Реклама баннер', textKy: String(i.textKy || i.text || '').trim(), textRu: String(i.textRu || i.text || '').trim(), imagePath: i.imagePath || i.image || IMAGE_FALLBACK, imageVersion: Number(i.imageVersion || Date.now()), updatedAt: i.updatedAt || new Date().toISOString() }; }
function normProducts(payload) { const arr = Array.isArray(payload) ? payload : Array.isArray(payload?.products) ? payload.products : []; return arr.map(normalizeProduct); }
function normAds(payload) { const arr = Array.isArray(payload) ? payload : Array.isArray(payload?.slides) ? payload.slides : Array.isArray(payload?.ads) ? payload.ads : []; return arr.map(normalizeAd); }
function setBusy(v) { state.busy = v; document.querySelectorAll('button, input, select, textarea').forEach(el => { if (el.id === 'admin-password' && sessionStorage.getItem(ADMIN_SESSION_KEY) !== '1') return; el.disabled = v; }); }
function setStatus(text, cls = '') { refs.syncStatus.textContent = text; refs.syncStatus.classList.remove('ok', 'warn', 'err'); if (cls) refs.syncStatus.classList.add(cls); }
function showToast(text) {
    refs.toast.textContent = text;
    refs.toast.classList.add('show');
    clearTimeout(refs.toast.hideTimer);
    refs.toast.hideTimer = setTimeout(() => refs.toast.classList.remove('show'), 2800);
}

function updateKpi() {
    refs.kpiProducts.textContent = String(state.products.length);
    refs.kpiAds.textContent = String(state.ads.length);
    refs.kpiValue.textContent = formatMoney(state.products.reduce((sum, p) => sum + Number(p.price || 0), 0));
    const productTs = state.products.reduce((max, p) => Math.max(max, new Date(p.updatedAt || 0).getTime()), 0);
    const adTs = state.ads.reduce((max, a) => Math.max(max, new Date(a.updatedAt || 0).getTime()), 0);
    refs.kpiUpdated.textContent = formatTime(Math.max(productTs, adTs));
}

function getVisibleProducts() {
    const q = state.filterQuery.trim().toLowerCase();
    const arr = q
        ? state.products.filter(p => `${p.name} ${p.price} ${p.id}`.toLowerCase().includes(q))
        : [...state.products];

    if (state.sortMode === 'old') arr.sort((a, b) => a.id - b.id);
    else if (state.sortMode === 'price_desc') arr.sort((a, b) => b.price - a.price);
    else if (state.sortMode === 'price_asc') arr.sort((a, b) => a.price - b.price);
    else if (state.sortMode === 'name_asc') arr.sort((a, b) => String(a.name).localeCompare(String(b.name), state.lang));
    else arr.sort((a, b) => b.id - a.id);

    return arr;
}

function renderProductList() {
    const visible = getVisibleProducts();
    if (!visible.length) {
        refs.adminList.innerHTML = `<div class="empty-state"><strong>${t('empty_title')}</strong><p>${t('empty_text')}</p></div>`;
        return;
    }

    refs.adminList.innerHTML = visible.map(p => `
        <div class="admin-item-card">
            <img src="${resolveImageUrl(p)}" alt="${escapeHtml(p.name)}" onerror="this.onerror=null;this.src='${IMAGE_FALLBACK}';">
            <div class="admin-item-body">
                <div class="admin-item-fields">
                    <input type="text" value="${escapeHtml(p.name)}" data-field="name" data-id="${p.id}">
                    <input type="number" value="${p.price}" data-field="price" data-id="${p.id}">
                </div>
                <div class="admin-item-actions">
                    <button data-action="save" data-id="${p.id}">${t('save_btn')}</button>
                    <button data-action="change-image" data-id="${p.id}">${t('change_image_btn')}</button>
                    <button data-action="delete" data-id="${p.id}" class="danger">${t('delete_btn')}</button>
                    <input class="hidden-input" type="file" accept="image/*" data-file-id="${p.id}">
                </div>
            </div>
        </div>
    `).join('');
}

function renderAdList() {
    const arr = [...state.ads].sort((a, b) => b.id - a.id);
    if (!arr.length) {
        refs.adsList.innerHTML = `<div class="empty-state"><strong>${t('ad_empty_title')}</strong><p>${t('ad_empty_text')}</p></div>`;
        return;
    }

    refs.adsList.innerHTML = arr.map(a => `
        <div class="admin-item-card">
            <img src="${resolveImageUrl(a)}" alt="${escapeHtml(a.titleKy)}" onerror="this.onerror=null;this.src='${IMAGE_FALLBACK}';">
            <div class="admin-item-body">
                <div class="ad-item-fields">
                    <input type="text" value="${escapeHtml(a.titleKy)}" data-ad-field="titleKy" data-id="${a.id}">
                    <input type="text" value="${escapeHtml(a.titleRu || a.titleKy)}" data-ad-field="titleRu" data-id="${a.id}">
                    <textarea rows="3" data-ad-field="textKy" data-id="${a.id}">${escapeHtml(a.textKy || '')}</textarea>
                    <textarea rows="3" data-ad-field="textRu" data-id="${a.id}">${escapeHtml(a.textRu || a.textKy || '')}</textarea>
                </div>
                <div class="admin-item-actions">
                    <button data-ad-action="save" data-id="${a.id}">${t('save_btn')}</button>
                    <button data-ad-action="change-image" data-id="${a.id}">${t('change_image_btn')}</button>
                    <button data-ad-action="delete" data-id="${a.id}" class="danger">${t('delete_btn')}</button>
                    <input class="hidden-input" type="file" accept="image/*" data-ad-file-id="${a.id}">
                </div>
            </div>
        </div>
    `).join('');
}

function setLanguage(lang) {
    state.lang = I18N[lang] ? lang : 'ky';
    localStorage.setItem(ADMIN_LANG_KEY, state.lang);
    document.documentElement.lang = state.lang === 'ru' ? 'ru' : 'ky';

    refs.langButtons.forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.lang === state.lang);
    });

    document.querySelectorAll('[data-i18n]').forEach(node => {
        node.textContent = t(node.dataset.i18n);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(node => {
        node.setAttribute('placeholder', t(node.dataset.i18nPlaceholder));
    });

    refs.uploadStatus.textContent = state.selectedImageFile
        ? msg('upload_selected', { file: state.selectedImageFile.name })
        : t('upload_pick');

    refs.adUploadStatus.textContent = state.selectedAdImageFile
        ? msg('ad_upload_selected', { file: state.selectedAdImageFile.name })
        : t('ad_upload_pick');

    renderProductList();
    renderAdList();
    updateKpi();
}

function setActiveTab(tab, updateUrl = true) {
    state.activeTab = tab === 'products' ? 'products' : 'ads';
    localStorage.setItem(ADMIN_TAB_KEY, state.activeTab);

    refs.tabButtons.forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.adminTab === state.activeTab);
    });

    refs.adsSection.classList.toggle('is-active', state.activeTab === 'ads');
    refs.productsSection.classList.toggle('is-active', state.activeTab === 'products');

    if (updateUrl) {
        const u = new URL(window.location.href);
        u.searchParams.set('tab', state.activeTab);
        history.replaceState(null, '', `${u.pathname}${u.search}`);
    }
}

function setAuthView(isAuth) {
    refs.loginCard.classList.toggle('admin-hidden', isAuth);
    refs.adminPanel.classList.toggle('admin-hidden', !isAuth);
}

function getAuthHeaders() {
    if (!state.token) {
        throw new Error(msg('token_first'));
    }

    return {
        Authorization: `Bearer ${state.token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
    };
}

async function githubRequest(path, options = {}) {
    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            ...(options.headers || {}),
            ...getAuthHeaders()
        }
    });

    if (!res.ok) {
        throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
    }

    return res.json();
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

function ext(name) {
    const safe = String(name || '').toLowerCase();
    const value = safe.includes('.') ? safe.split('.').pop() : 'jpg';
    return value.replace(/[^a-z0-9]/g, '') || 'jpg';
}

async function getFileMeta(path) {
    try {
        const data = await githubRequest(`/contents/${path}?ref=${REPO_BRANCH}`);
        return { sha: data.sha };
    } catch (error) {
        if (String(error.message).includes('404')) {
            return null;
        }
        throw error;
    }
}

async function putFile(path, content, message, sha = null) {
    const body = { message, content, branch: REPO_BRANCH };
    if (sha) body.sha = sha;

    return githubRequest(`/contents/${path}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
}

async function fetchProductsRaw() {
    const res = await fetch(`${RAW_BASE}/${PRODUCTS_PATH}?v=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`products ${res.status}`);
    return res.json();
}

async function fetchAdsRaw() {
    const res = await fetch(`${RAW_BASE}/${ADS_PATH}?v=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`ads ${res.status}`);
    return res.json();
}

async function refreshProducts() {
    try {
        state.products = normProducts(await fetchProductsRaw());
        renderProductList();
        updateKpi();
        return true;
    } catch (error) {
        console.error(error);
        if (!state.products.length) {
            state.products = FALLBACK_PRODUCTS.map(normalizeProduct);
            renderProductList();
            updateKpi();
        }
        return false;
    }
}

async function refreshAds() {
    try {
        state.ads = normAds(await fetchAdsRaw());
        renderAdList();
        updateKpi();
        return true;
    } catch (error) {
        console.error(error);
        if (!state.ads.length) {
            state.ads = FALLBACK_ADS.map(normalizeAd);
            renderAdList();
            updateKpi();
        }
        return false;
    }
}

async function refreshAll(showToastAfter = false) {
    setStatus(msg('sync_loading'), 'warn');
    const [okProducts, okAds] = await Promise.all([refreshProducts(), refreshAds()]);

    if (okProducts || okAds) {
        setStatus(`${msg('sync_ok')}: ${new Date().toLocaleTimeString()}`, 'ok');
        if (showToastAfter) showToast(msg('refreshed'));
    } else {
        setStatus(msg('sync_error'), 'err');
        if (showToastAfter) showToast(msg('connect_error'));
    }
}

async function saveProducts() {
    const payload = { updatedAt: new Date().toISOString(), products: state.products };
    const meta = await getFileMeta(PRODUCTS_PATH);
    await putFile(PRODUCTS_PATH, utf8ToBase64(JSON.stringify(payload, null, 2)), 'update products', meta?.sha || null);
}

async function saveAds() {
    const payload = { updatedAt: new Date().toISOString(), slides: state.ads };
    const meta = await getFileMeta(ADS_PATH);
    await putFile(ADS_PATH, utf8ToBase64(JSON.stringify(payload, null, 2)), 'update ads', meta?.sha || null);
}
async function uploadBinary(path, file, message) {
    const base64 = arrayBufferToBase64(await file.arrayBuffer());
    await putFile(path, base64, message);
}

async function uploadProductImage(file, id) {
    const version = Date.now();
    const path = `${PRODUCT_UPLOADS_DIR}/product-${id}-${version}.${ext(file.name)}`;
    await uploadBinary(path, file, `upload product ${id}`);
    return { imagePath: path, imageVersion: version };
}

async function uploadAdImage(file, id) {
    const version = Date.now();
    const path = `${ADS_UPLOADS_DIR}/banner-${id}-${version}.${ext(file.name)}`;
    await uploadBinary(path, file, `upload ad ${id}`);
    return { imagePath: path, imageVersion: version };
}

function productIndex(id) {
    return state.products.findIndex(p => Number(p.id) === Number(id));
}

function adIndex(id) {
    return state.ads.findIndex(a => Number(a.id) === Number(id));
}

function resetProductForm() {
    refs.productName.value = '';
    refs.productPrice.value = '';
    refs.productImage.value = '';
    refs.uploadStatus.textContent = t('upload_pick');
    refs.imagePreview.style.backgroundImage = '';
    refs.imagePreview.classList.add('hidden');
    state.selectedImageFile = null;
}

function resetAdForm() {
    refs.adTitleKy.value = '';
    refs.adTitleRu.value = '';
    refs.adTextKy.value = '';
    refs.adTextRu.value = '';
    refs.adImage.value = '';
    refs.adUploadStatus.textContent = t('ad_upload_pick');
    refs.adImagePreview.style.backgroundImage = '';
    refs.adImagePreview.classList.add('hidden');
    state.selectedAdImageFile = null;
}

async function addProduct() {
    const name = refs.productName.value.trim();
    const price = Number(refs.productPrice.value);

    if (!name || !price || price <= 0 || !state.selectedImageFile) {
        showToast(msg('fill_required'));
        return;
    }

    if (!state.token) {
        showToast(msg('token_first'));
        return;
    }

    const id = Date.now();
    setBusy(true);

    try {
        const image = await uploadProductImage(state.selectedImageFile, id);
        state.products.unshift({ id, name, price, imagePath: image.imagePath, imageVersion: image.imageVersion, updatedAt: new Date().toISOString() });
        await saveProducts();
        await refreshProducts();
        resetProductForm();
        showToast(msg('saved'));
    } catch (error) {
        console.error(error);
        showToast(msg('save_error'));
    } finally {
        setBusy(false);
    }
}

async function addAd() {
    const titleKy = refs.adTitleKy.value.trim();
    const titleRu = refs.adTitleRu.value.trim() || titleKy;
    const textKy = refs.adTextKy.value.trim();
    const textRu = refs.adTextRu.value.trim() || textKy;

    if (!titleKy || !state.selectedAdImageFile) {
        showToast(msg('ad_fill_required'));
        return;
    }

    if (!state.token) {
        showToast(msg('token_first'));
        return;
    }

    const id = Date.now();
    setBusy(true);

    try {
        const image = await uploadAdImage(state.selectedAdImageFile, id);
        state.ads.unshift({ id, titleKy, titleRu, textKy, textRu, imagePath: image.imagePath, imageVersion: image.imageVersion, updatedAt: new Date().toISOString() });
        await saveAds();
        await refreshAds();
        resetAdForm();
        showToast(msg('ad_saved'));
    } catch (error) {
        console.error(error);
        showToast(msg('ad_save_error'));
    } finally {
        setBusy(false);
    }
}

async function saveProductById(id) {
    const idx = productIndex(id);
    if (idx < 0) return;

    const name = String(refs.adminList.querySelector(`input[data-field="name"][data-id="${id}"]`)?.value || '').trim();
    const price = Number(refs.adminList.querySelector(`input[data-field="price"][data-id="${id}"]`)?.value || 0);

    if (!name || !price || price <= 0) {
        showToast(msg('invalid_fields'));
        return;
    }

    state.products[idx] = { ...state.products[idx], name, price, updatedAt: new Date().toISOString() };
    setBusy(true);

    try {
        await saveProducts();
        await refreshProducts();
        showToast(msg('updated'));
    } catch (error) {
        console.error(error);
        showToast(msg('update_error'));
    } finally {
        setBusy(false);
    }
}

async function saveAdById(id) {
    const idx = adIndex(id);
    if (idx < 0) return;

    const titleKy = String(refs.adsList.querySelector(`input[data-ad-field="titleKy"][data-id="${id}"]`)?.value || '').trim();
    const titleRu = String(refs.adsList.querySelector(`input[data-ad-field="titleRu"][data-id="${id}"]`)?.value || '').trim() || titleKy;
    const textKy = String(refs.adsList.querySelector(`textarea[data-ad-field="textKy"][data-id="${id}"]`)?.value || '').trim();
    const textRu = String(refs.adsList.querySelector(`textarea[data-ad-field="textRu"][data-id="${id}"]`)?.value || '').trim() || textKy;

    if (!titleKy) {
        showToast(msg('invalid_ad_fields'));
        return;
    }

    state.ads[idx] = { ...state.ads[idx], titleKy, titleRu, textKy, textRu, updatedAt: new Date().toISOString() };
    setBusy(true);

    try {
        await saveAds();
        await refreshAds();
        showToast(msg('ad_updated'));
    } catch (error) {
        console.error(error);
        showToast(msg('ad_update_error'));
    } finally {
        setBusy(false);
    }
}

async function deleteProductById(id) {
    if (!confirm(msg('confirm_delete'))) return;

    state.products = state.products.filter(p => Number(p.id) !== Number(id));
    setBusy(true);

    try {
        await saveProducts();
        await refreshProducts();
        showToast(msg('deleted'));
    } catch (error) {
        console.error(error);
        showToast(msg('delete_error'));
    } finally {
        setBusy(false);
    }
}

async function deleteAdById(id) {
    if (!confirm(msg('confirm_delete_ad'))) return;

    state.ads = state.ads.filter(a => Number(a.id) !== Number(id));
    setBusy(true);

    try {
        await saveAds();
        await refreshAds();
        showToast(msg('ad_deleted'));
    } catch (error) {
        console.error(error);
        showToast(msg('ad_delete_error'));
    } finally {
        setBusy(false);
    }
}

async function replaceProductImageById(id, file) {
    const idx = productIndex(id);
    if (idx < 0 || !file) return;

    setBusy(true);

    try {
        const image = await uploadProductImage(file, id);
        state.products[idx] = { ...state.products[idx], imagePath: image.imagePath, imageVersion: image.imageVersion, updatedAt: new Date().toISOString() };
        await saveProducts();
        await refreshProducts();
        showToast(msg('image_updated'));
    } catch (error) {
        console.error(error);
        showToast(msg('image_error'));
    } finally {
        setBusy(false);
    }
}

async function replaceAdImageById(id, file) {
    const idx = adIndex(id);
    if (idx < 0 || !file) return;

    setBusy(true);

    try {
        const image = await uploadAdImage(file, id);
        state.ads[idx] = { ...state.ads[idx], imagePath: image.imagePath, imageVersion: image.imageVersion, updatedAt: new Date().toISOString() };
        await saveAds();
        await refreshAds();
        showToast(msg('ad_image_updated'));
    } catch (error) {
        console.error(error);
        showToast(msg('ad_image_error'));
    } finally {
        setBusy(false);
    }
}

function bindProductListEvents() {
    refs.adminList.addEventListener('click', event => {
        const btn = event.target.closest('button[data-action]');
        if (!btn || state.busy) return;

        const id = Number(btn.dataset.id);

        if (btn.dataset.action === 'save') saveProductById(id);
        else if (btn.dataset.action === 'delete') deleteProductById(id);
        else if (btn.dataset.action === 'change-image') refs.adminList.querySelector(`input[data-file-id="${id}"]`)?.click();
    });

    refs.adminList.addEventListener('change', event => {
        const input = event.target.closest('input[type="file"][data-file-id]');
        if (!input || !input.files?.length) return;

        replaceProductImageById(Number(input.dataset.fileId), input.files[0]);
        input.value = '';
    });
}

function bindAdListEvents() {
    refs.adsList.addEventListener('click', event => {
        const btn = event.target.closest('button[data-ad-action]');
        if (!btn || state.busy) return;

        const id = Number(btn.dataset.id);

        if (btn.dataset.adAction === 'save') saveAdById(id);
        else if (btn.dataset.adAction === 'delete') deleteAdById(id);
        else if (btn.dataset.adAction === 'change-image') refs.adsList.querySelector(`input[data-ad-file-id="${id}"]`)?.click();
    });

    refs.adsList.addEventListener('change', event => {
        const input = event.target.closest('input[type="file"][data-ad-file-id]');
        if (!input || !input.files?.length) return;

        replaceAdImageById(Number(input.dataset.adFileId), input.files[0]);
        input.value = '';
    });
}

function login() {
    if (refs.password.value.trim() !== ADMIN_PASS) {
        showToast(msg('wrong_password'));
        return;
    }

    sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
    refs.password.value = '';
    setAuthView(true);

    const token = localStorage.getItem(GITHUB_TOKEN_KEY) || '';
    refs.githubToken.value = token;
    state.token = token;

    setStatus(token ? msg('sync_ok') : msg('sync_need_token'), token ? 'ok' : 'warn');
    refreshAll(false);
}

function logout() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setAuthView(false);
    setStatus(msg('sync_login_wait'));
}

async function saveToken() {
    const token = refs.githubToken.value.trim();
    if (!token) {
        showToast(msg('token_required'));
        return;
    }

    state.token = token;
    localStorage.setItem(GITHUB_TOKEN_KEY, token);

    setBusy(true);

    try {
        await githubRequest(`/contents/${PRODUCTS_PATH}?ref=${REPO_BRANCH}`);
        setStatus(msg('sync_ok'), 'ok');
        showToast(msg('connected'));
        await refreshAll(false);
    } catch (error) {
        console.error(error);
        setStatus(msg('sync_error'), 'err');
        showToast(msg('connect_error'));
    } finally {
        setBusy(false);
    }
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

    refs.adTitleKy = $('#ad-title-ky');
    refs.adTitleRu = $('#ad-title-ru');
    refs.adTextKy = $('#ad-text-ky');
    refs.adTextRu = $('#ad-text-ru');
    refs.adImage = $('#ad-image');
    refs.adUploadStatus = $('#ad-upload-status');
    refs.adImagePreview = $('#ad-image-preview');
    refs.addAd = $('#add-ad');
    refs.adsList = $('#ads-list');

    refs.adsSection = $('#ads-section');
    refs.productsSection = $('#products-section');
    refs.tabButtons = Array.from(document.querySelectorAll('.admin-tab-btn'));
    refs.langButtons = Array.from(document.querySelectorAll('.lang-btn'));

    refs.adminSearch = $('#admin-search');
    refs.adminSort = $('#admin-sort');

    refs.kpiProducts = $('#kpi-products');
    refs.kpiAds = $('#kpi-ads');
    refs.kpiValue = $('#kpi-value');
    refs.kpiUpdated = $('#kpi-updated');

    refs.toast = $('#toast');

    refs.loginBtn.addEventListener('click', login);
    refs.password.addEventListener('keydown', event => {
        if (event.key === 'Enter') login();
    });

    refs.logoutBtn.addEventListener('click', logout);
    refs.saveTokenBtn.addEventListener('click', saveToken);
    refs.syncNowBtn.addEventListener('click', () => refreshAll(true));

    refs.productImage.addEventListener('change', event => {
        const file = event.target.files[0];
        if (!file) return;

        state.selectedImageFile = file;
        refs.uploadStatus.textContent = msg('upload_selected', { file: file.name });
        refs.imagePreview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
        refs.imagePreview.classList.remove('hidden');
    });

    refs.adImage.addEventListener('change', event => {
        const file = event.target.files[0];
        if (!file) return;

        state.selectedAdImageFile = file;
        refs.adUploadStatus.textContent = msg('ad_upload_selected', { file: file.name });
        refs.adImagePreview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
        refs.adImagePreview.classList.remove('hidden');
    });

    refs.addProduct.addEventListener('click', addProduct);
    refs.addAd.addEventListener('click', addAd);

    refs.adminSearch.addEventListener('input', () => {
        state.filterQuery = refs.adminSearch.value;
        renderProductList();
    });

    refs.adminSort.addEventListener('change', () => {
        state.sortMode = refs.adminSort.value;
        renderProductList();
    });

    refs.langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!state.busy) setLanguage(btn.dataset.lang);
        });
    });

    refs.tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!state.busy) setActiveTab(btn.dataset.adminTab, true);
        });
    });

    bindProductListEvents();
    bindAdListEvents();

    const tabFromUrl = new URLSearchParams(window.location.search).get('tab');
    if (tabFromUrl === 'ads' || tabFromUrl === 'products') {
        state.activeTab = tabFromUrl;
    }

    const isAuthorized = sessionStorage.getItem(ADMIN_SESSION_KEY) === '1';
    setAuthView(isAuthorized);

    const token = localStorage.getItem(GITHUB_TOKEN_KEY) || '';
    refs.githubToken.value = token;
    state.token = token;

    refs.adminSort.value = state.sortMode;
    setActiveTab(state.activeTab, false);
    setLanguage(state.lang);

    if (isAuthorized) {
        refreshAll(false);
        setStatus(token ? msg('sync_ok') : msg('sync_need_token'), token ? 'ok' : 'warn');
    } else {
        setStatus(msg('sync_login_wait'));
    }
}

document.addEventListener('DOMContentLoaded', initialize);
