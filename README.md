# 🌐 Portal AI Data Exploration & Intelligence (DEMO)

**Versión de Demostración y Validación Operativa**  
**Proyecto Nube (DEV):** `platform-partners-des`  
**Servicio Cloud Run:** `portal-ai-data-demo`  
**Región / Infraestructura:** **US Multi-Región**  
**Organización:** Platform Partners  

---

## 📁 Estructura del Repositorio

```
Portal/
├── PORTAL_ARCHITECTURE_STRATEGY.md  # Documento Maestro de Arquitectura y Estrategia Multi-Tenant
├── IMPLEMENTATION_PLAN.md           # Plan de Implementación técnico (Fases DEMO)
├── WALKTHROUGH.md                   # Bitácora de validaciones y despliegue
├── README.md                        # Esta guía general
│
├── index.html                       # Dashboard Principal (Scorecard Ejecutivo & Action Motor 1)
├── llamadas.html                    # Inteligencia de Llamadas (Audio, Transcripción, Sentimiento & CSRs)
├── embudo.html                      # Embudo de Conversión & Calificación de Leads
├── operaciones.html                 # Eficiencia Operativa y Capacidad de Técnicos
├── marketing.html                   # Rendimiento de Campañas y ROI Publicitario
├── financiero.html                  # Valoración Económica y Presupuestos Abiertos ST
├── coaching.html                    # Módulo de Coaching y Desempeño de CSRs
├── realtime.html                    # Monitoreo de Llamadas en Tiempo Real
├── configuracion.html               # Configuración de Conexiones y Reglas de Negocio
│
├── css/                             # Hojas de estilo modular
├── js/                              # data-engine.js, language.js, main.js
├── data/                            # Datasets de respaldo y caché
│
├── server.py                        # Backend API en Python (FastAPI + BigQuery Live Connector)
├── requirements.txt                 # Dependencias Python
├── Dockerfile                       # Contenedor para Google Cloud Run
└── .dockerignore                    # Filtro de archivos para el build en la nube
```

---

## 🚀 Despliegue en Google Cloud Run (US Multi-Región • DEV)

```bash
gcloud run deploy portal-ai-data-demo \
  --source . \
  --project platform-partners-des \
  --region us-central1 \
  --no-allow-unauthenticated
```
