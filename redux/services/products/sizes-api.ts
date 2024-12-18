import { baseQuery } from "@/redux/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

interface ISize {
  id: number;
  name: string;
}

interface CreateSizePayload {
  name: string;
}
interface GetSizesResponse {
    data: ISize[];
  }
  
export const sizeApi = createApi({
  reducerPath: "sizeApi",
  baseQuery: baseQuery,
  tagTypes: ["Size"],

  endpoints: (builder) => ({
    getSizes: builder.query<GetSizesResponse, void>({
      query: () => "/size/1",
      providesTags: ["Size"],
    }),
    getSizeById: builder.query<ISize, number>({
      query: (id) => `/size/${id}`,
      providesTags: (result, error, id) => [{ type: "Size", id }],
    }),
    createSize: builder.mutation<ISize, CreateSizePayload>({
      query: (body) => ({
        url: "/size",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Size"],
    }),
    updateSize: builder.mutation<ISize, { id: number; name: string }>({
      query: ({ id, name }) => ({
        url: `/size/${id}`,
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Size", id }],
    }),
    deleteSize: builder.mutation<void, number>({
      query: (id) => ({
        url: `/size/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Size", id }],
    }),
  }),
});

export const {
  useGetSizesQuery,
  useGetSizeByIdQuery,
  useCreateSizeMutation,
  useUpdateSizeMutation,
  useDeleteSizeMutation,
} = sizeApi;
