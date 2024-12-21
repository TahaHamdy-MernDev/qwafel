import { baseQuery } from "@/redux/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface IWarehouse {
  id?: number;
  name?: string;
  currencyId?: number;
  is_deleted?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IWarehouseResponse {
  data: IWarehouse[];
}
interface CreateWarehousePayload extends Partial<IWarehouse> {
  name: string;
}
interface UpdateWarehousePayload extends Partial<IWarehouse> {
  name?: string;
}

interface IParams {
  id?: number;
  country?: string;
  page?: number;
  lang?: string;
}
interface IWarehousesResponse {
  data: IWarehouse[];
  total: number;
}
interface IGetWarehousesQueryParams {
  country?: string;
  page?: number;
}

interface ICreateWarehouseMutationParams {
  country?: string;
  payload: CreateWarehousePayload;
}

interface IUpdateWarehouseMutationParams {
  id: number;
  country?: string;
  payload: UpdateWarehousePayload;
}

export const warehousesApi = createApi({
  reducerPath: "warehousesApi",
  baseQuery: baseQuery,
  tagTypes: ["Warehouse"],
  endpoints: (builder) => ({
    getWarehouses: builder.query<
      IWarehousesResponse,
      IGetWarehousesQueryParams
    >({
      query: ({ country, page = 1 }) => ({
        url: `${country}/warehouse/all`,
        params: { page },
      }),
      providesTags: (result) =>
        result
          ? result.data.map((warehouse) => ({
              type: "Warehouse",
              id: warehouse.id,
            }))
          : [],
    }),
    createWarehouse: builder.mutation<
      IWarehouse,
      ICreateWarehouseMutationParams
    >({
      query: ({ country, payload }) => {
        return {
          url: `${country}/warehouse`,
          method: "POST",
          body: {
            name: payload.name,
          },
        };
      },
      invalidatesTags: ["Warehouse"],
    }),
    updateWarehouse: builder.mutation<
      IWarehouse,
      IUpdateWarehouseMutationParams
    >({
      query: ({ id, country, payload }) => ({
        url: `${country}/warehouse/${id}/update`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Warehouse"],
    }),
    deleteWarehouse: builder.mutation<void, { id?: number; country?: string }>({
      query: ({ id, country }) => ({
        url: `${country}/warehouse/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Warehouse"],
    }),
  }),
});
export const {
  useGetWarehousesQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
} = warehousesApi;
