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
