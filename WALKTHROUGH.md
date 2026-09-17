# 🚶 Walkthrough — Portal AI Data Platform (DEMO)

**Ubicación:** `Portal/WALKTHROUGH.md`  
**Entorno Nube:** DEV (`platform-partners-des`)  
**Servicio Cloud Run:** `portal-ai-data-demo`  
**Región:** **US Multi-Región** (`us-central1` / Multi-Region US)  
**Estado:** Preparado para versión y despliegue DEMO

---

## 📌 Hitos DEMO Completados

1. **Estandarización de Nomenclatura DEMO & Proyecto DEV:**
   - Servicio Cloud Run asignado: **`portal-ai-data-demo`**.
   - Proyecto Google Cloud DEV asignado: **`platform-partners-des`**.
   - Ubicación: **US Multi-Región**.
   - Metadata del API actualizada: `1.0.0-demo`.

2. **Backend FastAPI (`Portal/server.py`):**
   - Conexión nativa a BigQuery (`shape-mhs-1`).
   - Consultas maestras analíticas en vivo.
   - Caché en memoria de 60 segundos por empresa.

3. **Seguridad y Despliegue:**
   - Dockerfile configurado para Cloud Run en `platform-partners-des`.
   - Seguridad corporativa `--no-allow-unauthenticated` para dominio `@peachcfo.com`.
