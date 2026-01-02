'use client';

import Link from 'next/link';
import SocialLinks from './SocialLinks';
import CharacterSphere from './CharacterSphere';
import { useCharacter } from './CharacterProvider';
import { getSecondaryCharacters, getCharacterPath } from '@/lib/characters';

export default function Hero() {
    const { character } = useCharacter();
    const secondaryCharacters = getSecondaryCharacters();

    // Filter out the current character from satellites
    const satellites = secondaryCharacters.filter(c => c.id !== character.id);
    // If current is not paquito, add paquito to satellites
    if (character.id !== 'paquito') {
        const paquito = secondaryCharacters.find(c => c.id === 'paquito') ||
            { ...character }; // fallback
        // Actually get paquito from all characters
    }

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Effects - Now using CSS variables for character colors */}
            <div className="absolute inset-0 bg-gradient-jungle"></div>

            {/* Animated Glow Orbs - Dynamic colors */}
            <div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[150px] rounded-full animate-pulse-slow"
                style={{ backgroundColor: `rgba(var(--char-primary-rgb), 0.2)` }}
            />
            <div
                className="absolute bottom-0 left-1/4 w-[300px] h-[300px] blur-[100px] rounded-full"
                style={{ backgroundColor: `rgba(var(--char-glow-rgb), 0.1)` }}
            />
            <div
                className="absolute top-1/4 right-1/4 w-[200px] h-[200px] blur-[80px] rounded-full animate-float"
                style={{ backgroundColor: `rgba(var(--char-primary-rgb), 0.15)` }}
            />

            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                {/* Character Spheres Container */}
                <div className="relative mb-8">
                    {/* Satellite Spheres - Positioned around main */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {satellites.slice(0, 3).map((satChar, index) => {
                            // Position satellites around the main sphere
                            const positions = [
                                { x: -120, y: -80 },  // Top left
                                { x: 120, y: -60 },   // Top right
                                { x: 0, y: 100 },     // Bottom center
                            ];
                            const pos = positions[index] || { x: 0, y: 0 };

                            return (
                                <div
                                    key={satChar.id}
                                    className="absolute transition-all duration-500 hover:z-30"
                                    style={{
                                        transform: `translate(${pos.x}px, ${pos.y}px)`,
                                    }}
                                >
                                    <CharacterSphere
                                        character={satChar}
                                        isMain={false}
                                        isActive={false}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Main Character Sphere */}
                    <div className="relative z-10 flex justify-center">
                        <CharacterSphere
                            character={character}
                            isMain={true}
                            isActive={true}
                        />
                    </div>
                </div>

                {/* Name & Tagline - Dynamic */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
                    <span
                        className="text-glow-intense bg-clip-text text-transparent"
                        style={{ backgroundImage: 'var(--char-gradient)' }}
                    >
                        {character.displayName.toUpperCase()}
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-jungle-300 mb-4 max-w-2xl mx-auto leading-relaxed">
                    {character.description}
                </p>

                <p
                    className="text-base mb-8 font-medium tracking-wide"
                    style={{ color: 'var(--char-primary)' }}
                >
                    {character.tagline.toUpperCase()}
                </p>

                {/* Social Links */}
                <div className="flex justify-center mb-10">
                    <SocialLinks size="lg" />
                </div>

                {/* CTA Buttons */}
                {/* CTA Buttons */}
                <div className="flex flex-wrap justify-center gap-4 items-center">
                    <Link
                        href="/ofertas"
                        className="px-8 py-3 bg-gradient-to-r from-cta to-paquito-600 text-white rounded-full font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all duration-300"
                    >
                        Los Preferidos
                    </Link>
                    <Link
                        href="/cursos"
                        className="px-8 py-3 bg-transparent border-2 border-paquito-500 text-paquito-100 rounded-full font-bold hover:bg-paquito-500/10 hover:border-paquito-400 hover:text-white hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300"
                    >
                        Academia
                    </Link>
                    <Link
                        href="/blog"
                        className="px-8 py-3 bg-transparent border border-jungle-700 text-jungle-200 rounded-full font-bold hover:bg-jungle-800 hover:text-white transition-all duration-300"
                    >
                        Blogs
                    </Link>
                </div>

                {/* Stats - Dynamic */}
                {/* New Action Buttons */}
                <div className="mt-12 flex flex-col items-center gap-6 animate-fade-in-up delay-300">
                    <Link
                        href="/video-personalizado"
                        className="w-full max-w-md px-8 py-4 bg-gradient-to-r from-paquito-500 to-cta hover:from-paquito-400 hover:to-orange-500 text-white rounded-2xl font-bold text-lg hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(234,88,12,0.4)] transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                        <span className="text-2xl">📹</span>
                        <span>Pedir Video Personalizado (30s)</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>

                    <Link
                        href="/b2b"
                        className="text-jungle-300 hover:text-paquito-400 font-medium text-sm border-b border-transparent hover:border-paquito-400 transition-all uppercase tracking-wide"
                    >
                        Colaboraciones / Media Kit
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div
                    className="w-6 h-10 border-2 rounded-full flex justify-center pt-2"
                    style={{ borderColor: `rgba(var(--char-primary-rgb), 0.5)` }}
                >
                    <div
                        className="w-1 h-3 rounded-full animate-pulse"
                        style={{ backgroundColor: 'var(--char-primary)' }}
                    />
                </div>
            </div>
        </section>
    );
}
