import { baseQuery } from "@/redux/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

interface ICategory {
  id: number;
  name: string;
  is_active: boolean;
  image: string;
}

interface CreateCategoryPayload {
  name: string;
  is_active: boolean;
  image: File | string;
}

interface GetCategoriesResponse {
  data: ICategory[];
}

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQuery,
  tagTypes: ["Category"],

  endpoints: (builder) => ({
    getCategories: builder.query<GetCategoriesResponse, void>({
      query: () => "/category",
      providesTags: ["Category"],
    }),
    getCategoryById: builder.query<ICategory, number>({
      query: (id) => `/category/${id}`,
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),
    createCategory: builder.mutation<ICategory, CreateCategoryPayload>({
      query: (body) => {
        const formData = new FormData();
        formData.append("name", body.name);
        formData.append("is_active", String(body.is_active));
        formData.append("image", body.image);

        return {
          url: "/category",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<
      ICategory,
      { id: number; name: string; is_active: boolean; image: File | string }
    >({
      query: ({ id, name, is_active, image }) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("is_active", String(is_active));
        if (image instanceof File) {
          formData.append("image", image);
        }

        return {
          url: `/category/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Category", id }],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Category", id }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
