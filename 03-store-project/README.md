## Setup

```sh
npm create vite@latest comfy-store -- --template react-ts
```

```sh
npm install && npm run dev
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

## React Router

```sh
npm i react-router-dom
```

App.tsx

```tsx
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
```

## Link Component

Cart.tsx

```tsx
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
function Cart() {
  return (
    <div>
      <h1 className='text-4xl'>Cart Page</h1>
      <Link to='/' className='text-7xl text-red-900'>
        back home
      </Link>
      <Button asChild size='lg'>
        <Link to='/'>home button</Link>
      </Button>
    </div>
  );
}
export default Cart;
```

## Outlet

App.tsx

```tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,

    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      { path: 'about', element: <About /> },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);
```

HomeLayout.tsx

```tsx
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <>
      <header>header</header>
      <nav>navbar</nav>
      <Outlet />
    </>
  );
};
export default HomeLayout;
```

## Header

- create components/Header.tsx (basic return)
- create components/index.ts(optional)

```ts
export { default as Header } from './Header';
```

- render in HomeLayout

```tsx
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useState } from 'react';
const Header = () => {
  const navigate = useNavigate();

  // temp
  const [user, setUser] = useState<{ username: string } | null>({
    username: 'demo user',
  });

  const handleLogout = () => {
    navigate('/');
    setUser(null);
  };

  return (
    <header>
      <div className='align-element flex justify-center sm:justify-end py-2'>
        {/* USER */}
        {user ? (
          <div className='flex gap-x-2 sm:gap-x-8 items-center'>
            <p className='text-xs sm:text-sm'>Hello, {user.username}</p>
            <Button variant='link' size='sm' onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className='flex gap-x-6 justify-center items-center -mr-4'>
            <Button asChild variant='link' size='sm'>
              <Link to='/login'>Sign in / Guest</Link>
            </Button>
            <Button asChild variant='link' size='sm'>
              <Link to='/register'>Register</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
```

## Tailwind Custom Class

index.css

```css
@layer components {
  .align-element {
    @apply mx-auto max-w-6xl px-8;
  }
}
```

HomeLayout.tsx

```tsx
<div className='align-element py-20'>
  <Outlet />
</div>
```

Header.tsx

```tsx
<div className='align-element flex ......'>...</div>
```

## Navbar

- create following components :
  - Navbar, Logo, LinksDropdown, NavLinks, ModeToggle, CartButton
- render navbar in the HomeLayout

```tsx
import CartButton from './CartButton';
import LinksDropdown from './LinksDropdown';
import Logo from './Logo';
import ModeToggle from './ModeToggle';
import NavLinks from './NavLinks';

const Navbar = () => {
  return (
    <nav className='bg-muted py-4'>
      <div className='align-element flex justify-between items-center'>
        <Logo />
        <LinksDropdown />
        <NavLinks />
        <div className='flex justify-center items-center gap-x-4'>
          <ModeToggle />
          <CartButton />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
```

## Logo

- already installed with shadcn
  [lucide-react](https://lucide.dev/icons/)

Logo.tsx

```tsx
import { Link } from 'react-router-dom';
import { Armchair } from 'lucide-react';

function Logo() {
  return (
    <Link
      to='/'
      className='hidden lg:flex justify-center items-center bg-primary p-2 rounded-lg text-white '
    >
      <Armchair className='w-8 h-8' />
    </Link>
  );
}

export default Logo;
```

## Links

- create src/utils/links.ts
- create src/utils/index.ts

links.ts

```ts
type Link = {
  href: string;
  label: string;
};

export const links: Link[] = [
  { href: '/', label: 'home' },
  { href: 'about', label: 'about' },
  { href: 'products', label: 'products' },
  { href: 'cart', label: 'cart' },
  { href: 'checkout', label: 'checkout' },
  { href: 'orders', label: 'orders' },
];
```

index.ts

```ts
export * from './links';
```

## DropdownMenu Component - Shadcn

```sh
npx shadcn-ui@latest add dropdown-menu
```

[DropdownMenu](https://ui.shadcn.com/docs/components/dropdown-menu)

## LinksDropdown

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlignLeft } from 'lucide-react';
import { Button } from './ui/button';
import { links } from '@/utils';
import { NavLink } from 'react-router-dom';

function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='lg:hidden'>
        <Button variant='outline' size='icon'>
          <AlignLeft />

          <span className='sr-only'>Toggle links</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-52 lg:hidden '
        align='start'
        sideOffset={25}
      >
        {links.map((link) => {
          return (
            <DropdownMenuItem key={link.label}>
              <NavLink
                to={link.href}
                className={({ isActive }) => {
                  return `capitalize w-full ${isActive ? 'text-primary' : ''}`;
                }}
              >
                {link.label}
              </NavLink>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropdown;
```

## NavLinks

```tsx
import { links } from '@/utils';
import { NavLink } from 'react-router-dom';

function NavLinks() {
  return (
    <div className='hidden lg:flex justify-center items-center gap-x-4'>
      {links.map((link) => {
        return (
          <NavLink
            to={link.href}
            className={({ isActive }) => {
              return `capitalize font-light tracking-wide ${
                isActive ? 'text-primary' : ''
              }`;
            }}
            key={link.label}
          >
            {link.label}
          </NavLink>
        );
      })}
    </div>
  );
}
export default NavLinks;
```

## Theme

[Theming](https://ui.shadcn.com/docs/theming)
[Themes](https://ui.shadcn.com/themes)

- overwrite base in index.css

## Dark Mode

[Dark Mode](https://ui.shadcn.com/docs/dark-mode/vite)

## ApplyTheme

- setup Theme in features/theme/themeSlice.ts

```ts
export type Theme = 'dark' | 'light' | 'system';
```

- create utils/applyTheme
- setup export

```ts
import { type Theme } from '@/features/theme/themeSlice';

export function applyTheme(theme: Theme) {
  const root = window.document.documentElement;

  root.classList.remove('light', 'dark');

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';

    root.classList.add(systemTheme);
    return;
  }

  root.classList.add(theme);
}
```

## ThemeSlice

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { applyTheme } from '@/utils';
export type Theme = 'dark' | 'light' | 'system';

type ThemeState = {
  theme: Theme;
};

const initializeTheme = (): Theme => {
  const theme = (localStorage.getItem('theme') as Theme) || 'system';
  applyTheme(theme);
  return theme;
};

const initialState: ThemeState = {
  theme: initializeTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      applyTheme(action.payload);
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
```

## ModeToggle

```tsx
import { Moon, Sun } from 'lucide-react';
import { useAppDispatch } from '@/hooks';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { setTheme } from '@/features/theme/themeSlice';

function ModeToggle() {
  const dispatch = useAppDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => dispatch(setTheme('light'))}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch(setTheme('dark'))}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch(setTheme('system'))}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ModeToggle;
```

## CartButton

```tsx
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

function CartButton() {
  const numItemsInCart = 5;

  return (
    <Button
      asChild
      variant='outline'
      size='icon'
      className='flex justify-center items-center relative'
    >
      <Link to='/cart'>
        <ShoppingCart />
        <span className='absolute -top-3 -right-3 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-xs'>
          {numItemsInCart}
        </span>
      </Link>
    </Button>
  );
}
export default CartButton;
```

## Error Page

```tsx
import { useRouteError, Link, isRouteErrorResponse } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Error = () => {
  // type:unknown
  const error = useRouteError();
  console.log(error);
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <main className='grid min-h-[100vh] place-items-center px-8 '>
        <div className='text-center'>
          <p className='text-9xl font-semibold text-primary'>404</p>
          <h1 className='mt-4 text-3xl font-bold tracking-tight sm:text-5xl'>
            Page not found
          </h1>
          <p className='mt-6 text-lg leading-7'>
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className='mt-10 '>
            <Button asChild size='lg' variant='secondary'>
              <Link to='/'>Go back home</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='grid min-h-[100vh] place-items-center px-8 '>
      <h4 className='text-center font-bold text-4xl'>there was an error... </h4>
    </main>
  );
};
export default Error;
```

App.tsx

```tsx
{
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
}
{
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
  },
```

## About Page

```tsx
function About() {
  return (
    <section>
      <h1 className='flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-tight sm:text-6xl '>
        We love
        <span className='bg-primary py-2 px-4 rounded-lg  tracking-widest text-white'>
          comfy
        </span>
      </h1>

      <p className='mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic veniam
        odit, officiis eos mollitia alias, doloremque, aspernatur ratione
        asperiores voluptas labore minus dolores reprehenderit corporis quos.
        Assumenda molestias harum dignissimos?
      </p>
    </section>
  );
}
export default About;
```

## Error Element

- create src/components/ErrorElement
- setup export

```tsx
import { useRouteError } from 'react-router-dom';
const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);

  return <h4 className='font-bold text-4xl'>there was an error... </h4>;
};
export default ErrorElement;
```

App.tsx

```tsx
 { path: 'about', element: <About />, errorElement: <ErrorElement /> },
```

## Landing Components

- in src/components create :
  - Hero
  - HeroCarousel
  - FeaturedProducts
  - SectionTitle
  - ProductsGrid
- setup export

Landing.tsx

```tsx
import { Hero, FeaturedProducts } from '@/components';

function Landing() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
}
export default Landing;
```

## CustomFetch

- create utils/customFetch.ts and setup export

- [API DOCS](https://documenter.getpostman.com/view/18152321/2s9Xy5KpTi)

```ts
import axios from 'axios';

const productionUrl = 'https://strapi-store-server.onrender.com/api';

export const customFetch = axios.create({
  baseURL: productionUrl,
});
```

## Products Types

- create utils/types.ts and setup export

```ts
export type ProductsResponse = {
  data: Product[];
  meta: ProductsMeta;
};

export type Product = {
  id: number;
  attributes: {
    category: string;
    company: string;
    createdAt: string;
    description: string;
    featured: boolean;
    image: string;
    price: string;
    publishedAt: string;
    shipping: boolean;
    title: string;
    updatedAt: string;
    colors: string[];
  };
};

export type ProductsMeta = {
  categories: string[];
  companies: string[];
  pagination: Pagination;
};

export type Pagination = {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
};
```

## Loaders

Loaders in React Router are functions that handle the loading of data or components asynchronously before a route is rendered.

```tsx
{
  index: true,
  element: <Landing />,
  loader: () => {
  console.log('landing page');
  // need to return something (at least null)
  return null;
  },
},
```

## Landing Loader

```tsx
import { FeaturedProducts, Hero } from '@/components';
import { customFetch, type ProductsResponse } from '@/utils';
import { useLoaderData, type LoaderFunction } from 'react-router-dom';

const url = '/products?featured=true';

export const loader: LoaderFunction = async (): Promise<ProductsResponse> => {
  const response = await customFetch<ProductsResponse>(url);
  return { ...response.data };
};

function Landing() {
  const result = useLoaderData() as ProductsResponse;
  console.log(result);

  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
}
export default Landing;
```

App.tsx

```tsx
{
  index: true,
  element: <Landing />,
  loader: landingLoader,
  errorElement: <ErrorElement />,
},
```

## Separator Component - Shadcn

[Separator](https://ui.shadcn.com/docs/components/separator)

```sh
npx shadcn-ui@latest add separator
```

## SectionTitle

```tsx
import { Separator } from '@/components/ui/separator';

const SectionTitle = ({ text }: { text: string }) => {
  return (
    <div>
      <h2 className='text-3xl font-medium tracking-wider capitalize mb-8'>
        {text}
      </h2>
      <Separator />
    </div>
  );
};
export default SectionTitle;
```

## FeaturedProducts

```tsx
import ProductsGrid from './ProductsGrid';
import SectionTitle from './SectionTitle';
const FeaturedProducts = () => {
  return (
    <section className='pt-24 '>
      <SectionTitle text='featured products' />
      <ProductsGrid />
    </section>
  );
};
export default FeaturedProducts;
```

## Format Price

- create utils/formatAsDollars and setup export

```ts
export const formatAsDollars = (price: string | number): string => {
  const dollarsAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(price) / 100);
  return dollarsAmount;
};
```

## Card Component - Shadcn

[Card ](https://ui.shadcn.com/docs/components/card)

```sh
npx shadcn-ui@latest add card

```

## ProductsGrid

```tsx
import { Link, useLoaderData } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { formatAsDollars, ProductsResponse } from '@/utils';
const ProductsGrid = () => {
  const { data: products } = useLoaderData() as ProductsResponse;

  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 '>
      {products.map((product) => {
        const { title, price, image } = product.attributes;
        const dollarsAmount = formatAsDollars(price);

        return (
          <Link to={`/products/${product.id}`} key={product.id}>
            <Card>
              <CardContent className='p-4'>
                <img
                  src={image}
                  alt={title}
                  className='rounded-md h-64 md:h-48 w-full object-cover'
                />
                <div className='mt-4 text-center'>
                  <h2 className='text-xl font-semibold capitalize'>{title}</h2>
                  <p className='text-primary font-light mt-2'>
                    {dollarsAmount}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductsGrid;
```

## Hero

```tsx
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import HeroCarousel from './HeroCarousel';
const Hero = () => {
  return (
    <section className=' grid grid-cols-1 lg:grid-cols-2 gap-24 items-center'>
      <div>
        <h1 className='max-w-2xl text-4xl font-bold tracking-tight  sm:text-6xl '>
          We’re changing the way people shop.
        </h1>

        <p className='mt-8 max-w-xl text-lg leading-8'>
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua. Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
          qui lorem cupidatat commodo.
        </p>

        <Button asChild size='lg' className='mt-10'>
          <Link to='/products'>Our Products</Link>
        </Button>
      </div>
      {/* hero carousel */}
      <HeroCarousel />
    </section>
  );
};
export default Hero;
```

## Carousel Component - Shadcn

[Carousel](https://ui.shadcn.com/docs/components/carousel)

```sh
npx shadcn-ui@latest add carousel

```

## HeroCarousel

- get assets from final

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

import hero1 from '../assets/hero1.webp';
import hero2 from '../assets/hero2.webp';
import hero3 from '../assets/hero3.webp';
import hero4 from '../assets/hero4.webp';

const carouselImages = [hero1, hero2, hero3, hero4];

function HeroCarousel() {
  return (
    <div className='hidden lg:block'>
      <Carousel>
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className='p-2'>
                  <img
                    src={image}
                    alt='hero'
                    className='w-full h-[24rem]  rounded-md object-cover'
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
export default HeroCarousel;
```

## Products Page - Setup

- fix bugs

- create following components and setup export
  - Filters
  - ProductsContainer
  - PaginationContainer
  - ProductsList

## Products Page

- don't forget to import and setup loader in the App.tsx

```tsx
import { Filters, ProductsContainer, PaginationContainer } from '@/components';
import { customFetch, type ProductsResponse } from '../utils';
import { type LoaderFunction } from 'react-router-dom';

const url = '/products';

export const loader: LoaderFunction = async (): Promise<ProductsResponse> => {
  const response = await customFetch<ProductsResponse>(url);

  return { ...response.data };
};

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};
export default Products;
```

## ProductsList

```tsx
import { formatAsDollars, type ProductsResponse } from '@/utils';
import { Link, useLoaderData } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
const ProductList = () => {
  const { data: products } = useLoaderData() as ProductsResponse;
  return (
    <div className='mt-12 grid gap-y-8'>
      {products.map((product) => {
        const { title, price, image, company } = product.attributes;
        const dollarsAmount = formatAsDollars(price);

        return (
          <Link key={product.id} to={`/products/${product.id}`}>
            <Card>
              <CardContent className='p-8 gap-y-4 grid md:grid-cols-3 '>
                <img
                  src={image}
                  alt={title}
                  className='h-64 w-full md:h-48  md:w-48  rounded-md object-cover'
                />
                <div>
                  <h2 className='text-xl font-semibold capitalize'>{title}</h2>
                  <h4>{company}</h4>
                </div>
                <p className='text-primary md:ml-auto'>{dollarsAmount}</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductList;
```

## ProductsContainer

```tsx
import { useLoaderData } from 'react-router-dom';
import ProductsGrid from './ProductsGrid';
import ProductsList from './ProductsList';
import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { ProductsResponse } from '@/utils';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const ProductsContainer = () => {
  const { meta } = useLoaderData() as ProductsResponse;
  const totalProducts = meta.pagination.total;
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  return (
    <>
      {/* HEADER */}
      <section>
        <div className='flex justify-between items-center mt-8 '>
          <h4 className='font-medium text-md'>
            {totalProducts} product{totalProducts > 1 && 's'}
          </h4>
          <div className='flex gap-x-4'>
            <Button
              onClick={() => setLayout('grid')}
              variant={layout === 'grid' ? 'default' : 'ghost'}
              size='icon'
            >
              <LayoutGrid />
            </Button>
            <Button
              onClick={() => setLayout('list')}
              size='icon'
              variant={layout === 'list' ? 'default' : 'ghost'}
            >
              <List />
            </Button>
          </div>
        </div>
        <Separator className='mt-4' />
      </section>

      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h5 className='text-2xl mt-16'>
            Sorry, no products matched your search...
          </h5>
        ) : layout === 'grid' ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </div>
    </>
  );
};

export default ProductsContainer;
```

## Skeleton Component - Shadcn

[Skeleton](https://ui.shadcn.com/docs/components/skeleton)

```sh
npx shadcn-ui@latest add skeleton
```

## Loading Component

- create components/Loading.tsx

```tsx
import { Skeleton } from './ui/skeleton';

function Loading() {
  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 '>
      {Array.from({ length: 3 }).map((_, index) => {
        return (
          <div key={index} className='flex flex-col space-y-3'>
            <Skeleton className='h-[125px] w-full rounded-xl' />
            <div className='space-y-2'>
              <Skeleton className='h-4 mx-auto w-[250px]' />
              <Skeleton className='h-4 mx-auto w-[200px]' />
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Loading;
```

## Global Loading

HomeLayout.tsx

```tsx
import { Outlet, useNavigation } from 'react-router-dom';
import { Header, Navbar, Loading } from '@/components';

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  return (
    <>
      <Header />
      <Navbar />

      <div className='align-element py-20'>
        {isPageLoading ? <Loading /> : <Outlet />}
      </div>
    </>
  );
};
export default HomeLayout;
```

## Install Shadcn Form Components

- [Form Component](https://ui.shadcn.com/docs/components/form)

- Label, Input, Select, Slider, Checkbox

```sh
npx shadcn-ui@latest add label input select slider checkbox
```

## Filters - Initial Setup

```tsx
import { Form, useLoaderData, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';

function Filters() {
  return (
    <Form className='border rounded-md px-8 py-4 grid gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
      <div className='mb-2'>
        <Label htmlFor='search'>Search Product</Label>
        <Input id='search' name='search' type='text' defaultValue='' />
      </div>
      <Button type='submit' size='sm' className='self-end mb-2'>
        search
      </Button>
      <Button
        type='button'
        asChild
        size='sm'
        variant='outline'
        className='self-end mb-2'
      >
        <Link to='/products'>reset</Link>
      </Button>
    </Form>
  );
}
export default Filters;
```

## API

- [API DOCS](https://documenter.getpostman.com/view/18152321/2s9Xy5KpTi)

## Products Loader

```ts
export const loader: LoaderFunction = async ({
  request,
}): Promise<ProductsResponse> => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const response = await customFetch<ProductsResponse>(url, { params });
  console.log(response.data);

  return { ...response.data, params };
};
```

new URL(request.url) creates a new URL object from the URL in the request.
.searchParams.entries() gets an iterator for entries in the query parameters, where each entry is an array of [key, value].

... is the spread operator, which expands the entries into individual elements.
Object.fromEntries([...]) converts these entries back into an object, where each key-value pair becomes a property in the object.

So, if your URL is http://example.com?param1=value1&param2=value2, the resulting params object would be { param1: 'value1', param2: 'value2' }.

## Setup Params Type

utils/types.ts

```ts
export type Params = {
  search?: string;
  category?: string;
  company?: string;
  order?: string;
  price?: string;
  shipping?: string;
  page?: number;
};

export type ProductsResponseWithParams = ProductsResponse & { params: Params };
```

## Implement Params

- in Products setup loader return : Response<ProductsResponseWithParams>

Filters.tsx

```tsx
import { type ProductsResponseWithParams } from '@/utils';
function Filters() {
  const { meta, params } = useLoaderData() as ProductsResponseWithParams;
  const { search } = params;
  return (
    <Form>
      <div>
        <Label htmlFor='search'>Search Product</Label>
        <Input id='search' name='search' type='text' defaultValue={search} />
      </div>
    </Form>
  );
}
export default Filters;
```

## FormInput Component

- create components/FormInput.tsx
- import and setup in Filters

```tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
};

function FormInput({ label, name, type, defaultValue }: FormInputProps) {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        {label || name}
      </Label>
      <Input id={name} name={name} type={type} defaultValue={defaultValue} />
    </div>
  );
}
export default FormInput;
```

```tsx
import FormInput from './FormInput';

function Filters() {
  const { meta, params } = useLoaderData() as ProductsResponseWithParams;
  const { search, company, category, shipping, order, price } = params;

  return (
    <Form className='border rounded-md px-8 py-4 grid gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
      {/* search */}
      <FormInput
        type='search'
        label='search product'
        name='search'
        defaultValue={search}
      />
    </Form>
  );
}
```

## FormSelect.tsx

[Shadcn Select](https://ui.shadcn.com/docs/components/select)

- create components/FormSelect.tsx
- render in Filters.tsx

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Label } from '@/components/ui/label';

type SelectInputProps = {
  name: string;
  label?: string;
  defaultValue?: string;
  options: string[];
};

function SelectInput({ label, name, options, defaultValue }: SelectInputProps) {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        {label || name}
      </Label>
      <Select defaultValue={defaultValue || options[0]} name={name}>
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((item) => {
            return (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
export default SelectInput;
```

Filters.tsx

```tsx
{
  /* CATEGORIES */
}
<FormSelect
  label='select category'
  name='category'
  options={meta.categories}
  defaultValue={category}
/>;
{
  /* COMPANIES */
}
<FormSelect
  label='select company'
  name='company'
  options={meta.companies}
  defaultValue={company}
/>;
{
  /* ORDER */
}

<FormSelect
  label='order by'
  name='order'
  options={['a-z', 'z-a', 'high', 'low']}
  defaultValue={order}
/>;
```

## FormRange

[Shadcn Slider](https://ui.shadcn.com/docs/components/slider)

Filters.tsx

```tsx
<FormRange label='price' name='price' defaultValue={price} />
```

FormRange.tsx

```tsx
import { formatAsDollars } from '@/utils';
import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Slider } from './ui/slider';
type FormRangeProps = {
  name: string;
  label?: string;
  defaultValue?: string;
};

function FormRange({ name, label, defaultValue }: FormRangeProps) {
  const step = 1000;
  const maxPrice = 100000;
  const defaultPrice = defaultValue ? Number(defaultValue) : maxPrice;
  const [selectedPrice, setSelectedPrice] = useState(defaultPrice);

  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize flex justify-between'>
        {label || name}
        <span>{formatAsDollars(selectedPrice)}</span>
      </Label>
      <Slider
        id={name}
        name={name}
        step={step}
        max={maxPrice}
        value={[selectedPrice]}
        onValueChange={(value) => setSelectedPrice(value[0])}
        className='mt-4'
      />
    </div>
  );
}
export default FormRange;
```

## FormCheckbox

[Shadcn Checkbox](https://ui.shadcn.com/docs/components/checkbox)

Filters.tsx

```tsx
<FormCheckbox label='free shipping' name='shipping' defaultValue={shipping} />
```

FormCheckbox.tsx

```tsx
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

type FormCheckboxProps = {
  name: string;
  label?: string;
  defaultValue?: string;
};

function FormCheckbox({ name, label, defaultValue }: FormCheckboxProps) {
  const defaultChecked = defaultValue === 'on' ? true : false;

  return (
    <div className='mb-2 flex justify-between self-end'>
      <Label htmlFor={name} className='capitalize'>
        {label || name}
      </Label>
      <Checkbox id={name} name={name} defaultChecked={defaultChecked} />
    </div>
  );
}
export default FormCheckbox;
```

## Pagination

[Shadcn Pagination](https://ui.shadcn.com/docs/components/pagination)

```sh
npx shadcn-ui@latest add pagination

```

- customize

pagination.tsx

```tsx
import { Link } from 'react-router-dom';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  // Link
  React.ComponentProps<typeof Link>;

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  // Link
  <Link
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size,
      }),
      className
    )}
    {...props}
  />
);
```

## Pagination - Setup

- create utils/pagination.ts
- setup export

```ts
export * from './pagination';
```

```ts
type ConstructUrlParams = {
  pageNumber: number;
  search: string;
  pathname: string;
};

export const constructUrl = ({
  pageNumber,
  search,
  pathname,
}: ConstructUrlParams) => {
  return `/products`;
};

type ConstructPrevOrNextParams = {
  currentPage: number;
  pageCount: number;
  search: string;
  pathname: string;
};

export const constructPrevOrNextUrl = ({
  currentPage,
  pageCount,
  search,
  pathname,
}: ConstructPrevOrNextParams): { prevUrl: string; nextUrl: string } => {
  const prevUrl = '/products';
  const nextUrl = '/products';
  return { prevUrl, nextUrl };
};
```

## Pagination Container

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  ProductsResponseWithParams,
  constructUrl,
  constructPrevOrNextUrl,
} from '@/utils';

import { useLoaderData, useLocation } from 'react-router-dom';

function PaginationContainer() {
  const { meta } = useLoaderData() as ProductsResponseWithParams;
  const { pageCount, page } = meta.pagination;

  const { search, pathname } = useLocation();

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  if (pageCount < 2) return null;

  const renderPagination = pages.map((pageNumber) => {
    const isActive = pageNumber === page;
    const url = constructUrl({ pageNumber, search, pathname });

    return (
      <PaginationItem key={pageNumber}>
        <PaginationLink to={url} isActive={isActive}>
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  });
  const { prevUrl, nextUrl } = constructPrevOrNextUrl({
    currentPage: page,
    pageCount,
    search,
    pathname,
  });

  return (
    <Pagination className='mt-16'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to={prevUrl} />
        </PaginationItem>
        {renderPagination}
        <PaginationItem>
          <PaginationNext to={nextUrl} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
export default PaginationContainer;
```

## Pagination - Complete

```tsx
type ConstructUrlParams = {
  pageNumber: number;
  search: string;
  pathname: string;
};

export const constructUrl = ({
  pageNumber,
  search,
  pathname,
}: ConstructUrlParams) => {
  const searchParams = new URLSearchParams(search);
  searchParams.set('page', pageNumber.toString());
  return `${pathname}?${searchParams.toString()}`;
};

type ConstructPrevOrNextParams = {
  currentPage: number;
  pageCount: number;
  search: string;
  pathname: string;
};

export const constructPrevOrNextUrl = ({
  currentPage,
  pageCount,
  search,
  pathname,
}: ConstructPrevOrNextParams): { prevUrl: string; nextUrl: string } => {
  let prevPage = currentPage - 1;
  if (prevPage < 1) prevPage = pageCount;
  const prevUrl = constructUrl({ pageNumber: prevPage, search, pathname });

  let nextPage = currentPage + 1;
  if (nextPage > pageCount) nextPage = 1;
  const nextUrl = constructUrl({ pageNumber: nextPage, search, pathname });
  return { prevUrl, nextUrl };
};
```

## ComplexPaginationContainer

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import {
  constructUrl,
  constructPrevOrNextUrl,
  type ProductsResponseWithParams,
} from '@/utils';

import { useLoaderData, useLocation } from 'react-router-dom';

function ComplexPaginationContainer() {
  const { meta } = useLoaderData() as ProductsResponseWithParams;
  const { pageCount, page } = meta.pagination;

  const { search, pathname } = useLocation();

  if (pageCount < 2) return null;

  // const renderPagination = pages.map((pageNumber) => {
  //   const isActive = pageNumber === page;
  //   const url = constructUrl(pageNumber, search, pathname);

  //   return (
  //     <PaginationItem key={pageNumber}>
  //       <PaginationLink to={url} isActive={isActive}>
  //         {pageNumber}
  //       </PaginationLink>
  //     </PaginationItem>
  //   );
  // });

  const constructButton = ({
    pageNumber,
    isActive,
  }: {
    pageNumber: number;
    isActive: boolean;
  }): React.ReactNode => {
    const url = constructUrl({ pageNumber, search, pathname });
    return (
      <PaginationItem key={pageNumber}>
        <PaginationLink to={url} isActive={isActive}>
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  };

  const constructEllipsis = (key: string): React.ReactNode => {
    return (
      <PaginationItem key={key}>
        <PaginationEllipsis />
      </PaginationItem>
    );
  };

  const renderPagination = () => {
    let pages: React.ReactNode[] = [];
    // first page
    pages.push(constructButton({ pageNumber: 1, isActive: page === 1 }));
    // ellipsis
    if (page > 2) {
      pages.push(constructEllipsis('dots-1'));
    }
    // active page
    if (page !== 1 && page !== pageCount) {
      pages.push(constructButton({ pageNumber: page, isActive: true }));
    }
    // ellipsis
    if (page < pageCount - 1) {
      pages.push(constructEllipsis('dots-2'));
    }
    // last page
    pages.push(
      constructButton({ pageNumber: pageCount, isActive: page === pageCount })
    );
    return pages;
  };
  const { prevUrl, nextUrl } = constructPrevOrNextUrl({
    currentPage: page,
    pageCount,
    search,
    pathname,
  });
  return (
    <Pagination className='mt-16'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to={prevUrl} />
        </PaginationItem>
        {renderPagination()}
        <PaginationItem>
          <PaginationNext to={nextUrl} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
export default ComplexPaginationContainer;
```

## SingleProduct Type

- utils/types.ts

```ts
export type SingleProductResponse = {
  data: Product;
  meta: {};
};
```

## SingleProduct - Params

- import and setup loader in App.tsx

```tsx
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  customFetch,
  formatAsDollars,
  type SingleProductResponse,
} from '@/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { type LoaderFunction } from 'react-router-dom';

export const loader: LoaderFunction = async ({ params }) => {
  console.log(params);
  return null;
};

const SingleProduct = () => {
  return <h1 className='text-4xl'>SingleProduct Page</h1>;
};
export default SingleProduct;
```

## SingleProduct - Load Products

```tsx
export const loader: LoaderFunction = async ({
  params,
}): Promise<SingleProductResponse> => {
  const response = await customFetch<SingleProductResponse>(
    `/products/${params.id}`
  );

  return { ...response.data };
};

const SingleProduct = () => {
  const { data: product } = useLoaderData() as SingleProductResponse;
  const { image, title, price, description, colors, company } =
    product.attributes;
  const dollarsAmount = formatAsDollars(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const addToCart = () => {
    consol.log('add to cart');
  };

  return <h1 className='text-4xl'>SingleProduct Page</h1>;
};
export default SingleProduct;
```

## SingleProduct - Initial Return

```tsx
<section>
  <div className='flex gap-x-2 h-6 items-center'>
    <Button asChild variant='link' size='sm'>
      <Link to='/'>Home</Link>
    </Button>
    <Separator orientation='vertical' />
    <Button asChild variant='link' size='sm'>
      <Link to='/products'>Products</Link>
    </Button>
  </div>
  {/* PRODUCT */}
  <div className='mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16'>
    {/* IMAGE */}
    <img
      src={image}
      alt={title}
      className='w-96 h-96 object-cover rounded-lg lg:w-full'
    />
    {/* PRODUCT INFO */}
    <div>
      <h1 className='capitalize text-3xl font-bold'>{title}</h1>
      <h4 className='text-xl mt-2'>{company}</h4>
      <p className='mt-3 text-md bg-muted inline-block p-2 rounded-md'>
        {dollarsAmount}
      </p>
      <p className='mt-6 leading-8'>{description}</p>
      {/* COLORS */}

      {/* AMOUNT */}

      {/* CART BUTTON */}
      <Button size='lg' className='mt-10' onClick={addToCart}>
        Add to bag
      </Button>
    </div>
  </div>
</section>
```

## SelectProductColor

- import/export

```tsx
type SelectProductColorProps = {
  colors: string[];
  productColor: string;
  setProductColor: React.Dispatch<React.SetStateAction<string>>;
};

function SelectProductColor({
  colors,
  productColor,
  setProductColor,
}: SelectProductColorProps) {
  return (
    <div className='mt-6'>
      <h4 className='text-md font-medium tracking-wider capitalize'>colors</h4>

      <div className='mt-2'>
        {colors.map((color) => {
          return (
            <button
              key={color}
              type='button'
              className={`rounded-full w-6 h-6 mr-2 border-2  ${
                color === productColor && ' border-primary'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setProductColor(color)}
            ></button>
          );
        })}
      </div>
    </div>
  );
}
export default SelectProductColor;
```

SingleProduct.tsx

```tsx
<SelectProductColor
  colors={colors}
  productColor={productColor}
  setProductColor={setProductColor}
/>
```

## SelectProductAmount

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export enum Mode {
  SingleProduct = 'singleProduct',
  CartItem = 'cartItem',
}

type SelectProductAmountProps = {
  mode: Mode.SingleProduct;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
};

type SelectCartItemAmountProps = {
  mode: Mode.CartItem;
  amount: number;
  setAmount: (value: number) => void;
};

function SelectProductAmount({
  mode,
  amount,
  setAmount,
}: SelectProductAmountProps | SelectCartItemAmountProps) {
  const cartItem = mode === Mode.CartItem;
  return (
    <>
      <h4 className='font-medium mb-2'>Amount :</h4>
      <Select
        defaultValue={amount.toString()}
        onValueChange={(value) => setAmount(Number(value))}
      >
        <SelectTrigger className={cartItem ? 'w-[75px]' : 'w-[150px]'}>
          <SelectValue placeholder={amount} />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: cartItem ? amount + 10 : 10 }, (_, index) => {
            const selectValue = (index + 1).toString();
            return (
              <SelectItem key={index} value={selectValue}>
                {selectValue}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}
export default SelectProductAmount;
```

SingleProduct.tsx

```tsx
import { SelectProductColor, SelectProductAmount } from '@/components';
import { Mode } from '@/components/SelectProductAmount';

<SelectProductAmount
  mode={Mode.SingleProduct}
  amount={amount}
  setAmount={setAmount}
/>;
```

## Shadcn Toast Component

[Toast](https://ui.shadcn.com/docs/components/toast)

```sh
npx shadcn-ui@latest add toast

```

main.tsx

```tsx
import { Toaster } from '@/components/ui/toaster';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Toaster />
    <App />
  </Provider>
);
```

Component

```tsx
import { useToast } from '@/components/ui/use-toast';

export const ToastDemo = () => {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: 'Scheduled: Catch up',
          description: 'Friday, February 10, 2023 at 5:57 PM',
        });
      }}
    >
      Show Toast
    </Button>
  );
};
```

loaders/actions, features

```ts
import { toast } from '@/components/ui/use-toast';

toast({ description: 'Item added to cart' });
```

## CartItem and CartState Types

utils/types.ts

```ts
export type CartItem = {
  cartID: string;
  productID: number;
  image: string;
  title: string;
  price: string;
  amount: number;
  productColor: string;
  company: string;
};

export type CartState = {
  cartItems: CartItem[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
};
```

## CartSlice

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type CartItem, type CartState } from '@/utils';
import { toast } from '@/components/ui/use-toast';

const defaultState: CartState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = (): CartState => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : defaultState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newCartItem = action.payload;
      const item = state.cartItems.find((i) => i.cartID === newCartItem.cartID);
      if (item) {
        item.amount += newCartItem.amount;
      } else {
        state.cartItems.push(newCartItem);
      }
      state.numItemsInCart += newCartItem.amount;
      state.cartTotal += Number(newCartItem.price) * newCartItem.amount;
      // state.tax = 0.1 * state.cartTotal;
      // state.orderTotal = state.cartTotal + state.shipping + state.tax;
      // localStorage.setItem('cart', JSON.stringify(state));
      cartSlice.caseReducers.calculateTotals(state);
      toast({ description: 'Item added to cart' });
    },
    clearCart: () => {
      localStorage.setItem('cart', JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const cartID = action.payload;
      const cartItem = state.cartItems.find((i) => i.cartID === cartID);
      if (!cartItem) return;
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);
      state.numItemsInCart -= cartItem.amount;
      state.cartTotal -= Number(cartItem.price) * cartItem.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast({ description: 'Item removed from the cart' });
    },
    editItem: (
      state,
      action: PayloadAction<{ cartID: string; amount: number }>
    ) => {
      const { cartID, amount } = action.payload;
      const cartItem = state.cartItems.find((i) => i.cartID === cartID);
      if (!cartItem) return;

      state.numItemsInCart += amount - cartItem.amount;
      state.cartTotal += Number(cartItem.price) * (amount - cartItem.amount);
      cartItem.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast({ description: 'Amount updated' });
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;
export default cartSlice.reducer;
```

## CartButton

```tsx
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
function CartButton() {
  const numItemsInCart = useAppSelector(
    (state) => state.cartState.numItemsInCart
  );

  return (
    <Button
      asChild
      variant='outline'
      size='icon'
      className='flex justify-center items-center relative'
    >
      <Link to='/cart'>
        <ShoppingCart />
        <span className='absolute -top-3 -right-3 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-xs'>
          {numItemsInCart}
        </span>
      </Link>
    </Button>
  );
}
export default CartButton;
```

## SingleProduct - AddItem

```tsx
import { type CartItem } from '@/utils';
import { useAppDispatch } from '@/hooks';
import { addItem } from '@/features/cart/cartSlice';

const dispatch = useAppDispatch();

const cartProduct: CartItem = {
  cartID: product.id + productColor,
  productID: product.id,
  image,
  title,
  price,
  amount,
  productColor,
  company,
};

const addToCart = () => {
  dispatch(addItem(cartProduct));
};
```

## CartPage - Setup

- create CartTotals, CartItemsList, CartItemColumns
- import/export

Cart.tsx

```tsx
import { useAppSelector } from '@/hooks';
import { CartItemsList, SectionTitle, CartTotals } from '@/components';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Cart = () => {
  // temp
  const user = null;

  const numItemsInCart = useAppSelector(
    (state) => state.cartState.numItemsInCart
  );

  if (numItemsInCart === 0) {
    return <SectionTitle text='Empty cart ☹️' />;
  }
  return (
    <>
      <SectionTitle text='Shopping Cart' />
      <div className='mt-8 grid gap-8  lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <CartItemsList />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotals />
          {user ? (
            <Button asChild className='mt-8 w-full'>
              <Link to='/checkout'>Proceed to checkout</Link>
            </Button>
          ) : (
            <Button asChild className='mt-8 w-full'>
              <Link to='/login'>Please Login</Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default Cart;
```

## CartTotals

```tsx
import { useAppSelector } from '@/hooks';
import { formatAsDollars } from '@/utils';
import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from './ui/separator';

const CartTotals = () => {
  const { cartTotal, shipping, tax, orderTotal } = useAppSelector(
    (state) => state.cartState
  );

  return (
    <Card className='p-8 bg-muted'>
      <CartTotalRow label='Subtotal' amount={cartTotal} />
      <CartTotalRow label='Shipping' amount={shipping} />
      <CartTotalRow label='Tax' amount={tax} />
      <CardTitle className='mt-8'>
        <CartTotalRow label='Order Total' amount={orderTotal} lastRow />
      </CardTitle>
    </Card>
  );
};

function CartTotalRow({
  label,
  amount,
  lastRow,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) {
  return (
    <>
      <p className='flex justify-between text-sm'>
        <span>{label}</span>
        <span>{formatAsDollars(amount)}</span>
      </p>
      {lastRow ? null : <Separator className='my-2' />}
    </>
  );
}

export default CartTotals;
```

## CartItemsList

```tsx
import { useAppSelector } from '@/hooks';
import { Card } from './ui/card';

import {
  FirstColumn,
  SecondColumn,
  ThirdColumn,
  FourthColumn,
} from './CartItemColumns';
const CartItemsList = () => {
  const cartItems = useAppSelector((state) => state.cartState.cartItems);

  return (
    <div>
      {cartItems.map((cartItem) => {
        const { cartID, title, price, image, amount, company, productColor } =
          cartItem;
        return (
          <Card
            key={cartID}
            className='flex flex-col gap-y-4 sm:flex-row flex-wrap p-6 mb-8'
          >
            Cart Item
          </Card>
        );
      })}
    </div>
  );
};

export default CartItemsList;
```

## CartItemColumns

```tsx
import { formatAsDollars } from '@/utils';
import { useAppDispatch } from '@/hooks';
import { Button } from './ui/button';
import { editItem, removeItem } from '@/features/cart/cartSlice';
import SelectProductAmount from './SelectProductAmount';
import { Mode } from './SelectProductAmount';
export const ThirdColumn = ({
  amount,
  cartID,
}: {
  amount: number;
  cartID: string;
}) => {
  const dispatch = useAppDispatch();

  const removeItemFromTheCart = () => {
    dispatch(removeItem(cartID));
  };

  const setAmount = (value: number) => {
    dispatch(editItem({ cartID, amount: value }));
  };

  return (
    <div>
      <SelectProductAmount
        amount={amount}
        setAmount={setAmount}
        mode={Mode.CartItem}
      />
      <Button variant='link' className='-ml-4' onClick={removeItemFromTheCart}>
        remove
      </Button>
    </div>
  );
};

export const FirstColumn = ({
  image,
  title,
}: {
  image: string;
  title: string;
}) => {
  return (
    <img
      src={image}
      alt={title}
      className='h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover'
    />
  );
};

export const SecondColumn = ({
  title,
  company,
  productColor,
}: {
  title: string;
  company: string;
  productColor: string;
}) => {
  return (
    <div className='sm:ml-4 md:ml-12 sm:w-48'>
      <h3 className='capitalize font-medium'>{title}</h3>
      <h4 className='mt-2 capitalize text-sm'>{company}</h4>
      <p className='mt-4 text-sm capitalize flex items-center gap-x-2'>
        color :
        <span
          style={{
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            backgroundColor: productColor,
          }}
        ></span>
      </p>
    </div>
  );
};

export const FourthColumn = ({ price }: { price: string }) => {
  return <p className='font-medium sm:ml-auto'>{formatAsDollars(price)}</p>;
};
```

CartItemsList.tsx

```tsx
<FirstColumn image={image} title={title} />
<SecondColumn title={title} company={company} productColor={productColor} />
<ThirdColumn amount={amount} cartID={cartID} />
<FourthColumn price={price} />
```

[Tailwind Classes](https://tailwindcss.com/docs/content-configuration)

## UserSlice

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from '@/components/ui/use-toast';

export type User = {
  username: string;
  jwt: string;
};

type UserState = {
  user: User | null;
};

const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem('user');
  if (!user) return null;
  return JSON.parse(user);
};

const initialState: UserState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));

      if (user.username === 'demo user') {
        toast({ description: 'Welcome Guest User' });
        return;
      }
      toast({ description: 'Login successful' });
    },
    logoutUser: (state) => {
      state.user = null;
      // localStorage.clear()
      localStorage.removeItem('user');
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
```

## Register and Login Requests

- [API DOCS](https://documenter.getpostman.com/view/18152321/2s9Xy5KpTi)

## Register Page - Setup

- create components/SubmitBtn.tsx

```tsx
import { ActionFunction, Form, Link, redirect } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubmitBtn, FormInput } from '@/components';
import { customFetch } from '@/utils';
import { toast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';

export const action: ActionFunction = async ({ request }): Promise<null> => {
  return null;
};

function Register() {
  return (
    <section className='h-screen grid place-items-center'>
      <Card className='w-96 bg-muted'>
        <CardHeader>
          <CardTitle className='text-center'>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Form>
            <FormInput type='text' name='username' defaultValue='test' />
            <FormInput type='email' name='email' defaultValue='test@test.com' />
            <FormInput type='password' name='password' defaultValue='secret' />

            <Button type='submit' variant='default' className='w-full mt-4'>
              Submit
            </Button>

            <p className='text-center mt-4'>
              Already a member?
              <Button type='button' asChild variant='link'>
                <Link to='/login'>Login</Link>
              </Button>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
export default Register;
```

## Actions

Route actions are the "writes" to route loader "reads". They provide a way for apps to perform data mutations with simple HTML and HTTP semantics while React Router abstracts away the complexity of asynchronous UI and revalidation. This gives you the simple mental model of HTML + HTTP (where the browser handles the asynchrony and revalidation) with the behavior and UX capabilities of modern SPAs.

```tsx
<Form method='post' action=''>
```

App.tsx

```tsx
import { action as registerAction } from './pages/Register';

{
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
```

```tsx
export const action: ActionFunction = async ({ request }): Promise<null> => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  return null;
};
```

## Register User

```tsx
export const action: ActionFunction = async ({
  request,
}): Promise<Response | null> => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/local/register', data);

    toast({ description: 'Registered' });
    return redirect('/login');
  } catch (error) {
    console.log(error);

    const errorMsg =
      error instanceof AxiosError
        ? error.response?.data.error.message
        : 'Registration Failed';
    toast({ description: errorMsg });
    return null;
  }
};
```

## SubmitBtn

```sh
npm i @radix-ui/react-icons
```

```tsx
import { useNavigation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';

const SubmitBtn = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Button type='submit' className={className} disabled={isSubmitting}>
      {isSubmitting ? (
        <span className='flex '>
          <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
          Submitting...
        </span>
      ) : (
        text
      )}
    </Button>
  );
};
export default SubmitBtn;
```

Register.tsx

```tsx
<SubmitBtn text='Register' className='w-full mt-4' />
```

temp

```ts
// optional
await new Promise((resolve) => setTimeout(resolve, 2000));
```

## Login User - Setup

```tsx
import {
  Form,
  Link,
  redirect,
  type ActionFunction,
  useNavigate,
} from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubmitBtn, FormInput } from '@/components';
import { customFetch } from '@/utils';
import { toast } from '@/components/ui/use-toast';
import { type ReduxStore } from '@/store';
import { loginUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/hooks';
import { AxiosResponse } from 'axios';

function Login() {
  return (
    <section className='h-screen grid place-items-center'>
      <Card className='w-96 bg-muted'>
        <CardHeader>
          <CardTitle className='text-center'>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method='POST'>
            <FormInput type='email' label='email' name='identifier' />
            <FormInput type='password' name='password' />

            <SubmitBtn text='Login' className='w-full mt-4' />
            <Button
              type='button'
              variant='outline'
              onClick={loginAsGuestUser}
              className='w-full mt-4'
            >
              Guest User
            </Button>
            <p className='text-center mt-4'>
              Not a member yet?
              <Button type='button' asChild variant='link'>
                <Link to='/register'>Register</Link>
              </Button>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
export default Login;
```

## Guest User

```tsx
const dispatch = useAppDispatch();
const navigate = useNavigate();
const loginAsGuestUser = async (): Promise<void> => {
  try {
    const response = await customFetch.post('/auth/local', {
      identifier: 'test@test.com',
      password: 'secret',
    });
    const username = response.data.user.username;
    const jwt = response.data.jwt;
    dispatch(loginUser({ username, jwt }));
    navigate('/');
  } catch (error) {
    console.log(error);
    toast({ description: 'Login Failed' });
  }
};
```

## Login Request

App.tsx

```tsx
import { action as loginAction } from './pages/Login';
import { store } from './store';

{
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },

```

Login.tsx

```tsx
export const action =
  (store: ReduxStore): ActionFunction =>
  async ({ request }): Promise<Response | null> => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response: AxiosResponse = await customFetch.post(
        '/auth/local',
        data
      );
      const username = response.data.user.username;
      const jwt = response.data.jwt;
      store.dispatch(loginUser({ username, jwt }));
      return redirect('/');
    } catch (error) {
      // console.log(error);
      toast({ description: 'Login Failed' });
      return null;
    }
  };
```

## Header Component

```tsx
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks';

import { logoutUser } from '../features/user/userSlice';
import { clearCart } from '../features/cart/cartSlice';
import { useToast } from './ui/use-toast';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = useAppSelector((state) => state.userState.user);

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logoutUser());
    toast({ description: 'Logged out' });
    navigate('/');
  };

  return (
    <header>
      <div className='align-element flex justify-center sm:justify-end py-2'>
        {/* USER */}
        {user ? (
          <div className='flex gap-x-2 sm:gap-x-8 items-center'>
            <p className='text-xs sm:text-sm'>Hello, {user.username}</p>
            <Button variant='link' size='sm' onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className='flex gap-x-6 justify-center items-center -mr-4'>
            <Button asChild variant='link' size='sm'>
              <Link to='/login'>Sign in / Guest</Link>
            </Button>
            <Button asChild variant='link' size='sm'>
              <Link to='/register'>Register</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
```

## NavLinks

```tsx
import { links } from '@/utils';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
function NavLinks() {
  const user = useAppSelector((state) => state.userState.user);
  return (
    <div className='hidden lg:flex justify-center items-center gap-x-4'>
      {links.map((link) => {
        const restrictedRoutes =
          link.href === 'checkout' || link.href === 'orders';
        if (restrictedRoutes && !user) return null;
        return (
          <NavLink
            to={link.href}
            className={({ isActive }) => {
              return `capitalize font-light tracking-wide ${
                isActive ? 'text-primary' : ''
              }`;
            }}
            key={link.label}
          >
            {link.label}
          </NavLink>
        );
      })}
    </div>
  );
}
export default NavLinks;
```

## LinksDropdown

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlignLeft } from 'lucide-react';
import { Button } from './ui/button';
import { links } from '@/utils';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@/hooks';

function LinksDropdown() {
  const user = useAppSelector((state) => state.userState.user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='lg:hidden'>
        <Button variant='outline' size='icon'>
          <AlignLeft />

          <span className='sr-only'>Toggle links</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-52 lg:hidden '
        align='start'
        sideOffset={25}
      >
        {links.map((link) => {
          const restrictedRoutes =
            link.href === 'checkout' || link.href === 'orders';
          if (restrictedRoutes && !user) return null;
          return (
            <DropdownMenuItem key={link.label}>
              <NavLink
                to={link.href}
                className={({ isActive }) => {
                  return `capitalize w-full ${isActive ? 'text-primary' : ''}`;
                }}
              >
                {link.label}
              </NavLink>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropdown;
```

## Cart Page

```tsx
import { useAppSelector } from '@/hooks';
import { CartItemsList, SectionTitle, CartTotals } from '@/components';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function Cart() {
  const user = useAppSelector((state) => state.userState.user);

  const numItemsInCart = useAppSelector(
    (state) => state.cartState.numItemsInCart
  );
  if (numItemsInCart === 0) {
    return <SectionTitle text='Empty cart' />;
  }

  return (
    <>
      <SectionTitle text='Shopping Cart' />
      <div className='mt-8 grid gap-8 lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <CartItemsList />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotals />

          <Button asChild className='mt-8 w-full'>
            {user ? (
              <Link to='/checkout'> Proceed to checkout</Link>
            ) : (
              <Link to='/login'>Please Login</Link>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
export default Cart;
```

## Checkout Page

- create CheckoutForm
- import and setup loader in the App.tsx

```tsx
import { useAppSelector } from '@/hooks';
import { CheckoutForm, SectionTitle, CartTotals } from '@/components';
import { LoaderFunction, redirect } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { type ReduxStore } from '@/store';

export const loader =
  (store: ReduxStore): LoaderFunction =>
  async (): Promise<Response | null> => {
    const user = store.getState().userState.user;
    if (!user) {
      toast({ description: 'Please login to continue' });
      return redirect('/login');
    }

    return null;
  };

const Checkout = () => {
  const cartTotal = useAppSelector((state) => state.cartState.cartTotal);
  if (cartTotal === 0) {
    return <SectionTitle text='Your cart is empty' />;
  }
  return (
    <>
      <SectionTitle text='Place your order' />
      <div className='mt-8 grid gap-8  md:grid-cols-2 items-start'>
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};
export default Checkout;
```

## Checkout Type

```ts
export type Checkout = {
  name: string;
  address: string;
  chargeTotal: number;
  orderTotal: string;
  cartItems: CartItem[];
  numItemsInCart: number;
};
```

## Checkout Form

```tsx
import { ActionFunction, Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { customFetch, formatAsDollars, type Checkout } from '@/utils';
import { toast } from '@/components/ui/use-toast';
import { clearCart } from '../features/cart/cartSlice';
import { ReduxStore } from '@/store';

export const action =
  (store: ReduxStore): ActionFunction =>
  async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const address = formData.get('name') as string;

    if (!name || !address) {
      toast({ description: 'please fill out all fields' });
      return null;
    }

    const user = store.getState().userState.user;
    if (!user) {
      toast({ description: 'please login to place an order' });
      return redirect('/login');
    }
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const info: Checkout = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatAsDollars(orderTotal),
      cartItems,
      numItemsInCart,
    };
    try {
      await customFetch.post(
        '/orders',
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );

      store.dispatch(clearCart());
      toast({ description: 'order placed' });
      return redirect('/orders');
    } catch (error) {
      toast({ description: 'order failed' });
      return null;
    }
  };
const CheckoutForm = () => {
  return (
    <Form method='POST' className='flex flex-col gap-y-4'>
      <h4 className='font-medium text-xl mb-4'>Shipping Information</h4>
      <FormInput label='first name' name='name' type='text' />
      <FormInput label='address' name='address' type='text' />
      <div className='mt-4'>
        <SubmitBtn text='Place Your Order' />
      </div>
    </Form>
  );
};
export default CheckoutForm;
```

## OrdersResponse Type

```ts
export type Order = {
  id: number;
  attributes: {
    address: string;
    cartItems: CartItem[];
    createdAt: string;
    name: string;
    numItemsInCart: number;
    orderTotal: string;
    publishedAt: string;
    updatedAt: string;
  };
};

export type OrdersMeta = {
  pagination: Pagination;
};

export type OrdersResponse = {
  data: Order[];
  meta: OrdersMeta;
};
```

## Orders Page

- create OrdersList, ComplexPaginationContainer
- setup loader in the App.tsx

```tsx
import { LoaderFunction, redirect, useLoaderData } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { customFetch } from '@/utils';
import {
  OrdersList,
  ComplexPaginationContainer,
  SectionTitle,
} from '@/components';
import { ReduxStore } from '@/store';
import { type OrdersResponse } from '@/utils';
export const loader =
  (store: ReduxStore): LoaderFunction =>
  async ({ request }): Promise<OrdersResponse | Response | null> => {
    const user = store.getState().userState.user;

    if (!user) {
      toast({ description: 'Please login to continue' });
      return redirect('/login');
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const response = await customFetch.get<OrdersResponse>('/orders', {
        params,
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });

      return { ...response.data };
    } catch (error) {
      console.log(error);
      toast({ description: 'Failed to fetch orders' });
      return null;
    }
  };
const Orders = () => {
  const { meta } = useLoaderData() as OrdersResponse;
  if (meta.pagination.total < 1) {
    return <SectionTitle text='Please make an order' />;
  }
  return (
    <>
      <SectionTitle text='Your Orders' />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
};
export default Orders;
```

## Orders List

[Table Component](https://ui.shadcn.com/docs/components/table)

```sh
npx shadcn-ui@latest add table

```

```tsx
import { useLoaderData } from 'react-router-dom';

import { type OrdersResponse } from '@/utils';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function OrdersList() {
  const { data: orders, meta } = useLoaderData() as OrdersResponse;

  return (
    <div className='mt-16'>
      <h4 className='mb-4 capitalize'>
        total orders : {meta.pagination.total}
      </h4>
      <Table>
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className='w-[100px]'>Products</TableHead>
            <TableHead className='w-[100px]'>Cost</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const { name, address, numItemsInCart, orderTotal, createdAt } =
              order.attributes;
            return (
              <TableRow key={order.id}>
                <TableCell>{name}</TableCell>
                <TableCell>{address}</TableCell>
                <TableCell className='text-center'>{numItemsInCart}</TableCell>
                <TableCell>{orderTotal}</TableCell>
                <TableCell>{new Date(createdAt).toDateString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
export default OrdersList;
```

## Complex Pagination

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import {
  constructUrl,
  constructPrevOrNextUrl,
  type OrdersResponse,
} from '@/utils';

import { useLoaderData, useLocation } from 'react-router-dom';

function ComplexPaginationContainer() {
  const { meta } = useLoaderData() as OrdersResponse;
  const { pageCount, page } = meta.pagination;

  const { search, pathname } = useLocation();

  if (pageCount < 2) return null;

  // const renderPagination = pages.map((pageNumber) => {
  //   const isActive = pageNumber === page;
  //   const url = constructUrl(pageNumber, search, pathname);

  //   return (
  //     <PaginationItem key={pageNumber}>
  //       <PaginationLink to={url} isActive={isActive}>
  //         {pageNumber}
  //       </PaginationLink>
  //     </PaginationItem>
  //   );
  // });

  const constructButton = ({
    pageNumber,
    isActive,
  }: {
    pageNumber: number;
    isActive: boolean;
  }): React.ReactNode => {
    const url = constructUrl({ pageNumber, search, pathname });
    return (
      <PaginationItem key={pageNumber}>
        <PaginationLink to={url} isActive={isActive}>
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  };

  const constructEllipsis = (key: string): React.ReactNode => {
    return (
      <PaginationItem key={key}>
        <PaginationEllipsis />
      </PaginationItem>
    );
  };

  const renderPagination = () => {
    let pages: React.ReactNode[] = [];
    // first page
    pages.push(constructButton({ pageNumber: 1, isActive: page === 1 }));
    // ellipsis
    if (page > 2) {
      pages.push(constructEllipsis('dots-1'));
    }
    // active page
    if (page !== 1 && page !== pageCount) {
      pages.push(constructButton({ pageNumber: page, isActive: true }));
    }
    // ellipsis
    if (page < pageCount - 1) {
      pages.push(constructEllipsis('dots-2'));
    }
    // last page
    pages.push(
      constructButton({ pageNumber: pageCount, isActive: page === pageCount })
    );
    return pages;
  };
  const { prevUrl, nextUrl } = constructPrevOrNextUrl({
    currentPage: page,
    pageCount,
    search,
    pathname,
  });
  return (
    <Pagination className='mt-16'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to={prevUrl} />
        </PaginationItem>
        {renderPagination()}
        <PaginationItem>
          <PaginationNext to={nextUrl} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
export default ComplexPaginationContainer;
```

## Setup Redirects

public/\_redirects

```
/* /index.html 200
```

## Build Project Locally

```sh
npm run build

```
