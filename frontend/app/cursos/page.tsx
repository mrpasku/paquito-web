import type { Metadata } from 'next';
import CourseCard from '@/components/CourseCard';
import { getAllCourses, getCategories } from '@/content/courses/courses';

export const metadata: Metadata = {
    title: 'Cursos',
    description: 'Cursos de ASMR, IA para creadores, monetización y más. Aprende con contenido exclusivo en video y recursos descargables.',
    openGraph: {
        title: 'Cursos | Paquito Live ASMR',
        description: 'Cursos de ASMR, IA para creadores, monetización y más. Aprende con contenido exclusivo.',
    },
};

export default function CoursesPage() {
    const courses = getAllCourses();
    const categories = getCategories();

    // Group courses by category
    const coursesByCategory = categories
        .map(cat => ({
            ...cat,
            courses: courses.filter(course => course.category === cat.id)
        }))
        .filter(cat => cat.courses.length > 0);

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-paquito">
                        Cursos
                    </h1>
                    <p className="text-xl text-jungle-400 max-w-2xl mx-auto">
                        Aprende con contenido exclusivo: vídeos profesionales, recursos descargables y guías paso a paso
                    </p>
                </div>

                {/* Coming Soon Banner */}
                <div className="mb-12 p-6 card-premium text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-paquito-500 text-white uppercase tracking-wider">
                            Próximamente
                        </span>
                    </div>
                    <p className="text-jungle-300 max-w-xl mx-auto">
                        Estamos preparando contenido de alta calidad. Los cursos estarán disponibles pronto.
                        ¡Suscríbete a la newsletter para ser el primero en enterarte!
                    </p>
                </div>

                {/* Courses by Category */}
                {coursesByCategory.map((category) => (
                    <section key={category.id} id={category.id} className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-paquito-100">
                                {category.name}
                            </h2>
                            <div className="flex-1 h-px bg-paquito-900/50"></div>
                            <span className="text-sm text-jungle-500">
                                {category.courses.length} {category.courses.length === 1 ? 'curso' : 'cursos'}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {category.courses.map((course) => (
                                <CourseCard key={course.slug} course={course} />
                            ))}
                        </div>
                    </section>
                ))}

                {/* Empty State */}
                {courses.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-jungle-400 text-lg">
                            No hay cursos disponibles todavía. ¡Vuelve pronto!
                        </p>
                    </div>
                )}

                {/* CTA Section */}
                <div className="mt-16 text-center">
                    <div className="card-premium p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-paquito-100 mb-4">
                            ¿Tienes sugerencias para nuevos cursos?
                        </h3>
                        <p className="text-jungle-400 mb-6">
                            Cuéntanos qué te gustaría aprender. Tu opinión nos ayuda a crear mejor contenido.
                        </p>
                        <a
                            href="mailto:contacto@paquitoliveasmr.com"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cta to-paquito-600 text-white rounded-full font-semibold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(234,88,12,0.3)]"
                        >
                            Envíanos tu idea
                            <span>→</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
