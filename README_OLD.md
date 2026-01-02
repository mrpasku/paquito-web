# README — Puesta en marcha de la Web (Landing + Blog SEO + Afiliados + AdSense)

Este documento define los **próximos pasos operativos**, ordenados y accionables, para lanzar la primera versión de la web oficial. El objetivo es construir un **MVP rápido**, pero con una arquitectura **escalable** hacia módulos futuros: cursos, tienda online, zona para marcas y servicios avanzados.

---

## 1. Objetivos del MVP

1. **Landing principal** con enlaces oficiales, CTA y branding.
2. **Blog SEO** con artículos optimizados para tráfico orgánico.
3. **Sistema de afiliados** (páginas de producto + tracking de clicks).
4. **Integración con Google AdSense** para monetización.
5. Estructura base preparada para:
   - Cursos digitales.
   - Tienda dropshipping.
   - Portal para marcas.
   - Panel de usuario.
   - Expansión futura vía API.
1.  **Landing principal** con enlaces oficiales, CTA y branding.
2.  **Blog SEO** con artículos optimizados para tráfico orgánico.
3.  **Sistema de afiliados** (páginas de producto + tracking de clicks).
4.  **Integración con Google AdSense** para monetización.
5.  Estructura base preparada para:
    -   Cursos digitales.
    -   Tienda dropshipping.
    -   Portal para marcas.
    -   Panel de usuario.
    -   Expansión futura vía API.

---

## 2. Arquitectura mínima y escalable

### Frontend — **Next.js 14 (App Router)**
- Páginas estáticas + SSR para SEO.
- Componentes reutilizables.
- Carpetas iniciales:
  - `/app`
  - `/app/(landing)`
  - `/app/blog`
  - `/app/ofertas`
  - `/app/cursos`
  - `/components`
  - `/content`
  - `/lib`
  - `/public`

### Backend — **FastAPI / Node (API ligera)**
- Endpoint de tracking de afiliados.
- Endpoint para logs.
- Preparado para ampliar con cursos/tienda.

### Base de datos — **PostgreSQL (Supabase)**
Tablas iniciales:
- `posts` — Artículos SEO.
- `affiliate_links` — Enlaces de afiliados.
- `affiliate_clicks` — Registro de clics.
- `settings` — Config global.

### Storage
- Supabase Storage o Cloudflare R2 para imágenes.

### Hosting
- **Frontend:** Vercel o Cloudflare Pages.
- **Backend:** Render/Railway/Fly.io.
- **DB:** Supabase PostgreSQL.

---

## 3. Pasos iniciales de implementación

### 3.1 Crear repositorios
- `frontend-paquito-web`
- `backend-paquito-api`
- Estructura estandarizada con README y scripts iniciales.

### 3.2 Configurar entorno del frontend
1. Crear proyecto Next.js.
2. Añadir TailwindCSS.
3. Configurar layout general.
4. Añadir sistema de rutas (landing, blog, ofertas).
5. Conectar con backend vía fetch API.

### 3.3 Configurar entorno del backend
1. Crear proyecto FastAPI básico.
2. Endpoints iniciales:
   - `/track?id=XXXX` → registra click.
   - `/health` → comprobación.
3. Añadir CORS para frontend.
4. Integrar Supabase (o SQLAlchemy + PostgreSQL).

### 3.4 Base de datos
1. Crear proyecto en Supabase.
2. Generar tablas iniciales.
3. Crear policies (lectura abierta para posts si necesario).
4. Crear storage bucket para imágenes.

---

## 4. Desarrollo del MVP

### 4.1 Landing
- Diseño minimalista.
- Enlaces a redes oficiales.
- Bloques para Ads.
- Hero + CTA.

### 4.2 Blog SEO
- Sistema de posts en Markdown o BD.
- Render SSR.
- Generación automática de:
  - Title.
  - Meta description.
  - OpenGraph.
  - Schema JSON-LD.
- Sitemap automático.

### 4.3 Afiliados
- Página /ofertas con tarjetas dinámicas.
- Sistema interno:
  - `/go/producto` → reenvía → trackea clic.
- Posibilidad de versiones A/B.

### 4.4 Ads (Google AdSense)
1. Página de política de privacidad.
2. Página de términos y cookies.
3. Verificación de dominio.
4. Insertar script AdSense global.
5. Insertar bloques de Ads en páginas estratégicas.

---

## 5. Preparación para módulos futuros
La arquitectura quedará preparada para añadir:

### Cursos digitales ✅ (IMPLEMENTADO)
- Sistema de cursos con soporte para videos y PDFs.
- Página de listado `/cursos` con categorías.
- Páginas de detalle `/cursos/[slug]` con módulos y lecciones.
- Componentes: `CourseCard.tsx`, `CourseContent.tsx`.
- Contenido placeholder listo para añadir cursos reales.
- **Pendiente**: Login + auth, sistema de pagos (Stripe), dashboard de usuarios.

### Sistema Multi-Personaje ✅ (IMPLEMENTADO)
Sistema escalable para gestionar múltiples personajes con temas dinámicos.

#### Personajes disponibles:
| Personaje | Ruta | Tema | Descripción |
|-----------|------|------|-------------|
| **Paquito** | `/` | 🟠 Amber/Naranja | Personaje principal |
| **Pablito** | `/pablito` | 🔵 Azul | Segundo al mando |
| **Sarita** | `/sarita` | 🩷 Rosa | Dulzura y relajación |
| **La Abuela** | `/abuela` | 🌹 Rosa oscuro | Sabiduría y calidez |

#### Características:
- **Hero Solar System 3D**: Visualización épica estilo sistema solar.
  - Partículas animadas con colores del personaje activo.
  - Planetas 3D con perspectiva, blur por profundidad.
  - Posición frontal = 30% más grande, nítido, opaco.
- **Theming dinámico**: CSS variables que cambian según personaje.
- **Rutas preparadas**: Estructura para `/[personaje]/ofertas`, `/[personaje]/blog`.
- Componentes: `SolarSystemHero.tsx`, `CharacterProvider.tsx`.
- Configuración: `/lib/characters.ts` con datos de todos los personajes.

### Tienda dropshipping
- Integración con Shopify/Printful API.
- Carrito + checkout externo.

### Portal para marcas
- Página profesional.
- Formulario de leads.
- Calendario / media kit.

### Panel interno
- Métricas de afiliados.
- CTR / ingresos.
- Logs del backend.

---

## 6. Checklist final para lanzamiento del MVP

### Infraestructura
- [x] Frontend desplegado en Vercel (Estructura lista, falta deploy).
- [x] Backend desplegado en Railway/Render (Estructura lista, corriendo local).
- [x] Base de datos Supabase funcional (Schema listo).
- [ ] Dominio configurado con SSL.

### Funcionalidades
- [x] Landing terminada (Hero + Features implementados).
- [x] Blog SEO funcional (Estructura base).
- [x] Sistema de afiliados con tracking (Backend listo).
- [x] Sitemap.xml generado (Dinámico con Next.js).
- [x] Robots.txt configurado.
- [x] **Sección de Cursos implementada** (videos + PDFs, placeholder content).
- [x] **Sistema Multi-Personaje** (4 personajes con temas dinámicos).
- [x] **Hero Solar System 3D** (partículas animadas, planetas 3D).

### Monetización
- [ ] Solicitar Google AdSense.
- [ ] Insertar script global.
- [ ] Ajustar posición de anuncios.

### SEO
- [x] Titles/metas dinámicos.
- [x] OpenGraph.
- [ ] Schema JSON-LD.
- [ ] Core Web Vitals verificados.

---

## 7. Expansión técnica de los 3 puntos clave

### 7.1 Estructura técnica detallada del proyecto (frontend + backend + DB)
A continuación se amplía la estructura base para dejarla lista para trabajar de forma modular y escalable.

#### Frontend (Next.js 14 – App Router)
```
frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── ofertas/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── api/
│   │   └── track/route.ts
├── components/
│   ├── Hero.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── OfferCard.tsx
│   ├── BlogCard.tsx
├── lib/
│   ├── api.ts
│   ├── seo.ts
├── public/
│   └── images/
```

#### Backend (FastAPI)
```
backend/
├── main.py
├── routers/
│   ├── track.py
│   ├── health.py
├── services/
│   ├── affiliate.py
│   ├── db.py
├── models/
│   ├── affiliate_links.py
│   ├── affiliate_clicks.py
│   └── posts.py
├── db/
│   └── schema.sql
```

#### Base de datos (Supabase)
Tablas iniciales:
- **affiliate_links** → enlaces de afiliados.
- **affiliate_clicks** → registro del tráfico.
- **posts** → blog SEO.
- **settings** → ajustes globales.

---

### 7.2 Backend de afiliados — tracking completo

**Endpoint principal:** `/track?id=XXXX`
- Guarda origen, user-agent, ip_hash, timestamp.
- Redirige al destino final.

**Flujo del sistema:**
1. Usuario hace clic en una oferta.
2. Frontend redirige a `/track?id=oferta123`.
3. Backend registra el clic.
4. Backend redirige a la URL afiliada.

Ejemplo de código en FastAPI:
```
@router.get("/track")
def track_click(id: str, request: Request):
    affiliate = get_affiliate(id)
    save_click(
        affiliate_id=id,
        origin=request.headers.get("referer"),
        user_agent=request.headers.get("user-agent"),
        ip_hash=hash_ip(request.client.host)
    )
    return RedirectResponse(affiliate.url_target)
```

---

### 7.3 Layout visual ampliado (acorde al personaje)

Basado en el estilo de la imagen: tonos cálidos, iluminación naranja, ambiente ASMR, estética premium.

#### HERO visual — Sistema Solar 3D ✅
- **Fondo**: Espacio estrellado con partículas animadas.
- **Partículas**: 150 estrellas 3D con colores del personaje activo.
- **Planetas**: 4 esferas representando cada personaje.
  - Front: 130% escala, nítido, 100% opaco.
  - Laterales: 85% escala, blur sutil.
  - Fondo: 60% escala, más arriba, blur mayor.
- **Sol central**: Glow pulsante con color del personaje.
- **Órbita visible**: Anillo elíptico con perspectiva.
- Click en cualquier planeta → Navegación a su página.

#### Componentes Multi-Personaje
```
components/
├── SolarSystemHero.tsx   # Hero principal con sistema solar 3D
├── CharacterProvider.tsx  # Context para theming dinámico
├── CharacterSphere.tsx    # Esfera individual de personaje
lib/
├── characters.ts          # Configuración de todos los personajes
```

#### Secciones clave
- **Redes oficiales** con iconcards premium.
- **Blog SEO** con 3–6 artículos destacados.
- **Ofertas/Afiliados** con tarjetas limpias y CTA.
- **AdSense** en posiciones estratégicas.
- **Footer** minimalista con enlaces legales.

---

## 8. Próximo paso inmediato
Elegir:
- **A)** Crear la estructura completa del proyecto en código.
- **B)** Diseñar el HERO y layout visual final.
- **C)** Implementar el backend de tracking de afiliados.

Indica la opción y se procede con el desarrollo.
Elegir:
- **A)** Crear la estructura exacta del proyecto (carpetas + boilerplate).
- **B)** Diseñar el layout visual de la landing antes de escribir código.
- **C)** Empezar por el backend (tracking de afiliados).

Indica la opción y se procede al desarrollo técnico.

