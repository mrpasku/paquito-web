'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SocialLinks, { contactInfo } from './SocialLinks';

// SVG icons
const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
    </svg>
);

const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
    </svg>
);

export default function Footer() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Integrate with email service
        setIsSubscribed(true);
        setEmail('');
    };

    return (
        <footer className="bg-jungle-950 border-t border-paquito-900/20">
            {/* Newsletter Section */}
            <div className="border-b border-paquito-900/20">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 gradient-text-paquito">
                            Únete a la Comunidad
                        </h3>
                        <p className="text-jungle-400 mb-6">
                            Recibe ofertas exclusivas y las últimas novedades directamente en tu email.
                        </p>

                        {isSubscribed ? (
                            <div className="p-4 bg-paquito-900/20 border border-paquito-500/30 rounded-xl">
                                <p className="text-paquito-400 font-medium">
                                    ✓ ¡Gracias por suscribirte! Te mantendremos informado.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@email.com"
                                    required
                                    className="flex-1 px-5 py-3 bg-jungle-900/50 border border-paquito-900/30 rounded-full text-paquito-100 placeholder:text-jungle-500 focus:outline-none focus:border-paquito-500/50 transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-gradient-to-r from-cta to-paquito-600 text-white rounded-full font-semibold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(234,88,12,0.3)] flex items-center justify-center gap-2"
                                >
                                    <SendIcon />
                                    Suscribirse
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Contact & Social Section */}
            <div className="border-b border-paquito-900/20">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        {/* Contact Info */}
                        <div className="text-center md:text-left">
                            <h4 className="text-sm font-semibold text-paquito-400 uppercase tracking-wider mb-4">
                                Contacto
                            </h4>
                            <div className="space-y-3">
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="flex items-center gap-3 justify-center md:justify-start text-jungle-300 hover:text-paquito-400 transition-colors"
                                >
                                    <EmailIcon />
                                    <span>{contactInfo.email}</span>
                                </a>
                                <div className="flex items-center gap-3 justify-center md:justify-start text-jungle-500">
                                    <PhoneIcon />
                                    <span className="italic">Próximamente</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Links - centered */}
                        <div className="flex justify-center">
                            <SocialLinks size="md" showContact={false} />
                        </div>

                        {/* Quick Links */}
                        <div className="text-center md:text-right">
                            <h4 className="text-sm font-semibold text-paquito-400 uppercase tracking-wider mb-4">
                                Legal y Estratégico
                            </h4>
                            <div className="flex flex-col gap-2 md:items-end text-sm text-jungle-400">
                                <Link href="/sobre-paquito" className="hover:text-paquito-400 transition-colors">
                                    Sobre Paquito
                                </Link>
                                <Link href="/prensa" className="hover:text-paquito-400 transition-colors">
                                    Prensa
                                </Link>
                                <Link href="/contacto" className="hover:text-paquito-400 transition-colors">
                                    Contacto Estratégico
                                </Link>
                                <Link href="/licencias" className="hover:text-paquito-400 transition-colors">
                                    Licencias
                                </Link>
                                <Link href="/legal" className="hover:text-paquito-400 transition-colors">
                                    Privacidad / Legal
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Logo & Copyright */}
                    <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-paquito-500/50">
                            <Image
                                src="/images/paquito-avatar.jpg"
                                alt="Paquito"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <span className="font-bold gradient-text-paquito tracking-tight">PAQUITO</span>
                            <p className="text-jungle-500 text-xs">
                                © {new Date().getFullYear()} Paquito Live ASMR
                            </p>
                        </div>
                    </div>

                    {/* Legal Links */}
                    <div className="flex gap-4 text-xs text-jungle-500">
                        {/* Legal links moved to main footer area */}
                    </div>
                </div>
            </div>

            {/* Affiliate Disclosure */}
            <div className="border-t border-paquito-900/20">
                <div className="container mx-auto px-4 py-4">
                    <p className="text-xs text-jungle-600 text-center">
                        Este sitio puede contener enlaces de afiliados. Al realizar compras a través de estos enlaces,
                        podemos recibir una comisión sin costo adicional para ti.
                    </p>
                </div>
            </div>
        </footer>
    );
}
