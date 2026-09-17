# Estructura propuesta para el sitio/dashboards

## 0️⃣ Portada – Impacto y KPIs principales
- Métricas ejecutivas clave (ingresos, reservas, margen, LTV).
- Visual 1 : tarjeta con números y tendencia semanal.

## 1️⃣ Embudo Económico Completo
- Vista de arriba‑abajo del flujo **Marketing → Leads → Calls → Bookings → Jobs → Revenue → Gross Profit → Retention → LTV**.
- Gráfico de funnel con porcentajes de caída en cada paso.

## 2️⃣ Inteligencia de Llamadas & CSR
- Ranking de agentes, tasas de conversión, motivos de pérdida.
- Panel de llamadas perdibles (lost‑bookable) con detalle de cada oportunidad.
- Alertas de oportunidades recuperables.

## 3️⃣ Operaciones & Técnicos
- Eficiencia por zona, oficio y tipo de trabajo.
- Tiempo no facturado, trabajos incompletos, tiempo de respuesta.
- Dashboard de capacidad y utilización de técnicos.

## 4️⃣ Marketing & Atribución
- ROI por fuente, campaña, gasto de marketing vs beneficio.
- Funnel de adquisición (impressions → clicks → leads → calls).
- Optimizar para **clientes rentables y LTV**, no para métricas de vanidad.

## 5️⃣ Finanzas Reales (QBO integrado)
- Ingresos, COGS, margen bruto, CAC, margen de marketing.
- Reconciliación operativa‑contable.
- Tablas financieras gobernadas, sin definiciones inventadas por IA.

## 6️⃣ Clientes & Retención / LTV
- Modelo de cliente‑nivel: adquisición, primer trabajo, ingresos futuros, churn.
- Identificar fuentes que generan clientes de alta retención.
- Dashboard de segmentación por valor de vida.

## 7️⃣ Investigaciones Causales “¿Por qué?”
- Herramienta de diagnóstico multi‑paso (fuente‑mix, calidad‑de‑llamada, desempeño‑CSR, disponibilidad, estacionalidad).
- Preguntas tipo: *“¿Por qué bajó el booking rate esta semana?”*.
- Resultados con análisis de impacto financiero y recomendación de acción.

## 8️⃣ Cola de Acción & Alertas Automáticas
- Detectar anomalías → investigar → recomendar → aprobación humana.
- Alertas diarias/semana de oportunidades perdidas, problemas de marketing, coaching de CSR.

## 9️⃣ Agente Conversacional (Chat libre)
- Interfaz de chat basada en los agentes de BigQuery Conversational Analytics.
- Preguntas ejecutivas libres, responde con datos gobernados y contexto.

## 🛠️ (Interno) Salud del Sistema & Gobernanza
- Estado de pipelines ETL, calidad de datos, pruebas de calidad, métricas de calidad de datos.
- Dashboard de calidad (% de registros con claves, % de llamadas sin audio, etc.).
- Visibilidad para el Implementation Lead.

---

*Esta estructura cubre 100 % del contenido del archivo **inicio.txt** y agrega las tres áreas que requerían su propia sección: investigaciones causales, operaciones de campo y panel de salud del sistema.*
