export interface ISupplier {
  id?: number;
  name: string;
  is_deleted: boolean;
  currencyId: number;
  payable: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateSupplier {
  name: string;
  payable?: number;
}

export interface IUpdateSupplier {
  name: string;
  payable?: number;
}
export interface ISupplierResponse {
  data: ISupplier[];
  count: number;
}
export interface ISupplierQueryParams {
  country?: string;
  page?: number;
  id?: number;
}

export interface ICreateSuppliersMutationParams {
    country?: string;
    payload: ICreateSupplier;
  }
export interface IUpdateSuppliersMutationParams {
    id?: number;
    country?: string;
    payload: ICreateSupplier;
  }