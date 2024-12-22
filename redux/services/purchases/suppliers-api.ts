import { baseQuery } from "@/redux/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ICreateSupplier,
  ICreateSuppliersMutationParams,
  ISupplierQueryParams,
  ISupplierResponse,
  IUpdateSuppliersMutationParams,
} from "@/types/purchases-types";
export interface ApiError {
  status: number;
  data: {
    message: string;
    errors?: Record<string, string[]>;
  };
}

export const supplierApi = createApi({
  reducerPath: "suppliersApi",
  baseQuery,
  tagTypes: ["Supplier"],
  endpoints(build) {
    return {
      getSuppliers: build.query<ISupplierResponse, ISupplierQueryParams>({
        query: ({ country, page = 1 }) => ({
          url: `${country}/supplier/all`,
          method: "GET",
          params: { page },
        }),
        providesTags: (result) =>
          result
            ? result.data.map((warehouse) => ({
                type: "Supplier",
                id: warehouse.id,
              }))
            : [],
      }),
      createSupplier: build.mutation<
        ICreateSupplier,
        ICreateSuppliersMutationParams
      >({
        query: ({ country, payload }) => ({
          url: `${country}/supplier`,
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["Supplier"],
      }),
      updateSupplier: build.mutation<
        ICreateSupplier,
        IUpdateSuppliersMutationParams
      >({
        query: ({ country, id, payload }) => ({
          url: `${country}/supplier/${id}/update`,
          method: "PUT",
          body: payload,
        }),
        invalidatesTags: (result, error, { id }) => [{ type: "Supplier", id }],
      }),
      deleteSupplier: build.mutation<void, { id?: number; country?: string }>({
        query: ({ id, country }) => ({
          url: `${country}/supplier/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Supplier"],
      }),
    };
  },
});

export const {
  useGetSuppliersQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = supplierApi;
