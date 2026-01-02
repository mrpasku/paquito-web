'use client';

import { AffiliateProductData, placeholderProducts } from '@/lib/affiliateProductsData';

// Re-export for backwards compatibility
export type { AffiliateProductData };
export { placeholderProducts };

type AffiliateProductProps = {
    product: AffiliateProductData;
};

// SVG icon
const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
);

export default function AffiliateProduct({ product }: AffiliateProductProps) {
    const isPlaceholder = product.isPlaceholder || !product.affiliateUrl;

    return (
        <div className={`my-8 rounded-xl overflow-hidden border ${isPlaceholder
            ? 'border-jungle-700/50 bg-jungle-900/30'
            : 'border-paquito-500/30 bg-gradient-to-r from-jungle-950 to-jungle-900'
            }`}>
            <div className="flex flex-col sm:flex-row">
                {/* Product Image */}
                <div className="sm:w-48 h-40 sm:h-auto flex-shrink-0 bg-jungle-900 relative overflow-hidden">
                    {product.imageUrl ? (
                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-jungle-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                <circle cx="9" cy="9" r="2" />
                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                            </svg>
                        </div>
                    )}
                    {isPlaceholder && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-jungle-800 text-jungle-400 text-xs rounded font-medium">
                            Próximamente
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="flex-1 p-5">
                    <div className="flex flex-col h-full justify-between">
                        <div>
                            <h4 className={`font-bold text-lg mb-2 ${isPlaceholder ? 'text-jungle-300' : 'text-paquito-100'
                                }`}>
                                {product.title}
                            </h4>
                            <p className="text-jungle-400 text-sm leading-relaxed mb-3">
                                {product.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                            {product.price && (
                                <span className={`text-xl font-bold ${isPlaceholder ? 'text-jungle-400' : 'text-paquito-400'
                                    }`}>
                                    {product.price}
                                    <span className="text-sm text-jungle-500 ml-1">
                                        {product.currency || 'EUR'}
                                    </span>
                                </span>
                            )}

                            {isPlaceholder ? (
                                <span className="px-4 py-2 bg-jungle-800 text-jungle-500 rounded-full text-sm font-medium cursor-not-allowed">
                                    Enlace próximamente
                                </span>
                            ) : (
                                <a
                                    href={product.affiliateUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cta to-paquito-600 text-white rounded-full font-semibold text-sm hover:scale-105 transition-transform shadow-[0_0_15px_rgba(234,88,12,0.3)]"
                                >
                                    Ver oferta
                                    <ExternalLinkIcon />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Componente para mostrar varios productos
export function AffiliateProductList({ products }: { products: AffiliateProductData[] }) {
    if (!products || products.length === 0) return null;

    return (
        <div className="my-10">
            <h3 className="text-xl font-bold mb-6 text-paquito-200 flex items-center gap-3">
                <span className="text-2xl">🛒</span>
                Productos recomendados
            </h3>
            <div className="space-y-4">
                {products.map((product) => (
                    <AffiliateProduct key={product.id} product={product} />
                ))}
            </div>
            <p className="text-xs text-jungle-600 mt-4 text-center italic">
                * Los enlaces de afiliado nos ayudan a mantener este contenido gratuito
            </p>
        </div>
    );
}

