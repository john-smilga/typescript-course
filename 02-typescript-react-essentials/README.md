This GitHub project provides a comprehensive guide to integrating TypeScript with React. It covers initial setup using vite and TypeScript, demonstrates various React & TypeScript concepts through clear examples, and delves into more advanced topics. Key aspects include:

- Component Structure and TypeScript Integration: Explains how to correctly type React components, manage return types, and handle potential TypeScript errors.
- Prop Handling and Typing: Offers insights on inline typing, using interfaces, and managing children props with TypeScript.
- State Management: Teaches TypeScript type inference in state management, showcasing various useState examples.
- Event Handling: Guides on typing events in React, such as form submissions and input changes.
- Complex Component Structures: Discusses complex use cases like conditional prop rendering based on type values.
- Context API with TypeScript: Provides a deep dive into using React's Context API in a TypeScript environment.
- Reducers and Global State Management: Includes examples of setting up reducers with TypeScript and using them in React components.
- Data Fetching: Demonstrates fetching data with TypeScript validation using tools like Zod, Axios, and React Query.
- Redux Toolkit (RTK) Integration: Shows how to integrate Redux Toolkit in a TypeScript-React setup, including creating slices and using hooks.
- Practical Application with Task Management: Concludes with a practical task management application, emphasizing localStorage use and handling task state.

Each section is presented with relevant code snippets and explanations, making it an ideal resource for developers looking to deepen their understanding of TypeScript in React applications.



## Setup

```sh
npm create vite@latest react-typescript -- --template react-ts
```

## Remove Boilerplate and Get Assets

# React & Typescript

- .tsx - file extension

## 01 - Component Return

- TypeScript infers JSX.Element, helps if no return

```tsx
// TypeScript infers JSX.Element
// this will trigger error
function Component() {}
export default Component;
```

- set function return type

```tsx
function Component(): JSX.Element | null | string {
  return null;
  return 'hello';
  return <h2>hello from typescript</h2>;
}
export default Component;
```

## 02- Props

```tsx
function App() {
  return (
    <main>
      <Component name='peter' id={123} />
    </main>
  );
}

export default App;
```

- inline types

```tsx
function Component({ name, id }: { name: string; id: number }) {
  return (
    <div>
      <h1>Name : {name}</h1>
      <h1>ID : {id}</h1>
    </div>
  );
}
export default Component;
```

- type or interface
- props object or {}

```tsx
type ComponentProps = {
  name: string;
  id: number;
};

function Component({ name, id }: ComponentProps) {
  return (
    <div>
      <h1>Name : {name}</h1>
      <h1>ID : {id}</h1>
    </div>
  );
}
export default Component;
```

- children prop

```tsx
function App() {
  return (
    <main>
      <Component name='peter' id={123}>
        <h2>hello world</h2>
      </Component>
    </main>
  );
}

export default App;
```

- React.ReactNode
- PropsWithChildren

```tsx
import { type PropsWithChildren } from 'react';

type ComponentProps = {
  name: string;
  id: number;
  children: React.ReactNode;
};

// type ComponentProps = PropsWithChildren<{
//   name: string;
//   id: number;
// }>;

function Component({ name, id, children }: ComponentProps) {
  return (
    <div>
      <h2>Name : {name}</h2>
      <h2>ID : {id}</h2>
      {children}
    </div>
  );
}
export default Component;
```

## 03 - State

- typescript infers primitive types
- by default [] is type never

```tsx
import { useState } from 'react';

function Component() {
  const [text, setText] = useState('shakeAndBake');
  const [number, setNumber] = useState(1);
  const [list, setList] = useState<string[]>([]);

  return (
    <div>
      <h2 className='mb-1'>hello from typescript</h2>
      <button
        className='btn btn-center'
        onClick={() => {
          // setText(1);
          // setNumber('hello');
          // setList([1, 3]);
          setList(['hello', 'world']);
        }}
      >
        click me
      </button>
    </div>
  );
}
export default Component;
```

```tsx
import { useState } from 'react';

type Link = {
  id: number;
  url: string;
  text: string;
};

const navLinks: Link[] = [
  {
    id: 1,
    url: 'https://reactjs.org',
    text: 'react docs',
  },
  {
    id: 2,
    url: 'https://reactrouter.com',
    text: 'react router docs',
  },
  {
    id: 3,
    url: 'https://reacttraining.com',
    // remove text property to see the error
    text: 'react training',
  },
];

function Component() {
  const [text, setText] = useState('shakeAndBake');
  const [number, setNumber] = useState(1);
  const [list, setList] = useState<string[]>([]);
  const [links, setLinks] = useState<Link[]>(navLinks);
  return (
    <div>
      <h2 className='mb-1'>hello from typescript</h2>
      <button
        className='btn btn-center'
        onClick={() => {
          // setText(1);
          // setNumber('hello');
          // setList([1, 3]);
          // setList(['hello', 'world']);
          // setLinks([...links, { id: 4, url: 'hello', someValue: 'hello' }])
          setLinks([...links, { id: 4, url: 'hello', text: 'hello' }]);
        }}
      >
        click me
      </button>
    </div>
  );
}
export default Component;
```

```tsx

```

## 04 - Events

- inline function infers object type

When you provide the exact HTML element type in the angle brackets (<>), like HTMLInputElement in your case, you're telling TypeScript exactly what kind of element the event is coming from. This helps TypeScript provide accurate suggestions and error checking based on the properties and methods that are specific to that kind of element. For example, an HTMLInputElement has properties like value and checked that other elements don't have. By specifying the exact element type, TypeScript can help you avoid mistakes and write safer code.

```tsx
import { useState } from 'react';

function Component() {
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  return (
    <section>
      <h2>events example</h2>
      <form className='form'>
        <input
          className='form-input mb-1'
          type='text'
          name='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type='email'
          className='form-input mb-1'
          value={email}
          onChange={handleChange}
        />
        <button type='submit' className='btn btn-block'>
          submit
        </button>
      </form>
    </section>
  );
}
export default Component;
```

```tsx
import { useState } from 'react';

type Person = {
  name: string;
};

function Component() {
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    const formData = new FormData(e.target as HTMLFormElement);
    // const data = Object.fromEntries(formData);
    const text = formData.get('text') as string;
    const person: Person = { name: text };
  };

  return (
    <section>
      <h2>events example</h2>
      <form onSubmit={handleSubmit} className='form'>
        <input
          className='form-input mb-1'
          type='text'
          name='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type='email'
          className='form-input mb-1'
          value={email}
          onChange={handleChange}
        />
        <button type='submit' className='btn btn-block'>
          submit
        </button>
      </form>
    </section>
  );
}
export default Component;
```

## 05 - Complex Setup

```tsx
type BasicProfileCardProps = {
  type: 'basic';
  name: string;
};

type DetailedProfileCardProps = {
  type: 'detailed';
  name: string;
  email: string;
};
type ProfileCardProps = BasicProfileCardProps | DetailedProfileCardProps;
function Component(props: ProfileCardProps) {
  const { type, name } = props;
  if (type === 'basic')
    return (
      <article>
        <h2>{name}</h2>
      </article>
    );

  return (
    <article>
      <h2>{name}</h2>
      <h2>{props.email}</h2>
    </article>
  );
}
export default Component;
```

## 06 - Context

context.tsx

```tsx
import { createContext, useState, useContext } from 'react';

type Theme = 'light' | 'dark' | 'system';

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

export function ThemeProvider({
  children,
  defaultTheme = 'system',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
```

Component.tsx

```tsx
import { useTheme } from './context';
function Component() {
  const context = useTheme();
  console.log(context);

  return (
    <div>
      <h2>random component</h2>
      <button
        onClick={() => {
          if (context.theme === 'dark') {
            context.setTheme('system');
            return;
          }
          context.setTheme('dark');
        }}
        className='btn btn-center'
      >
        toggle theme
      </button>
    </div>
  );
}
export default Component;
```

App.tsx

```tsx
import Component from './final/06-context';
import { ThemeProvider } from './final/06-context/context';
function App() {
  return (
    <ThemeProvider>
      <main>
        <Component />
      </main>
    </ThemeProvider>
  );
}

export default App;
```

## 07 - Reducers

- starter code

```tsx
function Component() {
  return (
    <div>
      <h2>Count: 0</h2>
      <h2>Status: Active</h2>

      <div className='btn-container'>
        <button onClick={() => console.log('increment')} className='btn'>
          Increment
        </button>
        <button onClick={() => console.log('decrement')} className='btn'>
          Decrement
        </button>
        <button onClick={() => console.log('reset')} className='btn'>
          Reset
        </button>
      </div>
      <div className='btn-container'>
        <button
          onClick={() => console.log('set status to active')}
          className='btn'
        >
          Set Status to Active
        </button>
        <button
          className='btn'
          onClick={() => console.log('set status to inactive')}
        >
          Set Status to Inactive
        </button>
      </div>
    </div>
  );
}
export default Component;
```

- reducer setup

reducer.ts

```ts
export type CounterState = {
  count: number;
  status: string;
};

export const initialState: CounterState = {
  count: 0,
  status: 'Pending...',
};

export const counterReducer = (
  state: CounterState,
  action: any
): CounterState => {
  return state;
};
```

index.tsx

```tsx
import { useReducer } from 'react';
import { counterReducer, initialState } from './reducer';

function Component() {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  return (
    <div>
      <h2>Count: {state.count}</h2>
      <h2>Status: {state.status}</h2>
    </div>
  );
}
```

- setup count action

reducer

```ts
type UpdateCountAction = {
  type: 'increment' | 'decrement' | 'reset';
};

// Extend the union type for all possible actions
type CounterAction = UpdateCountAction;

export const counterReducer = (
  state: CounterState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    case 'reset':
      return { ...state, count: 0 };
    default:
      return state;
  }
};
```

index.tsx

```tsx
<div className='btn-container'>
  <button onClick={() => dispatch({ type: 'increment' })} className='btn'>
    Increment
  </button>
  <button onClick={() => dispatch({ type: 'decrement' })} className='btn'>
    Decrement
  </button>
  <button onClick={() => dispatch({ type: 'reset' })} className='btn'>
    Reset
  </button>
</div>
```

- setup active action

reducer.ts

```ts
export type CounterState = {
  count: number;
  status: string;
};

export const initialState: CounterState = {
  count: 0,
  status: 'Pending...',
};

type UpdateCountAction = {
  type: 'increment' | 'decrement' | 'reset';
};
type SetStatusAction = {
  type: 'setStatus';
  payload: 'active' | 'inactive';
};

// Extend the union type for all possible actions
type CounterAction = UpdateCountAction | SetStatusAction;

export const counterReducer = (
  state: CounterState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    case 'reset':
      return { ...state, count: 0 };
    case 'setStatus':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};
```

```tsx
import { useReducer } from 'react';
import { counterReducer, initialState } from './reducer';

function Component() {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  return (
    <div>
      <h2>Count: {state.count}</h2>
      <h2>Status: {state.status}</h2>

      <div className='btn-container'>
        <button onClick={() => dispatch({ type: 'increment' })} className='btn'>
          Increment
        </button>
        <button onClick={() => dispatch({ type: 'decrement' })} className='btn'>
          Decrement
        </button>
        <button onClick={() => dispatch({ type: 'reset' })} className='btn'>
          Reset
        </button>
      </div>
      <div className='btn-container'>
        <button
          onClick={() => dispatch({ type: 'setStatus', payload: 'active' })}
          className='btn'
        >
          Set Status to Active
        </button>
        <button
          className='btn'
          onClick={() => dispatch({ type: 'setStatus', payload: 'inactive' })}
        >
          Set Status to Inactive
        </button>
      </div>
    </div>
  );
}
export default Component;
```

## 08 - Fetch Data

- reference data fetching in typescript-tutorial

[Zod](https://zod.dev/)
[React Query](https://tanstack.com/query/latest/docs/framework/react/overview)
[Axios](https://axios-http.com/docs/intro)

```sh
npm i zod axios @tanstack/react-query
```

type.ts

```ts
import { z } from 'zod';

export const tourSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  info: z.string(),
  price: z.string(),
  // someValue: z.string(),
});

export type Tour = z.infer<typeof tourSchema>;
```

index-fetch.tsx

```tsx
import { useState, useEffect } from 'react';
import { type Tour, tourSchema } from './types';
const url = 'https://www.course-api.com/react-tours-project';

function Component() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch tours...`);
        }

        const rawData: Tour[] = await response.json();
        const result = tourSchema.array().safeParse(rawData);
        if (!result.success) {
          console.log(result.error.message);
          throw new Error(`Failed to parse tours...`);
        }
        setTours(result.data);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'there was an error...';
        setIsError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    return <h3>Error: {isError}</h3>;
  }

  return (
    <div>
      <h2 className='mb-1'>Tours</h2>
      {tours.map((tour) => {
        return (
          <p key={tour.id} className='mb-1'>
            {tour.name}
          </p>
        );
      })}
    </div>
  );
}
export default Component;
```

- React Query

main.tsx

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

index.tsx

```tsx
import { fetchTours } from './utils';
import { useQuery } from '@tanstack/react-query';
function Component() {
  const {
    data: tours,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['tours'],
    queryFn: fetchTours,
  });

  if (isPending) return <h3>Loading...</h3>;
  if (isError) return <h3>Error: {error.message}</h3>;
  return (
    <div>
      <h2 className='mb-1'>Tours</h2>
      {tours?.map((tour) => {
        return (
          <p key={tour.id} className='mb-1'>
            {tour.name}
          </p>
        );
      })}
    </div>
  );
}
export default Component;
```

utils.ts

```ts
import axios from 'axios';
import { tourSchema, type Tour } from './types';
const url = 'https://course-api.com/react-tours-project';

export const fetchTours = async (): Promise<Tour[]> => {
  const response = await axios.get<Tour[]>(url);
  const result = tourSchema.array().safeParse(response.data);
  if (!result.success) {
    throw new Error('Parsing failed');
  }
  return result.data;
};
```

## 09 - RTK

- counterSlice.ts

```ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type CounterStatus = 'active' | 'inactive' | 'pending...';

type CounterState = {
  count: number;
  status: CounterStatus;
};

const initialState: CounterState = {
  count: 0,
  status: 'pending...',
};

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    setStatus: (state, action: PayloadAction<CounterStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { increment, decrement, reset, setStatus } = counterSlice.actions;

export default counterSlice.reducer;
```

```ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './starter/09-rtk/counterSlice';
// ...

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

type RootState represents the type of the state stored in your Redux store. ReturnType is a utility type provided by TypeScript that can get the return type of a function. store.getState is a function that returns the current state stored in the Redux store. So ReturnType<typeof store.getState> is the type of the state returned by store.getState, which is the type of the state in your Redux store.

type AppDispatch represents the type of the dispatch function in your Redux store. store.dispatch is the function you use to dispatch actions in Redux. typeof store.dispatch gets the type of this function. So AppDispatch is the type of the dispatch function in your Redux store.

hooks.ts

```ts
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

main.tsx

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { store } from './store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
);
```

index.tsx

```tsx
import { useAppSelector, useAppDispatch } from '../../hooks';
import { decrement, increment, reset, setStatus } from './counterSlice';
function RTK() {
  const { count, status } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h2>Count: {count}</h2>
      <h2>Status: {status}</h2>

      <div className='btn-container'>
        <button onClick={() => dispatch(increment())} className='btn'>
          Increment
        </button>
        <button onClick={() => dispatch(decrement())} className='btn'>
          Decrement
        </button>
        <button onClick={() => dispatch(reset())} className='btn'>
          Reset
        </button>
      </div>
      <div className='btn-container'>
        <button onClick={() => dispatch(setStatus('active'))} className='btn'>
          Set Status to Active
        </button>
        <button className='btn' onClick={() => dispatch(setStatus('inactive'))}>
          Set Status to Inactive
        </button>
      </div>
    </div>
  );
}
export default RTK;
```

## 10 - Tasks

types.ts

```ts
export type Task = {
  id: string;
  description: string;
  isCompleted: boolean;
};
```

index.tsx

```tsx
import { useEffect, useState } from 'react';
import Form from './Form';
import List from './List';
import { type Task } from './types';

// Load tasks from localStorage
function loadTasks(): Task[] {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
}

function updateStorage(tasks: Task[]): void {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function Component() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const toggleTask = ({ id }: { id: string }) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      })
    );
  };
  useEffect(() => {
    updateStorage(tasks);
  }, [tasks]);
  return (
    <div>
      <Form addTask={addTask} />
      <List tasks={tasks} toggleTask={toggleTask} />
    </div>
  );
}
export default Component;
```

Form.tsx

```tsx
import { useState } from 'react';
import { type Task } from './types';

type FormProps = {
  addTask: (task: Task) => void;
};

function Form({ addTask }: FormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) {
      alert('please enter a task');
      return;
    }
    addTask({
      id: new Date().getTime().toString(),
      description: text,
      isCompleted: false,
    });
    setText('');
  };
  return (
    <form className='form task-form' onSubmit={handleSubmit}>
      <input
        type='text'
        className='form-input'
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button type='submit' className='btn'>
        add task
      </button>
    </form>
  );
}
export default Form;
```

List.tsx

```tsx
import { type Task } from './types';

type ListProps = {
  tasks: Task[];
  toggleTask: ({ id }: { id: string }) => void;
};

const List = ({ tasks, toggleTask }: ListProps) => {
  return (
    <ul className='list'>
      {tasks.map((task) => {
        return (
          <li key={task.id}>
            <p className='task-text'>{task.description}</p>
            <input
              type='checkbox'
              checked={task.isCompleted}
              onChange={() => {
                toggleTask({ id: task.id });
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};
export default List;
```
