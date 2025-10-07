# Frontend App Poli 🚀

Una aplicación web moderna construida con **Astro v5** que incluye un sistema de gestión de servicios con autenticación segura y panel de administración.

## ✨ Características

- � **Sistema de Autenticación**: Login seguro con contraseñas hasheadas usando bcrypt
- 📊 **Panel de Administración**: Dashboard completo para gestión de servicios
- 🎨 **Diseño Responsivo**: Interfaz moderna y adaptable a dispositivos móviles
- �️ **Base de Datos**: Integración con Astro DB para persistencia de datos
- 🛡️ **Middleware de Seguridad**: Protección de rutas privadas
- ⚡ **SSR**: Renderizado del lado del servidor para mejor rendimiento

## 🏗️ Estructura del Proyecto

```text
astrov1/
├── db/
│   ├── config.ts          # Configuración de la base de datos
│   └── seed.ts            # Datos iniciales
├── public/
│   ├── estilos.css        # Estilos globales
│   └── imagenes/          # Recursos estáticos
├── src/
│   ├── actions/
│   │   └── index.ts       # Acciones del servidor (login/logout)
│   ├── components/
│   │   ├── Header.astro   # Componente de navegación
│   │   └── Footer.astro   # Pie de página
│   ├── layouts/
│   │   ├── Layout.astro   # Layout principal
│   │   └── DashboardLayout.astro # Layout del dashboard
│   ├── pages/
│   │   ├── index.astro           # Página de inicio
│   │   ├── servicios.astro       # Catálogo de servicios
│   │   ├── detalle-servicio.astro # Detalle de servicios
│   │   ├── signup.astro          # Registro de usuarios
│   │   ├── auth/
│   │   │   └── login.astro       # Página de login
│   │   └── dashboard/
│   │       ├── index.astro          # Dashboard principal
│   │       ├── servicios.astro      # Gestión de servicios
│   │       ├── crear-servicio.astro # Crear nuevo servicio
│   │       └── editar-servicio.astro # Editar servicio
│   └── middleware.ts      # Middleware para protección de rutas
├── astro.config.mjs       # Configuración de Astro
└── package.json
```

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js (versión 18 o superior)
- pnpm (recomendado) o npm

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/zxmbrxnx/frontend-app-poli.git
   cd frontend-app-poli
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   ```

3. **Configurar la base de datos**
   ```bash
   # Inicializar y poblar la base de datos
   pnpm astro db push --force-reset
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   pnpm dev
   ```

5. **Abrir en el navegador**
   
   Visita [http://localhost:4321](http://localhost:4321)

## 🛠️ Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia el servidor de desarrollo en `localhost:4321` |
| `pnpm build` | Construye la aplicación para producción en `./dist/` |
| `pnpm preview` | Previsualiza la build de producción localmente |
| `pnpm astro db push` | Aplica cambios del esquema a la base de datos |
| `pnpm astro db push --force-reset` | Resetea y recrea la base de datos |
| `pnpm astro ...` | Ejecuta comandos CLI de Astro |

## 🔑 Credenciales de Prueba

Para acceder al sistema, usa estas credenciales:

- **Email**: `admin@ejemplo.com`
- **Contraseña**: `password123`

## 🗂️ Rutas de la Aplicación

### Rutas Públicas
- `/` - Página de inicio
- `/servicios` - Catálogo de servicios
- `/detalle-servicio` - Detalles de servicios
- `/auth/login` - Inicio de sesión
- `/signup` - Registro de usuarios

### Rutas Privadas (requieren autenticación)
- `/dashboard` - Panel principal del administrador
- `/dashboard/servicios` - Gestión de servicios
- `/dashboard/crear-servicio` - Crear nuevo servicio
- `/dashboard/editar-servicio` - Editar servicio existente

## 🔧 Tecnologías Utilizadas

- **[Astro](https://astro.build/)** - Framework web moderno
- **[Astro DB](https://docs.astro.build/en/guides/astro-db/)** - Base de datos integrada
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Hashing de contraseñas
- **TypeScript** - Tipado estático
- **CSS Custom Properties** - Estilos dinámicos

## 🛡️ Seguridad

- ✅ Contraseñas hasheadas con bcrypt (salt rounds: 10)
- ✅ Cookies de sesión seguras con httpOnly
- ✅ Middleware de protección de rutas
- ✅ Validación de entrada con Zod
- ✅ Manejo seguro de errores