# 📋 Implementation Plan — Portal AI Data Platform (DEMO)

**Ubicación:** `Portal/IMPLEMENTATION_PLAN.md`  
**Entorno Nube:** DEV (`platform-partners-des`)  
**Servicio Cloud Run:** `portal-ai-data-demo`  
**URL de Producción DEMO:** [https://portal-ai-data-demo-514633608081.us-central1.run.app/](https://portal-ai-data-demo-514633608081.us-central1.run.app/)  
**Seguridad & Control de Acceso:** 🔒 **Restricción Exclusiva a `@peachcfo.com`** (Cuentas personales bloqueadas)  
**Idiomas Soportados:** **Inglés (EN - Predeterminado)** & **Español (ES)**  

---

## 🛡️ Hito de Seguridad: Bloqueo de Cuentas Personales y Autenticación Corporativa

- [x] **Pantalla de Login Corporativo (`Portal/login.html`):**
  - Integra Google Sign-In (Google Identity Services) y verificación corporativa directa.
  - Alerta de seguridad inmediata si se intenta acceder con cuentas externas (`@gmail.com`, `@hotmail.com`, etc.).
- [x] **Middleware y Validación de Dominio en FastAPI (`Portal/server.py`):**
  - Solo permite sesiones verificadas pertenecientes al dominio `@peachcfo.com`.
  - Emisión de cookies de sesión cifradas y seguras (`HTTPOnly`).
  - Redirección automática a `/login.html` para cualquier visitante no autenticado.
- [x] **Identidad del Usuario en Navegación (`Portal/js/nav.js`):**
  - Muestra el perfil del usuario activo en la barra superior.
  - Permite cerrar sesión (`Logout`).

---

## 🚀 Despliegue a Cloud Run

Comando de actualización:
```bash
gcloud run deploy portal-ai-data-demo \
  --source . \
  --project platform-partners-des \
  --region us-central1
```
