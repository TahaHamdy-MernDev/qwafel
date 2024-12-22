export interface IVariantStock {
  id?: number;
  sku?: string;
  quantity?: number;
  price?: number;
  is_deleted?: boolean;
  productId?: number;
  currencyId?: number;
  warehouseId?: number;
  categoryId?: number;
  colorId?: number;
  sizeId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateVariantStock {
  sku?: string;
  quantity?: number;
  price?: number;
  productId?: number;
  currencyId?: number;
  warehouseId?: number;
  categoryId?: number;
  colorId?: number;
  sizeId?: number;
}

export interface IVariantStockResponse {
  data: IVariantStock[];
  count: number;
}
export interface ICreateVariantStockMutationParams {
  country?: string;
  payload: ICreateVariantStock;
}
export interface IUpdateVariantStockMutationParams {
  id?: number;
  country?: string;
  payload: ICreateVariantStock;
}