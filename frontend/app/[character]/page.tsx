import SolarSystemHero from '@/components/SolarSystemHero';
import AdPlaceholder from '@/components/AdPlaceholder';
import ProductShowcase from '@/components/ProductShowcase';
import Link from 'next/link';
import { getOffers, getPosts } from '@/lib/api';
import { getCharacterBySlug } from '@/lib/characters';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface CharacterPageProps {
    params: Promise<{ character: string }>;
}

export async function generateStaticParams() {
    // Generate pages for each secondary character
    return [
        { character: 'pablito' },
        { character: 'sarita' },
        { character: 'abuela' },
    ];
}

export async function generateMetadata({ params }: CharacterPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const character = getCharacterBySlug(resolvedParams.character);

    if (!character) {
        return { title: 'Personaje no encontrado' };
    }

    return {
        title: character.displayName,
        description: character.description,
        openGraph: {
            title: character.displayName,
            description: character.description,
            url: `https://paquitoliveasmr.com/${character.slug}`,
        },
    };
}

export default async function CharacterPage({ params }: CharacterPageProps) {
    const resolvedParams = await params;
    const character = getCharacterBySlug(resolvedParams.character);

    if (!character) {
        notFound();
    }

    // Fetch data - TODO: Filter by character when content is tagged
    const offers = await getOffers();
    const posts = await getPosts();

    // Take only the first 3 items for the home page
    const featuredOffers = offers.slice(0, 3);
    const featuredPosts = posts.slice(0, 2);

    return (
        <div className="flex flex-col min-h-screen pt-16">
            <SolarSystemHero activeCharacterId={character.id} />

            {/* Ad Banner */}
            <AdPlaceholder slot="1234567890" style={{ display: 'block', minHeight: '90px' }} />

            {/* Featured Offers Section */}
            <section className="py-16 container mx-auto px-4">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">
                            <span
                                className="bg-clip-text text-transparent"
                                style={{ backgroundImage: 'var(--char-gradient)' }}
                            >
                                Ofertas de {character.name}
                            </span>
                        </h2>
                        <p className="text-jungle-400">Las mejores ofertas seleccionadas para ti</p>
                    </div>
                    <Link
                        href={`/${character.slug}/ofertas`}
                        className="font-semibold hidden md:flex items-center gap-2 group"
                        style={{ color: 'var(--char-primary)' }}
                    >
                        Ver todas
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredOffers.map((offer) => (
                        <ProductShowcase key={offer.id} product={offer} />
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link
                        href={`/${character.slug}/ofertas`}
                        className="inline-flex items-center gap-2 font-semibold"
                        style={{ color: 'var(--char-primary)' }}
                    >
                        Ver todas las ofertas →
                    </Link>
                </div>
            </section>

            {/* Ad Banner */}
            <AdPlaceholder slot="9876543210" />

            {/* Latest Blog Posts Section */}
            <section className="py-16 bg-jungle-950/50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2
                                className="text-3xl md:text-4xl font-bold mb-2"
                                style={{ color: 'var(--char-light)' }}
                            >
                                Últimos Artículos
                            </h2>
                            <p className="text-jungle-400">Tips, guías y contenido exclusivo</p>
                        </div>
                        <Link
                            href={`/${character.slug}/blog`}
                            className="font-semibold hidden md:flex items-center gap-2 group"
                            style={{ color: 'var(--char-primary)' }}
                        >
                            Ir al Blog
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {featuredPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/${character.slug}/blog/${post.slug}`}
                                className="group card-premium p-8 block"
                            >
                                <h3
                                    className="text-xl font-bold mb-4 group-hover:opacity-80 transition-colors"
                                    style={{ color: 'var(--char-light)' }}
                                >
                                    {post.title}
                                </h3>
                                <p className="text-jungle-400 leading-relaxed mb-6">
                                    {post.excerpt}
                                </p>
                                <span
                                    className="inline-flex items-center gap-2 font-medium group-hover:gap-3 transition-all"
                                    style={{ color: 'var(--char-primary)' }}
                                >
                                    Leer artículo
                                    <span>→</span>
                                </span>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Link
                            href={`/${character.slug}/blog`}
                            className="inline-flex items-center gap-2 font-semibold"
                            style={{ color: 'var(--char-primary)' }}
                        >
                            Ir al Blog →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
