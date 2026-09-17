# 📋 Implementation Plan — Portal AI Data Platform (DEMO)

**Ubicación:** `Portal/IMPLEMENTATION_PLAN.md`  
**Entorno Nube:** DEV (`platform-partners-des`)  
**Servicio Cloud Run:** `portal-ai-data-demo`  
**Región / Alcance:** **US Multi-Región** (`us-central1` / Multi-Region US)  
**Estrategia:** Despliegue Privado y Seguro de Demostración (Autenticación Corporativa `@peachcfo.com` & Cero Exposición Pública)

---

## 🎯 Fases del Proyecto DEMO

### Fase 1: Arquitectura Backend FastAPI & Conexión en Vivo a BigQuery
- [x] **1.1. Servidor Backend (`Portal/server.py`):**
  - Implementado con FastAPI y `google-cloud-bigquery`.
  - Configurado explícitamente en modo DEMO (`version: 1.0.0-demo`).
  - Consultas analíticas en vivo sobre el Lakehouse (`shape-mhs-1`).
- [x] **1.2. Sistema de Caché en Memoria por Tenant:**
  - Caché TTL de 60 segundos por empresa.
- [x] **1.3. Conexión Híbrida en el Frontend (`Portal/js/data-engine.js`):**
  - Consumo directo de `/api/data` con fallback a datos locales.
- [x] **1.4. Empaquetado Docker (`Portal/Dockerfile` & `requirements.txt`):**
  - Imagen Python 3.11-slim optimizada para Cloud Run.

---

### Fase 2: Despliegue Privado en Google Cloud Run (Proyecto DEV • US Multi-Región)
- [ ] **2.1. Despliegue en Proyecto DEV (`platform-partners-des`):**
  ```bash
  gcloud run deploy portal-ai-data-demo \
    --source . \
    --project platform-partners-des \
    --region us-central1 \
    --no-allow-unauthenticated
  ```
- [ ] **2.2. Asignación de Permisos de Acceso al Equipo:**
  ```bash
  gcloud run services add-iam-policy-binding portal-ai-data-demo \
    --member="domain:peachcfo.com" \
    --role="roles/run.invoker" \
    --project platform-partners-des \
    --region us-central1
  ```
- [ ] **2.3. Verificación de Seguridad:**
  - Validar que usuarios externos reciban 403.
  - Validar que usuarios `@peachcfo.com` accedan de forma segura con Google Login.

---

### Fase 3: Escalabilidad Multi-Tenant (30 Empresas) & Action Motor
- [ ] **3.1. Enrutamiento dinámico de 30 proyectos BigQuery.**
- [ ] **3.2. Vista Consolidada agregada con `asyncio.gather`.**
- [ ] **3.3. Activación de botones interactivos para el Action Motor 1.**
