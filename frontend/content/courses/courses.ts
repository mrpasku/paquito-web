// Sistema de datos para cursos - PDFs y Videos
// Preparado para cuando haya contenido real

export interface Lesson {
    id: string;
    title: string;
    description: string;
    type: 'video' | 'pdf';
    url: string;  // URL del video o PDF
    duration?: number;  // Duración en minutos (para videos)
    thumbnail?: string;
}

export interface Module {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
}

export interface Course {
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    price: number | null;  // null = gratuito o próximamente
    currency: string;
    category: 'asmr' | 'tecnologia' | 'creacion-contenido' | 'general';
    level: 'principiante' | 'intermedio' | 'avanzado';
    modules: Module[];
    totalDuration: number;  // Minutos totales
    featured: boolean;
    comingSoon: boolean;  // Indica si está en desarrollo
    publishedAt: string;
}

// Cursos de ejemplo/placeholder - listos para añadir contenido real
export const courses: Course[] = [
    {
        slug: 'asmr-desde-cero',
        title: 'ASMR Desde Cero: Curso Completo',
        description: 'Aprende a crear contenido ASMR profesional desde cero. Equipo, técnicas y estrategias de crecimiento.',
        longDescription: `
Este curso completo te guiará paso a paso en el mundo de la creación de contenido ASMR.

Aprenderás:
- Fundamentos del ASMR y cómo funciona
- Equipo necesario según tu presupuesto
- Técnicas de grabación profesionales
- Edición de audio y video
- Estrategias de crecimiento en plataformas

Ideal para principiantes que quieren empezar su canal de ASMR con bases sólidas.
        `,
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
        price: null,
        currency: 'EUR',
        category: 'asmr',
        level: 'principiante',
        totalDuration: 180,
        featured: true,
        comingSoon: true,
        publishedAt: '2025-01-15',
        modules: [
            {
                id: 'mod-1',
                title: 'Módulo 1: Introducción al ASMR',
                description: 'Conceptos básicos y fundamentos del ASMR',
                lessons: [
                    {
                        id: 'les-1-1',
                        title: '¿Qué es el ASMR?',
                        description: 'Entendiendo el fenómeno ASMR y su ciencia',
                        type: 'video',
                        url: '',  // URL del video cuando esté disponible
                        duration: 15,
                    },
                    {
                        id: 'les-1-2',
                        title: 'Tipos de triggers ASMR',
                        description: 'Los diferentes tipos de estímulos que producen ASMR',
                        type: 'video',
                        url: '',
                        duration: 20,
                    },
                    {
                        id: 'les-1-3',
                        title: 'Guía de recursos - Módulo 1',
                        description: 'PDF con todos los recursos mencionados',
                        type: 'pdf',
                        url: '',  // URL del PDF cuando esté disponible
                    },
                ],
            },
            {
                id: 'mod-2',
                title: 'Módulo 2: Equipo y Setup',
                description: 'Todo el equipo necesario para crear ASMR',
                lessons: [
                    {
                        id: 'les-2-1',
                        title: 'Micrófonos para ASMR',
                        description: 'Comparativa de los mejores micrófonos según presupuesto',
                        type: 'video',
                        url: '',
                        duration: 25,
                    },
                    {
                        id: 'les-2-2',
                        title: 'Configuración del espacio de grabación',
                        description: 'Cómo preparar tu espacio para grabaciones de calidad',
                        type: 'video',
                        url: '',
                        duration: 20,
                    },
                    {
                        id: 'les-2-3',
                        title: 'Lista de equipamiento recomendado',
                        description: 'PDF con enlaces a todo el equipo recomendado',
                        type: 'pdf',
                        url: '',
                    },
                ],
            },
        ],
    },
    {
        slug: 'ia-para-creadores',
        title: 'IA para Creadores de Contenido',
        description: 'Domina las herramientas de IA para potenciar tu contenido. Imágenes, video, audio y más.',
        longDescription: `
La inteligencia artificial está revolucionando la creación de contenido. Este curso te enseña a aprovechar estas herramientas.

Contenido del curso:
- Generación de imágenes con Midjourney y DALL-E
- Edición de video con IA
- Clonación y síntesis de voz
- Automatización de tareas repetitivas
- Creación de personajes virtuales

Aprende a multiplicar tu productividad usando IA de forma ética y efectiva.
        `,
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
        price: null,
        currency: 'EUR',
        category: 'tecnologia',
        level: 'intermedio',
        totalDuration: 240,
        featured: true,
        comingSoon: true,
        publishedAt: '2025-02-01',
        modules: [
            {
                id: 'mod-ia-1',
                title: 'Módulo 1: Fundamentos de IA Generativa',
                description: 'Entendiendo cómo funciona la IA generativa',
                lessons: [
                    {
                        id: 'les-ia-1-1',
                        title: 'Introducción a la IA Generativa',
                        description: 'Conceptos básicos y herramientas disponibles',
                        type: 'video',
                        url: '',
                        duration: 20,
                    },
                    {
                        id: 'les-ia-1-2',
                        title: 'Prompt Engineering Básico',
                        description: 'Cómo escribir prompts efectivos',
                        type: 'video',
                        url: '',
                        duration: 30,
                    },
                ],
            },
            {
                id: 'mod-ia-2',
                title: 'Módulo 2: Generación de Imágenes',
                description: 'Dominando Midjourney, DALL-E y Stable Diffusion',
                lessons: [
                    {
                        id: 'les-ia-2-1',
                        title: 'Midjourney de Cero a Pro',
                        description: 'Tutorial completo de Midjourney',
                        type: 'video',
                        url: '',
                        duration: 45,
                    },
                    {
                        id: 'les-ia-2-2',
                        title: 'Biblioteca de Prompts',
                        description: 'PDF con prompts probados y efectivos',
                        type: 'pdf',
                        url: '',
                    },
                ],
            },
        ],
    },
    {
        slug: 'monetizacion-contenido',
        title: 'Monetización de Contenido Digital',
        description: 'Estrategias probadas para monetizar tu contenido: afiliados, sponsors, productos propios.',
        longDescription: `
Convierte tu pasión en un negocio rentable. Este curso cubre todas las formas de monetización disponibles para creadores.

Aprenderás:
- Marketing de afiliados efectivo
- Cómo conseguir sponsors y marcas
- Creación y venta de productos digitales
- Membresías y contenido premium
- Diversificación de ingresos

Basado en experiencia real con casos de éxito demostrados.
        `,
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80',
        price: null,
        currency: 'EUR',
        category: 'creacion-contenido',
        level: 'avanzado',
        totalDuration: 200,
        featured: false,
        comingSoon: true,
        publishedAt: '2025-03-01',
        modules: [
            {
                id: 'mod-mon-1',
                title: 'Módulo 1: Fundamentos de Monetización',
                description: 'Las bases para monetizar tu contenido',
                lessons: [
                    {
                        id: 'les-mon-1-1',
                        title: 'Panorama de monetización en 2025',
                        description: 'Todas las opciones de monetización disponibles',
                        type: 'video',
                        url: '',
                        duration: 25,
                    },
                ],
            },
        ],
    },
];

// Funciones helper

export function getAllCourses(): Course[] {
    return courses;
}

export function getCourseBySlug(slug: string): Course | undefined {
    return courses.find(course => course.slug === slug);
}

export function getFeaturedCourses(): Course[] {
    return courses.filter(course => course.featured);
}

export function getCoursesByCategory(category: Course['category']): Course[] {
    return courses.filter(course => course.category === category);
}

export function getAvailableCourses(): Course[] {
    return courses.filter(course => !course.comingSoon);
}

export function getCategories(): { id: Course['category']; name: string }[] {
    return [
        { id: 'asmr', name: 'ASMR' },
        { id: 'tecnologia', name: 'Tecnología & IA' },
        { id: 'creacion-contenido', name: 'Creación de Contenido' },
        { id: 'general', name: 'General' },
    ];
}

export function getLevelName(level: Course['level']): string {
    const levels = {
        'principiante': 'Principiante',
        'intermedio': 'Intermedio',
        'avanzado': 'Avanzado',
    };
    return levels[level];
}

export function getTotalLessons(course: Course): number {
    return course.modules.reduce((total, module) => total + module.lessons.length, 0);
}

export function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}min`;
}
