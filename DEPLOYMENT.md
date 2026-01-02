# Guía de Despliegue: Hostinger (Static Export)

Esta guía detalla el proceso para desplegar la web de **Paquito Universe** en un plan de hosting compartido de **Hostinger**.

## ✅ Prerrequisitos

- Node.js 18+ instalado localmente.
- Acceso al panel de control de Hostinger (hPanel) o acceso FTP.

## ⚙️ 1. Configuración de Build (Ya implementada)

El proyecto ya está configurado para la exportación estática en `frontend/next.config.js`:

```javascript
const nextConfig = {
    output: 'export',        // Genera HTML/CSS/JS estático
    trailingSlash: true,     // Crea carpetas (blog/index.html) para rutas limpias
    images: {
        unoptimized: true,   // Permite imágenes externas sin servidor de optimización
    },
    // ...
}
```

## 🏗 2. Generar la Versión de Producción

En tu terminal local:

1.  Navega a la carpeta del frontend:
    ```bash
    cd frontend
    ```

2.  Ejecuta el comando de build:
    ```bash
    npm run build
    ```

3.  Si todo va bien, verás una carpeta llamada `out` en `frontend/out`.
    - Verifica que dentro de `out` hay archivos `.html` (index.html, 404.html) y carpetas (`_next`, `blog`, `img`, etc.).

## 🚀 3. Subir a Hostinger

1.  **Accede a Hostinger**: Entra en tu hPanel -> Administrador de Archivos (File Manager).
2.  **Localiza la carpeta pública**: Entra en `public_html`.
3.  **Limpia la carpeta**: Si hay archivos de una web anterior o un `default.php`, bórralos (haz backup si es necesario).
4.  **Sube los archivos**:
    - Sube **TODO el contenido** que está DENTRO de tu carpeta local `frontend/out`.
    - **IMPORTANTE**: No subas la carpeta `out` como tal. Sube los archivos sueltos (`index.html`, etc.) y las carpetas (`_next`, `blog`) directamente a `public_html`.
    - Estructura final en Hostinger:
      ```
      /public_html
      ├── _next/
      ├── blog/
      ├── video-personalizado/
      ├── index.html
      ├── 404.html
      └── ...
      ```

## 🐞 Solución de Problemas Comunes

### Error 404 al recargar páginas internas
Hostinger suele manejar bien esto si existe la estructura de carpetas (que aseguramos con `trailingSlash: true`).

### Las imágenes no cargan
Asegúrate de que `images: { unoptimized: true }` está en `next.config.js`. Next/Image requiere un servidor Node.js para optimizar imágenes al vuelo, cosa que no tenemos en Hostinger compartido.

### "Index of /blog/" (Listado de archivos)
Esto ocurre si falta `trailingSlash: true`. Asegúrate de haber regenerado la build (`npm run build`) después de activar esa opción.

## 🔄 Actualizaciones Futuras

Para actualizar la web:
1. Haz tus cambios en local.
2. Ejecuta `npm run build`.
3. Borra el contenido de `public_html` en Hostinger.
4. Sube el nuevo contenido de `out`.
