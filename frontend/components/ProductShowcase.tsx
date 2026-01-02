'use client';
import React, { useState } from 'react';

// SVG icons
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 18-6-6 6-6" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
    </svg>
);

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
);

type Product = {
    id: string;
    title: string;
    description: string;
    image_url?: string;
    images?: string[];
    video_url?: string;
    price?: number;
    currency?: string;
    link: string;
};

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev: number) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev: number) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative h-64 w-full bg-jungle-950 group">
            <img
                src={images[currentIndex]}
                alt={`${title} - Imagen ${currentIndex + 1}`}
                className="w-full h-full object-contain"
            />

            {images.length > 1 && (
                <>
                    {/* Navigation Arrows */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-jungle-900/80 hover:bg-paquito-600 text-paquito-100 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                        aria-label="Imagen anterior"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-jungle-900/80 hover:bg-paquito-600 text-paquito-100 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                        aria-label="Imagen siguiente"
                    >
                        <ChevronRightIcon />
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentIndex
                                    ? 'bg-paquito-500 glow-amber'
                                    : 'bg-jungle-600 hover:bg-paquito-400'
                                    }`}
                                aria-label={`Ir a imagen ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default function ProductShowcase({ product }: { product: Product }) {
    // Determine which images to display
    const displayImages = product.images && product.images.length > 0
        ? product.images
        : product.image_url
            ? [product.image_url]
            : [];

    return (
        <div className="card-premium overflow-hidden group">
            {/* Video or Image Carousel */}
            {product.video_url ? (
                <div className="aspect-video w-full bg-jungle-950">
                    <iframe
                        src={product.video_url}
                        className="w-full h-full"
                        title={product.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            ) : displayImages.length > 0 ? (
                <ImageCarousel images={displayImages} title={product.title} />
            ) : (
                <div className="relative h-64 w-full bg-jungle-950 flex items-center justify-center text-jungle-600">
                    <span className="text-4xl">🐵</span>
                </div>
            )}

            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-paquito-100 group-hover:text-paquito-400 transition-colors">
                    {product.title}
                </h3>
                <p className="text-jungle-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-paquito-900/30">
                    {product.price && (
                        <span className="text-2xl font-bold text-paquito-400">
                            {product.price}
                            <span className="text-sm text-jungle-500 ml-1">{product.currency}</span>
                        </span>
                    )}
                    <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cta to-paquito-600 text-white rounded-full font-semibold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(234,88,12,0.3)]"
                    >
                        Ver Oferta
                        <ExternalLinkIcon />
                    </a>
                </div>
            </div>
        </div>
    );
}
