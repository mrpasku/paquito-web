import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#1a0b05]">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a0b05] z-10"></div>
            <div className="absolute inset-0 opacity-20 bg-[url('/images/wood-texture.jpg')] bg-cover bg-center"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/20 blur-[120px] rounded-full"></div>

            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                    <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">Bienvenido a </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 drop-shadow-[0_0_25px_rgba(234,88,12,0.5)]">
                        Paquito Web
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                    El rincón digital donde encontrarás las mejores <span className="text-orange-400 font-semibold">ofertas</span>,
                    artículos de <span className="text-orange-400 font-semibold">afiliación</span> y contenido exclusivo.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link
                        href="/ofertas"
                        className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(234,88,12,0.4)]"
                    >
                        Ver Ofertas
                    </Link>
                    <Link
                        href="/blog"
                        className="px-8 py-4 border border-orange-500/50 text-orange-400 rounded-full font-bold text-lg hover:bg-orange-950/30 transition-colors backdrop-blur-sm"
                    >
                        Leer Blog
                    </Link>
                </div>
            </div>
        </section>
    );
}
