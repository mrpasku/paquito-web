export default function Footer() {
    return (
        <footer className="bg-black text-gray-400 p-6 mt-10">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Paquito Web. Todos los derechos reservados.</p>
                <div className="mt-2 space-x-4 text-sm">
                    <a href="#" className="hover:text-white">Política de Privacidad</a>
                    <a href="#" className="hover:text-white">Términos y Condiciones</a>
                </div>
            </div>
        </footer>
    );
}
