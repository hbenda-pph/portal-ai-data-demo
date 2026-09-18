/**
 * data-engine.js — Motor de carga de datos dinámico y multi-empresa
 * Portal AI Data Exploration & Intelligence
 * Conectado dinámicamente con pph-central.settings.companies y BigQuery
 */

const DEFAULT_COMPANIES_LIST = [
  {"id": "shape-mhs-1", "company_id": 1, "name": "Monarch Home Services", "short_name": "MONARCH", "project": "shape-mhs-1", "state": "CA", "timezone": "PST", "active": true, "display": "[CA] Shape MHS - Monarch"},
  {"id": "shape-chc-2", "company_id": 2, "name": "Capital", "short_name": "CAPITAL", "project": "shape-chc-2", "state": "WI", "timezone": "CST", "active": true, "display": "[WI] Shape CHC - Capital"},
  {"id": "shape-tucson-3", "company_id": 3, "name": "Fusion", "short_name": "FUSION", "project": "shape-tucson-3", "state": "AZ", "timezone": "MST", "active": true, "display": "[AZ] Shape TUCSON - Fusion"},
  {"id": "shape-otm-4", "company_id": 4, "name": "Over the Moon", "short_name": "OVER THE MOON", "project": "shape-otm-4", "state": "WI", "timezone": "CST", "active": true, "display": "[WI] Shape OTM - Over the Moon"},
  {"id": "shape-aone-5", "company_id": 5, "name": "A-One Air", "short_name": "A-ONE AIR", "project": "shape-aone-5", "state": "WA", "timezone": "PST", "active": true, "display": "[WA] Shape AONE - A One"},
  {"id": "shape-lba-6", "company_id": 6, "name": "LBA", "short_name": "LBA", "project": "shape-lba-6", "state": "KS", "timezone": "CST", "active": true, "display": "[KS] Shape LBA - LBA"},
  {"id": "shape-lbca-7", "company_id": 7, "name": "Prodigy Plumbing", "short_name": "PRODIGY PLUMBING", "project": "shape-lbca-7", "state": "CA", "timezone": "PST", "active": true, "display": "[CA] Shape LBCA - Prodigy Plumbing"},
  {"id": "shape-dear-8", "company_id": 8, "name": "Dear Services", "short_name": "DEAR", "project": "shape-dear-8", "state": "WA", "timezone": "PST", "active": true, "display": "[WA] Shape DEAR - Dear Services"},
  {"id": "shape-hhwi-9", "company_id": 9, "name": "Healthy Home", "short_name": "HEALTHY HOME", "project": "shape-hhwi-9", "state": "WI", "timezone": "CST", "active": true, "display": "[WI] Shape HHWI - Healthy Home"},
  {"id": "shape-cls-10", "company_id": 10, "name": "Chad Love", "short_name": "CHAD LOVE", "project": "shape-cls-10", "state": "NC", "timezone": "EST", "active": true, "display": "[NC] Shape CLS - Chad Love"},
  {"id": "shape-hecs-11", "company_id": 11, "name": "H&E Comfort", "short_name": "H&E Comfort", "project": "shape-hecs-11", "state": "LA", "timezone": "CST", "active": true, "display": "[LA] Shape HECS - H&E Comfort"},
  {"id": "shape-jsp-12", "company_id": 12, "name": "John Stevenson", "short_name": "JSP", "project": "shape-jsp-12", "state": "CA", "timezone": "PST", "active": true, "display": "[CA] Shape JSP - John Stevenson"},
  {"id": "shape-ico-13", "company_id": 13, "name": "ICE", "short_name": "ICE COOLING", "project": "shape-ico-13", "state": "FL", "timezone": "EST", "active": true, "display": "[FL] Shape ICO - ICE"},
  {"id": "shape-indy-14", "company_id": 14, "name": "Complete Comfort", "short_name": "COMPLETE COMFORT", "project": "shape-indy-14", "state": "IN", "timezone": "EST", "active": true, "display": "[IN] Shape INDY - Complete Comfort"},
  {"id": "shape-lex-15", "company_id": 15, "name": "Synergy Home", "short_name": "SYNERGY HOME", "project": "shape-lex-15", "state": "KY", "timezone": "EST", "active": true, "display": "[KY] Shape LEX - Synergy Home"},
  {"id": "shape-hze-16", "company_id": 16, "name": "Howze Plumbing", "short_name": "HOWZE", "project": "shape-hze-16", "state": "TX", "timezone": "CST", "active": true, "display": "[TX] Shape HZE - Howze Plumbing"},
  {"id": "shape-ncva-17", "company_id": 17, "name": "Prostar", "short_name": "PROSTAR SERVICES", "project": "shape-ncva-17", "state": "NC", "timezone": "EST", "active": true, "display": "[NC] Shape NCVA - Prostar"},
  {"id": "shape-ahs-18", "company_id": 18, "name": "Absolute Plumbing", "short_name": "ABSOLUTE PLUMBING", "project": "shape-ahs-18", "state": "GA", "timezone": "EST", "active": true, "display": "[GA] Shape AHS - Absolute Plumbing"},
  {"id": "shape-ppp-19", "company_id": 19, "name": "Personal PHC", "short_name": "PERSONAL", "project": "shape-ppp-19", "state": "CA", "timezone": "PST", "active": true, "display": "[CA] Shape PPP - Personal PHC"},
  {"id": "shape-mgy-20", "company_id": 20, "name": "My Guy", "short_name": "MY GUY", "project": "shape-mgy-20", "state": "CA", "timezone": "PST", "active": true, "display": "[CA] Shape MGY - My Guy"},
  {"id": "shape-ns-21", "company_id": 21, "name": "Northstar Services", "short_name": "NORTHSTAR", "project": "shape-ns-21", "state": "MN", "timezone": "CST", "active": true, "display": "[MN] Shape NS - Northstar Services"},
  {"id": "shape-sst-22", "company_id": 22, "name": "Supreme Service", "short_name": "SUPREME", "project": "shape-sst-22", "state": "MD", "timezone": "EST", "active": true, "display": "[MD] Shape SST - Supreme Service"},
  {"id": "shape-jfsp-23", "company_id": 23, "name": "Spartan Plumbing", "short_name": "SPARTAN", "project": "shape-jfsp-23", "state": "OH", "timezone": "EST", "active": true, "display": "[OH] Shape JFSP - Spartan Plumbing"},
  {"id": "shape-pthc-24", "company_id": 24, "name": "Perfect Temp", "short_name": "PERFECT TEMP", "project": "shape-pthc-24", "state": "IL", "timezone": "CST", "active": true, "display": "[IL] Shape PTHC - Perfect Temp"},
  {"id": "shape-phs-25", "company_id": 25, "name": "Pilot Plumbing", "short_name": "PILOT", "project": "shape-phs-25", "state": "TX", "timezone": "CST", "active": false, "display": "[TX] Shape PHS - Pilot Plumbing"},
  {"id": "shape-cos-26", "company_id": 26, "name": "Jantz Cosmic Comfort", "short_name": "COSMIC COMFORT", "project": "shape-cos-26", "state": "CA", "timezone": "PST", "active": true, "display": "[CA] Shape COS - Jantz Cosmic Comfort"},
  {"id": "shape-gem-27", "company_id": 27, "name": "Green Energy", "short_name": "GREEN ENERGY", "project": "shape-gem-27", "state": "MA", "timezone": "EST", "active": true, "display": "[MA] Shape GEM - Green Energy"},
  {"id": "shape-newe-28", "company_id": 28, "name": "Sharp PHC", "short_name": "SHARP", "project": "shape-newe-28", "state": "MA", "timezone": "EST", "active": true, "display": "[MA] Shape NEWE - Sharp PHC"},
  {"id": "shape-acga-29", "company_id": 29, "name": "Daffy Ducts", "short_name": "DAFFY DUCTS", "project": "shape-acga-29", "state": "GA", "timezone": "EST", "active": true, "display": "[GA] Shape ACGA - Daffy Ducts"},
  {"id": "shape-jrb-30", "company_id": 30, "name": "JR Bolton", "short_name": "JR BOLTON", "project": "shape-jrb-30", "state": "GA", "timezone": "EST", "active": true, "display": "[GA] Shape JRB - JR Bolton"},
  {"id": "shape-ida-31", "company_id": 31, "name": "Criterion", "short_name": "CRITERION PLUMBERS", "project": "shape-ida-31", "state": "ID", "timezone": "MST", "active": true, "display": "[ID] Shape IDA - Criterion"},
  {"id": "air-today-llc-37", "company_id": 37, "name": "Air Today LLC", "short_name": "AIR TODAY", "project": "air-today-llc-37", "state": "FL", "timezone": "EST", "active": true, "display": "[FL] Air Today LLC"},
  {"id": "personalized-power-service-38", "company_id": 38, "name": "Personalized Power Service", "short_name": "Personalized Power Service (PPS)", "project": "personalized-power-service-38", "state": "FL", "timezone": "EST", "active": true, "display": "[FL] Personalized Power Service"}
];

class PortalDataEngine {
  constructor() {
    this.currentCompany = localStorage.getItem('portal_selected_company') || 'shape-mhs-1';
    this.companies = DEFAULT_COMPANIES_LIST;
    this.data = null;
    
    // Listen for company changes
    document.addEventListener('changeCompany', (e) => {
      this.loadCompanyData(e.detail.companyId);
    });
  }

  async init() {
    // 1. Inject immediate selector with default list
    this.injectSelector();

    // 2. Refresh companies from API in background if online
    await this.fetchCompanies();

    // 3. Load active company data
    await this.loadCompanyData(this.currentCompany);
  }

  async fetchCompanies() {
    try {
      const res = await fetch('/api/companies');
      if (res.ok) {
        const list = await res.json();
        if (Array.isArray(list) && list.length > 0) {
          this.companies = list;
          this.injectSelector();
        }
      }
    } catch (e) {
      console.warn('[DataEngine] Using default companies list:', e);
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
