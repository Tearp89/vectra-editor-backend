# 🌌 Vectra Editor Backend: Microservicios Espaciales

Backend desarrollado en Node.js y Express con arquitectura de Microservicios para soportar el Editor Vectorial.

El proyecto está diseñado para ser modular y escalable, dividiendo la funcionalidad en servicios independientes (Autenticación, Dibujos, etc.).

---

## 🚀 Arquitectura de Microservicios

El backend consta de los siguientes servicios:

| Servicio | Puerto | Descripción | Requisito Previo |
| :--- | :--- | :--- | :--- |
| **Gateway Service** | `3000` | Punto de entrada único para el Frontend. Gestiona CORS y la seguridad (Validación JWT). | Data Service, Auth Service |
| **Auth Service** | `3002` | Maneja el registro, login y la emisión/validación de JSON Web Tokens (JWT). | MongoDB |
| **Drawings Service** | `3001` | Maneja la persistencia (Guardar/Cargar) de los archivos SVG. | MongoDB |
| **Assets Service** | `3003` | (Pendiente de implementar) Manejará la subida y almacenamiento de imágenes de fondo. | Sistema de Archivos |

---

## ⚙️ Requisitos y Configuración

Antes de iniciar los servicios, asegúrate de tener instalado:

1.  **Node.js** (v18+)
2.  **MongoDB** (Local o en la Nube)

### Pasos de Configuración Inicial

1.  **Instalar dependencias:**
    Ejecuta `npm install` dentro de cada carpeta de servicio (`gateway-service`, `auth-service`, `drawings-service`, `assets-service`).

2.  **Configurar las URI de MongoDB:**
    Asegúrate de que la variable `MONGO_URI` dentro de los archivos `index.js` de **Auth Service** y **Drawings Service** apunte a tu instancia de MongoDB.

3.  **Configurar JWT:**
    Asegúrate de cambiar la variable `JWT_SECRET` dentro de `auth-service/controllers/auth-controller.js` por una clave segura.

---

## ▶️ Ejecución del Proyecto

Para iniciar el entorno completo, debes iniciar cada servicio y la base de datos por separado:

1.  **Iniciar MongoDB.**

2.  **Iniciar Servicios Internos:**
    ```bash
    # Inicia el servicio de dibujos
    cd drawings-service
    node index.js
    
    # Inicia el servicio de autenticación
    cd ../auth-service
    node index.js
    ```

3.  **Iniciar el Gateway (Último):**
    ```bash
    # Inicia el proxy principal que expone la API
    cd ../gateway-service
    node index.js
    ```

El backend estará disponible a través del **Gateway Service** en `http://localhost:3000`.