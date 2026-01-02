import { getOffers } from '@/lib/api';
import ProductShowcase from '@/components/ProductShowcase';
import AdPlaceholder from '@/components/AdPlaceholder';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ofertas Exclusivas - Paquito ASMR',
    description: 'Las mejores ofertas seleccionadas por Paquito. Auriculares, micrófonos, snacks y más con descuentos especiales.',
    openGraph: {
        title: 'Ofertas Exclusivas - Paquito ASMR',
        description: 'Las mejores ofertas seleccionadas por Paquito. Auriculares, micrófonos, snacks y más.',
        type: 'website',
    },
};

export default async function OfertasPage() {
    const offers = await getOffers();

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-paquito-400 to-cta">
                            Ofertas Exclusivas
                        </span>
                    </h1>
                    <p className="text-xl text-jungle-400 max-w-2xl mx-auto">
                        Las mejores ofertas que he seleccionado para ti. Productos que uso y recomiendo.
                    </p>
                </div>

                {/* Ad Banner */}
                <AdPlaceholder slot="ofertas-top" className="mb-8" />

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {offers.map((offer) => (
                        <ProductShowcase key={offer.id} product={offer} />
                    ))}
                </div>

                {/* Ad Banner */}
                <AdPlaceholder slot="ofertas-bottom" className="mt-12" />

                {/* Affiliate Disclaimer */}
                <p className="text-center text-sm text-jungle-600 mt-8 italic">
                    * Algunos enlaces pueden ser de afiliado. Esto nos ayuda a mantener el contenido gratuito.
                </p>
            </div>
        </div>
    );
}
