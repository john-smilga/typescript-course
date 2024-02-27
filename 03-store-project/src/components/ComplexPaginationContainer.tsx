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
    const url = constructUrl(pageNumber, search, pathname);
    return (
      <PaginationItem key={pageNumber}>
        <PaginationLink to={url} isActive={isActive}>
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  };

  const constructEllipsis = (): React.ReactNode => {
    return (
      <PaginationItem>
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
      pages.push(constructEllipsis());
    }
    // active page
    if (page !== 1 && page !== pageCount) {
      pages.push(constructButton({ pageNumber: page, isActive: true }));
    }
    // ellipsis
    if (page < pageCount - 1) {
      pages.push(constructEllipsis());
    }
    // last page
    pages.push(
      constructButton({ pageNumber: pageCount, isActive: page === pageCount })
    );
    return pages;
  };

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
        {renderPagination()}
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
export default ComplexPaginationContainer;
