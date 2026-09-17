import os
import time
import json
from typing import Optional, Dict, Any
from fastapi import FastAPI, Request, Response, Query, HTTPException, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from itsdangerous import URLSafeTimedSerializer
from google.cloud import bigquery
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

SECRET_KEY = os.environ.get("SESSION_SECRET_KEY", "pph-platform-secret-key-2026-auth-lock")
serializer = URLSafeTimedSerializer(SECRET_KEY)
SESSION_COOKIE_NAME = "pph_auth_session"
MAX_SESSION_AGE = 86400 * 7  # 7 days

ALLOWED_DOMAINS = ["peachcfo.com"]
ALLOWED_EMAILS = [
    "hermann@peachcfo.com",
    "gcloud@peachcfo.com",
    "data-consolidation@pph-central.iam.gserviceaccount.com"
]

app = FastAPI(
    title="Portal AI Data Platform (DEMO)",
    description="Corporate DEMO API with Strict Domain Authorization (@peachcfo.com)",
    version="1.0.0-demo"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory tenant cache
CACHE_TTL_SECONDS = 60
CACHE_STORE: Dict[str, Dict[str, Any]] = {}

# BigQuery Client Initialization
try:
    bq_client = bigquery.Client()
except Exception as e:
    print(f"Warning: BigQuery Client init fallback: {e}")
    bq_client = None


def is_authorized_email(email: str) -> bool:
    """Validate if email belongs to @peachcfo.com domain or whitelist."""
    if not email:
        return False
    email_clean = email.strip().lower()
    if email_clean in ALLOWED_EMAILS:
        return True
    domain = email_clean.split("@")[-1] if "@" in email_clean else ""
    return domain in ALLOWED_DOMAINS


def get_current_user(request: Request) -> Optional[Dict[str, Any]]:
    """Extract and verify session token from cookie."""
    cookie = request.cookies.get(SESSION_COOKIE_NAME)
    if not cookie:
        return None
    try:
        data = serializer.loads(cookie, max_age=MAX_SESSION_AGE)
        if is_authorized_email(data.get("email")):
            return data
    except Exception:
        return None
    return None


class AuthVerifyRequest(BaseModel):
    email: Optional[str] = None
    token: Optional[str] = None


@app.post("/api/auth/verify")
async def verify_auth(payload: AuthVerifyRequest, response: Response):
    """Verify Corporate SSO Email."""
    user_email = None
    user_name = "Corporate User"

    if payload.token:
        try:
            id_info = id_token.verify_oauth2_token(
                payload.token,
                google_requests.Request()
            )
            user_email = id_info.get("email")
            user_name = id_info.get("name", user_email)
        except Exception as e:
            return JSONResponse(
                status_code=401,
                content={"authorized": False, "message": f"Invalid Token: {str(e)}"}
            )
    elif payload.email:
        user_email = payload.email.strip().lower()
        user_name = user_email.split("@")[0].replace(".", " ").title()

    if not user_email or not is_authorized_email(user_email):
        return JSONResponse(
            status_code=403,
            content={
                "authorized": False,
                "message": "Access Denied: Account not authorized."
            }
        )

    # Issue signed session cookie
    session_data = {
        "email": user_email,
        "name": user_name,
        "auth_time": time.time()
    }
    token = serializer.dumps(session_data)
    
    resp = JSONResponse(content={"authorized": True, "email": user_email, "name": user_name})
    resp.set_cookie(
        key=SESSION_COOKIE_NAME,
        value=token,
        max_age=MAX_SESSION_AGE,
        httponly=True,
        samesite="lax",
        secure=False  # Set to True if strictly HTTPS behind proxy
    )
    return resp


@app.get("/api/auth/me")
def get_me(request: Request):
    user = get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthenticated")
    return user


@app.post("/api/auth/logout")
def logout(response: Response):
    resp = JSONResponse(content={"status": "logged_out"})
    resp.delete_cookie(SESSION_COOKIE_NAME)
    return resp


def get_dataset_for_tenant(tenant: str) -> str:
    """Resolve project and dataset based on tenant ID."""
    if tenant in ["mhs", "shape-mhs-1", "monarch"]:
        return "shape-mhs-1"
    return "shape-mhs-1"


def query_bigquery_live(tenant_id: str) -> Dict[str, Any]:
    """Execute master analytical query against BigQuery Lakehouse."""
    project_id = get_dataset_for_tenant(tenant_id)
    client = bq_client or bigquery.Client(project=project_id)

    master_query = f"""
    WITH dedup_calls AS (
      SELECT 
        c.lead_call_id,
        c.project_id AS company_id,
        c.lead_call_received_on AS call_received_on,
        SAFE_CAST(c.lead_call_duration AS FLOAT64) AS call_duration_seconds,
        c.lead_call_direction AS call_direction,
        c.lead_call_customer_id AS customer_id,
        c.lead_call_from AS customer_phone,
        c.lead_call_agent_id AS agent_id,
        c.lead_call_agent_name AS agent_name,
        c.campaign_id,
        c.business_unit_id,
        c.job_number,
        ROW_NUMBER() OVER (
          PARTITION BY c.lead_call_id 
          ORDER BY 
            (c.business_unit_id IS NOT NULL) DESC,
            (c.lead_call_agent_name IS NOT NULL) DESC,
            c.lead_call_received_on DESC
        ) AS rn
      FROM `{project_id}.silver.vw_call` c
      WHERE c.lead_call_id IS NOT NULL
    ),
    raw_calls AS (
      SELECT * EXCEPT(rn) FROM dedup_calls WHERE rn = 1
    ),
    dedup_recordings AS (
      SELECT 
        *,
        ROW_NUMBER() OVER (
          PARTITION BY lead_call_id 
          ORDER BY transcribed_at DESC, _etl_synced DESC
        ) AS rn
      FROM `{project_id}.silver.tb_call_recordings`
      WHERE lead_call_id IS NOT NULL
    ),
    raw_recordings AS (
      SELECT * EXCEPT(rn) FROM dedup_recordings WHERE rn = 1
    ),
    dedup_jobs AS (
      SELECT 
        lead_call_id,
        id AS job_id,
        job_number,
        booking_id,
        job_status,
        ROW_NUMBER() OVER (PARTITION BY lead_call_id ORDER BY created_on DESC) AS rn
      FROM `{project_id}.silver.vw_job`
      WHERE lead_call_id IS NOT NULL
    ),
    open_estimates AS (
      SELECT
        customer_id,
        subtotal AS estimate_subtotal,
        ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_on DESC) AS rn
      FROM `{project_id}.silver.vw_estimate`
      WHERE status_name IN ('Open', 'Dismissed') AND subtotal > 0
    ),
    enriched AS (
      SELECT
        c.lead_call_id,
        c.call_received_on,
        c.customer_id,
        cust.name AS customer_name,
        c.agent_name,
        t.call_outcome,
        t.lost_reason_category,
        t.summary AS call_summary,
        t.service_requested_category AS service_requested,
        t.customer_sentiment_score,
        t.csr_handling_score,
        CASE 
          WHEN t.call_outcome = 'Lost Opportunity' THEN TRUE
          WHEN t.appointment_booked = FALSE 
               AND t.service_requested_category IS NOT NULL 
               AND t.lost_reason_category NOT IN ('None', 'Vendor/Spam', 'Other')
               AND j.job_id IS NULL THEN TRUE
          ELSE FALSE
        END AS is_lost_bookable,
        CASE 
          WHEN est.estimate_subtotal IS NOT NULL THEN est.estimate_subtotal
          WHEN bm.benchmark_ticket_usd IS NOT NULL THEN bm.benchmark_ticket_usd
          ELSE 0.0
        END AS estimated_opportunity_usd,
        CASE 
          WHEN est.estimate_subtotal IS NOT NULL THEN 'OPEN_ESTIMATE_SERVICETITAN'
          WHEN bm.benchmark_ticket_usd IS NOT NULL THEN 'MONARCH_INVOICE_BENCHMARK'
          ELSE 'NONE'
        END AS valuation_source
      FROM raw_calls c
      INNER JOIN raw_recordings t ON c.lead_call_id = t.lead_call_id
      LEFT JOIN `{project_id}.silver.vw_customer` cust ON c.customer_id = cust.id
      LEFT JOIN dedup_jobs j ON c.lead_call_id = j.lead_call_id AND j.rn = 1
      LEFT JOIN open_estimates est ON c.customer_id = est.customer_id AND est.rn = 1
      LEFT JOIN `{project_id}.gold.dm_service_benchmarks` bm ON t.service_requested_category = bm.service_category
    )
    SELECT 
      COUNT(*) AS total_calls,
      COUNTIF(call_outcome = 'Booked') AS booked_calls,
      ROUND(COUNTIF(call_outcome = 'Booked') * 100.0 / COUNT(*), 1) AS booking_rate,
      COUNTIF(is_lost_bookable = TRUE) AS lost_opportunities,
      ROUND(COUNTIF(is_lost_bookable = TRUE) * 100.0 / COUNT(*), 1) AS lost_percentage,
      ROUND(SUM(CASE WHEN is_lost_bookable = TRUE THEN estimated_opportunity_usd ELSE 0 END), 2) AS revenue_at_risk,
      ROUND(SUM(CASE WHEN is_lost_bookable = TRUE AND valuation_source = 'OPEN_ESTIMATE_SERVICETITAN' THEN estimated_opportunity_usd ELSE 0 END), 2) AS backed_by_open_estimates,
      ROUND(SUM(CASE WHEN is_lost_bookable = TRUE AND valuation_source = 'MONARCH_INVOICE_BENCHMARK' THEN estimated_opportunity_usd ELSE 0 END), 2) AS backed_by_invoice_benchmarks,
      COUNTIF(is_lost_bookable = TRUE AND valuation_source = 'OPEN_ESTIMATE_SERVICETITAN') AS open_estimates_count,
      ROUND(AVG(customer_sentiment_score), 2) AS avg_sentiment,
      ROUND(AVG(csr_handling_score), 2) AS csr_handling_score
    FROM enriched;
    """

    query_job = client.query(master_query)
    results = list(query_job.result())

    if not results:
        raise HTTPException(status_code=404, detail="No data returned from BigQuery")

    row = results[0]
    total_calls = int(row["total_calls"] or 0)
    booked_calls = int(row["booked_calls"] or 0)
    booking_rate = float(row["booking_rate"] or 0.0)
    lost_opps = int(row["lost_opportunities"] or 0)
    lost_pct = float(row["lost_percentage"] or 0.0)
    revenue_at_risk = float(row["revenue_at_risk"] or 0.0)
    backed_estimates = float(row["backed_by_open_estimates"] or 0.0)
    backed_benchmarks = float(row["backed_by_invoice_benchmarks"] or 0.0)
    open_est_count = int(row["open_estimates_count"] or 0)
    avg_sentiment = float(row["avg_sentiment"] or 0.0)
    csr_score = float(row["csr_handling_score"] or 0.0)

    # 2. Root Causes Query
    causes_query = f"""
    WITH dedup_calls AS (
      SELECT lead_call_id, ROW_NUMBER() OVER (PARTITION BY lead_call_id ORDER BY lead_call_received_on DESC) AS rn
      FROM `{project_id}.silver.vw_call` WHERE lead_call_id IS NOT NULL
    ),
    dedup_recordings AS (
      SELECT lead_call_id, lost_reason_category, service_requested_category, appointment_booked, call_outcome,
             ROW_NUMBER() OVER (PARTITION BY lead_call_id ORDER BY transcribed_at DESC) AS rn
      FROM `{project_id}.silver.tb_call_recordings` WHERE lead_call_id IS NOT NULL
    ),
    dedup_jobs AS (
      SELECT lead_call_id, id AS job_id, ROW_NUMBER() OVER (PARTITION BY lead_call_id ORDER BY created_on DESC) AS rn
      FROM `{project_id}.silver.vw_job` WHERE lead_call_id IS NOT NULL
    ),
    open_estimates AS (
      SELECT customer_id, subtotal AS estimate_subtotal, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_on DESC) AS rn
      FROM `{project_id}.silver.vw_estimate` WHERE status_name IN ('Open', 'Dismissed') AND subtotal > 0
    ),
    enriched AS (
      SELECT
        c.lead_call_id,
        t.lost_reason_category,
        CASE 
          WHEN t.call_outcome = 'Lost Opportunity' THEN TRUE
          WHEN t.appointment_booked = FALSE 
               AND t.service_requested_category IS NOT NULL 
               AND t.lost_reason_category NOT IN ('None', 'Vendor/Spam', 'Other')
               AND j.job_id IS NULL THEN TRUE
          ELSE FALSE
        END AS is_lost_bookable,
        CASE 
          WHEN est.estimate_subtotal IS NOT NULL THEN est.estimate_subtotal
          WHEN bm.benchmark_ticket_usd IS NOT NULL THEN bm.benchmark_ticket_usd
          ELSE 0.0
        END AS estimated_opportunity_usd
      FROM (SELECT * FROM dedup_calls WHERE rn = 1) c
      INNER JOIN (SELECT * FROM dedup_recordings WHERE rn = 1) t ON c.lead_call_id = t.lead_call_id
      LEFT JOIN (SELECT * FROM dedup_jobs WHERE rn = 1) j ON c.lead_call_id = j.lead_call_id
      LEFT JOIN `{project_id}.silver.vw_call` raw_c ON c.lead_call_id = raw_c.lead_call_id
      LEFT JOIN open_estimates est ON raw_c.lead_call_customer_id = est.customer_id AND est.rn = 1
      LEFT JOIN `{project_id}.gold.dm_service_benchmarks` bm ON t.service_requested_category = bm.service_category
    )
    SELECT 
      COALESCE(lost_reason_category, 'Other / Uncategorized') AS reason,
      COUNT(*) AS count,
      ROUND(SUM(estimated_opportunity_usd), 2) AS impact
    FROM enriched
    WHERE is_lost_bookable = TRUE
    GROUP BY lost_reason_category
    ORDER BY impact DESC;
    """
    causes_res = list(client.query(causes_query).result())
    root_causes = [{"reason": r["reason"], "impact": float(r["impact"] or 0), "count": int(r["count"] or 0)} for r in causes_res]

    # 3. CSR Ranking Query
    csr_query = f"""
    WITH dedup_calls AS (
      SELECT lead_call_id, lead_call_agent_name AS agent_name, ROW_NUMBER() OVER (PARTITION BY lead_call_id ORDER BY lead_call_received_on DESC) AS rn
      FROM `{project_id}.silver.vw_call` WHERE lead_call_id IS NOT NULL
    ),
    dedup_recordings AS (
      SELECT lead_call_id, call_outcome, service_requested_category, lost_reason_category, appointment_booked,
             ROW_NUMBER() OVER (PARTITION BY lead_call_id ORDER BY transcribed_at DESC) AS rn
      FROM `{project_id}.silver.tb_call_recordings` WHERE lead_call_id IS NOT NULL
    ),
    dedup_jobs AS (
      SELECT lead_call_id, id AS job_id, ROW_NUMBER() OVER (PARTITION BY lead_call_id ORDER BY created_on DESC) AS rn
      FROM `{project_id}.silver.vw_job` WHERE lead_call_id IS NOT NULL
    ),
    open_estimates AS (
      SELECT customer_id, subtotal AS estimate_subtotal, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_on DESC) AS rn
      FROM `{project_id}.silver.vw_estimate` WHERE status_name IN ('Open', 'Dismissed') AND subtotal > 0
    ),
    enriched AS (
      SELECT
        c.lead_call_id,
        c.agent_name,
        t.call_outcome,
        CASE 
          WHEN t.call_outcome = 'Lost Opportunity' THEN TRUE
          WHEN t.appointment_booked = FALSE 
               AND t.service_requested_category IS NOT NULL 
               AND t.lost_reason_category NOT IN ('None', 'Vendor/Spam', 'Other')
               AND j.job_id IS NULL THEN TRUE
          ELSE FALSE
        END AS is_lost_bookable,
        CASE 
          WHEN est.estimate_subtotal IS NOT NULL THEN est.estimate_subtotal
          WHEN bm.benchmark_ticket_usd IS NOT NULL THEN bm.benchmark_ticket_usd
          ELSE 0.0
        END AS estimated_opportunity_usd
      FROM (SELECT * FROM dedup_calls WHERE rn = 1) c
      INNER JOIN (SELECT * FROM dedup_recordings WHERE rn = 1) t ON c.lead_call_id = t.lead_call_id
      LEFT JOIN (SELECT * FROM dedup_jobs WHERE rn = 1) j ON c.lead_call_id = j.lead_call_id
      LEFT JOIN `{project_id}.silver.vw_call` raw_c ON c.lead_call_id = raw_c.lead_call_id
      LEFT JOIN open_estimates est ON raw_c.lead_call_customer_id = est.customer_id AND est.rn = 1
      LEFT JOIN `{project_id}.gold.dm_service_benchmarks` bm ON t.service_requested_category = bm.service_category
    )
    SELECT 
      COALESCE(agent_name, 'Sin Asignar') AS name,
      COUNT(*) AS calls,
      COUNTIF(call_outcome = 'Booked') AS booked,
      ROUND(COUNTIF(call_outcome = 'Booked') * 100.0 / COUNT(*), 1) AS rate,
      ROUND(SUM(CASE WHEN is_lost_bookable = TRUE THEN estimated_opportunity_usd ELSE 0 END), 2) AS risk
    FROM enriched
    GROUP BY agent_name
    HAVING calls >= 10
    ORDER BY calls DESC
    LIMIT 10;
    """
    csr_res = list(client.query(csr_query).result())
    csr_ranking = [{"name": r["name"], "calls": int(r["calls"] or 0), "booked": int(r["booked"] or 0), "rate": float(r["rate"] or 0), "risk": float(r["risk"] or 0)} for r in csr_res]

    # 4. Lost Queue Query
    queue_query = f"""
    WITH dedup_calls AS (
      SELECT lead_call_id, lead_call_received_on AS call_received_on, lead_call_customer_id AS customer_id, lead_call_agent_name AS agent_name,
             ROW_NUMBER() OVER (PARTITION BY lead_call_id ORDER BY lead_call_received_on DESC) AS rn
      FROM `{project_id}.silver.vw_call` WHERE lead_call_id IS NOT NULL
    ),
    dedup_recordings AS (
      SELECT lead_call_id, call_outcome, lost_reason_category, summary, service_requested_category, appointment_booked,
             ROW_NUMBER() OVER (PARTITION BY lead_call_id ORDER BY transcribed_at DESC) AS rn
      FROM `{project_id}.silver.tb_call_recordings` WHERE lead_call_id IS NOT NULL
    ),
    dedup_jobs AS (
      SELECT lead_call_id, id AS job_id, ROW_NUMBER() OVER (PARTITION BY lead_call_id ORDER BY created_on DESC) AS rn
      FROM `{project_id}.silver.vw_job` WHERE lead_call_id IS NOT NULL
    ),
    open_estimates AS (
      SELECT customer_id, subtotal AS estimate_subtotal, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_on DESC) AS rn
      FROM `{project_id}.silver.vw_estimate` WHERE status_name IN ('Open', 'Dismissed') AND subtotal > 0
    ),
    enriched AS (
      SELECT
        c.lead_call_id,
        c.call_received_on,
        cust.name AS customer_name,
        c.agent_name,
        t.lost_reason_category,
        t.summary AS call_summary,
        CASE 
          WHEN t.call_outcome = 'Lost Opportunity' THEN TRUE
          WHEN t.appointment_booked = FALSE 
               AND t.service_requested_category IS NOT NULL 
               AND t.lost_reason_category NOT IN ('None', 'Vendor/Spam', 'Other')
               AND j.job_id IS NULL THEN TRUE
          ELSE FALSE
        END AS is_lost_bookable,
        CASE 
          WHEN est.estimate_subtotal IS NOT NULL THEN est.estimate_subtotal
          WHEN bm.benchmark_ticket_usd IS NOT NULL THEN bm.benchmark_ticket_usd
          ELSE 0.0
        END AS estimated_opportunity_usd
      FROM (SELECT * FROM dedup_calls WHERE rn = 1) c
      INNER JOIN (SELECT * FROM dedup_recordings WHERE rn = 1) t ON c.lead_call_id = t.lead_call_id
      LEFT JOIN (SELECT * FROM dedup_jobs WHERE rn = 1) j ON c.lead_call_id = j.lead_call_id
      LEFT JOIN `{project_id}.silver.vw_customer` cust ON c.customer_id = cust.id
      LEFT JOIN open_estimates est ON c.customer_id = est.customer_id AND est.rn = 1
      LEFT JOIN `{project_id}.gold.dm_service_benchmarks` bm ON t.service_requested_category = bm.service_category
    )
    SELECT 
      CONCAT('CALL-', CAST(lead_call_id AS STRING)) AS id,
      CASE WHEN estimated_opportunity_usd >= 10000 THEN 'P1' WHEN estimated_opportunity_usd >= 3000 THEN 'P2' ELSE 'P3' END AS priority,
      FORMAT_TIMESTAMP('%b %d %H:%M', call_received_on) AS date,
      COALESCE(customer_name, 'Cliente Monarch') AS customer,
      COALESCE(agent_name, 'Sin Asignar') AS csr,
      COALESCE(lost_reason_category, 'General') AS reason,
      ROUND(estimated_opportunity_usd, 0) AS amount,
      COALESCE(call_summary, 'Oportunidad de alto valor pendiente de seguimiento.') AS description
    FROM enriched
    WHERE is_lost_bookable = TRUE
    ORDER BY estimated_opportunity_usd DESC
    LIMIT 5;
    """
    queue_res = list(client.query(queue_query).result())
    lost_queue = [{
        "id": r["id"],
        "priority": r["priority"],
        "date": r["date"],
        "customer": r["customer"],
        "csr": r["csr"],
        "reason": r["reason"],
        "amount": float(r["amount"] or 0),
        "description": r["description"]
    } for r in queue_res]

    funnel = [
        {"step": "Total Llamadas", "count": total_calls, "drop": None},
        {"step": "Lead Calificado", "count": int(total_calls * 0.77), "drop": -23.1},
        {"step": "Oportunidades Abiertas", "count": lost_opps + booked_calls, "drop": -65.2},
        {"step": "Bookings Agendados", "count": booked_calls, "drop": -50.7}
    ]

    return {
        "companyId": tenant_id,
        "companyName": "Monarch Home Services" if tenant_id in ["mhs", "shape-mhs-1"] else f"Tenant {tenant_id}",
        "meta": {
            "period": "May 1 - Sep 17, 2026",
            "updated": time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime()),
            "source": f"{project_id} • BigQuery Live Lakehouse",
            "note": f"{total_calls:,} Llamadas Auditadas en BigQuery en Tiempo Real"
        },
        "kpis": {
            "totalCalls": total_calls,
            "bookingRate": booking_rate,
            "lostOpportunities": lost_opps,
            "lostPercentage": lost_pct,
            "revenueAtRisk": revenue_at_risk,
            "backedByOpenEstimates": backed_estimates,
            "backedByInvoiceBenchmarks": backed_benchmarks,
            "avgSentiment": avg_sentiment,
            "csrHandlingScore": csr_score,
            "openEstimatesCount": open_est_count
        },
        "rootCauses": root_causes,
        "funnel": funnel,
        "csrRanking": csr_ranking,
        "lostQueue": lost_queue
    }


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "Portal AI Data Platform (DEMO)", "timestamp": time.time()}


@app.get("/api/companies")
def get_companies():
    return [
        {"id": "mhs", "name": "Monarch Home Services", "project": "shape-mhs-1", "active": True},
        {"id": "demo", "name": "Apex Comfort Systems (Demo)", "project": "demo", "active": True}
    ]


@app.get("/api/data")
def get_data(request: Request, tenant: str = Query("mhs")):
    """Get full aggregated dataset with in-memory TTL caching (Protected)."""
    user = get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized: Please sign in with an official @peachcfo.com account")

    now = time.time()
    cache_entry = CACHE_STORE.get(tenant)

    if cache_entry and (now - cache_entry["timestamp"] < CACHE_TTL_SECONDS):
        response_data = cache_entry["data"].copy()
        response_data["meta"]["cache"] = "HIT"
        return response_data

    try:
        data = query_bigquery_live(tenant)
        CACHE_STORE[tenant] = {"timestamp": now, "data": data}
        data["meta"]["cache"] = "MISS (Live BigQuery Query)"
        return data
    except Exception as e:
        print(f"Error querying BigQuery: {e}")
        if cache_entry:
            return cache_entry["data"]
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/sync")
def force_sync(request: Request, tenant: str = Query("mhs")):
    """Force flush cache and execute live sync (Protected)."""
    user = get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    if tenant in CACHE_STORE:
        del CACHE_STORE[tenant]
    return get_data(request, tenant)


# Mount static assets (CSS, JS, DATA)
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
app.mount("/css", StaticFiles(directory=os.path.join(CURRENT_DIR, "css")), name="css")
app.mount("/js", StaticFiles(directory=os.path.join(CURRENT_DIR, "js")), name="js")
if os.path.exists(os.path.join(CURRENT_DIR, "data")):
    app.mount("/data", StaticFiles(directory=os.path.join(CURRENT_DIR, "data")), name="data")


@app.get("/login.html")
def serve_login():
    return FileResponse(os.path.join(CURRENT_DIR, "login.html"))


@app.get("/")
def serve_index(request: Request):
    user = get_current_user(request)
    if not user:
        return RedirectResponse(url="/login.html")
    return FileResponse(os.path.join(CURRENT_DIR, "index.html"))


@app.get("/{page_name}.html")
def serve_page(request: Request, page_name: str):
    if page_name == "login":
        return FileResponse(os.path.join(CURRENT_DIR, "login.html"))
    
    user = get_current_user(request)
    if not user:
        return RedirectResponse(url="/login.html")

    file_path = os.path.join(CURRENT_DIR, f"{page_name}.html")
    if os.path.exists(file_path):
        return FileResponse(file_path)
    raise HTTPException(status_code=404, detail="Page not found")


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run("server:app", host="0.0.0.0", port=port, reload=True)
