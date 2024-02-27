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
