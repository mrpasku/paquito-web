# Paquito Universe Web

Web oficial del universo Paquito, diseñada como una experiencia inmersiva y estática para maximizar el rendimiento y minimizar costes de mantenimiento.

## 🚀 Estado del Proyecto

- **Versión**: MVP 1.0
- **Arquitectura**: 100% Estática (Static Site Generation - SSG).
- **Backend**: Desactivado/No utilizado (Simulado con Mock Data para MVP).
- **Hosting Objetivo**: Hostinger Shared Hosting (Web Hosting Básico).

## 🛠 Teconología

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router).
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/).
- **Lenguaje**: TypeScript.
- **Iconos**: Heroicons / SVGs personalizados.

## ✨ Características Principales

1.  **Multi-Personaje (Solar System Hero)**:
    - Navegación inmersiva en 3D que permite explorar los mundos de Paquito, Pablito, Sarita, etc.
    - Partículas y temas de color dinámicos por personaje.

2.  **Navegación Avanzada**:
    - Menú centrado con Dropdowns interactivos (Universo, Academia, Preferidos, Blog).
    - Botones de acción rápida: "Video Personalizado" y "Colaboraciones".

3.  **Contenido Estático**:
    - **Blog**: Artículos renderizados desde archivos (preparado para Markdown/CMS estático).
    - **Cursos**: Catálogo de cursos con modal de "Próximamente" o enlaces externos.
    - **Afiliados (Los Preferidos)**: Escaparate de productos renderizado estáticamente.

4.  **Optimización**:
    - `output: 'export'` configurado para generar HTML/CSS/JS puro.
    - `trailingSlash: true` para compatibilidad con servidores Apache/Hostinger.
    - Imágenes no optimizadas (`unoptimized: true`) para evitar dependencia de servidor de imágenes de Next.js.

## 📦 Instalación y Desarrollo Local

1.  **Clonar el repositorio**:
    ```bash
    git clone <repo-url>
    cd paquito_web_structure
    ```

2.  **Instalar dependencias**:
    ```bash
    cd frontend
    npm install
    ```

3.  **Iniciar servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    Visita `http://localhost:3000`.

## 🏗 Construcción y Despliegue (Hostinger)

Este proyecto está configurado para **Static Export**. No requiere Node.js en el servidor.

1.  **Generar la build**:
    ```bash
    cd frontend
    npm run build
    ```
    Esto creará una carpeta `out/` con todos los archivos estáticos.

2.  **Desplegar**:
    - Sube el contenido de la carpeta `frontend/out/` (NO la carpeta `out` en sí, sino lo que hay dentro) a la carpeta `public_html` de tu hosting en Hostinger (vía FTP o Administrador de Archivos).

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para más detalles.

## 📂 Estructura del Proyecto

```
/
├── frontend/               # Código Fuente Next.js
│   ├── app/                # Rutas y Páginas (App Router)
│   ├── components/         # Componentes React (Hero, Header, etc.)
│   ├── lib/                # Utilidades y Mock Data (api.ts)
│   ├── content/            # Datos estáticos (cursos, posts)
│   ├── public/             # Assets estáticos (imágenes)
│   └── next.config.js      # Configuración de exportación
├── backend/                # (DEPRECATED) Código Python no utilizado en esta versión
└── README.md               # Este archivo
```
