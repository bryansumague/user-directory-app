# Architecture & Design Discussion

## 1. How would you manage state in a large-scale React application?

For large-scale applications, I prefer a layered approach to state management. Local component state using `useState` or `useReducer` works well for isolated UI concerns. For shared or global state (like auth, themes, or app settings), I typically use a state management library like **Redux Toolkit**, **Zustand**, or **React Context** when the use case is simpler.

I also try to colocate state with the components that need it, and use custom hooks to abstract logic where possible. This keeps the app modular and maintainable as it grows.

## 2. How do you optimize performance in React using useEffect, useMemo, and useCallback?

I use these hooks intentionally to reduce unnecessary re-renders:

- **useEffect**: I ensure it's only triggered when needed by providing a well-defined dependency array. I avoid doing state updates in effects that could loop or trigger repeatedly.
- **useMemo**: I use it to memoize expensive computations or filtered results — in this project, it's used to avoid re-filtering users on every render.
- **useCallback**: This is used to memoize event handlers (e.g., input change or button clicks), especially when they're passed to child components that rely on referential equality to prevent re-renders.

The key is balancing optimization with readability — I avoid premature optimization unless there's a clear performance cost.

## 3. How would you ensure accessibility in the User Directory component?

I try to follow basic accessibility (a11y) best practices:

- Use **semantic HTML** tags (like `section`, `button`, `label`).
- Leverage **Material UI’s accessible components**, which already include keyboard and ARIA support.
- Ensure all dynamic elements have **aria-labels** or roles where appropriate.
- I also check **color contrast**, enable **keyboard navigation**, and make sure tab focus works correctly.

I believe building inclusive UIs is part of writing quality front-end code, not just a bonus.

