import { baseQuery } from "@/redux/base-query";
import { IQueryParams } from "@/types/common";
import {
  IGetStockLogsResponse,
  IStockLog,
  IStockLogMutationQuery,
  IStockLogPayload,
} from "@/types/stock-logs-types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const stockLogsApi = createApi({
  reducerPath: "stockLogsApi",
  baseQuery,
  tagTypes: ["StockLogs"],
  endpoints: (builder) => ({
    getStockLogs: builder.query<IGetStockLogsResponse, IQueryParams>({
      query: ({ country, page = 1 }) => ({
        url: `${country}/stock-logs/all`,
        params: { page },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "StockLogs" as const, id })),
              { type: "StockLogs" as const, id: "LIST" },
            ]
          : [{ type: "StockLogs" as const, id: "LIST" }],
    }),
    getStockLog: builder.query<IStockLog, IQueryParams>({
      query: ({ id, country }) => ({
        url: `${country}/stock-logs/${id}`,
      }),
      providesTags: (result, error, { id }) => [{ type: "StockLogs", id }],
    }),
    createStockLog: builder.mutation<IStockLogPayload, IStockLogMutationQuery>({
      query: ({ country, payload }) => ({
        url: `${country}/stock-logs`,
        method: "POST",
        body: {
          ...payload,
          price: parseFloat(payload.price?.toString() ?? "0"),
          productId: parseInt(payload.productId?.toString() ?? "0"),
          quantity: parseInt(payload.quantity?.toString() ?? "0"),
          supplierId: parseInt(payload.supplierId?.toString() ?? "0"),
          variantId: parseInt(payload.variantId?.toString() ?? "0"),
          warehouseId: parseInt(payload.warehouseId?.toString() ?? "0"),
        },
      }),
      invalidatesTags: [{ type: "StockLogs", id: "LIST" }],
    }),
    updateStockLog: builder.mutation<IStockLogPayload, IStockLogMutationQuery>({
      query: ({ id, payload, country }) => ({
        url: `${country}/stock-logs/${id}/update`,
        method: "PUT",
        body: {
          ...payload,
          price: parseFloat(payload.price?.toString() ?? "0"),
          productId: parseInt(payload.productId?.toString() ?? "0"),
          quantity: parseInt(payload.quantity?.toString() ?? "0"),
          supplierId: parseInt(payload.supplierId?.toString() ?? "0"),
          variantId: parseInt(payload.variantId?.toString() ?? "0"),
          warehouseId: parseInt(payload.warehouseId?.toString() ?? "0"),
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "StockLogs", id }],
    }),
    deleteStockLog: builder.mutation<void, IQueryParams>({
      query: ({ id, country }) => ({
        url: `${country}/stock-logs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "StockLogs", id }],
    }),
  }),
});

export const {
  useGetStockLogsQuery,
  useGetStockLogQuery,
  useCreateStockLogMutation,
  useUpdateStockLogMutation,
  useDeleteStockLogMutation,
} = stockLogsApi;
