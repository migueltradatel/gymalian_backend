# Gymalian - Plataforma de Gestión para Entrenamiento Personal

![Gymalian Logo](assets/logo.png)

Trabajo de Fin de Máster en Desarrollo con Inteligencia Artificial BigSchool

Autor: Miguel Ángel Moreno Caro
       ma.moreno.caro@gmail.com

## URL de Acceso a la aplicación:

- [Gymalian](http://gymalian.duckdns.org/)

    Coach: coach.ma@gmail.com
    Contraseña: 2021
    
    Atleta: atleta.go@gmail.com
    Contraseña: 2022

    Atleta: atleta.sa@gmail.com
    Contraseña: 2023


## Aclaraciones: 
    1. Para cualquier duda o aclaración, no dude en contactar a mi email ma.moreno.caro@gmail.com
    2. Si fuera necesario, se puede proporcionar credenciales de acceso a la base de datos de MongoDB.

## Informacón de repositorios.
Este proyecto consta de dos repositorios correspondientes a cada uno de los monolitos del sistema.
- Por una parte este repositorio correspondiente al [Frontend](https://github.com/migueltradatel/gymalian_frontend.git)
- Por otra parte el repositorio que corresponde al [Backend](https://github.com/migueltradatel/gymalian_backend.git)

Se ha añadido este documento README.md en el repositorio del frontend para facilitar la información sobre el proyecto en el formulario de envio a evaluación del TFM. No obstante se añadirá una copia en el repositoprio del backend.

## Presentación del Proyecto

Además se ha creado una presentación del proyecto, creada con la documentacíon del proyecto y la ayuda de la IA Google NoteBookLM, que se puede encontrar en el siguiente enlace:

- [Presentación del Proyecto](https://docs.google.com/presentation/d/1A10VZQOxBGnO_8CO7b4vJbg-rKBte6_u/edit?usp=sharing&ouid=113110490338870513780&rtpof=true&sd=true)

## a. Descripción General del Proyecto

**Gymalian** es una plataforma integral de alto rendimiento diseñada para la digitalización y optimización de servicios de entrenamiento personal. Este proyecto constituye el **Trabajo de Fin de Máster (TFM)** en Desarrollo con Inteligencia Artificial, integrando no solo soluciones técnicas avanzadas de desarrollo web, sino también una arquitectura fundamentada en los principios de la **Ingeniería Asistida por IA**.

### Filosofía y Necesidad del Mercado
En un contexto donde el fitness demanda una personalización extrema y una gestión basada en datos, Gymalian nace para eliminar la fricción entre el análisis del entrenador y la ejecución del atleta. La plataforma resuelve la falta de herramientas técnicas que combinen una interfaz atractiva (UX/UI Premium) con un motor de datos capaz de soportar el seguimiento preciso de cargas y volumen, elementos críticos para la hipertrofia y el rendimiento deportivo.

### Desarrollo AI-Driven (Metodología)
El proyecto ha sido desarrollado bajo un paradigma de **AI-First Workflow**, utilizando modelos de lenguaje de gran escala (LLMs) y agentes autónomos para:
- **Generación de Código de Alta Fidelidad**: Implementación de lógica de negocio compleja y tipado estático riguroso en TypeScript.
- **Diseño de Interfaz Dinámica**: Creación de un sistema de diseño propio basado en contrastes profundos y micro-animaciones para maximizar el engagement.
- **Resolución de Conflictos Técnicos**: Optimización de queries de agregación en MongoDB y gestión de flujos de autenticación seguros.

### Propuesta de Valor Diferencial
1. **Dualidad Operativa**: Un sistema de dos caras que diferencia claramente la **gestión estratégica** (dashboard del coach, análisis de métricas) de la **ejecución táctica** (logger de sesión del atleta optimizado para el uso en sala).
2. **Ecosistema Isomórfico**: Uso de Ionic y Angular para garantizar una experiencia de usuario fluida tanto en entornos web como móviles nativos a través de Capacitor.
3. **Escalabilidad y IA-Ready**: La base de datos no es solo un repositorio de información, sino una infraestructura de preparación de datos (Data Prep) lista para alimentar modelos predictivos de Machine Learning que, en futuras versiones, podrán automatizar la prescripción de cargas (Progression AI).
4. **Seguridad Empresarial**: Implementación de estándares industriales como JWT para la sesión y RBAC para la integridad de los datos sensibles de los usuarios.

### Aspectos Diferenciales
- **Enfoque en UX/UI**: Una estética "Premium" con modo oscuro, contrastes cuidados (High Contrast Orange) y micro-animaciones que mejoran la experiencia de uso.
- **Multiperfil**: Diferenciación clara entre las necesidades de gestión del gestor (Coach) y las de ejecución del usuario final (Atleta).
- **Arquitectura Escalable**: Backend desacoplado y frontend modular que permite la expansión rápida de funcionalidades.
- **Preparado para IA**: Modelos de datos estandarizados listos para alimentar algoritmos de Machine Learning.


## b. Stack Tecnológico Utilizado

El proyecto emplea una arquitectura moderna de tipo **MEAN/MERN adaptada**, utilizando las siguientes tecnologías:

### Backend
- **Node.js & Express**: Entorno de ejecución y framework web para la API REST.
- **TypeScript**: Superset de JavaScript que aporta tipado estático para un desarrollo más seguro y mantenible.
- **MongoDB & Mongoose**: Base de datos NoSQL para un almacenamiento flexible y modelado de datos orientado a objetos.
- **JWT (JSON Web Tokens)**: Sistema de autenticación seguro para la protección de rutas.
- **Bcryptjs**: Encriptación de contraseñas para garantizar la seguridad de los usuarios.
- **Helmet**: Middleware de seguridad para proteger la app contra vulnerabilidades HTTP comunes.
- **Morgan**: Logger de solicitudes HTTP para el desarrollo y depuración.

### Frontend
- **Ionic Framework (v8)**: SDK de desarrollo para aplicaciones móviles y web con calidad nativa.
- **Angular (v20)**: Framework principal para la lógica de la interfaz y gestión de componentes.
- **Capacitor**: Puente para llevar la aplicación web a plataformas móviles nativas (iOS/Android).
- **Chart.js**: Librería para la visualización de datos y analíticas de rendimiento.
- **Vanilla CSS3**: Estilos personalizados siguiendo un sistema de diseño propio para maximizar la identidad visual del proyecto.

### Metodología y Herramientas
- **AI-First Workflow**: Desarrollo asistido por modelos de lenguaje de gran escala (LLMs) para optimizar la productividad y calidad del código.
- **Git**: Sistema de control de versiones.
- **NPM**: Gestor de dependencias tanto para frontend como para backend.

---

## c. Información sobre su Instalación y Ejecución

Para poner en marcha el proyecto localmente, siga estos pasos:

### Requisitos Previos
- Node.js (v18 o superior)
- MongoDB (local o una instancia en Atlas)
- Angular CLI & Ionic CLI (`npm install -g @angular/cli @ionic/cli`)

### 1. Crear la carpeta del proyecto
``` bash
mkdir gymalian
cd gymalian
```

### 2. Clonar el repositorio del frontend
```bash
git clone <https://github.com/migueltradatel/gymalian_frontend.git>
```

### 3. Clonar el repositorio del backend
```bash
git clone <https://github.com/migueltradatel/gymalian_backend.git>
```

### 4. Configurar el Backend
Desde la carpeta raíz gymalian:
```bash
cd backend
npm install
```
Cree un archivo `.env` en la carpeta `backend` con las siguientes variables:
```env
PORT=3004
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<nombre_base_de_datos>.mongodb.net/
JWT_SECRET=tu_clave_secreta_super_segura
```
Para iniciar el backend en modo desarrollo:
```bash
npm run dev
```

### 5. Configurar el Frontend
Desde la carpeta raíz gymalian:
```bash
cd frontend
npm install
```
Para iniciar el servidor de desarrollo de Ionic:
```bash
ionic serve
```

La aplicación estará disponible en `http://localhost:8100` y la API en `http://localhost:3000`.

---

## d. Estructura del Proyecto

El proyecto se divide en dos grandes monolitos desacoplados:

### Backend (`/backend`)
- `src/server.ts`: Punto de entrada del servidor y conexión a base de datos.
- `src/app.ts`: Configuración de middlewares y rutas de Express.
- `src/models/`: Definición de esquemas de Mongoose (User, Exercise, WorkoutPlan, WorkoutLog, Notification).
- `src/controllers/`: Lógica de negocio para cada entidad.
- `src/routes/`: Definición de endpoints de la API.
- `src/middleware/`: Funciones intermedias (p. ej., verificación de tokens JWT).
- `src/types/`: Definiciones de interfaces de TypeScript para consistencia de datos.

### Frontend (`/frontend`)
- `src/app/pages/`: Páginas principales de la aplicación (Athlete Home, Coach Dashboard, Session View, Auth).
- `src/app/services/`: Servicios de Angular para comunicación con el API (`ApiService`, `AuthService`, `NotificationService`).
- `src/app/components/`: Componentes reutilizables de la interfaz.
- `src/theme/`: Variables de estilo globales y configuración del sistema de diseño (Dark Mode, Orange Theme).
- `assets/`: Imágenes, logos y recursos estáticos.

---

## e. Funcionalidades Principales

Gymalian destaca por un conjunto de funcionalidades diseñadas para profesionalizar el entrenamiento personal, divididas en dos experiencias adaptadas:

### 1. Panel de Gestión para el Entrenador (Coach Dashboard)
- **Gestión Inteligente de Ejercicios**: Biblioteca centralizada donde el coach puede crear, editar y categorizar ejercicios con descripciones y metadatos técnicos.
- **Constructor de Planes Personalizados**: Interfaz dinámica para diseñar estructuras de entrenamiento (macros/mesociclos) compuestas por sesiones específicas, asignables de forma masiva o individual a los atletas.
- **Sistema de Vinculación por Código**: Registro simplificado de nuevos atletas mediante códigos de invitación únicos generados por el entrenador, asegurando una vinculación segura y privada.
- **Dashboard Analítico Avanzado**:
    - **Visualización de Volumen**: Gráficos dinámicos (Chart.js) que muestran la evolución del volumen total de entrenamiento por atleta o grupo.
    - **Métricas de Adherencia**: Monitorización en tiempo real de las tasas de completitud de los entrenamientos y actividad reciente.
    - **Seguimiento Individualizado**: Acceso a la ficha técnica de cada atleta con su historial completo de sesiones y progresión.
- **Centro de Notificaciones**: Recepción de alertas instantáneas cuando un atleta completa una sesión, facilitando el feedback inmediato.

### 2. Experiencia del Atleta (Athlete Experience)
- **Logger de Entrenamiento en Tiempo Real**: Vista de sesión optimizada para móviles que permite registrar pesos, repeticiones y **RPE** (Esfuerzo Percibido) set a set.
- **Asistente de Progresión de Cargas**: Integración automática del historial de rendimiento; el atleta visualiza sus cargas de la última sesión directamente en el logger para facilitar la sobrecarga progresiva.
- **Historial Detallado**: Consulta rápida de entrenamientos pasados para revisar anotaciones técnicas o marcas personales.
- **Dashboard de Evolución Personal**: Gráficos de progreso que motivan al atleta al visualizar su mejora en volumen y fuerza a lo largo del tiempo.

### 3. Seguridad, Arquitectura y UI/UX
- **Autenticación y Seguridad**: Implementación robusta mediante JWT, con roles definidos (RBAC) que garantizan que los datos de entrenamiento sean accesibles solo por el atleta y su entrenador asignado.
- **Diseño "Premium" y Accesibilidad**: Interfaz de alto contraste (High Contrast Orange) bajo un esquema de modo oscuro profesional, optimizada con micro-animaciones para una experiencia de usuario fluida.
- **Arquitectura de Micro-servicios Simulada**: Backend estructurado para ser escalable, con endpoints de *Health Check* y monitorización de estado del servidor.
- **Preparado para IA**: Modelado de datos (Mongoose) estandarizado y optimizado para alimentar futuros motores de recomendación de cargas y análisis predictivo de fatiga.