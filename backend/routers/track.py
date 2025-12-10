from fastapi import APIRouter, Request, Depends, HTTPException
from fastapi.responses import RedirectResponse
from services.affiliate import get_affiliate_link, record_click

router = APIRouter(
    tags=["track"]
)

@router.get("/track")
async def track_click(id: str, request: Request):
    # 1. Get affiliate link details
    affiliate = await get_affiliate_link(id)
    if not affiliate:
        raise HTTPException(status_code=404, detail="Affiliate link not found")

    # 2. Record the click asynchronously (fire and forget or await)
    await record_click(
        affiliate_id=id,
        user_agent=request.headers.get("user-agent"),
        referer=request.headers.get("referer"),
        ip_address=request.client.host
    )

    # 3. Redirect to target URL
    return RedirectResponse(url=affiliate.target_url)
