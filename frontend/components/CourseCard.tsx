'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Course, getTotalLessons, formatDuration, getLevelName } from '@/content/courses/courses';

// SVG Icons
const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const BookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);

interface CourseCardProps {
    course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
    const totalLessons = getTotalLessons(course);
    const duration = formatDuration(course.totalDuration);
    const level = getLevelName(course.level);

    return (
        <Link
            href={`/cursos/${course.slug}`}
            className="group card-premium block overflow-hidden"
        >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-jungle-950/90 via-jungle-950/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-paquito-500/90 text-white uppercase tracking-wider">
                        {level}
                    </span>
                    {course.comingSoon && (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-jungle-700/90 text-paquito-100 uppercase tracking-wider">
                            Próximamente
                        </span>
                    )}
                </div>

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-paquito-500/90 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                        <PlayIcon />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Category */}
                <span className="text-xs text-paquito-500 font-medium uppercase tracking-wider">
                    {course.category === 'creacion-contenido' ? 'Creación de Contenido' : course.category}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold mt-2 mb-3 text-paquito-100 group-hover:text-paquito-400 transition-colors line-clamp-2">
                    {course.title}
                </h3>

                {/* Description */}
                <p className="text-jungle-400 text-sm leading-relaxed line-clamp-2 mb-4">
                    {course.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-jungle-500">
                    <span className="flex items-center gap-1.5">
                        <BookIcon />
                        {totalLessons} lecciones
                    </span>
                    <span className="flex items-center gap-1.5">
                        <ClockIcon />
                        {duration}
                    </span>
                </div>

                {/* Price / CTA */}
                <div className="mt-4 pt-4 border-t border-paquito-900/30 flex justify-between items-center">
                    {course.comingSoon ? (
                        <span className="text-jungle-400 italic text-sm">Disponible pronto</span>
                    ) : course.price === null ? (
                        <span className="text-paquito-400 font-bold">Gratis</span>
                    ) : (
                        <span className="text-paquito-400 font-bold">{course.price}€</span>
                    )}
                    <span className="text-paquito-500 font-medium text-sm group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Ver curso <span>→</span>
                    </span>
                </div>
            </div>
        </Link>
    );
}
