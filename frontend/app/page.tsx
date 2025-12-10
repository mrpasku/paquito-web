import Hero from '@/components/Hero';
import AdPlaceholder from '@/components/AdPlaceholder';
import ProductShowcase from '@/components/ProductShowcase';
import Link from 'next/link';
import { getOffers, getPosts } from '@/lib/api';

export default async function Home() {
    // Fetch data for the landing page
    const offers = await getOffers();
    const posts = await getPosts();

    // Take only the first 3 items for the home page
    const featuredOffers = offers.slice(0, 3);
    const featuredPosts = posts.slice(0, 2);

    return (
        <div className="flex flex-col min-h-screen bg-gray-950">
            <Hero />

            <AdPlaceholder slot="1234567890" style={{ display: 'block', minHeight: '90px' }} />

            {/* Featured Offers Section */}
            <section className="py-16 container mx-auto px-4">
                <div className="flex justify-between items-end mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                            Ofertas Destacadas
                        </span>
                    </h2>
                    <Link href="/ofertas" className="text-orange-400 hover:text-orange-300 font-semibold hidden md:block">
                        Ver todas las ofertas &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredOffers.map((offer) => (
                        <ProductShowcase key={offer.id} product={offer} />
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/ofertas" className="text-orange-400 hover:text-orange-300 font-semibold">
                        Ver todas las ofertas &rarr;
                    </Link>
                </div>
            </section>

            <AdPlaceholder slot="9876543210" />

            {/* Latest Blog Posts Section */}
            <section className="py-16 bg-gray-900/50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Últimos Artículos
                        </h2>
                        <Link href="/blog" className="text-blue-400 hover:text-blue-300 font-semibold hidden md:block">
                            Ir al Blog &rarr;
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {featuredPosts.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-colors">
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <span className="inline-block mt-6 text-blue-500 font-medium group-hover:translate-x-2 transition-transform">
                                        Leer artículo &rarr;
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Link href="/blog" className="text-blue-400 hover:text-blue-300 font-semibold">
                            Ir al Blog &rarr;
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
