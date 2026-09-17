/**
 * i18n.js — Internationalization & Dual Language Engine (EN / ES)
 * Portal AI Data Platform (DEMO)
 * Default Language: English (EN)
 */

const DICTIONARY = {
  en: {
    // Navigation
    "nav_home": "Executive Overview",
    "nav_funnel": "Economic Funnel",
    "nav_calls": "Calls & AI Intelligence",
    "nav_ops": "Operations & Techs",
    "nav_marketing": "Marketing & Attribution",
    "nav_finance": "Financials (QBO)",
    "nav_customers": "Customers & LTV",
    "nav_investigations": "Deep Inquiries",
    "nav_alerts": "Action Motor & Alerts",
    "nav_chat": "AI Data Agent",
    "nav_system": "System Health",
    "group_analysis": "ANALYSIS",
    "group_operations": "OPERATIONS",
    "group_growth": "GROWTH & ROI",
    "group_intelligence": "AI INTELLIGENCE",
    "group_system": "SYSTEM",
    "freshness": "Live • Sep 2026",
    "company_label": "Company:",
    "lang_label": "Language:",
    
    // Header & Meta
    "page_title_home": "Executive Dashboard",
    "portal_subtitle": "Executive AI Intelligence & Operational Value Stream",
    "live_badge": "LIVE BIGQUERY",
    "btn_sync": "Refresh Data",
    "last_sync": "Last updated:",
    
    // KPI Cards
    "kpi_total_calls": "Total Audited Calls",
    "kpi_total_calls_sub": "100% Multimodal Transcribed",
    "kpi_revenue_at_risk": "Revenue at Risk",
    "kpi_revenue_at_risk_sub": "Backed by open ServiceTitan estimates",
    "kpi_booking_rate": "Booking Conversion Rate",
    "kpi_booking_rate_sub": "Appointments confirmed",
    "kpi_lost_opps": "Lost Opportunities",
    "kpi_lost_opps_sub": "High recoverable potential",
    "kpi_sentiment": "Customer Sentiment",
    "kpi_sentiment_sub": "AI NLP polarity index",
    "kpi_csr_score": "CSR Handling Quality",
    "kpi_csr_score_sub": "AI scorecard protocol score",
    
    // Sections & Titles
    "section_action_motor": "⚡ Action Motor 1 — Immediate Revenue Recovery Queue",
    "section_action_motor_sub": "Real-time prioritized opportunities with direct customer quotes and actionable recovery playbooks.",
    "col_priority": "Priority",
    "col_call_id": "Call ID / Date",
    "col_customer": "Customer",
    "col_csr": "CSR Agent",
    "col_lost_reason": "Root Cause",
    "col_risk_usd": "Est. Value (USD)",
    "col_ai_summary": "AI Diagnostic Summary",
    "col_action": "Action",
    
    // Root Causes & Funnel
    "section_causes": "Root Cause Analysis (Lost Revenue)",
    "section_funnel": "Operational Conversion Funnel",
    "section_csr_ranking": "Top CSR Performance Ranking",
    "col_agent_name": "Agent / CSR Name",
    "col_calls_handled": "Calls",
    "col_booked_count": "Booked",
    "col_conversion_rate": "Conv. Rate",
    "col_revenue_impact": "Revenue at Risk",
    
    // Buttons & Badges
    "btn_launch_recovery": "Recover Lead",
    "btn_view_audio": "Inspect Call",
    "badge_high_priority": "High Priority P1",
    "filter_all": "All Records",
    "filter_p1": "Priority P1 Only",
    "search_placeholder": "Search by customer, phone, or agent...",
  },
  es: {
    // Navigation
    "nav_home": "Portada Ejecutiva",
    "nav_funnel": "Embudo Económico",
    "nav_calls": "Llamadas & CSR",
    "nav_ops": "Operaciones & Técnicos",
    "nav_marketing": "Marketing & Atribución",
    "nav_finance": "Finanzas (QBO)",
    "nav_customers": "Clientes & LTV",
    "nav_investigations": "Investigaciones",
    "nav_alerts": "Alertas & Acción",
    "nav_chat": "Agente Chat",
    "nav_system": "Salud del Sistema",
    "group_analysis": "ANÁLISIS",
    "group_operations": "OPERACIONES",
    "group_growth": "CRECIMIENTO",
    "group_intelligence": "INTELIGENCIA",
    "group_system": "SISTEMA",
    "freshness": "En Vivo • Sep 2026",
    "company_label": "Empresa:",
    "lang_label": "Idioma:",
    
    // Header & Meta
    "page_title_home": "Dashboard Ejecutivo",
    "portal_subtitle": "Inteligencia Ejecutiva con IA y Flujo de Valor Operativo",
    "live_badge": "BIGQUERY EN VIVO",
    "btn_sync": "Actualizar Datos",
    "last_sync": "Última sincronización:",
    
    // KPI Cards
    "kpi_total_calls": "Total Llamadas Auditadas",
    "kpi_total_calls_sub": "100% Transcripción Multimodal",
    "kpi_revenue_at_risk": "Ingresos en Riesgo",
    "kpi_revenue_at_risk_sub": "Respaldado por presupuestos ST",
    "kpi_booking_rate": "Tasa de Conversión / Booking",
    "kpi_booking_rate_sub": "Citas agendadas confirmadas",
    "kpi_lost_opps": "Oportunidades Perdidas",
    "kpi_lost_opps_sub": "Alto potencial recuperable",
    "kpi_sentiment": "Sentimiento del Cliente",
    "kpi_sentiment_sub": "Índice de polaridad NLP",
    "kpi_csr_score": "Calidad de Atención CSR",
    "kpi_csr_score_sub": "Evaluación con rúbrica IA",
    
    // Sections & Titles
    "section_action_motor": "⚡ Action Motor 1 — Cola Inmediata de Recuperación",
    "section_action_motor_sub": "Oportunidades priorizadas en tiempo real con transcripción y montos detectados.",
    "col_priority": "Prioridad",
    "col_call_id": "ID Llamada / Fecha",
    "col_customer": "Cliente",
    "col_csr": "Agente CSR",
    "col_lost_reason": "Causa Raíz",
    "col_risk_usd": "Valor Est. (USD)",
    "col_ai_summary": "Resumen Diagnóstico IA",
    "col_action": "Acción",
    
    // Root Causes & Funnel
    "section_causes": "Causas Raíz de Pérdida de Oportunidad",
    "section_funnel": "Embudo de Conversión Operativa",
    "section_csr_ranking": "Ranking de Desempeño de CSRs",
    "col_agent_name": "Nombre Agente / CSR",
    "col_calls_handled": "Llamadas",
    "col_booked_count": "Bookings",
    "col_conversion_rate": "Tasa Conv.",
    "col_revenue_impact": "Impacto en Riesgo",
    
    // Buttons & Badges
    "btn_launch_recovery": "Recuperar",
    "btn_view_audio": "Ver Llamada",
    "badge_high_priority": "Prioridad Alta P1",
    "filter_all": "Todos los Registros",
    "filter_p1": "Solo Prioridad P1",
    "search_placeholder": "Buscar por cliente, teléfono o agente...",
  }
};

class PortalI18n {
  constructor() {
    // Default to English ('en') as requested, with fallback to localStorage
    this.currentLang = localStorage.getItem('portal_language') || 'en';
  }

  init() {
    this.applyTranslations();
    this.injectLanguageSelector();
  }

  setLanguage(lang) {
    if (lang !== 'en' && lang !== 'es') return;
    this.currentLang = lang;
    localStorage.setItem('portal_language', lang);
    this.applyTranslations();
    
    // Trigger event for dynamic re-renderers (charts, tables)
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: this.currentLang } }));
    
    // Rebuild sidebar and topbar if available
    if (typeof buildSidebar === 'function' && document.getElementById('sidebar')) {
      document.getElementById('sidebar').innerHTML = buildSidebar();
    }
    if (typeof buildTopbar === 'function' && document.getElementById('topbar')) {
      document.getElementById('topbar').innerHTML = buildTopbar();
    }
  }

  t(key) {
    const dict = DICTIONARY[this.currentLang] || DICTIONARY.en;
    return dict[key] || DICTIONARY.en[key] || key;
  }

  applyTranslations() {
    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation) {
        el.innerHTML = translation;
      }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = this.t(key);
      if (translation) {
        el.setAttribute('placeholder', translation);
      }
    });

    // Update document language attribute
    document.documentElement.lang = this.currentLang;
  }

  injectLanguageSelector() {
    const topbarRight = document.querySelector('.topbar-right');
    if (!topbarRight) return;

    const existing = document.getElementById('lang-selector-wrap');
    if (existing) existing.remove();

    const selectorHtml = `
      <div id="lang-selector-wrap" style="display:inline-flex;align-items:center;gap:6px;margin-right:12px;">
        <span style="font-size:0.68rem;color:var(--text-3);font-weight:700;text-transform:uppercase;letter-spacing:0.04em;">${this.t('lang_label')}</span>
        <div style="display:inline-flex;background:var(--bg-surface-2);border:1px solid var(--border-2);border-radius:6px;padding:2px;">
          <button onclick="window.I18n.setLanguage('en')" style="padding:2px 8px;border-radius:4px;border:none;background:${this.currentLang === 'en' ? 'var(--accent, #3b82f6)' : 'transparent'};color:${this.currentLang === 'en' ? '#fff' : 'var(--text-2)'};font-size:0.75rem;font-weight:700;cursor:pointer;transition:all 0.15s;">EN</button>
          <button onclick="window.I18n.setLanguage('es')" style="padding:2px 8px;border-radius:4px;border:none;background:${this.currentLang === 'es' ? 'var(--accent, #3b82f6)' : 'transparent'};color:${this.currentLang === 'es' ? '#fff' : 'var(--text-2)'};font-size:0.75rem;font-weight:700;cursor:pointer;transition:all 0.15s;">ES</button>
        </div>
      </div>
    `;

    topbarRight.insertAdjacentHTML('afterbegin', selectorHtml);
  }
}

// Global instance
window.I18n = new PortalI18n();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.I18n.init();
});

