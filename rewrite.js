const fs = require('fs');

const indexFile = 'c:/Users/herlbeng/Documents/Platform Partners/platform_partners/AI Data Platform/Portal/index.html';
let indexHtml = fs.readFileSync(indexFile, 'utf8');

// Header
indexHtml = indexHtml.replace(
  /<p class="page-desc">.*?<\/p>/, 
  '<p class="page-desc" id="page-desc">Monarch Home Services &bull; Muestra auditada &bull; Cargando datos...</p>'
);
indexHtml = indexHtml.replace(
  /<span class="data-source-tag">.*?<\/span>/,
  '<span class="data-source-tag"><span class="pulse"></span><span id="data-source">Cargando...</span></span>'
);

// Impact Card
indexHtml = indexHtml.replace(
  /<div class="impact-value">\$525<span>K<\/span><\/div>/,
  '<div class="impact-value" id="kpi-revenue-risk">...</div>'
);
indexHtml = indexHtml.replace(
  /<span style="color:var\(--purple\);font-family:'DM Mono',monospace">\$442,431<\/span>/,
  '<span style="color:var(--purple);font-family:\'DM Mono\',monospace" id="kpi-open-est">...</span>'
);
indexHtml = indexHtml.replace(
  /<span style="color:var\(--text-3\)">Via presupuestos abiertos \(84\.2%\)<\/span>/,
  '<span style="color:var(--text-3)">Via presupuestos abiertos (<span id="kpi-open-est-pct">...</span>)</span>'
);
indexHtml = indexHtml.replace(
  /<div class="progress-fill purple" style="width:84\.2%"><\/div>/,
  '<div class="progress-fill purple" id="bar-open-est" style="width:0%"></div>'
);
indexHtml = indexHtml.replace(
  /<span style="color:var\(--accent\);font-family:'DM Mono',monospace">\$82,872<\/span>/,
  '<span style="color:var(--accent);font-family:\'DM Mono\',monospace" id="kpi-bench">...</span>'
);
indexHtml = indexHtml.replace(
  /<span style="color:var\(--text-3\)">Via benchmarks Monarch \(15\.8%\)<\/span>/,
  '<span style="color:var(--text-3)">Via benchmarks Monarch (<span id="kpi-bench-pct">...</span>)</span>'
);
indexHtml = indexHtml.replace(
  /<div class="progress-fill blue" style="width:15\.8%"><\/div>/,
  '<div class="progress-fill blue" id="bar-bench" style="width:0%"></div>'
);

// KPIs
indexHtml = indexHtml.replace(
  /<div class="kpi-value">981<\/div>/,
  '<div class="kpi-value" id="kpi-calls">...</div>'
);
indexHtml = indexHtml.replace(
  /<div class="kpi-value">7\.3%<\/div>/,
  '<div class="kpi-value" id="kpi-booking-rate">...</div>'
);
indexHtml = indexHtml.replace(
  /<span style="color:var\(--green\);font-weight:700;font-size:0\.75rem">72 jobs agendados<\/span>/,
  '<span style="color:var(--green);font-weight:700;font-size:0.75rem"><span id="kpi-booked">...</span> jobs agendados</span>'
);
indexHtml = indexHtml.replace(
  /<div class="kpi-value">151 <span style="font-size:1rem;font-weight:500;color:var\(--amber\)">\(15\.4%\)<\/span><\/div>/,
  '<div class="kpi-value"><span id="kpi-lost">...</span> <span style="font-size:1rem;font-weight:500;color:var(--amber)">(<span id="kpi-lost-pct">...</span>)</span></div>'
);
indexHtml = indexHtml.replace(
  /<div class="kpi-value" style="font-size:1\.5rem">46<\/div>/,
  '<div class="kpi-value" style="font-size:1.5rem" id="kpi-open-count">...</div>'
);
indexHtml = indexHtml.replace(
  /<div class="kpi-value" style="font-size:1\.5rem">\+0\.04<\/div>/,
  '<div class="kpi-value" style="font-size:1.5rem" id="kpi-sentiment">...</div>'
);
indexHtml = indexHtml.replace(
  /<div class="kpi-value" style="font-size:1\.5rem">3\.0<span style="font-size:0\.9rem;color:var\(--text-3\)">\/5\.0<\/span><\/div>/,
  '<div class="kpi-value" style="font-size:1.5rem"><span id="kpi-csr-score">...</span><span style="font-size:0.9rem;color:var(--text-3)">/5.0</span></div>'
);

// Causes
indexHtml = indexHtml.replace(
  /<div style="margin-bottom:12px;margin-top:4px">[\s\S]*?(?=<\/div>\s*<\/div>\s*<!-- Embudo)/,
  '<div style="margin-bottom:12px;margin-top:4px" id="render-causes"></div>\n        '
);

// Funnel
indexHtml = indexHtml.replace(
  /<div style="padding-top:4px">[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/div>\s*<!-- CSR)/,
  '<div style="padding-top:4px" id="render-funnel"></div>\n          '
);

// CSR
indexHtml = indexHtml.replace(
  /<tbody[^>]*>[\s\S]*?<\/tbody>/,
  '<tbody id="render-csr"></tbody>'
);

// Lost Queue - Using match to just replace the second tbody
let tbodyCount = 0;
indexHtml = indexHtml.replace(
  /<tbody[^>]*>[\s\S]*?<\/tbody>/g,
  (match) => {
    tbodyCount++;
    if (tbodyCount === 2) {
      return '<tbody id="render-queue"></tbody>';
    }
    return match;
  }
);

const scriptsHtml = `
<script src="js/data.js"></script>
<script src="js/data-engine.js"></script>
<script>
document.addEventListener('dataLoaded', (e) => {
  const d = e.detail.data;
  const fmtMoney = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  const fmtNum = (val) => new Intl.NumberFormat('en-US').format(val);
  const fmtPct = (val) => val + '%';
  
  const el = (id) => document.getElementById(id);
  if(!el('page-desc')) return;
  
  el('page-desc').innerHTML = \`\${d.companyName} &bull; \${d.meta.period} &bull; \${d.meta.note} &bull; \${d.kpis.totalCalls} llamadas reconciliadas\`;
  el('data-source').innerText = d.meta.source;
  
  el('kpi-revenue-risk').innerHTML = fmtMoney(d.kpis.revenueAtRisk).replace('$', '$').replace(/,\\d{3}$/, '<span>K</span>');
  el('kpi-open-est').innerText = fmtMoney(d.kpis.backedByOpenEstimates);
  el('kpi-bench').innerText = fmtMoney(d.kpis.backedByInvoiceBenchmarks);
  
  const pctOpen = (d.kpis.backedByOpenEstimates / d.kpis.revenueAtRisk * 100).toFixed(1) + '%';
  const pctBench = (d.kpis.backedByInvoiceBenchmarks / d.kpis.revenueAtRisk * 100).toFixed(1) + '%';
  el('kpi-open-est-pct').innerText = pctOpen;
  el('bar-open-est').style.width = pctOpen;
  el('kpi-bench-pct').innerText = pctBench;
  el('bar-bench').style.width = pctBench;
  
  el('kpi-calls').innerText = fmtNum(d.kpis.totalCalls);
  el('kpi-booking-rate').innerText = fmtPct(d.kpis.bookingRate);
  el('kpi-booked').innerText = d.kpis.totalCalls ? Math.round(d.kpis.totalCalls * (d.kpis.bookingRate/100)) : 0;
  el('kpi-lost').innerText = fmtNum(d.kpis.lostOpportunities);
  el('kpi-lost-pct').innerText = fmtPct(d.kpis.lostPercentage);
  el('kpi-open-count').innerText = d.kpis.openEstimatesCount;
  el('kpi-sentiment').innerText = d.kpis.avgSentiment > 0 ? '+' + d.kpis.avgSentiment : d.kpis.avgSentiment;
  el('kpi-csr-score').innerText = d.kpis.csrHandlingScore.toFixed(1);
  
  const maxCause = Math.max(...d.rootCauses.map(c => c.impact));
  el('render-causes').innerHTML = d.rootCauses.map(c => {
    const width = (c.impact / maxCause * 100).toFixed(1) + '%';
    return \`<div class="cause-row">
      <div class="cause-name">\${c.reason} <span style="color:var(--text-3);font-size:0.65rem;margin-left:4px">(\${c.count})</span></div>
      <div class="cause-bar-wrap"><div class="cause-fill red" style="width:\${width}"></div></div>
      <div class="cause-val">\$\${Math.round(c.impact/1000)}K</div>
    </div>\`;
  }).join('');
  
  const maxFunnel = Math.max(...d.funnel.map(f => f.count));
  el('render-funnel').innerHTML = d.funnel.map((f, i) => {
    const width = (f.count / maxFunnel * 100).toFixed(1) + '%';
    const dropHtml = f.drop ? \`<div class="funnel-pct" style="color:var(--amber)">\${f.drop}%</div>\` : \`<div class="funnel-pct">--</div>\`;
    return \`<div class="funnel-step">
      <div class="funnel-num">0\${i+1}</div>
      <div class="funnel-label">\${f.step}</div>
      <div class="funnel-bar-wrap"><div class="funnel-fill blue" style="width:\${width}"></div></div>
      <div class="funnel-val">\${fmtNum(f.count)}</div>
      \${dropHtml}
    </div>\`;
  }).join('');
  
  el('render-csr').innerHTML = d.csrRanking.slice(0,3).map(c => 
    \`<tr>
      <td class="metric-name">\${c.name}</td>
      <td class="val-primary" style="text-align:right">\${c.rate.toFixed(1)}%</td>
      <td class="val-danger" style="text-align:right">\${fmtMoney(c.risk).replace(/,\\d{3}$/, 'K')}</td>
    </tr>\`
  ).join('');
  
  el('render-queue').innerHTML = d.lostQueue.slice(0,3).map(q => 
    \`<tr>
      <td><span style="display:inline-flex;padding:2px 6px;border-radius:4px;font-size:0.6rem;font-weight:800;background:var(--\${q.priority==='P1'?'red':q.priority==='P2'?'amber':'accent'}-muted);color:var(--\${q.priority==='P1'?'red':q.priority==='P2'?'amber':'accent'});border:1px solid rgba(0,0,0,0.1)">\${q.priority}</span></td>
      <td class="pri" style="font-size:0.78rem">\${q.customer} <br><span style="color:var(--text-3);font-size:0.65rem">· \${q.csr}</span></td>
      <td style="font-size:0.75rem;color:var(--text-2)">\${q.reason}</td>
      <td class="mono r" style="color:var(--green)">\${fmtMoney(q.amount)}</td>
    </tr>\`
  ).join('');
});
</script>
`;

if (!indexHtml.includes('data-engine.js')) {
    indexHtml = indexHtml.replace(/<script src="js\/data\.js"><\/script>/, scriptsHtml);
}
fs.writeFileSync(indexFile, indexHtml);
console.log('index.html rewritten successfully');
