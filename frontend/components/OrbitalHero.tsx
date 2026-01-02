'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Character, getAllCharacters, getCharacterPath } from '@/lib/characters';

interface OrbitalHeroProps {
    activeCharacterId?: string;
}

export default function OrbitalHero({ activeCharacterId = 'paquito' }: OrbitalHeroProps) {
    const router = useRouter();
    const allCharacters = getAllCharacters();

    // Find which index the active character is at
    const activeIndex = allCharacters.findIndex(c => c.id === activeCharacterId);

    // Rotation offset to put active character at front (bottom of ellipse)
    const baseOffset = activeIndex >= 0 ? -activeIndex * (360 / allCharacters.length) - 90 : -90;
    const [rotationOffset, setRotationOffset] = React.useState(baseOffset);
    const [isAnimating, setIsAnimating] = React.useState(false);

    // Get character at a specific orbital position
    const getCharacterAtAngle = (targetAngle: number): Character => {
        const totalChars = allCharacters.length;
        const degreesPerChar = 360 / totalChars;
        // Normalize the angle
        const normalizedAngle = ((targetAngle % 360) + 360) % 360;
        const charIndex = Math.round(normalizedAngle / degreesPerChar) % totalChars;
        return allCharacters[charIndex];
    };

    const handleCharacterClick = (character: Character, charIndex: number) => {
        if (isAnimating) return;

        // Calculate target rotation to bring this character to front (bottom, 270°)
        const currentAngle = charIndex * (360 / allCharacters.length);
        const targetOffset = -currentAngle - 90; // -90 puts it at bottom (front)

        // Find shortest rotation path
        let diff = targetOffset - rotationOffset;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;

        const newRotation = rotationOffset + diff;

        setIsAnimating(true);
        setRotationOffset(newRotation);

        // After animation completes, navigate
        setTimeout(() => {
            setIsAnimating(false);
            router.push(getCharacterPath(character));
        }, 800);
    };

    // Get the character currently at the front position
    const getFrontCharacter = (): Character => {
        const frontAngle = -rotationOffset - 90;
        const normalizedAngle = ((frontAngle % 360) + 360) % 360;
        const totalChars = allCharacters.length;
        const degreesPerChar = 360 / totalChars;
        const charIndex = Math.round(normalizedAngle / degreesPerChar) % totalChars;
        return allCharacters[charIndex >= 0 ? charIndex : charIndex + totalChars];
    };

    const frontCharacter = allCharacters.find(c => c.id === activeCharacterId) || allCharacters[0];

    // Orbital parameters
    const orbitRadiusX = 160; // Horizontal radius
    const orbitRadiusY = 60;  // Vertical radius (creates ellipse / perspective)
    const perspectiveAngle = 35; // Degrees of tilt

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-jungle" />

            {/* Central glow following front character */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] animate-pulse-slow transition-colors duration-700"
                style={{ backgroundColor: `rgba(${frontCharacter.colors.primaryRgb}, 0.2)` }}
            />

            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">

                {/* Planetary Orbital System */}
                <div
                    className="relative w-[400px] h-[300px] mx-auto mb-8"
                    style={{ perspective: '800px' }}
                >
                    {/* Orbit path (ellipse) - visual guide */}
                    <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-jungle-700/20 rounded-full pointer-events-none"
                        style={{
                            width: `${orbitRadiusX * 2}px`,
                            height: `${orbitRadiusY * 2}px`,
                            transform: `translate(-50%, -50%) rotateX(${perspectiveAngle}deg)`,
                        }}
                    />

                    {/* Orbiting Characters */}
                    <div
                        className="absolute inset-0 transition-transform duration-700 ease-out"
                        style={{
                            transformStyle: 'preserve-3d',
                            transform: `rotateX(${perspectiveAngle}deg)`,
                        }}
                    >
                        {allCharacters.map((character, index) => {
                            const angle = (index * (360 / allCharacters.length)) + rotationOffset;
                            const angleRad = (angle * Math.PI) / 180;

                            // Position on ellipse
                            const x = Math.cos(angleRad) * orbitRadiusX;
                            const y = Math.sin(angleRad) * orbitRadiusY;

                            // Z-depth for 3D effect (sine gives depth based on position in orbit)
                            const zDepth = Math.sin(angleRad);

                            // Scale based on position (front = bigger, back = smaller)
                            const isAtFront = Math.abs(((angle + 90) % 360) - 180) < 45 || Math.abs(((angle + 90) % 360) - 180) > 315;
                            const baseScale = 0.6 + (zDepth + 1) * 0.3; // 0.6 to 1.2
                            const scale = character.id === activeCharacterId ? baseScale * 1.3 : baseScale;

                            // Opacity based on depth (front = opaque, back = slightly transparent)
                            const opacity = 0.5 + (zDepth + 1) * 0.25;

                            // Z-index based on depth
                            const zIndex = Math.round((zDepth + 1) * 50);

                            // Size based on if it's the active character
                            const size = character.id === activeCharacterId ? 100 : 70;

                            return (
                                <button
                                    key={character.id}
                                    onClick={() => handleCharacterClick(character, index)}
                                    disabled={isAnimating}
                                    className="absolute left-1/2 top-1/2 transition-all duration-700 ease-out group focus:outline-none"
                                    style={{
                                        transform: `
                                            translate(-50%, -50%)
                                            translateX(${x}px)
                                            translateY(${y}px)
                                            translateZ(${zDepth * 50}px)
                                            rotateX(${-perspectiveAngle}deg)
                                            scale(${scale})
                                        `,
                                        zIndex,
                                        opacity: character.id === activeCharacterId ? 1 : opacity,
                                    }}
                                >
                                    {/* Glow ring */}
                                    <div
                                        className="absolute inset-[-8px] rounded-full blur-md transition-opacity duration-300"
                                        style={{
                                            background: character.colors.gradient,
                                            opacity: character.id === activeCharacterId ? 0.7 : 0.3,
                                        }}
                                    />

                                    {/* Planet sphere */}
                                    <div
                                        className="relative rounded-full overflow-hidden border-2 shadow-2xl transition-all duration-300 group-hover:scale-110"
                                        style={{
                                            width: `${size}px`,
                                            height: `${size}px`,
                                            borderColor: character.colors.primary,
                                            boxShadow: `
                                                0 0 ${character.id === activeCharacterId ? 40 : 20}px rgba(${character.colors.glowRgb}, 0.5),
                                                inset -10px -10px 20px rgba(0,0,0,0.3),
                                                inset 5px 5px 10px rgba(255,255,255,0.1)
                                            `,
                                        }}
                                    >
                                        <Image
                                            src={character.avatar}
                                            alt={character.name}
                                            fill
                                            className="object-cover"
                                        />

                                        {/* Sphere shine effect */}
                                        <div
                                            className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 pointer-events-none"
                                        />
                                    </div>

                                    {/* Name label */}
                                    <div
                                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-bold whitespace-nowrap transition-opacity duration-300"
                                        style={{
                                            color: character.colors.primary,
                                            opacity: character.id === activeCharacterId ? 1 : 0,
                                            textShadow: `0 0 10px rgba(${character.colors.glowRgb}, 0.5)`,
                                        }}
                                    >
                                        {character.name}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Center decoration */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <div
                            className="w-4 h-4 rounded-full animate-pulse"
                            style={{
                                background: `radial-gradient(circle, ${frontCharacter.colors.primary} 0%, transparent 70%)`,
                            }}
                        />
                    </div>
                </div>

                {/* Dynamic Title */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
                    <span
                        className="text-glow-intense bg-clip-text text-transparent transition-all duration-500"
                        style={{ backgroundImage: frontCharacter.colors.gradient }}
                    >
                        {frontCharacter.displayName.toUpperCase()}
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-jungle-300 mb-4 max-w-2xl mx-auto leading-relaxed">
                    {frontCharacter.description}
                </p>

                <p
                    className="text-base mb-8 font-medium tracking-wide transition-colors duration-500"
                    style={{ color: frontCharacter.colors.primary }}
                >
                    {frontCharacter.tagline.toUpperCase()}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href={getCharacterPath(frontCharacter, 'ofertas')}
                        className="btn-cta transition-all duration-300"
                        style={{
                            background: frontCharacter.colors.gradient,
                            boxShadow: `0 0 30px rgba(${frontCharacter.colors.glowRgb}, 0.4)`,
                        }}
                    >
                        Ver Ofertas
                    </Link>
                    <Link
                        href={getCharacterPath(frontCharacter, 'blog')}
                        className="btn-secondary transition-all duration-300"
                        style={{
                            borderColor: `rgba(${frontCharacter.colors.primaryRgb}, 0.5)`,
                            color: frontCharacter.colors.light,
                        }}
                    >
                        Leer Blog
                    </Link>
                </div>

                {/* Stats */}
                <div className="mt-12 flex justify-center gap-8 md:gap-12 text-jungle-400">
                    <div className="text-center">
                        <p
                            className="text-2xl md:text-3xl font-bold transition-colors duration-500"
                            style={{ color: frontCharacter.colors.primary }}
                        >
                            {frontCharacter.stats.followers}
                        </p>
                        <p className="text-sm uppercase tracking-wider">Seguidores</p>
                    </div>
                    <div className="text-center">
                        <p
                            className="text-2xl md:text-3xl font-bold transition-colors duration-500"
                            style={{ color: frontCharacter.colors.primary }}
                        >
                            {frontCharacter.stats.views}
                        </p>
                        <p className="text-sm uppercase tracking-wider">Reproducciones</p>
                    </div>
                    <div className="text-center">
                        <p
                            className="text-2xl md:text-3xl font-bold transition-colors duration-500"
                            style={{ color: frontCharacter.colors.primary }}
                        >
                            {frontCharacter.stats.reach}
                        </p>
                        <p className="text-sm uppercase tracking-wider">Alcance</p>
                    </div>
                </div>

                {/* Hint */}
                <p className="mt-8 text-sm text-jungle-500 animate-pulse">
                    🪐 Haz clic en un planeta para visitarlo
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div
                    className="w-6 h-10 border-2 rounded-full flex justify-center pt-2 transition-colors duration-500"
                    style={{ borderColor: `rgba(${frontCharacter.colors.primaryRgb}, 0.5)` }}
                >
                    <div
                        className="w-1 h-3 rounded-full animate-pulse transition-colors duration-500"
                        style={{ backgroundColor: frontCharacter.colors.primary }}
                    />
                </div>
            </div>
        </section>
    );
}
