# Guía de Despliegue y Estrategia de Afiliados - Paquito Web

Esta guía cubre los pasos para desplegar la aplicación y detalla cómo implementar y presentar productos de afiliados de manera óptima.

---

## 1. Estructura del Proyecto (Revisión Final)

El proyecto está dividido en dos partes principales:

*   **`frontend/` (Next.js 14)**: La interfaz de usuario, optimizada para SEO y velocidad.
    *   `app/`: Rutas y páginas (Home, Blog, Ofertas).
    *   `components/`: Componentes reutilizables (Hero, AdSense, etc.).
    *   `lib/`: Utilidades (API client).
*   **`backend/` (FastAPI)**: La lógica del servidor y conexión a base de datos.
    *   `routers/`: Endpoints de la API (`/track`, `/health`).
    *   `services/`: Lógica de negocio.
    *   `db/`: Esquemas de base de datos.

---

## 2. Guía de Despliegue

### A. Backend (FastAPI)
Recomendamos usar **Render** o **Railway** por su facilidad de uso con Python.

1.  **Crear Repositorio**: Sube todo el proyecto a GitHub.
2.  **Nuevo Web Service**: En Render/Railway, conecta tu repo.
3.  **Configuración**:
    *   **Root Directory**: `backend`
    *   **Build Command**: `pip install -r requirements.txt`
    *   **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4.  **Variables de Entorno**: Añade `SUPABASE_URL` y `SUPABASE_KEY`.

### B. Frontend (Next.js)
**Vercel** es la mejor opción para Next.js.

1.  **Nuevo Proyecto**: En Vercel, importa tu repo.
2.  **Configuración**:
    *   **Root Directory**: `frontend`
    *   **Framework Preset**: Next.js
3.  **Variables de Entorno**:
    *   `NEXT_PUBLIC_API_URL`: La URL de tu backend desplegado (ej. `https://paquito-backend.onrender.com`).

---

## 3. Estrategia de Implementación de Afiliados

Para maximizar la conversión, la presentación del producto es clave. Aquí detallamos cómo hacerlo.

### A. Base de Datos (Supabase)
Asegúrate de que tu tabla `affiliate_links` tenga estos campos para soportar medios ricos:

```sql
create table affiliate_links (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  affiliate_url text not null, -- Tu enlace con tracking
  image_url text,              -- URL de la imagen principal
  price decimal,               -- Precio actual (opcional)
  currency text default 'EUR',
  video_url text,              -- (Opcional) URL de YouTube/Vimeo
  preview_data jsonb,          -- (Avanzado) Datos extraídos (OG tags)
  created_at timestamp with time zone default now()
);
```

### B. Presentación del Producto (Frontend)

#### 1. La "Product Card" (Tarjeta de Producto)
No pongas solo un enlace de texto. Crea un componente visual atractivo.

**Diseño Óptimo:**
*   **Imagen Grande**: La imagen del producto debe ser el foco.
*   **Título Claro**: Nombre del producto.
*   **Precio Destacado**: Si es una oferta, muestra el precio anterior tachado.
*   **Call to Action (CTA)**: Botón llamativo ("Ver Oferta", "Comprar en Amazon").

#### 2. Manejo de Imágenes
*   **Opción A (Manual)**: Descarga la imagen del producto, súbela a tu Supabase Storage (o carpeta `public/images` si son pocas) y guarda la URL en la BD.
    *   *Pros*: Control total, carga rápida.
    *   *Contras*: Trabajo manual.
*   **Opción B (Remota)**: Usa la URL de la imagen directamente del vendedor (Amazon, AliExpress).
    *   *Nota*: Configura `next.config.js` para permitir dominios externos en `images`.

#### 3. Previsualización (Preview)
Para dar una experiencia "como en la tienda":

*   **Scraping de OpenGraph (Automático)**:
    Puedes crear un script en el backend que, al guardar un enlace, visite la URL y extraiga:
    *   `og:image` (Imagen principal)
    *   `og:title` (Título oficial)
    *   `og:description`
    *   *Implementación*: Librería `beautifulsoup4` en Python.
*   **Iframe (No recomendado)**: Muchas tiendas (Amazon) bloquean iframes. Evítalo.

#### 4. Video
Si hay video (ej. review de YouTube), incrustarlo aumenta la retención.
*   Usa un campo `video_url` en la BD.
*   En el frontend, si existe `video_url`, renderiza un `iframe` de YouTube antes de la descripción.

### C. Ejemplo de Componente "ProductShowcase"

```tsx
// components/ProductShowcase.tsx
import Image from 'next/image';

export default function ProductShowcase({ product }) {
  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden bg-gray-900">
      {/* Video o Imagen */}
      {product.video_url ? (
        <div className="aspect-video">
          <iframe src={product.video_url} className="w-full h-full" />
        </div>
      ) : (
        <div className="relative h-64 w-full">
          <Image src={product.image_url} fill className="object-cover" alt={product.title} />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
        <p className="text-gray-400 mb-4">{product.description}</p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-white">{product.price}€</span>
          <a 
            href={`/api/track?id=${product.id}`} // Tu endpoint de tracking
            target="_blank"
            className="bg-orange-600 text-white px-6 py-3 rounded-full font-bold hover:bg-orange-700 transition"
          >
            Comprar Ahora
          </a>
        </div>
      </div>
    </div>
  );
}
```

---

## 4. Siguientes Pasos
1.  **Desplegar**: Sigue la guía de la sección 2.
2.  **Poblar BD**: Añade tus primeros productos en Supabase con imágenes reales.
3.  **Refinar**: Ajusta el diseño de la `ProductCard` según tus métricas de clics.
