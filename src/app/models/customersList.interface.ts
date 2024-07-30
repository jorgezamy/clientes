export interface ICustomerResponse {
  customers: ICustomer[];
  pageNumber: number;
  pageSize: number;
  totalCustomers: number;
  totalPages: number;
}

export interface ICustomer {
  id: number;
  name: string;
  email: string;
}
