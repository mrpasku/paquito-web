import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdSense from '@/components/AdSense'
import CharacterProvider from '@/components/CharacterProvider'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-display',
})

export const metadata: Metadata = {
    title: {
        default: 'Paquito Live ASMR | Ofertas y Blog',
        template: '%s | Paquito Live ASMR',
    },
    description: 'El macaco más relajante de internet. Ofertas exclusivas, contenido ASMR y las mejores recomendaciones.',
    openGraph: {
        title: 'Paquito Live ASMR',
        description: 'El macaco más relajante de internet. Ofertas exclusivas y contenido premium.',
        url: 'https://paquitoliveasmr.com',
        siteName: 'Paquito Live ASMR',
        locale: 'es_ES',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es" className={inter.variable}>
            <head>
                <meta name="theme-color" content="#f59e0b" />
            </head>
            <body className={`${inter.className} antialiased`}>
                <CharacterProvider>
                    <AdSense pId="ca-pub-XXXXXXXXXXXXXXXX" />
                    <Header />
                    <main className="min-h-screen">
                        {children}
                    </main>
                    <Footer />
                </CharacterProvider>
            </body>
        </html>
    )
}

