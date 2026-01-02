'use client';

// Custom SVG icons for all platforms
const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const YoutubeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const EmailIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
);

const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
    </svg>
);

type SocialLink = {
    name: string;
    url: string;
    icon: React.ReactNode;
    color: string;
    isPlaceholder?: boolean;
};

const socialLinks: SocialLink[] = [
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/paquitoliveasmr_/',
        icon: <InstagramIcon />,
        color: 'hover:text-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]',
    },
    {
        name: 'TikTok',
        url: 'https://www.tiktok.com/@paquitoliveasmr',
        icon: <TikTokIcon />,
        color: 'hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]',
    },
    {
        name: 'YouTube',
        url: 'https://www.youtube.com/@paquitoliveasmrofficial',
        icon: <YoutubeIcon />,
        color: 'hover:text-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]',
    },
    {
        name: 'X',
        url: 'https://x.com/paquitoliveasmr',
        icon: <XIcon />,
        color: 'hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]',
    },
    {
        name: 'Email',
        url: 'mailto:paquitoliveasmr@gmail.com',
        icon: <EmailIcon />,
        color: 'hover:text-paquito-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]',
    },
    {
        name: 'Teléfono',
        url: '#', // Placeholder - número no disponible aún
        icon: <PhoneIcon />,
        color: 'hover:text-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]',
        isPlaceholder: true,
    },
];

type SocialLinksProps = {
    size?: 'sm' | 'md' | 'lg';
    showLabels?: boolean;
    className?: string;
    showContact?: boolean; // Show email and phone
};

export default function SocialLinks({ size = 'md', showLabels = false, className = '', showContact = true }: SocialLinksProps) {
    const sizeClasses = {
        sm: 'p-2',
        md: 'p-3',
        lg: 'p-4',
    };

    // Filter out contact links if showContact is false
    const linksToShow = showContact
        ? socialLinks
        : socialLinks.filter(link => link.name !== 'Email' && link.name !== 'Teléfono');

    return (
        <div className={`flex items-center gap-3 flex-wrap ${className}`}>
            {linksToShow.map((social) => (
                <a
                    key={social.name}
                    href={social.isPlaceholder ? undefined : social.url}
                    target={social.url.startsWith('mailto:') || social.isPlaceholder ? undefined : '_blank'}
                    rel={social.url.startsWith('mailto:') || social.isPlaceholder ? undefined : 'noopener noreferrer'}
                    className={`
                        ${sizeClasses[size]}
                        rounded-full
                        bg-jungle-900/50
                        border border-paquito-900/30
                        text-paquito-300
                        transition-all duration-300
                        ${social.isPlaceholder
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:scale-110 hover:border-paquito-500/50 ' + social.color
                        }
                    `}
                    aria-label={social.name}
                    title={social.isPlaceholder ? 'Próximamente' : social.name}
                    onClick={social.isPlaceholder ? (e) => e.preventDefault() : undefined}
                >
                    {social.icon}
                    {showLabels && (
                        <span className="ml-2 text-sm font-medium">
                            {social.isPlaceholder ? `${social.name} (Próximamente)` : social.name}
                        </span>
                    )}
                </a>
            ))}
        </div>
    );
}

// Export contact info for use in other components
export const contactInfo = {
    email: 'paquitoliveasmr@gmail.com',
    phone: null as string | null, // Placeholder - null hasta que haya número
};
