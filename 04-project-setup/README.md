## Start Project

```sh
npm install
```

```sh
npm run dev
```

## Vite Setup

```sh
npm create vite@latest comfy-store -- --template react-ts
```

```sh
npm install
```

```sh
npm run dev
```

## Boilerplate Code

- change title (optional)
- remove boilerplate and add assets
- remove App.css
- delete everything in index.css
- remove everything from App.tsx
- snippets extension (rfce)
- get README.md

```tsx
function App() {
  return <div>App</div>;
}
export default App;
```

## Install Libraries

```sh
npm install @reduxjs/toolkit@^2.1.0 axios@^1.6.7 react-redux@^9.1.0 react-router-dom@^6.21.3

```

## Tailwind CSS

[Tailwind Docs](https://tailwindcss.com/docs/guides/vite)

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- restart the project

```tsx
function App() {
  return <h1 className='text-7xl font-bold '>App</h1>;
}
export default App;
```

## Shadcn/ui

[ShadcnUI](https://ui.shadcn.com/)

- setup

[Shadcn and Vite](https://ui.shadcn.com/docs/installation/vite)

tsconfig.json

```json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
    // ...
  }
}
```

```sh
npm i -D @types/node
```

vite.config.ts

```ts
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

```sh
npx shadcn-ui@latest init
```

```sh
npx shadcn-ui@latest add button

```

- restart server

```tsx
import { Button } from './components/ui/button';

function App() {
  return (
    <div>
      <h1 className='text-7xl font-bold '>App</h1>
      <Button
        variant='destructive'
        size='lg'
        onClick={() => console.log('it worked!!!')}
      >
        Click Me
      </Button>
    </div>
  );
}
export default App;
```

## Shadcn in Detail

- choose component
- install component
- component is located in components/ui
- can modify the code and take from project to project
- check the export
- import in other components
- uses Typescript so harder to make mistakes
- variables in index.css
- more options in the docs

## Redux Toolkit

```sh
npm install @reduxjs/toolkit react-redux
```

- create src/features
  - cart/cartSlice.ts
  - theme/themeSlice.ts
  - user/userSlice.ts

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  name: 'user slice',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
```

- create src/store.ts

```ts
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/theme/themeSlice';
import cartReducer from './features/cart/cartSlice';
import userReducer from './features/user/userSlice';
// ...

export const store = configureStore({
  reducer: {
    themeState: themeReducer,
    cartState: cartReducer,
    userState: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ReduxStore = {
  getState: () => RootState;
  dispatch: AppDispatch;
};
```

- create hooks.ts

```ts
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

- setup Provider

main.tsx

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { store } from './store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

```tsx
import { useAppSelector } from './hooks';
function App() {
  const { name } = useAppSelector((state) => state.userState);
  console.log(name);
}
```

## Create Pages

- create src/pages

  - About
  - Cart
  - Checkout
  - Error
  - HomeLayout
  - Landing
  - Login
  - Orders
  - Products
  - Register
  - SingleProduct
  - index.ts

  ```tsx
  function About() {
    return <h1 className='text-4xl'>About Page</h1>;
  }
  export default About;
  ```

  index.ts

  ```ts
  export { default as HomeLayout } from './HomeLayout';
  export { default as Landing } from './Landing';
  export { default as SingleProduct } from './SingleProduct';
  export { default as Products } from './Products';
  export { default as Cart } from './Cart';
  export { default as Error } from './Error';
  export { default as About } from './About';
  export { default as Login } from './Login';
  export { default as Register } from './Register';
  export { default as Checkout } from './Checkout';
  export { default as Orders } from './Orders';
  ```

  It's taking the default export from the 'About' module and giving it a name of 'About'.

App.tsx

```tsx
import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  Register,
  Login,
  Checkout,
  Orders,
} from './pages';

import { Button } from './components/ui/button';
import { useAppSelector } from './hooks';
function App() {
  const { name } = useAppSelector((state) => state.userState);
  console.log(name);

  return (
    <div>
      <h1 className='text-7xl font-bold '>App</h1>
      <Button
        variant='destructive'
        size='lg'
        onClick={() => console.log('it worked!!!')}
      >
        Click Me
      </Button>
      <Cart />
    </div>
  );
}
export default App;
```

- START CODING ALONG 😄😄😄😄😄
