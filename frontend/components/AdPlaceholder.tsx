import React from 'react';

type AdPlaceholderProps = {
    slot: string;
    format?: 'auto' | 'fluid' | 'rectangle';
    responsive?: boolean;
    style?: React.CSSProperties;
};

export default function AdPlaceholder({ slot, format = 'auto', responsive = true, style }: AdPlaceholderProps) {
    return (
        <div className="ad-container my-8 text-center overflow-hidden">
            <span className="text-xs text-gray-600 uppercase tracking-wider mb-2 block">Publicidad</span>
            <ins
                className="adsbygoogle block"
                style={style || { display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with actual ID
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive}
            />
        </div>
    );
}
