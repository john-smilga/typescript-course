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
