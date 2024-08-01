export interface ICustomersResponse {
  customers: ICustomers[];
  pageNumber: number;
  pageSize: number;
  totalCustomers: number;
  totalPages: number;
}

export interface ICustomers {
  id: number;
  fullName: string;
  email: string;
}
