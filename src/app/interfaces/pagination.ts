export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  summary?: string;
  categoryId: number;
  categoryName?: string;
  coverImage?: string;
}
export interface PaginationParams {
  page: number;
  size: number;
}