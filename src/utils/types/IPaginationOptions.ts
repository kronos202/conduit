export interface IPaginationOptions {
  page: number;
  limit: number;
  search?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}
