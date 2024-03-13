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
            key={link.label}
            className={({ isActive }) => {
              return `capitalize font-light tracking-wide ${
                isActive ? 'text-primary' : ''
              }`;
            }}
          >
            {link.label}
          </NavLink>
        );
      })}
    </div>
  );
}
export default NavLinks;
