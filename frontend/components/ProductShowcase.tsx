import React from 'react';

type Product = {
    id: string;
    title: string;
    description: string;
    image_url?: string;
    video_url?: string;
    price?: number;
    currency?: string;
    link: string;
};

export default function ProductShowcase({ product }: { product: Product }) {
    return (
        <div className="border border-gray-800 rounded-xl overflow-hidden bg-gray-900 shadow-lg hover:shadow-orange-500/10 transition-shadow">
            {/* Video or Image */}
            {product.video_url ? (
                <div className="aspect-video w-full">
                    <iframe
                        src={product.video_url}
                        className="w-full h-full"
                        title={product.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            ) : (
                <div className="relative h-64 w-full bg-gray-800">
                    {product.image_url ? (
                        <img
                            src={product.image_url}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-600">
                            No Image Available
                        </div>
                    )}
                </div>
            )}

            <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-white">{product.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{product.description}</p>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800">
                    {product.price && (
                        <span className="text-3xl font-bold text-white">
                            {product.price} <span className="text-sm text-gray-500">{product.currency}</span>
                        </span>
                    )}
                    <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-orange-600/20"
                    >
                        Ver Oferta
                    </a>
                </div>
            </div>
        </div>
    );
}
