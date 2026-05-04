# React Frontend — Design Spec
**Date:** 2026-05-04  
**Branch:** `with-frontend` (from `with-services`)  
**Scope:** Add a React View layer for Prescrições to the existing MVC backend

---

## Goal

Add a minimal React frontend that connects to the existing Express MVC backend, serving as the View layer in the MVC pattern. Intended for classroom use to demonstrate how a View communicates with a Controller via HTTP.

---

## Architecture

The React app is served as a static file directly by Express — no separate dev server, no build step.

### Files changed

| File | Change |
|------|--------|
| `src/app.ts` | Add `app.use(express.static('public'))` before route registration |
| `public/index.html` | New file — the entire React frontend |

### How it fits into MVC

```
Browser (View)
  └── public/index.html       ← React app (the View)
        │
        │ fetch('/prescricoes')
        ▼
Express (port 3000)
  └── src/routes/prescricao.routes.ts
        └── src/controllers/prescricao.controller.ts   ← Controller
              └── src/services/prescricao.service.ts   ← Service / Business Logic
                    └── src/database/local-storage.ts  ← Model / Data
```

---

## Frontend

**Technology:** React + ReactDOM + Babel — all loaded via CDN. No npm, no build.

### Component tree

```
App
├── FormularioPrescricao   (controlled form)
└── ListaPrescricoes       (table)
```

### Components

**`App`** — root component  
- State: `prescricoes[]`, `loading`, `erro`  
- On mount: fetches `GET /prescricoes` and stores result in state  
- Passes `criarPrescricao` callback to form; on success, re-fetches list  

**`FormularioPrescricao`** — controlled form  
- Fields: `medicamento`, `dose`, `medico_nome`  
- On submit: calls `POST /prescricoes` with JSON body  
- Calls parent callback on success; shows error message on failure  

**`ListaPrescricoes`** — read-only table  
- Receives `prescricoes` array as prop  
- Renders a row per entry: id, medicamento, dose, medico_nome  

### Data flow

1. **List (GET):** `useEffect` → `fetch('/prescricoes')` → `PrescricaoController.listar` → `PrescricaoService.listarPrescricoes` → state updated → table re-renders  
2. **Create (POST):** form submit → `fetch('/prescricoes', { method: 'POST', body: JSON.stringify({...}) })` → `PrescricaoController.criar` → `PrescricaoService.criarPrescricao` (validates) → 201 response → re-fetch list  

### CORS

Not needed — React is served from the same Express server on `:3000`, so all `fetch` calls are same-origin.

---

## What is NOT in scope

- Exames resource (covered separately if needed)
- Edit / Delete operations (no endpoints exist)
- Authentication
- Styling beyond basic readability
- Any build tooling or bundler
