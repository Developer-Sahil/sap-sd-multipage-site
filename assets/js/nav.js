/**
 * Builds the sidebar, mobile header, per-topic prev/next footer, and (on index.html) the
 * home page topic grid — entirely from assets/js/topics.js. Also owns the tiny localStorage
 * "studied" progress tracker. Every page includes topics.js then this file.
 */

const PROGRESS_KEY = 'sapSdProgress';

function getStudiedMap() {
    try {
        return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
    } catch (e) {
        return {};
    }
}

function isStudied(id) {
    return !!getStudiedMap()[id];
}

function toggleStudied(id) {
    const map = getStudiedMap();
    map[id] = !map[id];
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(map));
    renderProgress();
    renderGrid();
    renderTopicFooter();
}

function currentFile() {
    const p = location.pathname.split('/').pop();
    return p || 'index.html';
}

function progressStats() {
    const map = getStudiedMap();
    const total = TOPICS.length;
    const done = TOPICS.filter(t => map[t.id]).length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, pct };
}

function renderMobileHeader() {
    const mount = document.getElementById('mobileHeaderMount');
    if (!mount) return;
    mount.innerHTML = `
        <header class="lg:hidden fixed top-0 left-0 right-0 z-50 glass-panel border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
            <a href="index.html" class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">SD</div>
                <span class="font-bold text-slate-800 text-base tracking-tight">SAP SD Master Guide</span>
            </a>
            <button id="mobileMenuBtn" class="p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none">
                <i class="fa-solid fa-bars text-xl"></i>
            </button>
        </header>
        <div id="mobileOverlay" class="fixed inset-0 bg-slate-900/60 z-30 hidden backdrop-blur-sm lg:hidden"></div>
    `;

    const sidebar = document.getElementById('sidebar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileOverlay = document.getElementById('mobileOverlay');
    function toggleMenu() {
        sidebar.classList.toggle('-translate-x-full');
        mobileOverlay.classList.toggle('hidden');
    }
    mobileMenuBtn.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', toggleMenu);
}

function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    const file = currentFile();

    let groups = [];
    TOPICS.forEach(t => {
        let g = groups.find(g => g.name === t.group);
        if (!g) { g = { name: t.group, items: [] }; groups.push(g); }
        g.items.push(t);
    });

    const navHtml = groups.map(g => `
        <div class="pt-3 first:pt-0">
            <div class="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">${g.name}</div>
            ${g.items.map(t => `
                <a href="${t.file}" class="nav-link flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors ${t.file === file ? 'active' : ''}">
                    <i class="${t.icon} w-5 text-center text-${t.color}-400"></i>
                    <span class="flex-1">${t.title}</span>
                    ${isStudied(t.id) ? '<i class="fa-solid fa-circle-check text-emerald-400 text-xs"></i>' : ''}
                </a>
            `).join('')}
        </div>
    `).join('');

    sidebar.innerHTML = `
        <div class="p-6 border-b border-slate-800 flex items-center space-x-3">
            <a href="index.html" class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-blue-500/30">
                    SD
                </div>
                <div>
                    <h1 class="font-bold text-white text-base leading-snug">SAP ERP SD Guide</h1>
                    <p class="text-xs text-slate-400 font-mono">Living Study Notes</p>
                </div>
            </a>
        </div>

        <div class="px-6 py-3 bg-slate-800/50 border-b border-slate-800">
            <div class="flex justify-between items-center text-xs mb-1 font-medium">
                <span class="text-slate-400">Study Progress</span>
                <span id="progressText" class="text-blue-400 font-mono">0%</span>
            </div>
            <div class="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div id="progressBar" class="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-0 transition-all duration-300"></div>
            </div>
        </div>

        <nav class="flex-1 overflow-y-auto p-4 space-y-0.5 text-sm">
            ${navHtml}
        </nav>

        <div class="p-4 border-t border-slate-800 text-xs text-slate-500 font-mono text-center">
            ECC 6.0 / mySAP Reference<br>S/4HANA Concepts Included
        </div>
    `;

    renderProgress();
}

function renderProgress() {
    const { pct } = progressStats();
    const bar = document.getElementById('progressBar');
    const txt = document.getElementById('progressText');
    if (bar) bar.style.width = pct + '%';
    if (txt) txt.innerText = pct + '%';
    document.querySelectorAll('.nav-link').forEach(a => {
        const topic = TOPICS.find(t => t.file === a.getAttribute('href'));
        if (!topic) return;
        const badge = a.querySelector('.fa-circle-check');
        if (isStudied(topic.id) && !badge) {
            a.insertAdjacentHTML('beforeend', '<i class="fa-solid fa-circle-check text-emerald-400 text-xs"></i>');
        } else if (!isStudied(topic.id) && badge) {
            badge.remove();
        }
    });
}

function renderTopicFooter() {
    const mount = document.getElementById('topicFooter');
    if (!mount) return;
    const file = currentFile();
    const idx = TOPICS.findIndex(t => t.file === file);
    if (idx === -1) return;
    const current = TOPICS[idx];
    const prev = idx > 0 ? TOPICS[idx - 1] : null;
    const next = idx < TOPICS.length - 1 ? TOPICS[idx + 1] : null;
    const studied = isStudied(current.id);

    mount.innerHTML = `
        <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <a href="${prev ? prev.file : '#'}" class="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium ${prev ? 'text-slate-700 hover:bg-slate-100 border border-slate-200' : 'text-slate-300 border border-slate-100 pointer-events-none'}">
                <i class="fa-solid fa-arrow-left text-xs"></i>
                <span class="truncate">${prev ? prev.title : 'Start of guide'}</span>
            </a>
            <button id="markStudiedBtn" class="px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${studied ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-700'}">
                <i class="fa-solid ${studied ? 'fa-check-circle' : 'fa-circle'} mr-1.5"></i>${studied ? 'Studied' : 'Mark as studied'}
            </button>
            <a href="${next ? next.file : '#'}" class="flex-1 flex items-center justify-end gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-right ${next ? 'text-slate-700 hover:bg-slate-100 border border-slate-200' : 'text-slate-300 border border-slate-100 pointer-events-none'}">
                <span class="truncate">${next ? next.title : 'End of guide'}</span>
                <i class="fa-solid fa-arrow-right text-xs"></i>
            </a>
        </div>
    `;

    document.getElementById('markStudiedBtn').addEventListener('click', () => toggleStudied(current.id));
}

function renderGrid() {
    const grid = document.getElementById('topicGrid');
    if (!grid) return;
    grid.innerHTML = TOPICS.map(t => `
        <a href="${t.file}" class="topic-card block bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2 ${isStudied(t.id) ? 'is-studied' : ''}">
            <div class="flex items-center justify-between">
                <div class="w-9 h-9 rounded-lg bg-${t.color}-100 text-${t.color}-700 flex items-center justify-center">
                    <i class="${t.icon}"></i>
                </div>
                ${isStudied(t.id) ? '<i class="fa-solid fa-circle-check text-emerald-500"></i>' : '<i class="fa-regular fa-circle text-slate-300"></i>'}
            </div>
            <div class="text-[10px] font-mono uppercase tracking-wider text-slate-400">${t.group}</div>
            <h4 class="font-bold text-slate-900 text-sm">${t.title}</h4>
            <p class="text-xs text-slate-500 leading-relaxed">${t.desc}</p>
        </a>
    `).join('');

    const { done, total, pct } = progressStats();
    const summary = document.getElementById('progressSummary');
    if (summary) {
        summary.innerText = `${done} / ${total} topics studied (${pct}%)`;
    }
    const homeBar = document.getElementById('homeProgressBar');
    if (homeBar) homeBar.style.width = pct + '%';

    const continueBtn = document.getElementById('continueStudyingBtn');
    if (continueBtn) {
        const nextUp = TOPICS.find(t => !isStudied(t.id)) || TOPICS[0];
        continueBtn.href = nextUp.file;
        continueBtn.querySelector('span').innerText = done === 0 ? `Start with: ${nextUp.title}` : `Continue: ${nextUp.title}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderMobileHeader();
    renderSidebar();
    renderTopicFooter();
    renderGrid();
});
