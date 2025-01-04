export interface IStockLog {
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
  status: string;
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
  variant: {
    id: number;
    sku: string;
    quantity: number;
    price: number;
    is_deleted: boolean;
    productId: number;
    currencyId: number;
    warehouseId: number;
    colorId: number | null;
    sizeId: number | null;
    createdAt: string;
    updatedAt: string;
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
    [key: `title_${string}`]: string;
    [key: `description_${string}`]: string;
  };
}
export interface IGetStockLogsResponse {
  data: IStockLog[];
  count: number;
}
export interface IStockLogPayload {
  productId?: number | string;
  warehouseId?: number | string;
  colorId?: number | string | null;
  sizeId?: number | string | null;
  quantity?: number | string;
  price?: number | string;
  variantId?: number | string;
  supplierId?: number | string;
  status: "new" | "sell" | "damaged";
}
export interface IStockLogMutationQuery {
  id?: number;
  country: string | undefined;
  payload: IStockLogPayload;
}
