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
    const url = constructUrl(pageNumber, search, pathname);

    return (
      <PaginationItem key={pageNumber}>
        <PaginationLink to={url} isActive={isActive}>
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  });

  return (
    <Pagination className='mt-16'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to={constructPrevOrNextUrl(
              'prev',
              page,
              pageCount,
              search,
              pathname
            )}
          />
        </PaginationItem>
        {renderPagination}
        <PaginationItem>
          <PaginationNext
            to={constructPrevOrNextUrl(
              'next',
              page,
              pageCount,
              search,
              pathname
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
export default PaginationContainer;
