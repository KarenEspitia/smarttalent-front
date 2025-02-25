# Sistema de Gestión y Reserva de Hoteles

Este proyecto es una solución para la prueba técnica frontend que implementa un sistema de gestión y reserva de hoteles con dos roles principales: agentes de viaje y viajeros.

## 🌐 Demo en vivo

El proyecto está desplegado y disponible para su uso en:
[https://smarttalent-front-clawfesj6-karens-projects-75a0d8ea.vercel.app/](https://smarttalent-front-clawfesj6-karens-projects-75a0d8ea.vercel.app/)

## 🚀 Características principales

- **Para Agentes de Viaje:**

  - Crear y gestionar hoteles
  - Asignar habitaciones a los hoteles
  - Definir precios, impuestos y características
  - Activar o desactivar hoteles y habitaciones
  - Ver listado de reservas realizadas

- **Para Viajeros:**
  - Buscar hoteles por ciudad
  - Visualizar habitaciones disponibles
  - Realizar reservas con datos personalizados
  - Ver historial de reservas

## 🔧 Tecnologías utilizadas

- **React** (última versión)
- **TypeScript**
- **React Router** para la navegación
- **React Hook Form** para formularios
- **Material UI** para componentes de interfaz
- **TailwindCSS** para estilos
- **Context API** para gestión de estado global
- **Vercel** para despliegue continuo

## 📋 Requisitos previos

- Node.js (versión 14 o superior)
- npm

## 🛠️ Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/KarenEspitia/smarttalent-front.git
   cd smarttalent-front
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abrir [http://localhost:5173](http://localhost:5173) en el navegador.

## 👤 Autenticación

Para probar la aplicación, puedes utilizar las siguientes credenciales:

### Rol de Agente de Viajes:

- **Correo**: Cualquier correo que contenga la palabra "agent" (ej: agent@example.com)
- **Contraseña**: Cualquier contraseña de al menos 6 caracteres

### Rol de Viajero (Cliente):

- **Correo**: Cualquier correo que NO contenga la palabra "agent" (ej: cliente@example.com)
- **Contraseña**: Cualquier contraseña de al menos 6 caracteres

> **IMPORTANTE**: La aplicación identifica el rol basándose en si el correo contiene la palabra "agent".

## 🗂️ Estructura del proyecto

```
src/
├── components/       # Componentes reutilizables
├── context/          # Contextos para gestión de estado
├── layouts/          # Componentes de layout para diferentes roles
├── pages/            # Páginas principales
│   ├── agent/        # Páginas para agentes
│   └── public/       # Páginas públicas
├── routes/           # Configuración de rutas
│   ├── index.ts      # Constantes de rutas
│   └── AppRouter.tsx # Configuración principal del router
└── main.tsx          # Punto de entrada
```

## 💾 Persistencia de datos

La aplicación utiliza SessionStorage para mantener la persistencia de los datos durante la sesión del navegador. Esto significa que los datos se mantendrán hasta que se cierre la ventana o pestaña del navegador.

## ✅ Pruebas manuales

Para probar la aplicación completamente:

1. Ingresar como agente (correo con "agent")
2. Crear al menos un hotel
3. Agregar habitaciones al hotel
4. Cerrar sesión e ingresar como cliente
5. Buscar hoteles por ciudad
6. Seleccionar un hotel y ver habitaciones
7. Realizar una reserva
8. Volver a ingresar como agente para ver la reserva realizada

## 📄 Licencia

[MIT](https://choosealicense.com/licenses/mit/)
