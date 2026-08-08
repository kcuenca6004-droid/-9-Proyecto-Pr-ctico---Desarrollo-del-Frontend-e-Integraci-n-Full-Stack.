# Help Desk SPA (Frontend Angular)

Proyecto Angular **completo y listo para ejecutar** (probado con `npm install && ng build --configuration production` sin errores).

SPA modularizada en 3 componentes principales:

- **DashboardComponent** (`/dashboard`): resumen de tickets, consume `GET /api/tickets/resumen`.
- **TicketFormComponent** (`/nuevo-ticket`): formulario para crear tickets vía `POST /api/tickets`.
- **TicketListComponent** (`/tickets`): lista, filtra, actualiza estado (`PUT`) y elimina (`DELETE`) tickets.

Toda la comunicación con el backend se hace con `HttpClient` (peticiones HTTP asíncronas) a través de `TicketService`.

## Ejecutar en local

```bash
npm install
ng serve   # http://localhost:4200
```

Por defecto `src/environments/environment.ts` apunta a `http://localhost:4000/api` (tu backend en local).

## Antes de desplegar: configura la URL del backend

Edita `src/environments/environment.prod.ts` y reemplaza `apiUrl` por la URL real
de tu backend ya desplegado en Render, por ejemplo:

```ts
export const environment = {
  production: true,
  apiUrl: 'https://helpdesk-api-xxxx.onrender.com/api',
};
```

Guarda, haz commit y push — Vercel reconstruirá automáticamente con la URL correcta.

## Subir a GitHub

```bash
git init
git add .
git commit -m "SPA Angular Help Desk - Actividad 9"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/helpdesk-frontend.git
git push -u origin main
```

## Desplegar en Vercel

1. Entra a https://vercel.com → **Add New... → Project** → importa el repositorio `helpdesk-frontend`.
2. Vercel detecta Angular, pero confirma manualmente:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/helpdesk-frontend`
   - **Install Command:** `npm install`
3. Despliega. Vercel entregará una URL pública, por ejemplo:
   `https://helpdesk-frontend.vercel.app`

Este proyecto ya incluye `vercel.json` con las reglas de *rewrite* necesarias para que
el enrutamiento de Angular (`/dashboard`, `/tickets`, `/nuevo-ticket`) funcione
correctamente al recargar la página o entrar por URL directa.

## Desplegar en Netlify (alternativa)

1. **New site from Git** → selecciona el repositorio.
2. **Build command:** `npm run build`
3. **Publish directory:** `dist/helpdesk-frontend`
4. En Netlify agrega un archivo `_redirects` en `src/` con `/* /index.html 200` si prefieres
   Netlify en vez de Vercel (con Vercel esto ya lo resuelve `vercel.json`).

## Importante: CORS

Una vez tengas la URL final del frontend (Vercel), regresa a Render y actualiza
la variable de entorno `CLIENT_ORIGIN` del backend con esa URL exacta, para que el
navegador no bloquee las peticiones por política CORS.
