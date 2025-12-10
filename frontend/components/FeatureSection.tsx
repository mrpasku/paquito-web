import Link from 'next/link';
import { ShoppingBag, BookOpen, Star } from 'lucide-react';

export default function FeatureSection() {
    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                        Explora nuestro contenido
                    </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1: Ofertas */}
                    <div className="group p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-orange-500/50 transition-all hover:bg-gray-900">
                        <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <ShoppingBag className="text-orange-500 w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">Ofertas Exclusivas</h3>
                        <p className="text-gray-400 mb-6">
                            Accede a descuentos únicos y promociones limitadas en productos seleccionados.
                        </p>
                        <Link href="/ofertas" className="text-orange-400 font-semibold hover:text-orange-300 flex items-center gap-2">
                            Ver ofertas &rarr;
                        </Link>
                    </div>

                    {/* Feature 2: Blog */}
                    <div className="group p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-orange-500/50 transition-all hover:bg-gray-900">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <BookOpen className="text-blue-500 w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">Blog & Guías</h3>
                        <p className="text-gray-400 mb-6">
                            Aprende con nuestros artículos sobre marketing, SEO y estrategias digitales.
                        </p>
                        <Link href="/blog" className="text-blue-400 font-semibold hover:text-blue-300 flex items-center gap-2">
                            Leer artículos &rarr;
                        </Link>
                    </div>

                    {/* Feature 3: Premium */}
                    <div className="group p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-orange-500/50 transition-all hover:bg-gray-900">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Star className="text-purple-500 w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">Contenido Premium</h3>
                        <p className="text-gray-400 mb-6">
                            Próximamente: cursos y recursos avanzados para llevar tu negocio al siguiente nivel.
                        </p>
                        <span className="text-gray-500 font-semibold cursor-not-allowed">
                            Próximamente
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
