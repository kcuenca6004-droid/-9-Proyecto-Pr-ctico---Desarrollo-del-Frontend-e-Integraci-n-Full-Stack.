# Help Desk API (Backend)

API REST del sistema de Help Desk construida con **Node.js + Express + MongoDB (Mongoose)**.
Corresponde a la Actividad 8 (API REST) y sirve de base para la Actividad 9 (integración Full Stack y despliegue).

## Endpoints

| Método | Ruta                    | Descripción                              |
|--------|-------------------------|-------------------------------------------|
| GET    | /api/tickets            | Lista todos los tickets (filtros opcionales `?estado=` `?categoria=`) |
| GET    | /api/tickets/resumen    | Totales por estado (para el Dashboard)    |
| GET    | /api/tickets/:id        | Obtiene un ticket por ID                  |
| POST   | /api/tickets            | Crea un nuevo ticket                      |
| PUT    | /api/tickets/:id        | Actualiza un ticket existente             |
| DELETE | /api/tickets/:id        | Elimina un ticket                         |

Modelo `Ticket`: `titulo, descripcion, solicitante, categoria, prioridad, estado, tecnicoAsignado, createdAt, updatedAt`.

## Ejecutar en local

```bash
npm install
cp .env.example .env   # completa MONGODB_URI con tu cadena de Atlas
npm run dev             # http://localhost:4000
```

## Despliegue paso a paso

### 1. Base de datos: MongoDB Atlas
1. Crea una cuenta gratuita en https://www.mongodb.com/cloud/atlas
2. Crea un **Cluster gratuito (M0)**.
3. En "Database Access" crea un usuario y contraseña.
4. En "Network Access" agrega `0.0.0.0/0` (permitir acceso desde cualquier IP, necesario para Render).
5. En "Connect" → "Drivers" copia la cadena de conexión y reemplázala en tu `.env` como `MONGODB_URI`.

### 2. Backend: Render
1. Sube esta carpeta a un repositorio de GitHub (por ejemplo `helpdesk-backend`).
2. Entra a https://render.com y crea un **New Web Service** conectado a ese repositorio.
3. Configura:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. En "Environment" agrega las variables:
   - `MONGODB_URI` = tu cadena de Atlas
   - `CLIENT_ORIGIN` = la URL de tu frontend en Vercel/Netlify (puedes dejar `*` temporalmente mientras pruebas)
5. Despliega. Render te dará una URL pública, por ejemplo:
   `https://helpdesk-api-xxxx.onrender.com`
6. Verifica visitando esa URL: debe responder `{"mensaje":"API Help Desk funcionando correctamente 🚀"}`

Con eso tu API REST queda operativa en Internet y lista para ser consumida por el frontend Angular.
