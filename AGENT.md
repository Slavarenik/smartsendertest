# Architecture

Smart Sender is a React + Vite app. Keep the dependency direction below. Do not introduce a new top-level layer.

```
main.tsx → App.tsx → core → pages → features
                              ↘       ↙
                                shared
```

| Layer | Path | Alias | Owns |
| --- | --- | --- | --- |
| Bootstrap | `src/main.tsx` | — | React root, `BrowserRouter`, global CSS |
| Shell | `src/App.tsx` | — | Renders `AppRouter` only |
| Core | `src/core` | `@core` | App infrastructure: routing and other app-wide wiring |
| Pages | `src/pages` | `@pages` | One screen per route |
| Features | `src/features` | `@features` | Product behavior, composed by pages |
| Shared | `src/shared` | `@shared` | UI and helpers used by more than one feature |

## Imports

- Import other layers only through aliases: `@core/*`, `@pages/*`, `@features/*`, `@shared/*`.
- A feature imports its public API from the barrel: `@features/Auth`.
- A page component is imported from its file: `@pages/Home/Home`.
- Do not use deep imports into another feature (`@features/Auth/Components/Auth`).
- Do not use relative imports to leave a layer (`../../pages/...`). Relative imports stay inside the same feature, page, or core module.

Allowed direction:

- `core` may import `pages`.
- `pages` may import `features` and `shared`.
- `features` may import `shared` and other features only through their barrels.
- `shared` imports nothing from `core`, `pages`, or `features`.

Forbidden:

- `features` or `shared` importing `pages` or `core`.
- `pages` importing another page's files. Navigate with `react-router` `Link` or `useNavigate`.
- Product UI inside `core`.

```tsx
// good — page composes a feature
import { Auth } from "@features/Auth"

// bad — crosses into a feature's internals
import { Auth } from "@features/Auth/Components/Auth"
```

## Routing

- Mount `BrowserRouter` once in `src/main.tsx`.
- Declare every route in `src/core/router/AppRouter.tsx`.
- Add a page by creating `src/pages/<Name>/<Name>.tsx` and a `<Route>` in `AppRouter`.
- Pages do not render `<Routes>`.

## Files

- One folder per page and per feature, named in PascalCase (`Home`, `Auth`).
- Export pages and feature components as named constants: `export const Home = () => {}`.
- `App` is the only default export.
- A feature's public surface is `src/features/<Name>/index.ts`, which re-exports the component.
- Keep feature-only components in `src/features/<Name>/Components/`.
- Move a component to `shared` only when a second feature needs it.

## Code

- End every statement with a semicolon.

## Styling

- Tailwind 4 is loaded once from `src/index.css` with `@import "tailwindcss"`.
- Style elements with Tailwind utilities. Do not add a new CSS framework.
- Keep `App.css` limited to the app shell.
