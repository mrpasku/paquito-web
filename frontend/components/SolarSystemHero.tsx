'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Character, getAllCharacters, getCharacterPath } from '@/lib/characters';

interface SolarSystemHeroProps {
    activeCharacterId?: string;
}

// Fixed positions for 4 planets
const POSITIONS = {
    front: { scale: 1.3, blur: 0, opacity: 1, y: 60, z: 100, x: 0 },
    left: { scale: 0.85, blur: 1.5, opacity: 0.8, y: 10, z: 50, x: -180 },
    right: { scale: 0.85, blur: 1.5, opacity: 0.8, y: 10, z: 50, x: 180 },
    back: { scale: 0.55, blur: 2.5, opacity: 0.5, y: -60, z: 0, x: 0 },
};

// Social icons data
const socialIcons = [
    { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z', url: 'https://instagram.com/paquitoliveasmr' },
    { name: 'TikTok', icon: 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z', url: 'https://tiktok.com/@paquitoliveasmr' },
    { name: 'YouTube', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z', url: 'https://youtube.com/@paquitoliveasmrofficial' },
    { name: 'X', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z', url: 'https://x.com/paquitoliveasmr' },
];

export default function SolarSystemHero({ activeCharacterId = 'paquito' }: SolarSystemHeroProps) {
    const router = useRouter();
    const allCharacters = getAllCharacters();
    const canvasRef = React.useRef(null);

    const activeCharacter = allCharacters.find(c => c.id === activeCharacterId) || allCharacters[0];

    // Reorder characters
    const getOrderedCharacters = (): { character: Character; position: keyof typeof POSITIONS }[] => {
        const positions: (keyof typeof POSITIONS)[] = ['front', 'right', 'back', 'left'];
        const ordered: { character: Character; position: keyof typeof POSITIONS }[] = [];
        ordered.push({ character: activeCharacter, position: 'front' });
        let posIndex = 1;
        for (let i = 0; i < allCharacters.length; i++) {
            if (allCharacters[i].id !== activeCharacterId) {
                ordered.push({ character: allCharacters[i], position: positions[posIndex] });
                posIndex++;
            }
        }
        return ordered;
    };

    const orderedCharacters = getOrderedCharacters();

    // Animated particles with subtle luminous trails
    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const primaryRgb = activeCharacter.colors.primaryRgb.split(',').map(Number);
        const glowRgb = activeCharacter.colors.glowRgb.split(',').map(Number);

        interface Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: number[];
            alpha: number;
            trail: { x: number; y: number; alpha: number }[];
        }

        const particles: Particle[] = [];
        const particleCount = 80;

        for (let i = 0; i < particleCount; i++) {
            const colorMix = Math.random();
            let color: number[];
            if (colorMix < 0.4) {
                color = primaryRgb;
            } else if (colorMix < 0.6) {
                color = glowRgb;
            } else {
                color = [255, 255, 255];
            }

            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 2 + 1,
                color,
                alpha: Math.random() * 0.7 + 0.3,
                trail: [],
            });
        }

        let animationId: number;
        const maxTrailLength = 5;

        const animate = () => {
            // Clear with dark background - higher contrast
            ctx.fillStyle = '#030308';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add colored nebula gradient in center for color contrast
            const centerGradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, 400
            );
            centerGradient.addColorStop(0, `rgba(${primaryRgb.join(',')}, 0.08)`);
            centerGradient.addColorStop(0.5, `rgba(${glowRgb.join(',')}, 0.03)`);
            centerGradient.addColorStop(1, 'transparent');
            ctx.fillStyle = centerGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                // Store current position in trail
                p.trail.unshift({ x: p.x, y: p.y, alpha: p.alpha });
                if (p.trail.length > maxTrailLength) {
                    p.trail.pop();
                }

                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw luminous trail (subtle glow)
                p.trail.forEach((point, index) => {
                    const trailAlpha = (1 - index / maxTrailLength) * 0.3 * p.alpha;
                    const trailSize = p.size * (1 - index / maxTrailLength * 0.5);

                    const trailGradient = ctx.createRadialGradient(
                        point.x, point.y, 0,
                        point.x, point.y, trailSize * 4
                    );
                    trailGradient.addColorStop(0, `rgba(${p.color.join(',')}, ${trailAlpha})`);
                    trailGradient.addColorStop(1, 'transparent');

                    ctx.beginPath();
                    ctx.arc(point.x, point.y, trailSize * 4, 0, Math.PI * 2);
                    ctx.fillStyle = trailGradient;
                    ctx.fill();
                });

                // Draw main particle with glow
                const gradient = ctx.createRadialGradient(
                    p.x, p.y, 0,
                    p.x, p.y, p.size * 4
                );
                gradient.addColorStop(0, `rgba(${p.color.join(',')}, ${p.alpha})`);
                gradient.addColorStop(0.3, `rgba(${p.color.join(',')}, ${p.alpha * 0.5})`);
                gradient.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Bright core
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.9})`;
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, [activeCharacter.colors.primaryRgb, activeCharacter.colors.glowRgb]);

    const handlePlanetClick = (character: Character) => {
        router.push(getCharacterPath(character));
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030308]">
            {/* Animated particle canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
            />

            <div className="relative z-20 w-full max-w-5xl mx-auto px-4">
                {/* Orbital System */}
                <div className="relative h-[320px] mx-auto mb-6">
                    {/* Orbital ring */}
                    <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                            width: '450px',
                            height: '100px',
                            border: `1px solid ${activeCharacter.colors.primary}15`,
                            borderRadius: '50%',
                            transform: 'translate(-50%, -50%) rotateX(70deg)',
                        }}
                    />

                    {/* Central glow */}
                    <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full pointer-events-none"
                        style={{
                            background: `radial-gradient(circle, ${activeCharacter.colors.light}60 0%, ${activeCharacter.colors.primary}30 50%, transparent 100%)`,
                            boxShadow: `0 0 30px ${activeCharacter.colors.primary}40`,
                        }}
                    />

                    {/* Planets */}
                    {orderedCharacters.map(({ character, position }) => {
                        const pos = POSITIONS[position];
                        const baseSize = 95;
                        const size = baseSize * pos.scale;

                        return (
                            <button
                                key={character.id}
                                onClick={() => handlePlanetClick(character)}
                                className="absolute left-1/2 top-1/2 transition-all duration-700 ease-out group focus:outline-none"
                                style={{
                                    transform: `translate(-50%, -50%) translateX(${pos.x}px) translateY(${pos.y}px)`,
                                    zIndex: pos.z,
                                    filter: `blur(${pos.blur}px)`,
                                    opacity: pos.opacity,
                                }}
                            >
                                <div
                                    className="absolute inset-[-12px] rounded-full"
                                    style={{
                                        background: `radial-gradient(circle, ${character.colors.primary}40 0%, transparent 70%)`,
                                        filter: 'blur(12px)',
                                    }}
                                />
                                <div
                                    className="relative rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105"
                                    style={{
                                        width: `${size}px`,
                                        height: `${size}px`,
                                        boxShadow: `
                                            0 0 ${12 * pos.scale}px ${character.colors.glow}70,
                                            inset -${5 * pos.scale}px -${5 * pos.scale}px ${12 * pos.scale}px rgba(0,0,0,0.5),
                                            inset ${3 * pos.scale}px ${3 * pos.scale}px ${6 * pos.scale}px rgba(255,255,255,0.15)
                                        `,
                                        border: `2px solid ${character.colors.primary}50`,
                                    }}
                                >
                                    <Image
                                        src={character.avatar}
                                        alt={character.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 40%)`,
                                        }}
                                    />
                                </div>
                                {position === 'front' && (
                                    <div
                                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold"
                                        style={{
                                            color: character.colors.light,
                                            textShadow: `0 0 15px ${character.colors.primary}`,
                                        }}
                                    >
                                        {character.name}
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Social Icons - Enhanced hover animations */}
                <div className="flex justify-center gap-5 mb-10">
                    {socialIcons.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125 hover:-translate-y-2 hover:rotate-6 group"
                            style={{
                                backgroundColor: 'rgba(20, 20, 30, 0.9)',
                                border: `2px solid ${activeCharacter.colors.primary}40`,
                                boxShadow: `0 0 0 ${activeCharacter.colors.primary}00`,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = `0 0 25px ${activeCharacter.colors.primary}60, 0 8px 20px rgba(0,0,0,0.4)`;
                                e.currentTarget.style.borderColor = activeCharacter.colors.primary;
                                e.currentTarget.style.backgroundColor = `rgba(${activeCharacter.colors.primaryRgb}, 0.15)`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = `0 0 0 ${activeCharacter.colors.primary}00`;
                                e.currentTarget.style.borderColor = `${activeCharacter.colors.primary}40`;
                                e.currentTarget.style.backgroundColor = 'rgba(20, 20, 30, 0.9)';
                            }}
                            aria-label={social.name}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="w-6 h-6 transition-all duration-300 group-hover:scale-110"
                                style={{ fill: activeCharacter.colors.primary }}
                            >
                                <path d={social.icon} />
                            </svg>
                        </a>
                    ))}
                </div>

                {/* Character Info */}
                <div className="text-center">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-5 tracking-tight">
                        <span
                            className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage: activeCharacter.colors.gradient,
                                filter: `drop-shadow(0 0 25px ${activeCharacter.colors.primary}60)`,
                            }}
                        >
                            {activeCharacter.displayName.toUpperCase()}
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-3 max-w-2xl mx-auto">
                        {activeCharacter.description}
                    </p>

                    <p
                        className="text-base mb-8 font-semibold tracking-widest uppercase"
                        style={{
                            color: activeCharacter.colors.light,
                            textShadow: `0 0 15px ${activeCharacter.colors.primary}50`,
                        }}
                    >
                        {activeCharacter.tagline}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap justify-center gap-5 items-center mb-10">
                        <Link
                            href="/cursos"
                            className="px-10 py-4 text-lg font-bold text-white rounded-full transition-all duration-300 hover:scale-105"
                            style={{
                                background: activeCharacter.colors.gradient,
                                boxShadow: `0 0 25px ${activeCharacter.colors.primary}40`,
                            }}
                        >
                            Academia
                        </Link>

                        <Link
                            href={getCharacterPath(activeCharacter, 'blog')}
                            className="px-10 py-4 text-lg font-bold rounded-full border-2 transition-all duration-300 hover:scale-105"
                            style={{
                                borderColor: activeCharacter.colors.primary,
                                color: activeCharacter.colors.light,
                            }}
                        >
                            Blogs
                        </Link>

                        <Link
                            href={getCharacterPath(activeCharacter, 'ofertas')}
                            className="px-10 py-4 text-lg font-bold text-white rounded-full transition-all duration-300 hover:scale-105"
                            style={{
                                background: activeCharacter.colors.gradient,
                                boxShadow: `0 0 25px ${activeCharacter.colors.primary}40`,
                            }}
                        >
                            Los Preferidos
                        </Link>
                    </div>

                    {/* New Action Buttons (Video & B2B) */}
                    <div className="flex flex-col items-center gap-6 mb-16 animate-fade-in-up delay-300">
                        <Link
                            href="/video-personalizado"
                            className="w-full max-w-md px-8 py-4 text-white rounded-full font-bold text-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
                            style={{
                                background: activeCharacter.colors.gradient,
                                boxShadow: `0 0 30px ${activeCharacter.colors.primary}40`,
                            }}
                        >
                            <span>Video Personalizado (30s)</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </Link>

                        <Link
                            href="/b2b"
                            className="font-medium text-sm border-b border-transparent transition-all uppercase tracking-wide hover:opacity-80"
                            style={{ color: activeCharacter.colors.light, borderColor: 'transparent' }}
                            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.borderColor = activeCharacter.colors.primary}
                            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.borderColor = 'transparent'}
                        >
                            Colaboraciones / Media Kit
                        </Link>
                    </div>

                    {/* Interactive hint - More space above scroll indicator */}
                    <div className="mb-20">
                        <button
                            onClick={() => {
                                const nextChar = allCharacters.find(c => c.id !== activeCharacterId);
                                if (nextChar) router.push(getCharacterPath(nextChar));
                            }}
                            className="text-gray-500 text-sm hover:text-gray-300 transition-colors duration-300 cursor-pointer group"
                        >
                            <span className="inline-block group-hover:animate-bounce">🌍</span>
                            {' '}Haz clic en cualquier planeta para explorarlo{' '}
                            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll indicator - Well separated */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                <div
                    className="w-6 h-10 border-2 rounded-full flex justify-center pt-2"
                    style={{ borderColor: `${activeCharacter.colors.primary}30` }}
                >
                    <div
                        className="w-1 h-2.5 rounded-full"
                        style={{ backgroundColor: activeCharacter.colors.primary }}
                    />
                </div>
            </div>
        </section>
    );
}
