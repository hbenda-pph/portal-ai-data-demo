const DEMO_DATA = {
  "companyId": "demo",
  "companyName": "Apex Comfort Systems (Demo)",
  "meta": {
    "period": "Sep 1 - Sep 15, 2026",
    "updated": "2026-09-15 10:30 AM",
    "source": "shape-apex-prod • gold.fc_call_intelligence",
    "note": "Live Ingested Feed"
  },
  "kpis": {
    "totalCalls": 1420,
    "bookingRate": 11.4,
    "lostOpportunities": 182,
    "lostPercentage": 12.8,
    "revenueAtRisk": 748290.00,
    "backedByOpenEstimates": 612400.00,
    "backedByInvoiceBenchmarks": 135890.00,
    "avgSentiment": 0.28,
    "csrHandlingScore": 4.1,
    "openEstimatesCount": 68
  },
  "rootCauses": [
    { "reason": "No Appointment Availability", "impact": 298400.00, "count": 64 },
    { "reason": "Price Objection", "impact": 185100.00, "count": 48 },
    { "reason": "Competitor Comparison", "impact": 112300.00, "count": 32 },
    { "reason": "Needs to Consult Spouse/Partner", "impact": 88400.00, "count": 22 },
    { "reason": "CSR Did Not Offer Options", "impact": 42090.00, "count": 11 },
    { "reason": "Other/Unspecified", "impact": 22000.00, "count": 5 }
  ],
  "funnel": [
    { "step": "Total Llamadas", "count": 1420, "drop": null },
    { "step": "Lead Calificado", "count": 1050, "drop": -26.0 },
    { "step": "Oportunidad Cotizada", "count": 690, "drop": -34.3 },
    { "step": "Bookings", "count": 162, "drop": -76.5 }
  ],
  "csrRanking": [
    { "name": "Sofia Hernandez", "calls": 210, "booked": 38, "rate": 18.1, "risk": 32000 },
    { "name": "David Miller", "calls": 195, "booked": 29, "rate": 14.8, "risk": 48500 },
    { "name": "Elena Gomez", "calls": 180, "booked": 22, "rate": 12.2, "risk": 78200 },
    { "name": "Kevin Vance", "calls": 165, "booked": 15, "rate": 9.1, "risk": 112000 },
    { "name": "Rachel Zane", "calls": 140, "booked": 11, "rate": 7.8, "risk": 135000 }
  ],
  "lostQueue": [
    { "id": "CALL-4401", "priority": "P1", "date": "Sep 15 09:40", "customer": "Brandon Lee", "csr": "Kevin Vance", "reason": "No Appointment Availability", "amount": 18500, "description": "Reemplazo de sistema central de calefacción. No hubo disponibilidad para el fin de semana." },
    { "id": "CALL-4408", "priority": "P1", "date": "Sep 15 11:15", "customer": "Patricia Clark", "csr": "Rachel Zane", "reason": "Price Objection", "amount": 14200, "description": "Cotización de bomba de calor premium. Cliente solicitó opciones más económicas pero no se le presentaron alternativas." },
    { "id": "CALL-4419", "priority": "P2", "date": "Sep 15 14:05", "customer": "Marcus Thorne", "csr": "Elena Gomez", "reason": "Competitor Comparison", "amount": 8900, "description": "Instalación de ductos. Evaluando presupuesto con dos competidores de la zona." }
  ]
};

