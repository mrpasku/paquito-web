import SolarSystemHero from '@/components/SolarSystemHero';
import AdPlaceholder from '@/components/AdPlaceholder';
import ProductShowcase from '@/components/ProductShowcase';
import PaquitoStorytelling from '@/components/PaquitoStorytelling';
import Link from 'next/link';
import { getOffers, getPosts } from '@/lib/api';

export default async function Home() {
    const offers = await getOffers();
    const posts = await getPosts();

    const featuredOffers = offers.slice(0, 3);
    const featuredPosts = posts.slice(0, 2);

    return (
        <div className="flex flex-col min-h-screen pt-16">
            <SolarSystemHero activeCharacterId="paquito" />

            {/* Ad Banner */}
            <AdPlaceholder slot="1234567890" style={{ display: 'block', minHeight: '90px' }} />

            {/* Storytelling Section */}
            <PaquitoStorytelling characterId="paquito" />

            {/* Ad Banner between sections */}
            <AdPlaceholder slot="5555555555" className="hidden md:block" />

            {/* Los Preferidos de Paquito - Featured Products */}
            <section className="pt-0 pb-20 bg-gradient-to-b from-[#030308] via-[#080810] to-[#030308]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <p className="text-amber-400/70 text-sm tracking-widest uppercase mb-3">
                            el setup del ritual
                        </p>
                        <h2 className="text-3xl md:text-5xl font-black mb-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500">
                                Los preferidos de Paquito
                            </span>
                        </h2>
                        <p className="text-gray-400 max-w-xl mx-auto text-lg">
                            Las cosas que uso cuando baja la voz y el mundo se calla.
                            No son productos... son compañeros del ritual.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredOffers.map((offer) => (
                            <ProductShowcase key={offer.id} product={offer} />
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/ofertas"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400/50 transition-all duration-300 font-medium group"
                        >
                            <span>Ver todo el setup</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Ad Banner */}
            <AdPlaceholder slot="9876543210" />

            {/* Latest Blog Posts Section */}
            <section className="py-20 bg-[#050510]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <p className="text-amber-400/70 text-sm tracking-widest uppercase mb-3">
                            explora más
                        </p>
                        <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
                            El Blog de Paquito
                        </h2>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Guías, curiosidades, y algún que otro secreto.
                            Para leer despacio, como todo aquí.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {featuredPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800/50 hover:border-amber-500/30 transition-all duration-300"
                            >
                                {/* Hover glow */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-4 text-white group-hover:text-amber-400 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed mb-6">
                                        {post.excerpt}
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-amber-500 font-medium group-hover:gap-3 transition-all">
                                        Leer artículo
                                        <span>→</span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/blog"
                            className="text-gray-400 hover:text-white font-medium inline-flex items-center gap-2 group transition-colors"
                        >
                            <span>Ver todos los artículos</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Courses Teaser - Subtle */}
            <section className="py-16 bg-gradient-to-b from-[#050510] to-[#030308]">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <p className="text-gray-500 text-lg mb-6">
                        ¿Quieres aprender a crear personajes como Paquito?
                        Sin humo, sin atajos falsos. Solo trabajo real y herramientas que funcionan.
                    </p>
                    <Link
                        href="/cursos"
                        className="inline-flex items-center gap-2 text-amber-400/80 hover:text-amber-300 font-medium transition-colors group"
                    >
                        <span>Descubre los cursos</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </section>
        </div>
    )
}
