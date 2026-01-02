import { getAllPosts, getPostBySlug, getPostsByCategory, getFeaturedPosts, getCategories, type BlogPost } from '@/content/blog/posts';

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
            id: 'auriculares-sony',
            title: 'Sony WH-1000XM5 - Auriculares Premium',
            description: 'Los mejores auriculares con cancelación de ruido del mercado. Ideales para ASMR, música y llamadas. Batería de 30 horas.',
            link: 'https://www.amazon.es/Sony-WH-1000XM5/dp/B09XS7JWHH',
            image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
            price: 350,
            currency: 'EUR'
        },
        {
            id: 'microfono-rode',
            title: 'Rode NT1 - Micrófono ASMR Profesional',
            description: 'El micrófono favorito de los creadores de ASMR. Ruido propio ultrabajo para capturar cada susurro.',
            link: 'https://www.amazon.es/rode-nt1/dp/B00GGGQK56',
            image_url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
            price: 220,
            currency: 'EUR'
        },
        {
            id: 'camara-sony-zv',
            title: 'Sony ZV-E10 II - Cámara para Creadores',
            description: 'La cámara diseñada para creadores de contenido. 4K 60fps, autofoco de tracking y pantalla abatible.',
            link: 'https://www.amazon.es/Sony-ZV-E10/dp/B097BQFGGV',
            image_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
            price: 1000,
            currency: 'EUR'
        },
        {
            id: 'luz-elgato',
            title: 'Elgato Key Light Air - Iluminación Pro',
            description: 'Iluminación profesional para streaming y vídeos. Control por app, luz suave y sin ventiladores.',
            link: 'https://www.amazon.es/Elgato-Key-Light-Air/dp/B082QHRZFW',
            image_url: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=800&q=80',
            price: 130,
            currency: 'EUR'
        },
        {
            id: 'focusrite-scarlett',
            title: 'Focusrite Scarlett 2i2 - Interfaz de Audio',
            description: 'La interfaz de audio más recomendada para principiantes y profesionales. Preamplificadores de calidad.',
            link: 'https://www.amazon.es/Focusrite-Scarlett-2i2/dp/B07QR73T66',
            image_url: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&q=80',
            price: 150,
            currency: 'EUR'
        },
        {
            id: 'snacks-coreanos',
            title: 'Pack Snacks Coreanos - Variado',
            description: 'Caja con los snacks coreanos más populares: Pepero, Honey Butter Chips, Shin Ramyun y más.',
            link: 'https://www.amazon.es/snacks-coreanos/dp/B08XXXXX',
            image_url: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&q=80',
            price: 29.99,
            currency: 'EUR'
        },
    ];
}

export async function getPosts(): Promise<{ slug: string; title: string; excerpt: string; category?: string; readTime?: number }[]> {
    const posts = getAllPosts();
    return posts.map(post => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        readTime: post.readTime
    }));
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
    return getPostBySlug(slug);
}

export async function getPostsForCategory(category: string) {
    return getPostsByCategory(category);
}

export async function getBlogCategories() {
    return getCategories();
}

export async function getFeatured() {
    return getFeaturedPosts();
}

// ============================================
// COURSES API
// ============================================
import { getAllCourses as getAllCoursesContent, getCourseBySlug as getCourseBySlugContent, getFeaturedCourses as getFeaturedCoursesContent, type Course } from '@/content/courses/courses';

export async function getCourses(): Promise<Course[]> {
    return getAllCoursesContent();
}

export async function getCourse(slug: string): Promise<Course | undefined> {
    return getCourseBySlugContent(slug);
}

export async function getFeaturedCoursesApi(): Promise<Course[]> {
    return getFeaturedCoursesContent();
}

