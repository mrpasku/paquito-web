import { getPosts } from '@/lib/api';
import { Metadata } from 'next';
import AdPlaceholder from '@/components/AdPlaceholder';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Artículos sobre marketing de afiliados y SEO.',
};

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-8">Blog</h1>
            <AdPlaceholder slot="9876543210" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post.slug} className="bg-gray-900 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                        <p className="text-gray-400">{post.excerpt}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
