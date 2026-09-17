/**
 * data.js — Datos demo del Portal AI Data
 * Platform Partners | Todos los datos son ILUSTRATIVOS
 * Fuente simulada: ServiceTitan + QuickBooks Online
 */

const DEMO = {
  meta: {
    period: 'Sep 8–14, 2026',
    updated: '2026-09-14 06:00 AM',
    note: 'DEMO — datos de referencia, no reales',
  },

  kpi: {
    revenue_mtd:       4_218_400,   revenue_mtd_trend:    +5.2,
    bookings_week:     847,         bookings_week_trend:  -3.1,
    gross_margin:      34.2,        gross_margin_trend:   +0.8,
    ltv_avg:           2840,        ltv_avg_trend:        +1.4,
    booking_rate:      64.3,
    calls_week:        1_847,
    lost_bookable:     43,
    cac:               312,
    jobs_week:         1_187,
    avg_ticket:        1_562,
  },

  revenue_weekly: {
    labels: ['Jul 28','Ago 4','Ago 11','Ago 18','Ago 25','Sep 1','Sep 8','Sep 14'],
    values: [3_620_000, 3_820_000, 3_770_000, 4_050_000, 3_990_000, 4_100_000, 4_180_000, 4_218_400],
  },

  funnel: [
    { label: 'Leads/Inbound',  value: 2_840, drop: null },
    { label: 'Llamadas',       value: 2_104, drop: -25.9 },
    { label: 'Bookings',       value: 1_352, drop: -35.7 },
    { label: 'Jobs Completos', value: 1_187, drop: -12.2 },
    { label: 'Revenue',        value: 982,   drop: -17.3 },
    { label: 'Gross Profit',   value: 336,   drop: -65.8 },
    { label: 'LTV → Retención',value: 118,   drop: -64.9 },
  ],

  csr: [
    { name:'Maria G.',  calls:312, booked:218, rate:69.9, revenue:486000, lost:12, trend:'up' },
    { name:'James T.',  calls:287, booked:189, rate:65.9, revenue:421000, lost:18, trend:'up' },
    { name:'Ana R.',    calls:301, booked:186, rate:61.8, revenue:398000, lost:22, trend:'flat' },
    { name:'Carlos M.', calls:265, booked:151, rate:57.0, revenue:312000, lost:31, trend:'down' },
    { name:'Lisa K.',   calls:243, booked:127, rate:52.3, revenue:287000, lost:38, trend:'down' },
    { name:'Pedro S.',  calls:211, booked:109, rate:51.7, revenue:241000, lost:29, trend:'down' },
  ],

  lost_bookable: [
    { time:'Lun 09:14', csr:'Carlos M.', phone:'(512) 555-0142', reason:'Price objection', est_revenue: 1_850, follow: 'Pending' },
    { time:'Lun 11:32', csr:'Lisa K.',   phone:'(512) 555-0287', reason:'Schedule conflict', est_revenue: 2_100, follow: 'Pending' },
    { time:'Mar 08:55', csr:'Carlos M.', phone:'(512) 555-0391', reason:'Price objection', est_revenue: 1_620, follow: 'Called' },
    { time:'Mar 14:20', csr:'Pedro S.',  phone:'(512) 555-0458', reason:'Competitor comparison', est_revenue: 3_200, follow: 'Pending' },
    { time:'Mié 10:05', csr:'Lisa K.',   phone:'(512) 555-0512', reason:'No decision maker', est_revenue: 2_780, follow: 'Pending' },
  ],

  marketing: [
    { source:'Google LSA',    spend:48_200, leads:612, cpl:78.8,  revenue:891_000, roi:18.5, margin:34.1 },
    { source:'Google Ads',    spend:32_100, leads:318, cpl:100.9, revenue:487_000, roi:15.2, margin:33.8 },
    { source:'Yelp',          spend:12_400, leads:148, cpl:83.8,  revenue:187_000, roi:15.1, margin:32.1 },
    { source:'Organic / SEO', spend:8_200,  leads:312, cpl:26.3,  revenue:421_000, roi:51.3, margin:35.2 },
    { source:'Referral',      spend:0,      leads:184, cpl:0,     revenue:312_000, roi:null, margin:37.4 },
    { source:'Direct / Other',spend:5_100,  leads:98,  cpl:52.0,  revenue:142_000, roi:27.8, margin:33.5 },
  ],

  mktg_weekly: {
    labels: ['Ago 18','Ago 25','Sep 1','Sep 8','Sep 14'],
    spend:   [98_200, 101_400, 99_800, 104_200, 105_900],
    revenue: [3_820_000, 4_050_000, 3_990_000, 4_180_000, 4_218_400],
  },

  technicians: [
    { zone:'North',   jobs:312, revenue:487_000, util:87, avg_ticket:1_562, unbilled_h:4.2 },
    { zone:'South',   jobs:287, revenue:412_000, util:82, avg_ticket:1_435, unbilled_h:5.8 },
    { zone:'East',    jobs:241, revenue:351_000, util:74, avg_ticket:1_456, unbilled_h:8.1 },
    { zone:'West',    jobs:198, revenue:287_000, util:68, avg_ticket:1_449, unbilled_h:9.4 },
    { zone:'Central', jobs:149, revenue:198_000, util:61, avg_ticket:1_329, unbilled_h:12.3 },
  ],

  financials: {
    revenue:       4_218_400,
    cogs:          2_775_100,
    gross_profit:  1_443_300,
    gross_margin:  34.2,
    mktg_spend:    105_900,
    mktg_margin:   2.5,
    cac:           312,
    ebitda:        680_000,
    ebitda_margin: 16.1,
    net_income:    380_000,
    net_margin:    9.0,
  },

  clients: {
    total_active:     3_842,
    new_this_month:   312,
    churned:          87,
    retention_rate:   77.3,
    ltv_avg:          2_840,
    ltv_p75:          4_200,
    repeat_rate:      41.2,
  },

  client_segments: [
    { segment:'Alto Valor (LTV>$5K)',  count:612,  pct:15.9, ltv_avg:7_840, retention:89 },
    { segment:'Medio ($2K–$5K)',       count:1_421, pct:37.0, ltv_avg:3_120, retention:78 },
    { segment:'Estándar ($1K–$2K)',    count:1_187, pct:30.9, ltv_avg:1_540, retention:64 },
    { segment:'Bajo (<$1K)',           count:622,  pct:16.2, ltv_avg:620,  retention:42 },
  ],

  retention_by_source: [
    { source:'Referral',     ret:89, ltv:4_210 },
    { source:'Organic/SEO',  ret:82, ltv:3_840 },
    { source:'Google LSA',   ret:74, ltv:2_980 },
    { source:'Google Ads',   ret:68, ltv:2_420 },
    { source:'Yelp',         ret:61, ltv:2_110 },
  ],

  alerts: [
    { level:'critical', title:'43 llamadas recuperables perdidas esta semana', body:'Revenue potencial: ~$122K. Acción: asignar follow-up inmediato a CSR disponibles.' },
    { level:'warning',  title:'Booking rate de Carlos M. cayó 8.1 pts WoW', body:'Semana pasada: 65.1% → Esta semana: 57.0%. Revisar grabaciones de llamadas.' },
    { level:'warning',  title:'Google Ads: CPC subió 22% sin mejora en conversión', body:'Gasto semanal: $7,420. Riesgo de exceder budget mensual a este ritmo.' },
    { level:'info',     title:'Ingresos MTD en camino a superar meta +4%', body:'Meta mensual: $4.05M → Proyección con tendencia actual: $4.21M.' },
    { level:'success',  title:'Zona North alcanzó 87% utilización — récord semanal', body:'312 jobs completados, $487K revenue. Considerar expansión de capacidad.' },
  ],

  system: {
    etl_last_run:   '2026-09-14 06:00 AM',
    etl_status:     'OK',
    tables_ok:      42,
    tables_fail:    0,
    dq_score:       96.4,
    calls_audio:    91.2,
    jobs_keys:      98.7,
    st_sync:        'Live',
    qbo_sync:       '2026-09-14 05:45 AM',
  },

  /* Sparkline helpers */
  spark: {
    revenue:  [3620,3820,3770,4050,3990,4100,4180,4218].map(x=>x*1000),
    bookings: [812,842,821,875,831,862,891,847],
    margin:   [33.1,33.5,33.8,34.0,33.9,34.1,34.0,34.2],
    ltv:      [2710,2730,2750,2780,2800,2820,2830,2840],
    brate:    [62.1,63.4,63.8,64.5,63.9,64.8,65.1,64.3],
  },
};
