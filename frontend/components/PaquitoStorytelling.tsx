// @ts-nocheck
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface StorytellingProps {
    characterId?: string;
}

export default function PaquitoStorytelling({ characterId = 'paquito' }: StorytellingProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeChapter, setActiveChapter] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Parallax mouse tracking
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x: x * 20, y: y * 20 });
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        section.addEventListener('mousemove', handleMouseMove);
        return () => section.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    // Scroll-based animations
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate how much of the section is visible
            const visibleStart = Math.max(0, -rect.top);
            const visibleEnd = Math.min(rect.height, windowHeight - rect.top);
            const visibleAmount = Math.max(0, visibleEnd - visibleStart);
            const progress = visibleAmount / windowHeight;

            setScrollProgress(Math.min(1, Math.max(0, progress)));
            setIsInView(rect.top < windowHeight && rect.bottom > 0);

            // Determine active chapter based on scroll
            const sectionProgress = -rect.top / (rect.height - windowHeight);
            setActiveChapter(Math.floor(Math.max(0, Math.min(2, sectionProgress * 3))));
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const chapters = [
        {
            id: 'origin',
            title: 'El Experimento',
            subtitle: 'Donde todo comenzó',
            content: '¿Puede un personaje generado completamente con IA conectar con millones de personas? Esa era la pregunta. Y la respuesta llegó antes de lo esperado.',
            visual: '🧪',
            color: 'from-violet-500 to-purple-600',
            glowColor: 'violet'
        },
        {
            id: 'evolution',
            title: 'La Evolución',
            subtitle: 'De píxeles a personalidad',
            content: 'Cientos de iteraciones. Miles de prompts. Cada imagen más cercana a lo que buscaba. Hasta que un día, ahí estaba: Paquito.',
            visual: '🔄',
            color: 'from-amber-500 to-orange-600',
            glowColor: 'amber'
        },
        {
            id: 'now',
            title: 'El Fenómeno',
            subtitle: 'Millones de ojos',
            content: 'Lo que empezó como curiosidad se convirtió en viralidad. No por suerte, sino por entender algo que la mayoría ignora.',
            visual: '⚡',
            color: 'from-cyan-500 to-blue-600',
            glowColor: 'cyan'
        }
    ];

    return (
        <section
            id="genesis"
            ref={sectionRef}
            className="relative md:min-h-[150vh] overflow-hidden"
        >
            {/* Deep space background */}
            <div className="relative md:sticky md:top-0 min-h-screen md:h-screen md:overflow-hidden">
                {/* Animated gradient background */}
                <div
                    className="absolute inset-0 transition-all duration-1000"
                    style={{
                        background: `radial-gradient(ellipse at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, 
                            rgba(139, 92, 246, 0.15) 0%, 
                            rgba(15, 15, 25, 1) 50%, 
                            rgba(5, 5, 10, 1) 100%)`
                    }}
                />

                {/* Floating orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: `${Math.random() * 4 + 1}px`,
                                height: `${Math.random() * 4 + 1}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                background: i % 3 === 0
                                    ? 'rgba(245, 158, 11, 0.6)'
                                    : i % 3 === 1
                                        ? 'rgba(139, 92, 246, 0.6)'
                                        : 'rgba(6, 182, 212, 0.6)',
                                boxShadow: `0 0 ${10 + Math.random() * 20}px currentColor`,
                                animation: `float ${8 + Math.random() * 12}s infinite ease-in-out`,
                                animationDelay: `${Math.random() * 5}s`,
                                transform: `translate(${mousePosition.x * (i % 5) * 0.5}px, ${mousePosition.y * (i % 5) * 0.5}px)`
                            }}
                        />
                    ))}
                </div>

                {/* Nebula effect */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: `
                            radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 40%),
                            radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.2) 0%, transparent 40%),
                            radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)
                        `,
                        transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`
                    }}
                />

                {/* Content container */}
                <div className="relative z-10 min-h-screen md:h-full flex flex-col items-center justify-center py-12 md:py-0 px-6">

                    {/* Header - always visible */}
                    <div
                        className={`text-center mb-6 md:mb-8 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-sm text-gray-400 uppercase tracking-widest">La Historia</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-white mb-3">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-amber-400 to-cyan-400">
                                Génesis
                            </span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-500 max-w-lg mx-auto">
                            Cómo un experimento con IA se convirtió en algo más
                        </p>
                    </div>

                    {/* Chapter cards */}
                    <div className="w-full max-w-5xl">
                        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                            {chapters.map((chapter, index) => (
                                <div
                                    key={chapter.id}
                                    className={`group relative p-6 rounded-3xl border transition-all duration-500 cursor-pointer
                                        ${activeChapter === index
                                            ? 'bg-white/10 border-white/20 scale-105 shadow-2xl'
                                            : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/10'
                                        }
                                    `}
                                    style={{
                                        transitionDelay: `${index * 100}ms`,
                                        opacity: isInView ? 1 : 0,
                                        transform: isInView
                                            ? `translateY(0) scale(${activeChapter === index ? 1.05 : 1})`
                                            : 'translateY(40px)',
                                        boxShadow: activeChapter === index
                                            ? `0 0 60px rgba(${chapter.glowColor === 'violet' ? '139, 92, 246' : chapter.glowColor === 'amber' ? '245, 158, 11' : '6, 182, 212'}, 0.3)`
                                            : 'none'
                                    }}
                                >
                                    {/* Glow effect */}
                                    <div
                                        className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${chapter.color}`}
                                        style={{ filter: 'blur(40px)', transform: 'scale(0.8)' }}
                                    />

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <span className="text-4xl md:text-5xl mb-3 block">{chapter.visual}</span>
                                        <span className={`text-xs uppercase tracking-widest bg-gradient-to-r ${chapter.color} bg-clip-text text-transparent font-semibold`}>
                                            {chapter.subtitle}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-bold text-white mt-2 mb-2">{chapter.title}</h3>
                                        <p className="text-sm md:text-base text-gray-400 leading-relaxed">{chapter.content}</p>

                                        {/* Progress indicator */}
                                        <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-r ${chapter.color} transition-all duration-1000`}
                                                style={{
                                                    width: activeChapter >= index ? '100%' : '0%',
                                                    transitionDelay: activeChapter >= index ? `${index * 200}ms` : '0ms'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div
                        className={`mt-8 md:mt-12 text-center transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '600ms' }}
                    >
                        <p className="text-gray-600 mb-4">¿Quieres conocer los detalles?</p>
                        <a
                            href="/blog/como-cree-paquito"
                            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105"
                        >
                            <span>La historia completa</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                    </div>

                    {/* Scroll indicator - Only show on desktop since mobile scrolls normally */}
                    <div
                        className={`hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${scrollProgress > 0.5 ? 'opacity-0' : 'opacity-50'}`}
                    >
                        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
