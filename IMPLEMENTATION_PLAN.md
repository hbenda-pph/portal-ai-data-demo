# 📋 Implementation Plan — Portal AI Data Platform (DEMO)

**Ubicación:** `Portal/IMPLEMENTATION_PLAN.md`  
**Entorno Nube:** DEV (`platform-partners-des`)  
**Servicio Cloud Run:** `portal-ai-data-demo`  
**URL de Producción DEMO:** [https://portal-ai-data-demo-514633608081.us-central1.run.app/](https://portal-ai-data-demo-514633608081.us-central1.run.app/)  
**Región / Infraestructura:** **US Multi-Región** (`us-central1`)  
**Idiomas Soportados:** **Inglés (EN - Predeterminado)** & **Español (ES)**  

---

## 🎯 Fases del Proyecto DEMO

### Fase 1: Arquitectura Backend FastAPI, BigQuery & Soporte Bilingüe
- [x] **1.1. Servidor Backend (`Portal/server.py`):**
  - Implementado con FastAPI y `google-cloud-bigquery`.
  - Configurado explícitamente en modo DEMO (`version: 1.0.0-demo`).
  - Consultas analíticas en vivo sobre el Lakehouse (`shape-mhs-1`).
- [x] **1.2. Motor de Internacionalización Bilingüe (`Portal/js/i18n.js`):**
  - Idioma predeterminado: **Inglés (EN)**.
  - Conmutador interactivo `[ EN | ES ]` integrado en la barra superior.
  - Persistencia de preferencia de idioma en el navegador.
- [x] **1.3. Conexión Híbrida en el Frontend (`Portal/js/data-engine.js`):**
  - Consumo directo de `/api/data` con fallback a datos locales.

---

### Fase 2: Despliegue Privado en Google Cloud Run (Proyecto DEV)
- [x] **2.1. Despliegue Exitoso en Proyecto DEV (`platform-partners-des`):**
  - Servicio activo en: `https://portal-ai-data-demo-514633608081.us-central1.run.app/`
- [x] **2.2. Permisos IAM de Invocación Web y BigQuery Concedidos:**
  - `roles/run.invoker` concedido en Cloud Run.
  - `roles/bigquery.dataViewer` concedido en `shape-mhs-1`.
  - `roles/bigquery.jobUser` concedido en `platform-partners-des`.

---

### Fase 3: Actualización y Sincronización Continua
- [ ] **3.1. Re-despliegue con soporte bilingüe EN/ES:**
  ```bash
  gcloud run deploy portal-ai-data-demo \
    --source . \
    --project platform-partners-des \
    --region us-central1
  ```
- [ ] **3.2. Activación de Action Motor 1 y vistas multi-tenant (30 empresas).**
