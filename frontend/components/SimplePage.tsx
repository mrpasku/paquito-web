import Link from 'next/link';

interface SimplePageProps {
    title: string;
    description: string;
}

export default function SimplePage({ title, description }: SimplePageProps) {
    return (
        <main className="min-h-screen pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="glass-dark rounded-3xl p-8 md:p-12 border border-paquito-500/20 relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-paquito-500/10 blur-[100px] rounded-full pointer-events-none" />

                    <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-paquito relative z-10">
                        {title}
                    </h1>

                    <div className="prose prose-invert prose-lg max-w-none relative z-10">
                        <p className="text-xl text-jungle-200 leading-relaxed mb-8">
                            {description}
                        </p>

                        <div className="p-6 bg-jungle-900/50 rounded-2xl border border-paquito-500/10">
                            <p className="text-jungle-400">
                                Estamos trabajando en esta sección. Muy pronto estará disponible con todo el contenido.
                            </p>
                        </div>

                        <div className="mt-8">
                            <Link
                                href="/"
                                className="inline-flex items-center text-paquito-400 hover:text-paquito-300 font-medium transition-colors"
                            >
                                ← Volver al inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
