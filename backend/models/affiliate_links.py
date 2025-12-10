from pydantic import BaseModel
from typing import Optional, Any

class AffiliateLink(BaseModel):
    id: str
    slug: str
    title: str
    description: Optional[str] = None
    affiliate_url: str
    image_url: Optional[str] = None
    price: Optional[float] = None
    currency: Optional[str] = "EUR"
    video_url: Optional[str] = None
    preview_data: Optional[Any] = None
    click_count: int = 0
