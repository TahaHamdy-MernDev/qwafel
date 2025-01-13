export interface IVariant {
  id: string | number; // Ensure this is unique
  price: number;
  quantity: number;
  warehouseId?: number;
  warehouse?: string;
  sizeId?: number;
  size?: string;
  colorId?: number;
  color?: string;
}
// export interface IVariantStock {
//   id?: number;
//   sku?: string;
//   quantity?: number;
//   price?: number;
//   is_deleted?: boolean;
//   productId?: number;
//   currencyId?: number;
//   warehouseId?: number;
//   categoryId?: number;
//   colorId?: number;
//   sizeId?: number;
//   createdAt?: string;
//   updatedAt?: string;
// }
export interface IVariantStock {
  id: number;
  sku: string;
  quantity: number;
  price: number;
  is_deleted: boolean;
  productId: number;
  currencyId: number;
  supplierId: number;
  warehouseId: number | null;
  colorId: number | null;
  sizeId: number | null;
  createdAt: string;
  updatedAt: string;
  currency: {
    alt_name: string;
  };
  color: {
    name_ar: string;
    name_en: string;
  } | null;
  size: null | {
    name_ar: string;
    name_en: string;
  };
  warehouse: {
    name: string;
  } | null;
  product: {
    title_ar: string;
    title_en: string;
    thumbnail: string;
    description_ar: string;
    description_en: string;
  };
}
export interface ICreateVariantStock {
  sku: string;
  quantity: number;
  price: number;
  productId: number;
  currencyId: number;
  warehouseId: number;
  categoryId: number;
  colorId: number;
  sizeId: number;
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
