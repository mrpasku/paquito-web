'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Character, getCharacterPath } from '@/lib/characters';

interface CharacterSphereProps {
    character: Character;
    isMain?: boolean;
    isActive?: boolean;
    onClick?: () => void;
    className?: string;
}

export default function CharacterSphere({
    character,
    isMain = false,
    isActive = false,
    onClick,
    className = '',
}: CharacterSphereProps) {
    const size = isMain ? 'w-48 h-48 md:w-64 md:h-64' : 'w-16 h-16 md:w-20 md:h-20';
    const glowSize = isMain ? 'blur-xl' : 'blur-lg';
    const borderWidth = isMain ? 'border-4' : 'border-2';

    const sphereContent = (
        <div
            className={`
                relative ${size} 
                ${isMain ? 'animate-float' : 'hover:scale-110'} 
                transition-all duration-300 cursor-pointer
                ${className}
            `}
            onClick={onClick}
        >
            {/* Glow Effect */}
            <div
                className={`
                    absolute inset-0 rounded-full ${glowSize} 
                    ${isActive || isMain ? 'opacity-60 animate-glow' : 'opacity-30 hover:opacity-50'}
                    transition-opacity duration-300
                `}
                style={{
                    background: character.colors.gradient,
                }}
            />

            {/* Avatar Container */}
            <div
                className={`
                    relative w-full h-full rounded-full overflow-hidden 
                    ${borderWidth} shadow-2xl
                    transition-all duration-300
                    ${isActive ? 'ring-2 ring-offset-2 ring-offset-transparent' : ''}
                `}
                style={{
                    borderColor: `rgba(${character.colors.primaryRgb}, 0.6)`,
                    boxShadow: isMain
                        ? `0 0 40px rgba(${character.colors.glowRgb}, 0.4)`
                        : `0 0 20px rgba(${character.colors.glowRgb}, 0.3)`,
                }}
            >
                <Image
                    src={character.avatar}
                    alt={character.name}
                    fill
                    className="object-cover"
                    priority={isMain}
                />
            </div>

            {/* Name Label (for satellites) */}
            {!isMain && (
                <div
                    className="
                        absolute -bottom-6 left-1/2 -translate-x-1/2 
                        text-xs font-medium whitespace-nowrap
                        opacity-0 group-hover:opacity-100 
                        transition-opacity duration-200
                    "
                    style={{ color: character.colors.primary }}
                >
                    {character.name}
                </div>
            )}
        </div>
    );

    // If it's a satellite sphere, wrap in Link
    if (!isMain) {
        return (
            <Link
                href={getCharacterPath(character)}
                className="group"
                title={`Ver ${character.displayName}`}
            >
                {sphereContent}
            </Link>
        );
    }

    return sphereContent;
}
