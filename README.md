# Help Desk — Proyecto Full Stack (Actividad #9)

Este paquete contiene el proyecto **completo y ya probado**, listo para subir a GitHub y desplegar:

```
helpdesk-fullstack/
├── frontend/   → SPA Angular (Dashboard, Formulario, Lista) — se despliega en Vercel
├── backend/    → API REST Node.js + Express + MongoDB — se despliega en Render
├── GUIA_DESPLIEGUE_COMPLETA.md
└── GUION_VIDEO_SUSTENTACION.md
```

El frontend (`/frontend`) ya fue **compilado y verificado** con
`npm install && ng build --configuration production` sin errores.

## ¿Un repositorio o dos?

Cualquiera de las dos opciones funciona para la entrega (el enunciado solo pide las URLs finales):

### Opción A — Dos repositorios separados (más simple, recomendada)
```bash
# 1) Backend
cd backend
git init && git add . && git commit -m "API REST Help Desk"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/helpdesk-backend.git
git push -u origin main

# 2) Frontend
cd ../frontend
git init && git add . && git commit -m "SPA Angular Help Desk"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/helpdesk-frontend.git
git push -u origin main
```
Luego despliegas cada repo en su plataforma (backend → Render, frontend → Vercel) siguiendo
el README dentro de cada carpeta.

### Opción B — Un solo repositorio (monorepo)
```bash
cd helpdesk-fullstack
git init && git add . && git commit -m "Proyecto full stack Help Desk"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/helpdesk-fullstack.git
git push -u origin main
```
- En **Render**, al crear el Web Service, configura **Root Directory: `backend`**.
- En **Vercel**, al importar el proyecto, configura **Root Directory: `frontend`**.

Ambas plataformas soportan monorepos indicando el subdirectorio raíz del build.

## Orden de despliegue (obligatorio)

1. **MongoDB Atlas** (base de datos en la nube — nunca localhost).
2. **Render** (backend, usando la cadena de conexión de Atlas).
3. **Vercel** (frontend, apuntando a la URL del backend en Render vía `environment.prod.ts`).
4. Actualiza `CLIENT_ORIGIN` en Render con la URL final de Vercel (evita bloqueo CORS).

Instrucciones detalladas, checklist y solución de errores comunes en `GUIA_DESPLIEGUE_COMPLETA.md`.

## Recordatorios de la actividad

- El sistema desplegado **no debe depender de `localhost`** en ninguna capa — verifica que
  `environment.prod.ts` y la variable `MONGODB_URI` apunten siempre a servicios en la nube.
- El **video de sustentación es obligatorio** (5-10 min, con rostro visible, sin restricciones
  de privacidad) — sin él la entrega se anula, según el enunciado. Usa `GUION_VIDEO_SUSTENTACION.md`
  como guía.
- La entrega final es un **PDF** con las 3 URLs (repos, sistema desplegado, video).
