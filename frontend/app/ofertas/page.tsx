import { getOffers } from '@/lib/api';
import { Metadata } from 'next';
import AdPlaceholder from '@/components/AdPlaceholder';
import ProductShowcase from '@/components/ProductShowcase';

export const metadata: Metadata = {
    title: 'Ofertas Exclusivas',
    description: 'Las mejores ofertas y descuentos seleccionados para ti.',
};

export default async function OfertasPage() {
    const offers = await getOffers();

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                    Ofertas Destacadas
                </span>
            </h1>

            <div className="max-w-4xl mx-auto mb-12">
                <p className="text-xl text-gray-400 text-center">
                    Selección manual de los mejores productos con descuentos verificados.
                </p>
            </div>

            <AdPlaceholder slot="5555555555" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {offers.map((offer) => (
                    <ProductShowcase key={offer.id} product={offer} />
                ))}
            </div>

            <AdPlaceholder slot="6666666666" />
        </div>
    )
}
