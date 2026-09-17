/**
 * charts.js — Chart.js theme & helpers
 * Portal AI Data | Platform Partners
 */

/* ── Paleta ── */
const C = {
  blue:   '#3B7EF5', green:  '#10B981',
  amber:  '#F59E0B', red:    '#EF4444',
  cyan:   '#06B6D4', purple: '#8B5CF6',
  grid:   'rgba(255,255,255,0.045)',
  text:   '#3E5574',
};

/* ── Chart.js Defaults ── */
Chart.defaults.color = '#8FA3BE';
Chart.defaults.font  = { family: "'Inter', sans-serif", size: 11 };
Chart.defaults.plugins.legend.labels.usePointStyle   = true;
Chart.defaults.plugins.legend.labels.pointStyleWidth = 8;
Chart.defaults.plugins.legend.labels.padding         = 16;
Chart.defaults.plugins.tooltip.backgroundColor = '#0D1525';
Chart.defaults.plugins.tooltip.borderColor     = 'rgba(255,255,255,0.09)';
Chart.defaults.plugins.tooltip.borderWidth     = 1;
Chart.defaults.plugins.tooltip.padding         = 10;
Chart.defaults.plugins.tooltip.titleColor      = '#EEF4FF';
Chart.defaults.plugins.tooltip.bodyColor       = '#8FA3BE';
Chart.defaults.plugins.tooltip.cornerRadius    = 8;

const GRID = { color: C.grid, drawBorder: false };
const TICK = { color: C.text, font: { size: 10 }, maxTicksLimit: 6 };

/* ── Helpers ── */
function rgba(hex, a) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

/* Formateadores globales */
function fmtDollar(n) {
  if (n >= 1e6) return '$' + (n/1e6).toFixed(2) + 'M';
  if (n >= 1e3) return '$' + (n/1e3).toFixed(0)  + 'K';
  return '$' + n.toFixed(0);
}
function fmtDollarShort(n) {
  if (n >= 1e6) return '$' + (n/1e6).toFixed(1) + 'M';
  if (n >= 1e3) return '$' + (n/1e3).toFixed(0) + 'K';
  return '$' + n;
}
function fmtPct(n)  { return n.toFixed(1) + '%'; }
function fmtNum(n)  { return n >= 1000 ? (n/1000).toFixed(1)+'K' : String(n); }

/* ── Line Chart ── */
function lineChart(id, labels, datasets, opts = {}) {
  const ctx = document.getElementById(id)?.getContext('2d');
  if (!ctx) return null;
  return new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: datasets.map(d => ({
      tension: 0.4, pointRadius: 3, pointHoverRadius: 6, borderWidth: 2,
      fill: d.fill ?? false,
      backgroundColor: d.fill ? rgba(d.borderColor || C.blue, 0.08) : 'transparent',
      ...d,
    }))},
    options: {
      responsive: true, maintainAspectRatio: opts.ratio ?? true,
      interaction: { intersect: false, mode: 'index' },
      plugins: { legend: { display: opts.legend ?? false } },
      scales: {
        x: { grid: GRID, ticks: { ...TICK, maxTicksLimit: opts.xTicks || 7 } },
        y: { grid: GRID, ticks: { ...TICK, callback: opts.yFmt || (v=>v) }, beginAtZero: opts.zero ?? false },
      },
      ...opts.extra,
    }
  });
}

/* ── Bar Chart ── */
function barChart(id, labels, datasets, opts = {}) {
  const ctx = document.getElementById(id)?.getContext('2d');
  if (!ctx) return null;
  return new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: datasets.map(d => ({ borderRadius: 4, borderSkipped: false, ...d })) },
    options: {
      responsive: true, maintainAspectRatio: opts.ratio ?? true,
      plugins: { legend: { display: opts.legend ?? false } },
      scales: {
        x: { grid: { ...GRID, display: false }, ticks: TICK, stacked: opts.stacked ?? false },
        y: { grid: GRID, ticks: { ...TICK, callback: opts.yFmt || (v=>v) }, stacked: opts.stacked ?? false, beginAtZero: true },
      },
      ...opts.extra,
    }
  });
}

/* ── Doughnut ── */
function doughnut(id, labels, data, colors, opts = {}) {
  const ctx = document.getElementById(id)?.getContext('2d');
  if (!ctx) return null;
  return new Chart(ctx, {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0, hoverOffset: 4 }] },
    options: {
      responsive: true, cutout: opts.cutout || '70%',
      plugins: { legend: { display: opts.legend ?? true, position: opts.legendPos || 'right' } },
      ...opts.extra,
    }
  });
}

/* ── Sparkline ── */
function sparkline(id, data, color) {
  const ctx = document.getElementById(id)?.getContext('2d');
  if (!ctx) return null;
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((_,i) => i),
      datasets: [{ data, borderColor: color, borderWidth: 1.5, tension: 0.4, pointRadius: 0, fill: true, backgroundColor: rgba(color, 0.1) }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: { x: { display: false }, y: { display: false, beginAtZero: false } },
    }
  });
}

/* ── Horizontal Bar ── */
function hbarChart(id, labels, data, color, opts = {}) {
  const ctx = document.getElementById(id)?.getContext('2d');
  if (!ctx) return null;
  return new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{ data, backgroundColor: color, borderRadius: 4, borderSkipped: false }] },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: opts.ratio ?? true,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: GRID, ticks: { ...TICK, callback: opts.xFmt || (v=>v) }, beginAtZero: true },
        y: { grid: { ...GRID, display: false }, ticks: { ...TICK, font: { size: 11 } } },
      },
      ...opts.extra,
    }
  });
}
