import { MetadataRoute } from 'next';
import { getAllPosts, getCategories } from '@/content/blog/posts';
import { getAllCourses } from '@/content/courses/courses';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://paquitoliveasmr.com';

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/ofertas`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/cursos`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
    ];

    // Blog posts - high SEO value
    const posts = getAllPosts();
    const blogPages = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Category pages
    const categories = getCategories();
    const categoryPages = categories.map((cat) => ({
        url: `${baseUrl}/blog#${cat.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Courses pages
    const courses = getAllCourses();
    const coursesPages = courses.map((course) => ({
        url: `${baseUrl}/cursos/${course.slug}`,
        lastModified: new Date(course.publishedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    return [...staticPages, ...blogPages, ...categoryPages, ...coursesPages];
}

