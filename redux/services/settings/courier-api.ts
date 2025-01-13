import { baseQuery } from "@/redux/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

// Interfaces for Courier Data and Responses
export interface ICourier {
  id?: number;
  name: string;
  currencyId?: number;
  is_deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  our_api_key?: string;
  courier_api_key?: string;
}

export interface ICourierResponse {
  data: ICourier[];
}

interface CreateCourierPayload {
  name: string;
  currencyId?: number;
  our_api_key?: string;
  courier_api_key?: string;
}

interface UpdateCourierPayload extends Partial<ICourier> {
  name: string;
  currencyId?: number;
  our_api_key?: string;
  courier_api_key?: string;
}

interface ICouriersResponse {
  data: ICourier[];
  count: number;
}

interface IGetCouriersQueryParams {
  country?: string;
  page?: number;
}

interface ICreateCourierMutationParams {
  country?: string;
  payload: CreateCourierPayload;
}

interface IUpdateCourierMutationParams {
  id: number;
  country?: string;
  payload: UpdateCourierPayload;
}

export const couriersApi = createApi({
  reducerPath: "couriersApi",
  baseQuery: baseQuery,
  tagTypes: ["Courier"],
  endpoints: (builder) => ({
    // Fetch Couriers
    getCouriers: builder.query<ICouriersResponse, IGetCouriersQueryParams>({
      query: ({ country, page = 1 }) => ({
        url: `${country}/courier/all`,
        params: { page },
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.data.map((courier) => ({
              type: "Courier" as const,
              id: courier.id,
            })),
          ]
          : [],
    }),

    // Create Courier
    createCourier: builder.mutation<ICourier, ICreateCourierMutationParams>({
      query: ({ country, payload }) => ({
        url: `${country}/courier`,
        method: "POST",
        body: payload, // Includes all fields: name, our_api_key, courier_api_key, etc.
      }),
      // invalidatesTags: ["Courier"],
    }),

    // Update Courier
    updateCourier: builder.mutation<ICourier, IUpdateCourierMutationParams>({
      query: ({ id, country, payload }) => ({
        url: `${country}/courier/${id}/update`,
        method: "PUT",
        body: payload, // Includes all fields: name, our_api_key, courier_api_key, etc.
      }),
      // invalidatesTags: ["Courier"],
    }),

    // Delete Courier
    deleteCourier: builder.mutation<void, { id?: number; country?: string }>({
      query: ({ id, country }) => ({
        url: `${country}/courier/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: ["Courier"],
    }),
  }),
});

export const {
  useGetCouriersQuery,
  useCreateCourierMutation,
  useUpdateCourierMutation,
  useDeleteCourierMutation,
} = couriersApi;
