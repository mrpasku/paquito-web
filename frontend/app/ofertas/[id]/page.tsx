import { getOffers } from '@/lib/api';

export async function generateStaticParams() {
    const offers = await getOffers();
    return offers.map((offer) => ({
        id: offer.id,
    }));
}

export default function OfferDetail({ params }: { params: { id: string } }) {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-8">Oferta: {params.id}</h1>
            <p>Detalles de la oferta...</p>
        </div>
    );
}
