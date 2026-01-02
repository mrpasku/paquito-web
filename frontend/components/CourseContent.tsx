'use client';
import React, { useState } from 'react';
import { Course, Lesson, formatDuration } from '@/content/courses/courses';

// SVG Icons
const PlayCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
);

const FileTextIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

interface CourseContentProps {
    course: Course;
}

export default function CourseContent({ course }: CourseContentProps) {
    const initialModules: string[] = course.modules[0]?.id ? [course.modules[0].id] : [];
    const [expandedModules, setExpandedModules] = useState(initialModules);
    const initialLesson: Lesson | null = null;
    const [selectedLesson, setSelectedLesson] = useState(initialLesson);

    const toggleModule = (moduleId: string) => {
        setExpandedModules((prev: string[]) =>
            prev.includes(moduleId)
                ? prev.filter((id: string) => id !== moduleId)
                : [...prev, moduleId]
        );
    };

    const renderLessonContent = (lesson: Lesson) => {
        if (!lesson.url || course.comingSoon) {
            return (
                <div className="aspect-video bg-jungle-900/50 rounded-xl flex flex-col items-center justify-center">
                    <LockIcon />
                    <p className="text-jungle-400 mt-4 text-center">
                        {course.comingSoon
                            ? 'Este contenido estará disponible próximamente'
                            : 'Contenido no disponible'}
                    </p>
                </div>
            );
        }

        if (lesson.type === 'video') {
            // Check if it's a YouTube URL
            if (lesson.url.includes('youtube.com') || lesson.url.includes('youtu.be')) {
                const videoId = lesson.url.includes('youtu.be')
                    ? lesson.url.split('/').pop()
                    : new URL(lesson.url).searchParams.get('v');
                return (
                    <div className="aspect-video rounded-xl overflow-hidden">
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={lesson.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </div>
                );
            }
            // Regular video file
            return (
                <div className="aspect-video rounded-xl overflow-hidden bg-jungle-950">
                    <video
                        src={lesson.url}
                        controls
                        className="w-full h-full"
                        poster={lesson.thumbnail}
                    >
                        Tu navegador no soporta el elemento de video.
                    </video>
                </div>
            );
        }

        if (lesson.type === 'pdf') {
            return (
                <div className="rounded-xl overflow-hidden bg-jungle-900/50 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-paquito-100">{lesson.title}</h4>
                        <a
                            href={lesson.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-paquito-500 text-white rounded-lg font-medium hover:bg-paquito-600 transition-colors"
                        >
                            Descargar PDF
                        </a>
                    </div>
                    <div className="aspect-[4/3] bg-white rounded-lg">
                        <iframe
                            src={`${lesson.url}#view=FitH`}
                            title={lesson.title}
                            className="w-full h-full rounded-lg"
                        />
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
                {selectedLesson ? (
                    <div>
                        {renderLessonContent(selectedLesson)}
                        <div className="mt-4">
                            <h3 className="text-xl font-bold text-paquito-100">{selectedLesson.title}</h3>
                            <p className="text-jungle-400 mt-2">{selectedLesson.description}</p>
                        </div>
                    </div>
                ) : (
                    <div className="aspect-video bg-jungle-900/50 rounded-xl flex flex-col items-center justify-center">
                        <PlayCircleIcon />
                        <p className="text-jungle-400 mt-4">Selecciona una lección para comenzar</p>
                    </div>
                )}
            </div>

            {/* Module List Sidebar */}
            <div className="lg:col-span-1">
                <div className="card-premium p-4">
                    <h3 className="text-lg font-bold text-paquito-100 mb-4">Contenido del curso</h3>
                    <div className="space-y-2">
                        {course.modules.map((module) => (
                            <div key={module.id} className="border border-paquito-900/30 rounded-lg overflow-hidden">
                                {/* Module Header */}
                                <button
                                    onClick={() => toggleModule(module.id)}
                                    className="w-full px-4 py-3 flex items-center justify-between bg-jungle-900/30 hover:bg-jungle-900/50 transition-colors"
                                >
                                    <div className="text-left">
                                        <h4 className="font-semibold text-paquito-100 text-sm">{module.title}</h4>
                                        <p className="text-xs text-jungle-500 mt-0.5">
                                            {module.lessons.length} lecciones
                                        </p>
                                    </div>
                                    <span className={`transform transition-transform ${expandedModules.includes(module.id) ? 'rotate-180' : ''}`}>
                                        <ChevronDownIcon />
                                    </span>
                                </button>

                                {/* Lessons List */}
                                {expandedModules.includes(module.id) && (
                                    <div className="border-t border-paquito-900/30">
                                        {module.lessons.map((lesson) => (
                                            <button
                                                key={lesson.id}
                                                onClick={() => setSelectedLesson(lesson)}
                                                className={`w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-jungle-900/30 transition-colors ${selectedLesson?.id === lesson.id ? 'bg-paquito-900/20' : ''
                                                    }`}
                                            >
                                                <span className={`flex-shrink-0 ${selectedLesson?.id === lesson.id ? 'text-paquito-400' : 'text-jungle-500'}`}>
                                                    {lesson.type === 'video' ? <PlayCircleIcon /> : <FileTextIcon />}
                                                </span>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm truncate ${selectedLesson?.id === lesson.id ? 'text-paquito-400' : 'text-paquito-100'
                                                        }`}>
                                                        {lesson.title}
                                                    </p>
                                                    {lesson.duration && (
                                                        <p className="text-xs text-jungle-500">
                                                            {formatDuration(lesson.duration)}
                                                        </p>
                                                    )}
                                                </div>
                                                {(!lesson.url || course.comingSoon) && (
                                                    <span className="text-jungle-600">
                                                        <LockIcon />
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
