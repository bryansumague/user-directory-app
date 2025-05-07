# Front-End Technical Exam

This is a front-end technical assessment project built with **React**, **TypeScript**, and **Material UI**. It fetches and displays a list of users from the JSONPlaceholder API, supports grid and list views, and includes search and accessibility features.

---

## Tech Stack

- **React** – UI framework
- **TypeScript** – Static type checking
- **Material UI (MUI)** – Component library
- **Vite** – Fast build tool
- **Axios** – HTTP client for API calls
- **Vitest + Testing Library** – Unit testing framework

---

## Setup Instructions

### Prerequisites

- Node.js v16+
- npm v7+

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000)

### Build for production

```bash
npm run build
```

Compiled output will be in the `dist/` folder.

---

## Running Tests

```bash
npm run test
```

Runs unit tests using **Vitest** and **React Testing Library**.

---

## Features & Decisions

### Architecture & State Management

- Type-safe components using **TypeScript**
- Responsive UI with **Material UI**
- State managed via **React Hooks**
- Mobile-first layout with **Grid/List view toggle**

### Performance Optimizations

- `useMemo` to memoize filtered results
- `useCallback` to memoize handlers and reduce re-renders
- Conditional rendering to avoid unnecessary DOM updates
- Lightweight fetch logic with loading/error states

### Bonus Features Implemented

- Loading indicator with `CircularProgress`
- Error state using `Alert`
- Accessible UI:
  - ARIA attributes
  - Semantic HTML tags
  - Proper color contrast
  - Keyboard navigability
- Search bar for name filtering
- Hover feedback on user cards
- Responsive grid/list layout

---

## Project Structure

```
src/
├── components/       # Reusable components like UserCard
├── api.ts            # API fetching logic
├── types.d.ts        # TypeScript types
├── App.tsx           # Main app entry
├── test/             # Unit tests
```

---

