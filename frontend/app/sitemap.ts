import { MetadataRoute } from 'next';
import { getPosts, getOffers } from '@/lib/api';

const BASE_URL = 'https://paquito-web.vercel.app'; // Replace with actual domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getPosts();
    const offers = await getOffers();

    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    const offerEntries: MetadataRoute.Sitemap = offers.map((offer) => ({
        url: `${BASE_URL}/ofertas/${offer.id}`, // Assuming ID is used for routing
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/ofertas`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        ...postEntries,
        ...offerEntries,
    ];
}
