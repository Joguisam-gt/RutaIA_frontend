# RutaIA — Frontend

Interfaz de usuario de la plataforma educativa inteligente RutaIA, construida con React 18 y Vite. Incluye un asistente académico basado en IA que recomienda cursos de programación y desarrollo web de forma personalizada, integrándose con el backend Express y los flujos de n8n a través de una API REST.

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge)
![React Router](https://img.shields.io/badge/React_Router_v6-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

> **Repositorio Backend:** [RutaIA Backend](https://github.com/Joguisam-gt/RutaIA_backend)

---

## Tecnologías utilizadas

- **Lenguaje principal:** JavaScript (ES Modules + JSX)
- **Framework UI:** React 18
- **Bundler:** Vite 5
- **Estilos:** Tailwind CSS 3
- **Gestión de estado global:** Zustand 4
- **Enrutamiento:** React Router DOM v6
- **Cliente HTTP:** Axios
- **Iconos:** Lucide React
- **Notificaciones:** React Hot Toast
- **Visualización de grafos:** React Force Graph 2D
- **Utilidades de clases:** clsx + tailwind-merge
- **Control de versiones:** Git y GitHub
- **Otras herramientas:** ESLint, PostCSS, Autoprefixer

---

# Cómo montar el proyecto

## Requisitos previos

Antes de instalar el proyecto, asegúrate de tener instaladas las siguientes herramientas:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) versión `18` o superior (recomendado v22)
- [Editor de código](https://code.visualstudio.com/) — se recomienda Visual Studio Code
- El **backend de RutaIA** corriendo en `http://localhost:3000`

Puedes comprobar las versiones instaladas con los siguientes comandos:

```bash
git --version
node --version
npm --version
```

## 1. Clonar el repositorio

```bash
git clone https://github.com/Joguisam-gt/RutaIA_frontend.git
```

## 2. Entrar a la carpeta del proyecto

```bash
cd RutaIA_frontend
```

## 3. Instalar las dependencias

```bash
npm install
```

## 4. Configurar las variables de entorno

Crea un archivo llamado `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Ejemplo de configuración:

```env
# URL base de la API del backend
VITE_API_URL=http://localhost:3000/api/v1
```

> No compartas tokens ni datos privados en GitHub. Todas las variables del frontend deben empezar con `VITE_` para que Vite las exponga al navegador.

## 5. Verificar que el backend esté corriendo

Antes de iniciar el frontend, asegúrate de que el backend Express y la infraestructura Docker (Qdrant + n8n) estén levantados:

```bash
# En la carpeta del backend
cd ../RutaIA_backend
docker compose -f infraestructure/docker/docker-compose.yml up -d
npm run dev
```

## 6. Ejecutar el proyecto

Para iniciar el entorno de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en:

```
http://localhost:5173
```

## 7. Construir para producción

```bash
npm run build
```

Para previsualizar el build de producción localmente:

```bash
npm run preview
```

---

# Estructura del proyecto

```text
RutaIA_frontend/
├── public/                         # Archivos estáticos servidos directamente
├── src/
│   ├── api/                        # Clientes HTTP por módulo (Axios)
│   │   ├── apiClient.js            # Instancia base de Axios con interceptor JWT
│   │   ├── authApi.js              # Login y sesión
│   │   ├── authRegisterApi.js      # Registro de usuarios
│   │   ├── courseApi.js            # Catálogo de cursos
│   │   ├── courseDetailApi.js      # Detalle de curso
│   │   ├── courseEditorApi.js      # Creación y edición de cursos
│   │   ├── courseManagementApi.js  # Gestión de cursos (instructor)
│   │   ├── queryApi.js             # Consultas al asistente IA
│   │   ├── ratingApi.js            # Calificación de recomendaciones
│   │   ├── studentApi.js           # Perfil del estudiante
│   │   ├── studentDashboardApi.js  # Dashboard del estudiante
│   │   ├── studentManagementApi.js # Gestión de estudiantes (instructor)
│   │   ├── enrollApi.js            # Inscripción a cursos
│   │   ├── metricApi.js            # Métricas del sistema
│   │   ├── notificationApi.js      # Notificaciones
│   │   ├── wishlistApi.js          # Lista de deseos
│   │   ├── certificatesApi.js      # Certificados
│   │   ├── classroomApi.js         # Aula virtual
│   │   ├── instructorDashboardApi.js
│   │   ├── financesApi.js
│   │   ├── blogApi.js
│   │   ├── articleDetailApi.js
│   │   ├── categoryApi.js
│   │   ├── contactApi.js
│   │   └── faqApi.js
│   ├── components/
│   │   ├── common/                 # Componentes reutilizables base
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── CourseCard/
│   │   │   ├── Toast/
│   │   │   └── themetoggle.jsx
│   │   ├── domain/                 # Componentes por dominio/feature
│   │   │   ├── auth/               # Login, registro, recuperación de contraseña
│   │   │   ├── About/
│   │   │   ├── Catalog/
│   │   │   ├── ChatBubble/         # Componente del chat con el asistente IA
│   │   │   ├── Course-detail/
│   │   │   ├── course-editor/      # Editor de cursos paso a paso (wizard)
│   │   │   ├── classroom/          # Aula virtual con reproductor de video
│   │   │   ├── certificates/
│   │   │   ├── profile/
│   │   │   ├── student-management/
│   │   │   ├── blog/
│   │   │   ├── blog-detail/
│   │   │   ├── wishlist/
│   │   │   ├── terms/
│   │   │   └── contact/
│   │   └── layout/                 # Layouts base de la aplicación
│   │       ├── MainLayout.jsx      # Layout principal con Navbar y Sidebar
│   │       ├── Navbar/
│   │       ├── Sidebar/
│   │       └── auth/               # Layout de dos columnas para autenticación
│   ├── constants/                  # Enumeraciones y valores fijos
│   │   ├── userLevels.js           # PRINCIPIANTE, INTERMEDIO, AVANZADO
│   │   ├── queryStatus.js          # Estados de consulta IA
│   │   └── theme.js
│   ├── context/                    # Contextos globales de React
│   │   ├── AuthContext.jsx         # Sesión y datos del usuario autenticado
│   │   ├── ThemeContext.jsx        # Modo claro / oscuro
│   │   ├── NotificationContext.jsx
│   │   └── LanguageContext.jsx
│   ├── controllers/
│   │   └── query.controller.js     # Lógica del asistente IA (capa frontend)
│   ├── hooks/                      # Custom hooks por feature
│   │   ├── useAiQuery.js           # Consultas al asistente IA
│   │   ├── useLogin.js
│   │   ├── useRegister.js
│   │   ├── useCourses.js
│   │   ├── useCourseDetail.js
│   │   ├── useClassroom.js
│   │   ├── useMyCourses.js
│   │   ├── useStudentDashboards.js
│   │   ├── useInstructorDashboard.js
│   │   ├── useCourseWizard.js
│   │   ├── useCertificates.js
│   │   ├── useWishlist.js
│   │   ├── useNotifications.js
│   │   ├── useRatings.js
│   │   ├── useProfileSettings.js
│   │   └── ... (un hook por feature)
│   ├── routes/
│   │   └── AppRouter.jsx           # Definición de todas las rutas de la SPA
│   ├── screens/                    # Pantallas completas (pages)
│   │   ├── public/                 # Accesibles sin autenticación
│   │   ├── auth/                   # Login, registro, recuperar contraseña
│   │   ├── student/                # Panel del estudiante (requiere auth)
│   │   └── instructor/             # Panel del instructor/admin (requiere rol)
│   ├── utils/
│   │   ├── errorHandler.js
│   │   ├── formatters.js
│   │   └── validators.js
│   ├── App.jsx                     # Componente raíz con proveedores de contexto
│   ├── main.jsx                    # Punto de entrada de React
│   └── index.css                   # Estilos globales y directivas de Tailwind
├── .env.example                    # Plantilla de variables de entorno
├── .gitignore
├── vite.config.js                  # Configuración de Vite (alias @/src)
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## Descripción de carpetas importantes

| Carpeta | Descripción |
|---|---|
| `src/api/` | Un archivo por módulo. Todos usan `apiClient.js` como base con el token JWT inyectado automáticamente. |
| `src/screens/` | Pantallas completas de la aplicación, organizadas por rol: `public`, `auth`, `student`, `instructor`. |
| `src/components/domain/` | Componentes específicos de cada feature, como el `ChatBubble` del asistente IA o el `CustomVideoPlayer` del aula. |
| `src/hooks/` | Encapsula toda la lógica de negocio y llamadas a la API. Los componentes solo consumen el hook de su feature. |
| `src/context/` | Estado global compartido: sesión de usuario, tema y notificaciones. |
| `src/routes/AppRouter.jsx` | Define todas las rutas de la SPA con React Router v6, incluyendo redirección por rol. |

---

# Documentación del proyecto

## Descripción general

RutaIA Frontend es una SPA (Single Page Application) construida con React 18 y Vite que proporciona la interfaz completa de la plataforma educativa. El flujo principal es que los estudiantes puedan explorar cursos, inscribirse, aprender en el aula virtual y consultar al asistente inteligente, que les recomienda rutas de aprendizaje personalizadas según su nivel y área de interés.

## Objetivo general

Desarrollar una interfaz de usuario moderna, responsiva y accesible que conecte a estudiantes e instructores con la plataforma RutaIA, integrando un asistente académico con IA en el flujo natural del aprendizaje.

## Objetivos específicos

- Proveer una experiencia de autenticación fluida con JWT almacenado en `localStorage`
- Implementar un catálogo de cursos con búsqueda y filtros por categoría y nivel
- Ofrecer un aula virtual con reproductor de video, índice de lecciones y recursos descargables
- Integrar el asistente IA como chat contextual accesible desde el dashboard del estudiante
- Permitir a instructores crear y editar cursos mediante un wizard de pasos y subir documentos para indexación en Qdrant
- Visualizar el grafo de conocimiento de Qdrant en tiempo real

## Funcionalidades

**Área pública (sin autenticación)**
- Landing page con secciones de hero, cursos destacados y testimonios
- Catálogo completo de cursos con filtros por categoría, nivel y búsqueda
- Detalle de cada curso con syllabus, perfil del instructor y reseñas
- Blog con artículos técnicos, barra de progreso de lectura y tabla de contenidos
- Páginas de preguntas frecuentes, contacto, planes de precios, términos y políticas

**Área del estudiante (autenticado)**
- Dashboard con progreso de cursos, actividad reciente y métricas
- Aula virtual con reproductor de video, currículo lateral y foro de lecciones
- Chat con el asistente IA para recomendaciones de cursos personalizadas
- Calificación de respuestas del asistente (1-5 estrellas)
- Mis cursos, lista de deseos, certificados y métricas personales
- Configuración de perfil (público, seguridad, preferencias, notificaciones)

**Área del instructor / administrador**
- Dashboard con métricas de ventas, cursos y estudiantes activos
- Gestión de cursos (crear, editar, publicar/archivar)
- Editor de curso en pasos (información básica, currículo, precios, revisión)
- Gestión de estudiantes con tabla filtrable y detalle por alumno
- Ingesta de documentos PDF para indexación en Qdrant vía n8n
- Visualizador de grafo de conocimiento de Qdrant (react-force-graph-2d)
- Panel de finanzas e ingresos

## Rutas de la aplicación

### Rutas públicas

| Ruta | Pantalla | Descripción |
|---|---|---|
| `/` | LandingScreen | Página principal |
| `/catalog` | CatalogScreen | Catálogo de cursos con filtros |
| `/curso/:slug` | CourseDetailScreen | Detalle de un curso |
| `/about` | AboutScreen | Acerca de RutaIA |
| `/blog` | BlogScreen | Listado de artículos |
| `/blog/:slug` | ArticleDetailScreen | Detalle de un artículo |
| `/pricing` | PlanScreen | Planes de suscripción |
| `/contact` | ContactScreen | Formulario de contacto |
| `/faq` | FaqScreen | Preguntas frecuentes |
| `/privacy` | PrivacyPolicyScreen | Política de privacidad |
| `/terms` | TermsScreen | Términos y condiciones |
| `/legal` | LegalScreen | Avisos legales |

### Rutas de autenticación

| Ruta | Pantalla | Descripción |
|---|---|---|
| `/login` | LoginScreen | Inicio de sesión |
| `/register` | RegisterScreen | Registro de nuevo usuario |
| `/forgot-password` | ForgotPasswordScreen | Recuperación de contraseña |

### Rutas del estudiante

| Ruta | Pantalla | Descripción |
|---|---|---|
| `/app/dashboard` | StudentDashboardScreen | Panel principal del estudiante |
| `/app/mis-cursos` | MyCoursesScreen | Cursos inscritos |
| `/app/metricas` | MetricsScreen | Métricas de aprendizaje |
| `/app/perfil` | ProfileScreen | Configuración del perfil |
| `/app/certificados` | CertificatesScreen | Certificados obtenidos |
| `/app/favoritos` | WishlistScreen | Lista de deseos |
| `/app/aprender/:courseSlug?/:lessonSlug?` | ClassroomScreen | Aula virtual |

> El asistente IA (`AiQueryScreen`) es accesible desde el dashboard del estudiante como sección integrada.

### Rutas del instructor / administrador

| Ruta | Pantalla | Descripción |
|---|---|---|
| `/instructor/dashboard` | InstructorDashboardScreen | Panel del instructor |
| `/instructor/cursos` | CourseManagementScreen | Gestión de cursos |
| `/instructor/editor-curso/:id?` | CourseEditorScreen | Crear o editar un curso |
| `/instructor/estudiantes` | StudentManagementScreen | Gestión de estudiantes |
| `/instructor/finanzas` | InstructorFinancesScreen | Finanzas e ingresos |
| `/instructor/ingesta-n8n` | DocumentIngestionScreen | Subir PDF a Qdrant vía n8n |
| `/instructor/grafo-qdrant` | KnowledgeGraphScreen | Grafo de conocimiento |

## Gestión de estado

| Mecanismo | Uso |
|---|---|
| **Zustand** | Estado global persistente: sesión del usuario, carrito, preferencias. |
| **React Context** | `AuthContext` (token + usuario), `ThemeContext` (claro/oscuro), `NotificationContext`. |
| **Custom Hooks** | Cada feature tiene su hook (`useAiQuery`, `useClassroom`, `useCourses`…) que encapsula la lógica y las llamadas a la API. |
| **localStorage** | Token JWT y preferencias del usuario entre recargas. |

## Integración con el backend

Todos los módulos de `src/api/` usan `apiClient.js` como base:

```js
// Instancia base con token JWT inyectado automáticamente
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
    timeout: 360000
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
```

El chat con el asistente IA llama a `/api/v1/queries/ask`, que el backend redirige al webhook de n8n para procesamiento RAG con Gemini y Qdrant.

## Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm install` | Instala las dependencias. |
| `npm run dev` | Inicia el entorno de desarrollo con hot-reload. |
| `npm run build` | Genera el build de producción en `/dist`. |
| `npm run preview` | Previsualiza el build de producción localmente. |
| `npm run lint` | Ejecuta ESLint sobre todos los archivos `.js` y `.jsx`. |

## Variables de entorno

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `VITE_API_URL` | URL base del backend Express | `http://localhost:3000/api/v1` |

> Recuerda que en Vite, todas las variables de entorno que necesitas en el navegador deben comenzar con `VITE_`.

## Convenciones de código

- Nombres de componentes y archivos en `PascalCase`.
- Hooks personalizados con prefijo `use` en `camelCase`.
- Módulos de API en `camelCase` con sufijo `Api`.
- Un hook por feature; los componentes solo llaman al hook de su dominio.
- Alias `@/` para importar desde `src/` sin rutas relativas largas.
- Tailwind CSS para todos los estilos; sin CSS modules ni styled-components.

## Convención de commits

```text
feat: agregar pantalla de asistente IA
fix: corregir redirección de dashboard por rol
docs: actualizar README con rutas de la SPA
refactor: extraer lógica del chat al hook useAiQuery
style: ajustar breakpoints del catálogo en móvil
```

## Despliegue

- **Frontend:** pendiente de despliegue
- **API Backend:** `http://localhost:3000/api/v1` (local)
- **Build output:** `/dist` (compatible con Vercel, Netlify, Nginx)

## Problemas conocidos

- El asistente IA requiere que el backend y la infraestructura Docker (n8n + Qdrant) estén corriendo para responder.
- El visualizador de grafo de Qdrant (`KnowledgeGraphScreen`) muestra datos solo si la colección `RutaIA` está indexada.
- El modo oscuro persiste en `localStorage`; si se limpia el almacenamiento local, vuelve al modo claro por defecto.

## Mejoras futuras

- Despliegue en Vercel o Netlify con CI/CD
- Implementación de PWA para uso sin conexión
- Internacionalización (i18n) para inglés y español
- Tests unitarios con Vitest y Testing Library

## Cómo contribuir

1. Crea un fork del repositorio.
2. Crea una nueva rama:

```bash
git checkout -b feature/nombre-funcionalidad
```

3. Realiza los cambios.
4. Guarda los cambios:

```bash
git add .
git commit -m "feat: agregar nueva funcionalidad"
```

5. Envía la rama a GitHub:

```bash
git push origin feature/nombre-funcionalidad
```

6. Crea un Pull Request.

## Autor

- **Nombre:** Jose Guillermo Rodriguez Samcam
- **Correo:** evomarketgt@icloud.com
- **GitHub:** [Joguisam-gt](https://github.com/Joguisam-gt)

## Licencia

Este proyecto fue desarrollado con fines educativos.

---

## Lista de verificación antes de entregar

- [x] El nombre y la descripción del proyecto están completos.
- [x] Las tecnologías utilizadas están actualizadas.
- [x] Las instrucciones de instalación funcionan.
- [x] Las variables de entorno están documentadas.
- [x] La estructura corresponde al proyecto real.
- [x] Las funcionalidades están descritas.
- [x] Las rutas de la aplicación están documentadas.
- [x] La integración con el backend está explicada.
- [ ] Las capturas de pantalla se visualizan.
- [x] Los enlaces funcionan.
- [x] No se incluyeron contraseñas, tokens ni datos privados.
- [x] Los datos del autor están completos.
