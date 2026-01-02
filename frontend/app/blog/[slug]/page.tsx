import { getPost, getPosts } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import AdPlaceholder from '@/components/AdPlaceholder';
import { AffiliateProductList } from '@/components/AffiliateProduct';
import { placeholderProducts } from '@/lib/affiliateProductsData';

type Props = {
    params: { slug: string };
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getPost(params.slug);

    if (!post) {
        return {
            title: 'Artículo no encontrado',
        };
    }

    return {
        title: post.title,
        description: post.metaDescription,
        keywords: post.keywords.join(', '),
        openGraph: {
            title: post.title,
            description: post.metaDescription,
            type: 'article',
            publishedTime: post.publishedAt,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.metaDescription,
        },
    };
}

// Generate static params for all posts
export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// Category labels
const categoryLabels: Record<string, string> = {
    asmr: 'ASMR',
    comida: 'Comida',
    tecnologia: 'Tecnología',
    equipamiento: 'Equipamiento',
};

export default async function BlogPostPage({ params }: Props) {
    const post = await getPost(params.slug);

    if (!post) {
        notFound();
    }

    // Get affiliate products for this post (if any)
    const affiliateProducts = placeholderProducts[params.slug] || [];

    // Convert markdown-like content to HTML
    const formatContent = (content: string) => {
        return content
            .split('\n')
            .map((line, index) => {
                // Headers
                if (line.startsWith('## ')) {
                    return `<h2 class="text-2xl font-bold mt-10 mb-4 text-paquito-100">${line.slice(3)}</h2>`;
                }
                if (line.startsWith('### ')) {
                    return `<h3 class="text-xl font-semibold mt-8 mb-3 text-paquito-200">${line.slice(4)}</h3>`;
                }
                if (line.startsWith('#### ')) {
                    return `<h4 class="text-lg font-semibold mt-6 mb-2 text-paquito-300">${line.slice(5)}</h4>`;
                }
                // Lists
                if (line.startsWith('- ')) {
                    return `<li class="ml-4 text-jungle-300">${line.slice(2)}</li>`;
                }
                if (line.match(/^\d+\. /)) {
                    return `<li class="ml-4 text-jungle-300">${line.replace(/^\d+\. /, '')}</li>`;
                }
                // Bold
                let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-paquito-200">$1</strong>');
                // Checkmarks
                formatted = formatted.replace(/✓/g, '<span class="text-green-500">✓</span>');
                formatted = formatted.replace(/❌/g, '<span class="text-red-500">❌</span>');
                // Empty lines
                if (line.trim() === '') {
                    return '<br />';
                }
                // Tables (simplified)
                if (line.startsWith('|')) {
                    return ''; // Skip table syntax for now
                }
                // Regular paragraphs
                if (formatted.trim()) {
                    return `<p class="text-jungle-300 leading-relaxed mb-4">${formatted}</p>`;
                }
                return '';
            })
            .join('');
    };

    return (
        <article className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-3xl">
                {/* Breadcrumb */}
                <nav className="mb-8 text-sm">
                    <ol className="flex items-center gap-2 text-jungle-500">
                        <li>
                            <Link href="/" className="hover:text-paquito-400 transition-colors">
                                Inicio
                            </Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link href="/blog" className="hover:text-paquito-400 transition-colors">
                                Blog
                            </Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link
                                href={`/blog#${post.category}`}
                                className="hover:text-paquito-400 transition-colors"
                            >
                                {categoryLabels[post.category]}
                            </Link>
                        </li>
                    </ol>
                </nav>

                {/* Header */}
                <header className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs px-3 py-1 rounded-full bg-paquito-900/50 text-paquito-400 uppercase tracking-wider font-medium">
                            {categoryLabels[post.category]}
                        </span>
                        <span className="text-sm text-jungle-500">
                            {post.readTime} min de lectura
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-paquito-100 leading-tight">
                        {post.title}
                    </h1>

                    <p className="text-xl text-jungle-400 leading-relaxed">
                        {post.excerpt}
                    </p>

                    <div className="mt-6 pt-6 border-t border-paquito-900/30">
                        <time className="text-sm text-jungle-500" dateTime={post.publishedAt}>
                            Publicado el {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    </div>
                </header>

                {/* Ad */}
                <AdPlaceholder slot="blog-top" />

                {/* Content */}
                <div
                    className="prose prose-invert prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                />

                {/* Affiliate Products Section */}
                {affiliateProducts.length > 0 && (
                    <AffiliateProductList products={affiliateProducts} />
                )}

                {/* Ad */}
                <AdPlaceholder slot="blog-bottom" className="mt-10" />

                {/* Keywords/Tags */}
                <div className="mt-10 pt-8 border-t border-paquito-900/30">
                    <h3 className="text-sm font-semibold text-jungle-400 mb-3 uppercase tracking-wider">
                        Temas relacionados
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {post.keywords.map((keyword) => (
                            <span
                                key={keyword}
                                className="text-xs px-3 py-1 rounded-full bg-jungle-900/50 text-jungle-400 border border-paquito-900/20"
                            >
                                {keyword}
                            </span>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-paquito-900/30 to-jungle-900/30 border border-paquito-500/20 text-center">
                    <h3 className="text-xl font-bold mb-3 text-paquito-100">
                        ¿Te ha gustado este artículo?
                    </h3>
                    <p className="text-jungle-400 mb-6">
                        Síguenos en redes para más contenido como este
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            href="/blog"
                            className="btn-secondary text-sm py-2 px-6"
                        >
                            Ver más artículos
                        </Link>
                        <Link
                            href="/ofertas"
                            className="btn-cta text-sm py-2 px-6"
                        >
                            Ver ofertas
                        </Link>
                    </div>
                </div>

                {/* Navigation */}
                <div className="mt-12 pt-8 border-t border-paquito-900/30">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-paquito-400 hover:text-paquito-300 font-medium"
                    >
                        <span>←</span>
                        Volver al blog
                    </Link>
                </div>
            </div>
        </article>
    );
}
