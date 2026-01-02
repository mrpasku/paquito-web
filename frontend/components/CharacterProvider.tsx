// @ts-nocheck
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Character, getCharacterBySlug, getMainCharacter, getAllCharacters } from '@/lib/characters';
import { usePathname } from 'next/navigation';

interface CharacterContextType {
    character: Character;
    allCharacters: Character[];
    setCharacter: (char: Character) => void;
    isTransitioning: boolean;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function useCharacter() {
    const context = useContext(CharacterContext);
    if (!context) {
        throw new Error('useCharacter must be used within a CharacterProvider');
    }
    return context;
}

interface CharacterProviderProps {
    children: React.ReactNode;
    initialCharacter?: Character;
}

export default function CharacterProvider({ children, initialCharacter }: CharacterProviderProps) {
    const pathname = usePathname();
    const defaultChar: Character = initialCharacter || getMainCharacter();
    const [character, setCharacterState] = useState(defaultChar);
    const defaultTransition: boolean = false;
    const [isTransitioning, setIsTransitioning] = useState(defaultTransition);
    const allCharacters = getAllCharacters();

    // Detect character from URL path
    useEffect(() => {
        const pathSegments = pathname.split('/').filter(Boolean);
        const firstSegment = pathSegments[0] || '';

        const detectedCharacter = getCharacterBySlug(firstSegment);
        if (detectedCharacter && detectedCharacter.id !== character.id) {
            setIsTransitioning(true);
            setCharacterState(detectedCharacter);

            // Reset transition state after animation
            setTimeout(() => setIsTransitioning(false), 300);
        }
    }, [pathname, character.id]);

    // Apply character theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-character', character.id);

        // Update meta theme-color for mobile browsers
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.setAttribute('content', character.colors.primary);
        }
    }, [character]);

    const setCharacter = (char: Character) => {
        setIsTransitioning(true);
        setCharacterState(char);
        setTimeout(() => setIsTransitioning(false), 300);
    };

    return (
        <CharacterContext.Provider value={{
            character,
            allCharacters,
            setCharacter,
            isTransitioning
        }}>
            <div className={`transition-colors duration-300 ${isTransitioning ? 'opacity-95' : 'opacity-100'}`}>
                {children}
            </div>
        </CharacterContext.Provider>
    );
}
