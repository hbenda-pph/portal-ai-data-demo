/**
 * data-engine.js — Motor de carga de datos dinámico
 * Portal AI Data Exploration & Intelligence
 */

class PortalDataEngine {
  constructor() {
    this.currentCompany = 'mhs';
    this.companies = [
      { id: 'mhs', name: 'Monarch Home Services' },
      { id: 'demo', name: 'Apex Comfort Systems (Demo)' }
    ];
    this.data = null;
    
    // Listen for company changes
    document.addEventListener('changeCompany', (e) => {
      this.loadCompanyData(e.detail.companyId);
    });
  }

  async init() {
    this.injectSelector();
    await this.loadCompanyData(this.currentCompany);
  }

  injectSelector() {
    const topbarRight = document.querySelector('.topbar-right');
    if (!topbarRight) return;

    // Avoid duplicate selector
    const existing = document.getElementById('company-selector-wrap');
    if (existing) existing.remove();

    const selectorHtml = `
      <div id="company-selector-wrap" style="display:inline-flex;align-items:center;gap:8px;margin-right:12px;">
        <span style="font-size:0.68rem;color:var(--text-3);font-weight:700;text-transform:uppercase;letter-spacing:0.04em;">Empresa:</span>
        <select id="company-selector" class="company-selector" onchange="document.dispatchEvent(new CustomEvent('changeCompany', {detail: {companyId: this.value}}))" style="padding:4px 10px;border-radius:6px;border:1px solid var(--border-2);background:var(--bg-surface-2);color:var(--text-1);font-size:0.78rem;font-weight:600;cursor:pointer;outline:none;">
          ${this.companies.map(c => `<option value="${c.id}" ${c.id === this.currentCompany ? 'selected' : ''}>${c.name}</option>`).join('')}
        </select>
      </div>
    `;
    
    topbarRight.insertAdjacentHTML('afterbegin', selectorHtml);
  }

  async loadCompanyData(companyId) {
    this.currentCompany = companyId;
    console.log(`[DataEngine] Switching to company: ${companyId}`);
    
    try {
      let dataset = null;

      // 1. Try Live API Endpoint first (Cloud Run / Local Server)
      if (window.location.protocol.startsWith('http')) {
        try {
          const res = await fetch(`/api/data?tenant=${companyId}`);
          if (res.ok) {
            dataset = await res.json();
            console.log(`[DataEngine] Received Live BigQuery dataset from API:`, dataset);
          }
        } catch (apiErr) {
          console.warn('[DataEngine] API fetch failed, falling back to local JS data:', apiErr);
        }
      }

      // 2. Fallback to bundled dataset if offline / static
      if (!dataset) {
        if (companyId === 'mhs' && typeof MONARCH_DATA !== 'undefined') {
          dataset = MONARCH_DATA;
        } else if (companyId === 'demo' && typeof DEMO_DATA !== 'undefined') {
          dataset = DEMO_DATA;
        } else if (typeof MONARCH_DATA !== 'undefined') {
          dataset = MONARCH_DATA;
        }
      }

      if (dataset) {
        this.data = dataset;
        
        // Sync selector value if present
        const sel = document.getElementById('company-selector');
        if (sel && sel.value !== companyId) {
          sel.value = companyId;
        }

        // Dispatch event to update all charts, tables, and KPIs
        document.dispatchEvent(new CustomEvent('dataLoaded', { detail: { data: this.data } }));
      } else {
        console.error('[DataEngine] No dataset found for ID:', companyId);
      }
    } catch (error) {
      console.error('[DataEngine] Error loading company data:', error);
    }
  }

  getData() {
    return this.data;
  }
}

// Global instance
window.DataEngine = new PortalDataEngine();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => window.DataEngine.init(), 60);
});
