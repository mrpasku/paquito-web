from models.affiliate_links import AffiliateLink

# Mock database
MOCK_LINKS = {
    "oferta1": AffiliateLink(
        id="1",
        slug="oferta1",
        title="Auriculares Noise Cancelling",
        description="La mejor cancelación de ruido del mercado.",
        affiliate_url="https://amazon.es/dp/example1",
        image_url="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        price=299.99,
        currency="EUR"
    ),
    "oferta2": AffiliateLink(
        id="2",
        slug="oferta2",
        title="Teclado Mecánico RGB",
        description="Switches Cherry MX Blue para la mejor experiencia.",
        affiliate_url="https://amazon.es/dp/example2",
        image_url="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
        price=129.50,
        currency="EUR",
        video_url="https://www.youtube.com/embed/dQw4w9WgXcQ" # Example video
    )
}

async def get_affiliate_link(slug: str) -> AffiliateLink | None:
    # In a real app, this would query Supabase
    return MOCK_LINKS.get(slug)

async def record_click(link_id: str, ip: str, user_agent: str):
    # In a real app, this would insert into 'affiliate_clicks'
    print(f"Recording click for link {link_id} from {ip}")
    pass
