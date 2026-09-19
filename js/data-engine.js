/**
 * data-engine.js — Motor de carga de datos dinámico y multi-empresa
 * Portal AI Data Exploration & Intelligence
 * Conectado dinámicamente con pph-central.settings.companies y BigQuery
 */

class PortalDataEngine {
  constructor() {
    this.currentCompany = localStorage.getItem('portal_selected_company') || 'shape-mhs-1';
    try {
      const cached = localStorage.getItem('portal_cached_companies');
      this.companies = cached ? JSON.parse(cached) : [];
    } catch (e) {
      this.companies = [];
    }
    this.data = null;
    
    // Listen for company changes
    document.addEventListener('changeCompany', (e) => {
      this.loadCompanyData(e.detail.companyId);
    });
  }

  async init() {
    if (this.companies.length > 0) {
      this.injectSelector();
    }
    // 1. Fetch companies from API dynamically
    await this.fetchCompanies();

    // 2. Load active company data
    await this.loadCompanyData(this.currentCompany);
  }

  async fetchCompanies() {
    try {
      const res = await fetch('/api/companies');
      if (res.ok) {
        const list = await res.json();
        if (Array.isArray(list) && list.length > 0) {
          this.companies = list;
          localStorage.setItem('portal_cached_companies', JSON.stringify(list));
          this.injectSelector();
        }
      }
    } catch (e) {
      console.warn('[DataEngine] Error fetching companies:', e);
    }
  }

  injectSelector() {
    const topbarRight = document.querySelector('.topbar-right');
    if (!topbarRight) return;

    // Avoid duplicate selector
    const existing = document.getElementById('company-selector-wrap');
    if (existing) existing.remove();

    const optionsHtml = this.companies.map(c => {
      const label = c.display || c.name || c.id;
      const isSelected = (c.id === this.currentCompany || c.project === this.currentCompany) ? 'selected' : '';
      return `<option value="${c.id}" ${isSelected}>${label}</option>`;
    }).join('');

    const selectorHtml = `
      <div id="company-selector-wrap" style="display:inline-flex;align-items:center;gap:8px;margin-right:12px;">
        <span style="font-size:0.68rem;color:var(--text-3);font-weight:700;text-transform:uppercase;letter-spacing:0.04em;">🏢</span>
        <select id="company-selector" class="company-selector" onchange="window.DataEngine.onSelectCompany(this.value)" style="padding:5px 12px;border-radius:6px;border:1px solid rgba(255,255,255,0.15);background:rgba(15,23,42,0.85);color:var(--text-1);font-size:0.78rem;font-weight:600;cursor:pointer;outline:none;max-width:260px;">
          ${optionsHtml}
        </select>
      </div>
    `;
    
    topbarRight.insertAdjacentHTML('afterbegin', selectorHtml);
  }

  onSelectCompany(companyId) {
    localStorage.setItem('portal_selected_company', companyId);
    document.dispatchEvent(new CustomEvent('changeCompany', { detail: { companyId } }));
  }

  async loadCompanyData(companyId) {
    this.currentCompany = companyId;
    localStorage.setItem('portal_selected_company', companyId);
    console.log(`[DataEngine] Loading data for company: ${companyId}`);
    
    const noteEl = document.querySelector('.topbar-date');
    if (noteEl) noteEl.innerText = 'Syncing BQ...';

    try {
      let dataset = null;

      // Fetch Live BigQuery dataset from FastAPI API Endpoint
      const res = await fetch(`/api/data?tenant=${companyId}`);
      if (res.ok) {
        dataset = await res.json();
        console.log(`[DataEngine] Received Live BigQuery dataset:`, dataset);
      } else {
        console.warn(`[DataEngine] API returned status ${res.status} for ${companyId}`);
      }

      if (dataset) {
        this.data = dataset;
        
        // Sync selector value
        const sel = document.getElementById('company-selector');
        if (sel && sel.value !== companyId) {
          sel.value = companyId;
        }

        // Dispatch event to update all charts, tables, and KPIs
        document.dispatchEvent(new CustomEvent('dataLoaded', { detail: { data: this.data } }));
      } else {
        console.error('[DataEngine] No dataset returned for ID:', companyId);
      }
    } catch (error) {
      console.error('[DataEngine] Error loading company data:', error);
    } finally {
      if (noteEl) {
        const lang = window.I18n ? window.I18n.currentLang : 'en';
        const now = new Date();
        noteEl.innerText = now.toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', { weekday:'short', year:'numeric', month:'short', day:'numeric' });
      }
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
