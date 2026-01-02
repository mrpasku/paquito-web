'use client';

import Link from 'next/link';
import SocialLinks from './SocialLinks';
import CharacterSphere from './CharacterSphere';
import { getAllCharacters, getMainCharacter, getSecondaryCharacters, getCharacterPath } from '@/lib/characters';

// Static Hero for root page - doesn't depend on CharacterProvider context
// This is a simpler version that works on the main landing page
export default function HeroStatic() {
    const character = getMainCharacter(); // Always Paquito for root page
    const allCharacters = getAllCharacters();
    const satellites = allCharacters.filter(c => c.id !== 'paquito');

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-jungle"></div>

            {/* Animated Glow Orbs */}
            <div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[150px] rounded-full animate-pulse-slow"
                style={{ backgroundColor: `rgba(${character.colors.primaryRgb}, 0.2)` }}
            />
            <div
                className="absolute bottom-0 left-1/4 w-[300px] h-[300px] blur-[100px] rounded-full"
                style={{ backgroundColor: `rgba(${character.colors.glowRgb}, 0.1)` }}
            />
            <div
                className="absolute top-1/4 right-1/4 w-[200px] h-[200px] blur-[80px] rounded-full animate-float"
                style={{ backgroundColor: `rgba(${character.colors.primaryRgb}, 0.15)` }}
            />

            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                {/* Character Spheres Container */}
                <div className="relative mb-8">
                    {/* Satellite Spheres */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {satellites.map((satChar, index) => {
                            const positions = [
                                { x: -120, y: -80 },
                                { x: 120, y: -60 },
                                { x: 0, y: 100 },
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

                    {/* Main Character Sphere - Paquito */}
                    <div className="relative z-10 flex justify-center">
                        <CharacterSphere
                            character={character}
                            isMain={true}
                            isActive={true}
                        />
                    </div>
                </div>

                {/* Name & Tagline */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
                    <span
                        className="text-glow-intense bg-clip-text text-transparent"
                        style={{ backgroundImage: character.colors.gradient }}
                    >
                        PAQUITO LIVE ASMR
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-jungle-300 mb-4 max-w-2xl mx-auto leading-relaxed">
                    {character.description}
                </p>

                <p
                    className="text-base mb-8 font-medium tracking-wide"
                    style={{ color: character.colors.primary }}
                >
                    ASMR · MUKBANG · ENTRETENIMIENTO
                </p>

                {/* Social Links */}
                <div className="flex justify-center mb-10">
                    <SocialLinks size="lg" />
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/ofertas" className="btn-cta">
                        Ver Ofertas Exclusivas
                    </Link>
                    <Link href="/blog" className="btn-secondary">
                        Leer Blog
                    </Link>
                </div>

                {/* Stats */}
                <div className="mt-12 flex justify-center gap-8 md:gap-12 text-jungle-400">
                    <div className="text-center">
                        <p
                            className="text-2xl md:text-3xl font-bold"
                            style={{ color: character.colors.primary }}
                        >
                            {character.stats.followers}
                        </p>
                        <p className="text-sm uppercase tracking-wider">Seguidores</p>
                    </div>
                    <div className="text-center">
                        <p
                            className="text-2xl md:text-3xl font-bold"
                            style={{ color: character.colors.primary }}
                        >
                            {character.stats.views}
                        </p>
                        <p className="text-sm uppercase tracking-wider">Reproducciones</p>
                    </div>
                    <div className="text-center">
                        <p
                            className="text-2xl md:text-3xl font-bold"
                            style={{ color: character.colors.primary }}
                        >
                            {character.stats.reach}
                        </p>
                        <p className="text-sm uppercase tracking-wider">Alcance</p>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div
                    className="w-6 h-10 border-2 rounded-full flex justify-center pt-2"
                    style={{ borderColor: `rgba(${character.colors.primaryRgb}, 0.5)` }}
                >
                    <div
                        className="w-1 h-3 rounded-full animate-pulse"
                        style={{ backgroundColor: character.colors.primary }}
                    />
                </div>
            </div>
        </section>
    );
}
