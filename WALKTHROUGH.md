# 🚶 Walkthrough — Portal AI Data Platform (DEMO)

**Ubicación:** `Portal/WALKTHROUGH.md`  
**Entorno Nube:** DEV (`platform-partners-des`)  
**Servicio Cloud Run:** `portal-ai-data-demo`  
**URL Oficial DEMO:** [https://portal-ai-data-demo-514633608081.us-central1.run.app/](https://portal-ai-data-demo-514633608081.us-central1.run.app/)  
**Seguridad:** 🔒 **Restringido a cuentas `@peachcfo.com`** (Zero-Trust)  
**Idiomas:** **Inglés (Predeterminado)** y **Español** con conmutador `[ EN | ES ]`  
**Estado:** 🟢 Protegido con Login Corporativo y Conectado en Tiempo Real a BigQuery

---

## 🔒 Control de Acceso y Blindaje de Cuentas Personales

1. **Pantalla de Login Corporativo (`Portal/login.html`):**
   - Soporta Google Sign-In oficial y SSO directo.
   - Si un usuario intenta ingresar con `@gmail.com`, `@hotmail.com` o cualquier dominio externo, el sistema muestra:
     > ⛔ **Access Denied:** Your account is not authorized. Only official `@peachcfo.com` accounts can access this portal.
2. **Validación en Backend (`Portal/server.py`):**
   - Intercepta todas las rutas protegidas (`/`, `*.html`, `/api/data`, `/api/sync`).
   - Requiere cookie de sesión firmada criptográficamente con validez exclusiva para correos autorizados.
3. **Cierre de Sesión:**
   - Clic en el avatar de usuario en la barra superior para cerrar sesión de inmediato.
