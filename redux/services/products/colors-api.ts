import { baseQuery } from "@/redux/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

interface IColor {
  id: number;
  name_ar: string;
  name_en: string;
}

interface CreateColorPayload {
  name_ar: string;
  name_en: string;
}
interface GetColorsResponse {
  data: IColor[];
}

export const colorApi = createApi({
  reducerPath: "colorApi",
  baseQuery: baseQuery,
  tagTypes: ["Color"],

  endpoints: (builder) => ({
    getColors: builder.query<GetColorsResponse, { page?: number }>({
      query: ({ page = 1 }) => ({
        url: "/color",
        params: { page },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Color" as const,
                id,
              })),
              { type: "Color" as const, id: "LIST" },
            ]
          : [{ type: "Color" as const, id: "LIST" }],
    }),
    getColorById: builder.query<IColor, number>({
      query: (id) => `/color/${id}`,
      providesTags: (result, error, id) => [{ type: "Color", id }],
    }),
    createColor: builder.mutation<IColor, CreateColorPayload>({
      query: (body) => ({
        url: "/color",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Color", id: "LIST" }],
    }),
    updateColor: builder.mutation<
      IColor,
      { id: number; name: string; hex: string }
    >({
      query: ({ id, name, hex }) => ({
        url: `/color/${id}`,
        method: "PUT",
        body: { name, hex },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Color", id }],
    }),
    deleteColor: builder.mutation<void, number>({
      query: (id) => ({
        url: `/color/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Color", id }],
    }),
  }),
});

export const {
  useGetColorsQuery,
  useGetColorByIdQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
} = colorApi;
