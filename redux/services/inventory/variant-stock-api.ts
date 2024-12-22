import { baseQuery } from "@/redux/base-query";
import { IParams } from "@/types/common";
import {
  ICreateVariantStockMutationParams,
  IUpdateVariantStockMutationParams,
  IVariantStock,
  IVariantStockResponse,
} from "@/types/variant-stock-types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IWarehouse } from "./warehouses-api";

export const variantStockApi = createApi({
  reducerPath: "variantStockApi",
  baseQuery,
  tagTypes: ["VariantStock"],
  endpoints(build) {
    return {
      getVariantStock: build.query<IVariantStockResponse, IParams>({
        query: ({ country, page = 1 }) => ({
          url: `${country}/variant-stock/all`,
          method: "GET",
          params: { page },
        }),
        providesTags: (result) =>
          result
            ? result.data.map((variantStock) => ({
                type: "VariantStock",
                id: variantStock.id,
              }))
            : [],
      }),
      createVariantStock: build.mutation<
        IWarehouse,
        ICreateVariantStockMutationParams
      >({
        query: ({ country, payload }) => ({
          url: `${country}/variant-stock`,
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["VariantStock"],
      }),
      updateVariantStock: build.mutation<
        IVariantStock,
        IUpdateVariantStockMutationParams
      >({
        query: ({ country, id, payload }) => ({
          url: `${country}/variant-stock/${id}/update`,
          method: "PUT",
          body: payload,
        }),
        invalidatesTags: (result, error, { id }) => [
          { type: "VariantStock", id },
        ],
      }),
      deleteVariantStock: build.mutation<void, IParams>({
        query: ({ country, id }) => ({
          url: `${country}/variant-stock/${id}/delete`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, { id }) => [
          { type: "VariantStock", id },
        ],
      }),
    };
  },
});
