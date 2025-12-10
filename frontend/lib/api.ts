const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function trackClick(id: string) {
    try {
        const res = await fetch(`${API_URL}/track?id=${id}`, {
            method: 'GET',
        });
        return res;
    } catch (error) {
        console.error('Error tracking click:', error);
    }
}

export async function getOffers() {
    // Mock data with rich media for MVP
    return [
        {
            id: 'oferta1',
            title: 'Auriculares Noise Cancelling',
            description: 'Experimenta el silencio absoluto con la mejor tecnología de cancelación de ruido del mercado. Batería de 30 horas y sonido de alta fidelidad.',
            link: '/go/oferta1',
            image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
            price: 299.99,
            currency: 'EUR'
        },
        {
            id: 'oferta2',
            title: 'Teclado Mecánico RGB',
            description: 'Switches Cherry MX Blue para la mejor experiencia de escritura y gaming. Iluminación RGB personalizable por tecla.',
            link: '/go/oferta2',
            image_url: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80',
            price: 129.50,
            currency: 'EUR',
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Example video
        },
        {
            id: 'oferta3',
            title: 'Monitor Gaming 4K',
            description: '144Hz, 1ms de respuesta y panel IPS. La mejor calidad de imagen para tus juegos favoritos.',
            link: '/go/oferta3',
            image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
            price: 450.00,
            currency: 'EUR'
        },
    ];
}

export async function getPosts() {
    // Mock data for MVP until backend DB is fully populated
    return [
        { slug: 'post-1', title: 'Cómo empezar en el marketing de afiliados', excerpt: 'Guía básica para principiantes.' },
        { slug: 'post-2', title: 'Mejores herramientas SEO 2024', excerpt: 'Lista curada de herramientas.' },
    ];
}
