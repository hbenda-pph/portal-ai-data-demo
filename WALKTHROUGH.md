# 🚶 Walkthrough — Portal AI Data Platform (DEMO)

**Ubicación:** `Portal/WALKTHROUGH.md`  
**Entorno Nube:** DEV (`platform-partners-des`)  
**Servicio Cloud Run:** `portal-ai-data-demo`  
**URL Oficial DEMO:** [https://portal-ai-data-demo-514633608081.us-central1.run.app/](https://portal-ai-data-demo-514633608081.us-central1.run.app/)  
**Seguridad:** 🔒 **Acceso Empresarial Seguro y Simplificado**  
**Idiomas:** **Inglés (Predeterminado)** y **Español** con conmutador `[ EN | ES ]`  
**Estado:** 🟢 Protegido y Conectado en Tiempo Real a BigQuery

---

## 🔒 Control de Acceso Empresarial Simplificado

1. **Pantalla de Inicio de Sesión Limpia y Minimalista (`Portal/login.html`):**
   - Interfaz sobria y elegante con campos de **Email** y **Access Key**.
   - Mensajes estándar y discretos de seguridad (*"Invalid credentials or unauthorized account"*).
   - Soporte bilingüe EN/ES.
2. **Validación en Backend (`Portal/server.py`):**
   - Validación de dominio y credenciales autorizadas en segundo plano sin exponer detalles.
   - Emisión de cookie segura cifrada (`HTTPOnly`).
3. **Cierre de Sesión:**
   - Clic en el avatar de usuario en la barra superior para cerrar sesión.
