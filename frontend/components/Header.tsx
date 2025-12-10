import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-orange-500">
                    Paquito Web
                </Link>
                <nav className="space-x-4">
                    <Link href="/blog" className="hover:text-orange-400">Blog</Link>
                    <Link href="/ofertas" className="hover:text-orange-400">Ofertas</Link>
                </nav>
            </div>
        </header>
    );
}
