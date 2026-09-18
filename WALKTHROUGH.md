# 🚶 Walkthrough — Portal AI Data Platform (DEMO)

**Ubicación:** `Portal/WALKTHROUGH.md`  
**Entorno Nube:** DEV (`platform-partners-des`)  
**Servicio Cloud Run:** `portal-ai-data-demo`  
**URL Oficial DEMO:** [https://portal-ai-data-demo-514633608081.us-central1.run.app/](https://portal-ai-data-demo-514633608081.us-central1.run.app/)  
**Catálogo de Empresas:** 🏢 `pph-central.settings.companies` (30+ Empresas)  
**Idiomas:** **Inglés (Predeterminado)** y **Español** con conmutador `[ EN | ES ]`  
**Estado:** 🟢 Conectado en Tiempo Real a BigQuery con Selector Multi-Empresa

---

## 🏢 Selector Dinámico de Compañías

1. **Catálogo de Empresas en BigQuery:**
   - Lee automáticamente la tabla `pph-central.settings.companies`.
   - Soporta todas las empresas activas del portafolio (`shape-mhs-1`, `shape-chc-2`, `shape-tucson-3`, `shape-dear-8`, `shape-otm-4`, `shape-aone-5`, etc.).
2. **Experiencia en el Frontend:**
   - Selector en la barra superior con etiquetas organizadas por estado:
     - `[CA] Shape MHS - Monarch`
     - `[WI] Shape CHC - Capital`
     - `[AZ] Shape TUCSON - Fusion`
     - `[TX] Shape HZE - Howze Plumbing`
     - `[FL] Shape ICO - ICE`
     - ... y todas las empresas del holding.
   - Al cambiar de empresa en el selector, el portal consulta inmediatamente las llamadas y auditorías de ese proyecto en BigQuery y refresca todos los tableros.
   - La selección se guarda en memoria local para que al navegar entre pestañas no se pierda la empresa activa.
