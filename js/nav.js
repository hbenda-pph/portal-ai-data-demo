/**
 * nav.js — Sidebar & Topbar (generados dinámicamente con soporte i18n EN / ES)
 * Portal AI Data | Platform Partners
 */

function getNavPages() {
  const t = (k) => (window.I18n ? window.I18n.t(k) : k);
  return [
    {
      group: null,
      items: [
        { id:'home', href:'index.html', num:'00', label: t('nav_home'), badge:'KPIs', icon:'home' },
      ]
    },
    {
      group: t('group_analysis'),
      items: [
        { id:'embudo',   href:'embudo.html',   num:'01', label: t('nav_funnel'), icon:'funnel' },
        { id:'llamadas', href:'llamadas.html', num:'02', label: t('nav_calls'),   icon:'phone' },
      ]
    },
    {
      group: t('group_operations'),
      items: [
        { id:'operaciones', href:'operaciones.html', num:'03', label: t('nav_ops'), icon:'wrench' },
      ]
    },
    {
      group: t('group_growth'),
      items: [
        { id:'marketing', href:'marketing.html', num:'04', label: t('nav_marketing'), icon:'chart' },
        { id:'finanzas',  href:'finanzas.html',  num:'05', label: t('nav_finance'),   icon:'dollar' },
        { id:'clientes',  href:'clientes.html',  num:'06', label: t('nav_customers'), icon:'users' },
      ]
    },
    {
      group: t('group_intelligence'),
      items: [
        { id:'investigaciones', href:'investigaciones.html', num:'07', label: t('nav_investigations'), icon:'search' },
        { id:'alertas',         href:'alertas.html',         num:'08', label: t('nav_alerts'),         icon:'bell' },
        { id:'chat',            href:'chat.html',            num:'09', label: t('nav_chat'),           icon:'chat' },
      ]
    },
    {
      group: t('group_system'),
      items: [
        { id:'sistema', href:'sistema.html', num:'⚙', label: t('nav_system'), icon:'activity' },
      ]
    },
  ];
}

/* ── SVG Icons ── */
const ICONS = {
  home:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  funnel:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  phone:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.58 3.18C1.58 2.09 2.46 1 3.56 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.9a16 16 0 006 6l.81-.81a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  wrench:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
  chart:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  dollar:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`,
  users:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
  search:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  bell:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
  chat:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  activity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
};

/* ── Build Sidebar HTML ── */
function buildSidebar() {
  const cur = (location.pathname.split('/').pop() || 'index.html');
  const t = (k) => (window.I18n ? window.I18n.t(k) : k);
  const pages = getNavPages();

  let html = `
    <div class="sidebar-brand">
      <div class="sidebar-brand-icon">AI</div>
      <div>
        <span class="brand-title">Portal AI Data</span>
        <span class="brand-sub">Platform Partners</span>
      </div>
    </div>
    <nav class="sidebar-nav">`;

  pages.forEach(group => {
    if (group.group) html += `<div class="nav-group-label">${group.group}</div>`;
    group.items.forEach(item => {
      const active = (cur === item.href || (cur === '' && item.href === 'index.html')) ? ' active' : '';
      const badge  = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
      html += `
        <a href="${item.href}" class="nav-item${active}">
          <span class="nav-icon">${ICONS[item.icon] || ''}</span>
          <span class="nav-num">${item.num}</span>
          <span class="nav-label">${item.label}</span>
          ${badge}
        </a>`;
    });
  });

  html += `</nav>
    <div class="sidebar-footer">
      <div class="data-freshness">
        <span class="dot dot-green"></span>
        <span>${t('freshness')}</span>
      </div>
    </div>`;
  return html;
}

/* ── Build Topbar HTML ── */
function buildTopbar() {
  const meta   = document.querySelector('meta[name="page-title"]');
  const secMeta= document.querySelector('meta[name="page-section"]');
  const title  = meta?.content || document.title.split('|')[0].trim();
  const section= secMeta?.content || '';
  const now    = new Date();
  const lang   = window.I18n ? window.I18n.currentLang : 'en';
  const date   = now.toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', { weekday:'short', year:'numeric', month:'short', day:'numeric' });

  const crumb  = section
    ? `<span>Portal AI Data</span><span class="sep">›</span><span>${section}</span><span class="sep">›</span><span class="crumb-cur">${title}</span>`
    : `<span>Portal AI Data</span><span class="sep">›</span><span class="crumb-cur">${title}</span>`;

  return `
    <div class="breadcrumbs">${crumb}</div>
    <div class="topbar-right">
      <span class="demo-tag">DEMO</span>
      <span class="topbar-date">${date}</span>
      <div class="avatar" title="Hermann B.">HB</div>
    </div>`;
}

/* ── Init on DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  const sb = document.getElementById('sidebar');
  const tb = document.getElementById('topbar');
  if (sb) { sb.className = 'sidebar'; sb.innerHTML = buildSidebar(); }
  if (tb) { 
    tb.className = 'topbar';  
    tb.innerHTML = buildTopbar(); 
    if (window.I18n) window.I18n.injectLanguageSelector();
  }
});
