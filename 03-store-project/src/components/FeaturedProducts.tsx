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
