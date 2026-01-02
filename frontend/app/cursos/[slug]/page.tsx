import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CourseContent from '@/components/CourseContent';
import { getAllCourses, getCourseBySlug, getTotalLessons, formatDuration, getLevelName } from '@/content/courses/courses';

// SVG Icons
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const BookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);

const LevelIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
);

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

interface CoursePageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const courses = getAllCourses();
    return courses.map((course) => ({
        slug: course.slug,
    }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const course = getCourseBySlug(resolvedParams.slug);

    if (!course) {
        return {
            title: 'Curso no encontrado',
        };
    }

    return {
        title: course.title,
        description: course.description,
        openGraph: {
            title: `${course.title} | Cursos Paquito`,
            description: course.description,
            images: [course.image],
        },
    };
}

export default async function CoursePage({ params }: CoursePageProps) {
    const resolvedParams = await params;
    const course = getCourseBySlug(resolvedParams.slug);

    if (!course) {
        notFound();
    }

    const totalLessons = getTotalLessons(course);
    const duration = formatDuration(course.totalDuration);
    const level = getLevelName(course.level);

    return (
        <div className="min-h-screen pt-24 pb-16">
            {/* Hero Section */}
            <div className="relative">
                {/* Background Image */}
                <div className="absolute inset-0 h-96">
                    <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-jungle-950/80 via-jungle-950/90 to-jungle-950" />
                </div>

                {/* Content */}
                <div className="relative container mx-auto px-4 pt-8 pb-16">
                    {/* Back Link */}
                    <Link
                        href="/cursos"
                        className="inline-flex items-center gap-2 text-jungle-400 hover:text-paquito-400 transition-colors mb-8"
                    >
                        <ArrowLeftIcon />
                        Volver a cursos
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Course Info */}
                        <div className="lg:col-span-2">
                            {/* Badges */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-paquito-500/90 text-white uppercase tracking-wider">
                                    {level}
                                </span>
                                {course.comingSoon && (
                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-jungle-700/90 text-paquito-100 uppercase tracking-wider">
                                        Próximamente
                                    </span>
                                )}
                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-jungle-800/90 text-paquito-300 uppercase tracking-wider">
                                    {course.category === 'creacion-contenido' ? 'Creación de Contenido' : course.category}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-text-paquito">
                                {course.title}
                            </h1>

                            {/* Description */}
                            <p className="text-lg text-jungle-300 mb-6">
                                {course.description}
                            </p>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-6 text-jungle-400">
                                <span className="flex items-center gap-2">
                                    <BookIcon />
                                    {totalLessons} lecciones
                                </span>
                                <span className="flex items-center gap-2">
                                    <ClockIcon />
                                    {duration}
                                </span>
                                <span className="flex items-center gap-2">
                                    <LevelIcon />
                                    {level}
                                </span>
                            </div>
                        </div>

                        {/* CTA Card */}
                        <div className="lg:col-span-1">
                            <div className="card-premium p-6 sticky top-24">
                                {/* Price */}
                                <div className="text-center mb-6">
                                    {course.comingSoon ? (
                                        <div>
                                            <span className="text-2xl font-bold text-jungle-400">Próximamente</span>
                                            <p className="text-sm text-jungle-500 mt-1">Precio por confirmar</p>
                                        </div>
                                    ) : course.price === null ? (
                                        <span className="text-4xl font-bold text-paquito-400">Gratis</span>
                                    ) : (
                                        <div>
                                            <span className="text-4xl font-bold text-paquito-400">{course.price}€</span>
                                            <p className="text-sm text-jungle-500 mt-1">Acceso de por vida</p>
                                        </div>
                                    )}
                                </div>

                                {/* CTA Button */}
                                <button
                                    disabled={course.comingSoon}
                                    className={`w-full py-3 rounded-full font-semibold text-white transition-all ${course.comingSoon
                                            ? 'bg-jungle-700 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-cta to-paquito-600 hover:scale-105 shadow-[0_0_20px_rgba(234,88,12,0.3)]'
                                        }`}
                                >
                                    {course.comingSoon ? 'Disponible pronto' : 'Inscribirme ahora'}
                                </button>

                                {/* Features */}
                                <ul className="mt-6 space-y-3 text-sm text-jungle-400">
                                    <li className="flex items-center gap-2">
                                        <span className="text-paquito-400">✓</span>
                                        {totalLessons} lecciones en video
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-paquito-400">✓</span>
                                        Recursos descargables (PDFs)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-paquito-400">✓</span>
                                        Acceso de por vida
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-paquito-400">✓</span>
                                        Actualizaciones gratuitas
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className="container mx-auto px-4 mt-8">
                {/* Long Description */}
                <div className="card-premium p-8 mb-12">
                    <h2 className="text-2xl font-bold text-paquito-100 mb-4">Acerca de este curso</h2>
                    <div className="prose prose-invert prose-paquito max-w-none">
                        <p className="text-jungle-300 whitespace-pre-line leading-relaxed">
                            {course.longDescription.trim()}
                        </p>
                    </div>
                </div>

                {/* Modules and Lessons */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-paquito-100 mb-6">Contenido del curso</h2>
                    <CourseContent course={course} />
                </div>
            </div>
        </div>
    );
}
