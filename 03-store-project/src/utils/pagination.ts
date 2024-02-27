export const constructUrl = (
  pageNumber: number,
  search: string,
  pathname: string
) => {
  const searchParams = new URLSearchParams(search);
  searchParams.set('page', pageNumber.toString());
  return `${pathname}?${searchParams.toString()}`;
};

export const constructPrevOrNextUrl = (
  direction: 'prev' | 'next',
  page: number,
  pageCount: number,
  search: string,
  pathname: string
): string => {
  if (direction === 'prev') {
    let prevPage = page - 1;
    if (prevPage < 1) prevPage = pageCount;
    return constructUrl(prevPage, search, pathname);
  }

  let nextPage = page + 1;
  if (nextPage > pageCount) nextPage = 1;
  return constructUrl(nextPage, search, pathname);
};
