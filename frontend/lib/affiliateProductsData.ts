// Interface for affiliate product data - shared between client and server components
export interface AffiliateProductData {
    id: string;
    title: string;
    description: string;
    price?: number;
    currency?: string;
    imageUrl?: string;
    affiliateUrl?: string;
    isPlaceholder?: boolean;
}

// Productos placeholder por categoría (para usar hasta que tengas los enlaces reales)
export const placeholderProducts: Record<string, AffiliateProductData[]> = {
    // ASMR
    'mejores-microfonos-asmr': [
        {
            id: 'blue-yeti',
            title: 'Blue Yeti - Micrófono USB',
            description: 'El micrófono más popular para creadores de ASMR. 4 patrones de grabación.',
            price: 130,
            currency: 'EUR',
            imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&q=80',
            isPlaceholder: true,
        },
        {
            id: 'rode-nt1',
            title: 'Rode NT1 - Micrófono Profesional',
            description: 'Ruido ultrabajo, ideal para susurros y sonidos delicados.',
            price: 220,
            currency: 'EUR',
            imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80',
            isPlaceholder: true,
        },
    ],
    'mejores-auriculares-asmr': [
        {
            id: 'sony-xm5',
            title: 'Sony WH-1000XM5',
            description: 'Los mejores auriculares con cancelación de ruido para ASMR.',
            price: 350,
            currency: 'EUR',
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
            isPlaceholder: true,
        },
    ],
    'setup-asmr-profesional': [
        {
            id: 'focusrite-scarlett',
            title: 'Focusrite Scarlett 2i2',
            description: 'Interfaz de audio profesional con preamplificadores de calidad.',
            price: 150,
            currency: 'EUR',
            imageUrl: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=400&q=80',
            isPlaceholder: true,
        },
        {
            id: 'rode-nt1-kit',
            title: 'Rode NT1 + Focusrite Kit',
            description: 'Combo profesional para empezar con todo lo necesario.',
            price: 350,
            currency: 'EUR',
            isPlaceholder: true,
        },
    ],
    // Equipamiento
    'mejores-camaras-videos': [
        {
            id: 'sony-zv-e10',
            title: 'Sony ZV-E10 II',
            description: 'La cámara favorita de los creadores de contenido. 4K 60fps.',
            price: 1000,
            currency: 'EUR',
            imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',
            isPlaceholder: true,
        },
    ],
    'iluminacion-videos-guia': [
        {
            id: 'elgato-keylight',
            title: 'Elgato Key Light Air',
            description: 'Iluminación LED profesional controlable por app.',
            price: 130,
            currency: 'EUR',
            imageUrl: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=400&q=80',
            isPlaceholder: true,
        },
    ],
    // Comida
    'snacks-coreanos-guia': [
        {
            id: 'pack-snacks-kr',
            title: 'Pack Snacks Coreanos Variado',
            description: 'Pepero, Honey Butter Chips, Shin Ramyun y más en un pack.',
            price: 29.99,
            currency: 'EUR',
            isPlaceholder: true,
        },
    ],
};
