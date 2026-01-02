'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { characters } from '@/lib/characters';
import { courses } from '@/content/courses/courses';

// SVG icons
const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

const ChevronDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:rotate-180 transition-transform duration-300">
        <path d="m6 9 6 6 6-6" />
    </svg>
);

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Mock Categories for Offers (since api is async)
    const offerCategories = [
        { name: 'Tecnología', icon: '🎧', href: '/ofertas' },
        { name: 'Snacks', icon: '🍜', href: '/ofertas' },
        { name: 'ASMR Gear', icon: '🎙️', href: '/ofertas' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-dark">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group shrink-0">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-paquito-500/50 group-hover:border-paquito-400 transition-all group-hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                            <Image src="/images/paquito-avatar.jpg" alt="Paquito" fill className="object-cover" />
                        </div>
                        <span className="text-xl font-bold gradient-text-paquito group-hover:text-glow transition-all tracking-tight hidden sm:block">
                            PAQUITO
                        </span>
                    </Link>

                    {/* Desktop Navigation - CENTERED */}
                    <nav className="hidden md:flex items-center gap-8">

                        {/* UNIVERSO DROPDOWN */}
                        <div className="relative group">
                            <Link href="/" className="flex items-center gap-1 text-jungle-200 hover:text-paquito-400 font-medium py-4">
                                Universo <ChevronDown />
                            </Link>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-jungle-950/95 backdrop-blur-xl border border-paquito-500/20 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 overflow-hidden">
                                <div className="p-4 grid grid-cols-2 gap-3">
                                    {characters.map(char => (
                                        <Link key={char.id} href={char.slug ? `/${char.slug}` : '/'} className="flex items-center gap-3 p-2 rounded-xl hover:bg-paquito-500/10 transition-colors group/item">
                                            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-paquito-500/30 group-hover/item:border-paquito-400">
                                                <Image src={char.avatar} alt={char.name} fill className="object-cover" />
                                            </div>
                                            <span className="text-sm font-medium text-jungle-200 group-hover/item:text-paquito-300">{char.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ACADEMIA DROPDOWN */}
                        <div className="relative group">
                            <Link href="/cursos" className="flex items-center gap-1 text-jungle-200 hover:text-paquito-400 font-medium py-4">
                                Academia <ChevronDown />
                            </Link>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-jungle-950/95 backdrop-blur-xl border border-paquito-500/20 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 overflow-hidden">
                                <div className="p-2">
                                    {courses.slice(0, 3).map(course => (
                                        <Link key={course.slug} href={`/cursos`} className="block p-3 rounded-xl hover:bg-paquito-500/10 transition-colors group/item">
                                            <div className="text-sm font-bold text-jungle-100 group-hover/item:text-paquito-300 mb-1">{course.title}</div>
                                            <div className="text-xs text-jungle-400 line-clamp-1">{course.description}</div>
                                        </Link>
                                    ))}
                                    <div className="border-t border-paquito-500/10 mt-2 pt-2">
                                        <Link href="/cursos" className="block text-center text-xs font-bold text-paquito-400 hover:text-paquito-300 py-2">
                                            Ver Todos los Cursos →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PREFERIDOS DROPDOWN */}
                        <div className="relative group">
                            <Link href="/ofertas" className="flex items-center gap-1 text-jungle-200 hover:text-paquito-400 font-medium py-4">
                                Los Preferidos <ChevronDown />
                            </Link>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-jungle-950/95 backdrop-blur-xl border border-paquito-500/20 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 overflow-hidden">
                                <div className="p-2">
                                    {offerCategories.map(cat => (
                                        <Link key={cat.name} href={cat.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-paquito-500/10 transition-colors group/item">
                                            <span className="text-xl">{cat.icon}</span>
                                            <span className="text-sm font-medium text-jungle-200 group-hover/item:text-paquito-300">{cat.name}</span>
                                        </Link>
                                    ))}
                                    <div className="border-t border-paquito-500/10 mt-2 pt-2">
                                        <Link href="/ofertas" className="block text-center text-xs font-bold text-paquito-400 hover:text-paquito-300 py-2">
                                            Ver Todo →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BLOG DROPDOWN */}
                        <div className="relative group">
                            <Link href="/blog" className="flex items-center gap-1 text-jungle-200 hover:text-paquito-400 font-medium py-4">
                                Blog <ChevronDown />
                            </Link>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-jungle-950/95 backdrop-blur-xl border border-paquito-500/20 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 overflow-hidden">
                                <div className="p-2 space-y-1">
                                    <Link href="/blog" className="block p-3 rounded-xl hover:bg-paquito-500/10 transition-colors">
                                        <span className="text-sm font-medium text-jungle-200 block mb-1">Últimos Artículos</span>
                                        <span className="text-xs text-jungle-500">Novedades y noticias</span>
                                    </Link>
                                    <Link href="/blog" className="block p-3 rounded-xl hover:bg-paquito-500/10 transition-colors">
                                        <span className="text-sm font-medium text-jungle-200 block mb-1">Guías ASMR</span>
                                        <span className="text-xs text-jungle-500">Aprende con nosotros</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* B2B LINK (Simple) */}
                        <Link href="/b2b" className="text-jungle-200 hover:text-paquito-400 font-medium transition-colors">
                            B2B
                        </Link>

                    </nav>

                    {/* Mobile Menu Button - Right Aligned used as spacer on Desktop to keep Logo left */}
                    <div className="w-10 flex justify-end">
                        <button
                            className="md:hidden p-2 text-paquito-400"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden glass border-t border-paquito-900/30 h-[calc(100vh-80px)] overflow-y-auto">
                    <nav className="container mx-auto px-4 py-6 flex flex-col gap-6">
                        {/* Universo Mobile */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold text-paquito-500 uppercase tracking-widest px-2">Universo</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {characters.map(char => (
                                    <Link key={char.id} href={char.slug ? `/${char.slug}` : '/'} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                            <Image src={char.avatar} alt={char.name} fill className="object-cover" />
                                        </div>
                                        <span className="text-sm text-jungle-200">{char.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Academia Mobile */}
                        <div className="space-y-3">
                            <Link href="/cursos" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold text-paquito-500 uppercase tracking-widest px-2 block">Academia</Link>
                            <div className="flex flex-col gap-2">
                                {courses.slice(0, 3).map(course => (
                                    <Link key={course.slug} href="/cursos" onClick={() => setIsMenuOpen(false)} className="p-3 rounded-lg bg-white/5 border border-white/5 text-sm text-jungle-200">
                                        {course.title}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Links Mobile */}
                        <div className="space-y-4 px-2">
                            <Link href="/ofertas" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-jungle-100">Los Preferidos</Link>
                            <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-jungle-100">Blog</Link>
                            <Link href="/b2b" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-jungle-100">Colaboraciones / B2B</Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
