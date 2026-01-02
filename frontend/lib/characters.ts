// Sistema de personajes - Configuración central para multi-character theming
// Cada personaje tiene su propia paleta de colores, rutas y metadata

export interface CharacterColors {
    primary: string;      // Color principal (hex)
    primaryRgb: string;   // RGB para opacidades
    glow: string;         // Color de glow/brillo
    glowRgb: string;
    light: string;        // Versión clara
    dark: string;         // Versión oscura
    gradient: string;     // Gradiente CSS
}

export interface CharacterStats {
    followers: string;
    views: string;
    reach: string;
}

export interface CharacterSocial {
    tiktok?: string;
    instagram?: string;
    youtube?: string;
    discord?: string;
    twitter?: string;
}

export interface Character {
    id: 'paquito' | 'pablito' | 'sarita' | 'abuela';
    name: string;
    displayName: string;      // Nombre completo para títulos
    slug: string;             // '' para paquito (root), 'pablito', etc.
    tagline: string;          // Descripción corta
    description: string;      // Descripción larga
    avatar: string;           // Path a imagen de avatar
    keywords: string[];       // Para SEO
    colors: CharacterColors;
    stats: CharacterStats;
    social: CharacterSocial;
    spherePosition: {         // Posición de la esfera en el Hero
        x: number;            // Porcentaje desde el centro
        y: number;
    };
}

// Configuración de todos los personajes
export const characters: Character[] = [
    {
        id: 'paquito',
        name: 'Paquito',
        displayName: 'Paquito Universe',
        slug: '',
        tagline: 'Únete a la Paquito Army',
        description: 'El macaco más macaco de internet',
        avatar: '/images/paquito-avatar.jpg',
        keywords: ['paquito', 'asmr', 'mukbang', 'macaco', 'relajante'],
        colors: {
            primary: '#f59e0b',
            primaryRgb: '245, 158, 11',
            glow: '#ea580c',
            glowRgb: '234, 88, 12',
            light: '#fbbf24',
            dark: '#d97706',
            gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ea580c 100%)',
        },
        stats: {
            followers: '1M+',
            views: '100M+',
            reach: 'Global',
        },
        social: {
            tiktok: 'https://tiktok.com/@paquitoliveasmr',
            instagram: 'https://www.instagram.com/paquitoliveasmr_/',
            youtube: 'https://youtube.com/@paquitoliveasmrofficial',
            discord: 'https://discord.gg/paquito',
        },
        spherePosition: { x: 0, y: 0 },
    },
    {
        id: 'pablito',
        name: 'Pablito',
        displayName: 'Pablito ASMR',
        slug: 'pablito',
        tagline: 'El segundo al mando',
        description: 'Contenido ASMR y entretenimiento con un toque único.',
        avatar: '/images/pablito-avatar.png',
        keywords: ['pablito', 'asmr', 'entretenimiento'],
        colors: {
            primary: '#38bdf8',
            primaryRgb: '56, 189, 248',
            glow: '#0ea5e9',
            glowRgb: '14, 165, 233',
            light: '#7dd3fc',
            dark: '#0284c7',
            gradient: 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #0ea5e9 100%)',
        },
        stats: {
            followers: '500K+',
            views: '50M+',
            reach: 'Global',
        },
        social: {
            tiktok: 'https://tiktok.com/@pablito',
            instagram: 'https://instagram.com/@pablito',
        },
        spherePosition: { x: 60, y: -40 },
    },
    {
        id: 'sarita',
        name: 'Sarita',
        displayName: 'Sarita ASMR',
        slug: 'sarita',
        tagline: 'Dulzura y relajación',
        description: 'Contenido ASMR suave y reconfortante.',
        avatar: '/images/sarita-avatar.png',
        keywords: ['sarita', 'asmr', 'relajación', 'dulce'],
        colors: {
            primary: '#f472b6',
            primaryRgb: '244, 114, 182',
            glow: '#ec4899',
            glowRgb: '236, 72, 153',
            light: '#f9a8d4',
            dark: '#db2777',
            gradient: 'linear-gradient(135deg, #f9a8d4 0%, #f472b6 50%, #ec4899 100%)',
        },
        stats: {
            followers: '300K+',
            views: '30M+',
            reach: 'Global',
        },
        social: {
            tiktok: 'https://tiktok.com/@sarita',
            instagram: 'https://instagram.com/@sarita',
        },
        spherePosition: { x: -70, y: 20 },
    },
    {
        id: 'abuela',
        name: 'La Abuela',
        displayName: 'La Abuela ASMR',
        slug: 'abuela',
        tagline: 'Sabiduría y calidez',
        description: 'Contenido ASMR con el cariño de una abuela.',
        avatar: '/images/abuela-avatar.jpg',
        keywords: ['abuela', 'asmr', 'sabiduría', 'calidez'],
        colors: {
            primary: '#be185d',
            primaryRgb: '190, 24, 93',
            glow: '#9d174d',
            glowRgb: '157, 23, 77',
            light: '#f472b6',
            dark: '#831843',
            gradient: 'linear-gradient(135deg, #f472b6 0%, #be185d 50%, #9d174d 100%)',
        },
        stats: {
            followers: '200K+',
            views: '20M+',
            reach: 'Global',
        },
        social: {
            tiktok: 'https://tiktok.com/@laabuela',
            instagram: 'https://instagram.com/@laabuela',
        },
        spherePosition: { x: 70, y: 30 },
    },
];

// Helper functions

export function getAllCharacters(): Character[] {
    return characters;
}

export function getCharacterById(id: Character['id']): Character | undefined {
    return characters.find(char => char.id === id);
}

export function getCharacterBySlug(slug: string): Character | undefined {
    // Empty slug means Paquito (root)
    if (!slug || slug === '') {
        return characters.find(char => char.id === 'paquito');
    }
    return characters.find(char => char.slug === slug);
}

export function getMainCharacter(): Character {
    return characters.find(char => char.id === 'paquito')!;
}

export function getSecondaryCharacters(): Character[] {
    return characters.filter(char => char.id !== 'paquito');
}

export function getCharacterPath(character: Character, subPath: string = ''): string {
    const basePath = character.slug ? `/${character.slug}` : '';
    return subPath ? `${basePath}/${subPath}` : basePath || '/';
}

export function isValidCharacterSlug(slug: string): boolean {
    return characters.some(char => char.slug === slug) || slug === '';
}

// CSS variable name for a character
export function getCharacterCssVar(character: Character): string {
    return character.id;
}

// Get default character (Paquito)
export const DEFAULT_CHARACTER = characters[0];

// Character IDs type for type safety
export type CharacterId = Character['id'];

// Valid slugs for routing
export const VALID_CHARACTER_SLUGS = characters
    .filter(c => c.slug !== '')
    .map(c => c.slug);
