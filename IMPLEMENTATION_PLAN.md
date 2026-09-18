# 📋 Implementation Plan — Portal AI Data Platform (DEMO)

**Ubicación:** `Portal/IMPLEMENTATION_PLAN.md`  
**Entorno Nube:** DEV (`platform-partners-des`)  
**Servicio Cloud Run:** `portal-ai-data-demo`  
**URL Oficial DEMO:** [https://portal-ai-data-demo-514633608081.us-central1.run.app/](https://portal-ai-data-demo-514633608081.us-central1.run.app/)  
**Catálogo de Empresas:** 🏢 Conectado en Vivo a `pph-central.settings.companies` (30+ Empresas del Portafolio)  
**Seguridad & Control de Acceso:** 🔒 Autenticación Corporativa Exclusiva  
**Idiomas Soportados:** **Inglés (EN - Predeterminado)** & **Español (ES)**  

---

## 🏢 Hito: Selector Dinámico Multi-Empresa con BigQuery (`pph-central.settings.companies`)

- [x] **Carga Dinámica del Catálogo en Backend (`Portal/server.py` & `Portal_FastAPI`):**
  - Consulta en tiempo real a `pph-central.settings.companies`.
  - Mapeo automático de `company_project_id`, `company_name`, estado y zona horaria.
  - Endpoint `/api/companies` que expone la lista de empresas del portafolio.
- [x] **Selector Interactivo en Frontend (`Portal/js/data-engine.js`):**
  - Dropdown dinámico en la barra superior con formato por estado (ej. `[CA] Shape MHS - Monarch`, `[WI] Shape CHC - Capital`, `[AZ] Shape TUCSON - Fusion`).
  - Persistencia de la empresa seleccionada en `localStorage` (`portal_selected_company`).
  - Actualización reactiva de métricas, gráficos, embudos y colas de llamadas al cambiar de empresa.

---

## 🚀 Despliegue a Cloud Run

Comando de actualización:
```bash
gcloud run deploy portal-ai-data-demo \
  --source . \
  --project platform-partners-des \
  --region us-central1
```
