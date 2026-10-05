# Smart Sender

React + TypeScript app (Vite) for signing in with a phone number and building message flows on a node canvas.

## Feature-based structure

Code is grouped by role. Pages compose features. Features own their UI and logic. Shared pieces stay outside both.

```
src/
  core/          app infrastructure
    firebase/    Firebase app and Auth instance
    router/      route table
  features/      self-contained product features
    Auth/        phone OTP sign-in (components + hooks)
    FlowBuilder/ node canvas (components, node types, mock data)
  pages/         route screens that compose features
    Home/        landing page with the auth form
    Console/     sidebar + flow builder
  shared/        layout and UI used across pages
    layout/      header, sidebar
    ui/          spinner and other primitives
```

Imports use path aliases from `tsconfig.app.json`:

| Alias | Maps to |
| --- | --- |
| `@core/*` | `src/core/*` |
| `@features/*` | `src/features/*` |
| `@pages/*` | `src/pages/*` |
| `@shared/*` | `src/shared/*` |

`App` renders the header and `AppRouter`. Routes:

- `/` — Home
- `/console` — Console

## Auth with Firebase OTP

Home renders the `Auth` feature. Sign-in is phone number plus a one-time SMS code through Firebase Authentication.

1. `useRecaptcha` mounts an invisible `RecaptchaVerifier` on `#recaptcha-container`.
2. The send form calls `signInWithPhoneNumber` with the phone number and that verifier. Firebase sends the SMS.
3. After a `ConfirmationResult` exists, the UI switches to the verify form.
4. Submitting the code calls `confirmationResult.confirm`. A valid code signs the user in and navigates to `/console`. An invalid code shows the error on the form.

Firebase is initialized in `src/core/firebase` and exported as `auth`.

## Console and the nodes builder

`/console` is a full-height layout: a sidebar menu on the left and `FlowBuilder` filling the rest.

`FlowBuilder` is a [React Flow](https://reactflow.dev/) (`@xyflow/react`) canvas wrapped in `ReactFlowProvider`. It keeps nodes and edges in local state, starting from the mock graph in `FlowBuilder/Utils/MockupData.ts`.

- Drag between handles to connect nodes. Connections snap to a 10px grid.
- Dropping a connection on empty space opens a context menu. Picking a type adds that node at the cursor and links it to the node the drag started from.
- Custom nodes live under `FlowBuilder/Nodes` and are registered in `FlowBuilder/NodeTypes`. The first type is `textNode` (`TextUpdaterNode`): a labeled text input with a target handle on top and a source handle on the bottom.
- The canvas includes controls, a minimap, and a background.

## Scripts

```bash
npm install
npm run dev      # Vite dev server
npm run build    # tsc -b && vite build
npm run lint
npm run preview
```
