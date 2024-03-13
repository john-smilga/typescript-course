import { Header, Loading, Navbar } from '@/components';
import { Outlet, useNavigation } from 'react-router-dom';

function HomeLayout() {
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
}
export default HomeLayout;
