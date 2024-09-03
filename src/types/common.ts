export interface PagedApiResponse<T> {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;

  first: boolean;
  last: boolean;
  empty: boolean;

  content: T[];

  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };

  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
  };
}
