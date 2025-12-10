import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdSense from '@/components/AdSense'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        default: 'Paquito Web | Ofertas y Blog de Afiliación',
        template: '%s | Paquito Web',
    },
    description: 'El mejor sitio para encontrar ofertas exclusivas y aprender sobre marketing de afiliados.',
    openGraph: {
        title: 'Paquito Web',
        description: 'Ofertas exclusivas y contenido premium.',
        url: 'https://paquito-web.vercel.app',
        siteName: 'Paquito Web',
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
        <html lang="es">
            <body className={inter.className}>
                <AdSense pId="ca-pub-XXXXXXXXXXXXXXXX" />
                <Header />
                <main className="min-h-screen bg-gray-950 text-white">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
