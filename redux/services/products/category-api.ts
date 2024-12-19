import { baseQuery } from "@/redux/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

// Types
interface ICategory {
  id: number;
  name_ar: string;
  name_en: string;
  is_active: boolean;
  image: string;
  createdAt?: string;
  updated_at?: string;
}

export interface CreateCategoryPayload {
  name_en: string;
  name_ar: string;
  is_active: boolean;
  image: File | File[] | string;
}

export interface UpdateCategoryPayload extends Partial<CreateCategoryPayload> {
  id: number;
}

export interface GetCategoriesResponse {
  data: ICategory[];
}

export interface ApiError {
  status: number;
  data: {
    message: string;
    errors?: Record<string, string[]>;
  };
}

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<GetCategoriesResponse, { page?: number }>({
      query: ({ page = 1 }) => ({
        url: "/category",
        params: { page },
      }),
      transformResponse: (response: GetCategoriesResponse) => {
        // Transform the response if needed
        return {
          data: response.data.map((category) => ({
            ...category,
          })),
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Category" as const,
                id,
              })),
              { type: "Category" as const, id: "LIST" },
            ]
          : [{ type: "Category" as const, id: "LIST" }],
    }),

    getCategoryById: builder.query<ICategory, number>({
      query: (id) => `/category/${id}`,
      transformResponse: (response: { data: ICategory }) => {
        const category = response.data;
        return {
          ...category,
          image: category.image?.startsWith("http")
            ? category.image
            : `${process.env.NEXT_PUBLIC_API_URL}/${category.image}`,
        };
      },
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),

    createCategory: builder.mutation<ICategory, CreateCategoryPayload>({
      query: (body) => {
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => {
          if (key === "image") {
            if (value instanceof File) {
              formData.append("image", value);
            } else if (Array.isArray(value) && value.length > 0) {
              formData.append("image", value[0]);
            }
          } else if (value !== undefined) {
            formData.append(key, String(value));
          }
        });

        return {
          url: "/category",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "Category", id: "LIST" }],
      transformErrorResponse: (response: ApiError) => ({
        status: response.status,
        message: response.data.message,
        errors: response.data.errors,
      }),
    }),

    updateCategory: builder.mutation<ICategory, UpdateCategoryPayload>({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => {
          if (key === "image" && value instanceof File) {
            formData.append("image", value);
          } else if (value !== undefined) {
            formData.append(key, String(value));
          }
        });

        return {
          url: `/category/${id}/update`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
      transformErrorResponse: (response: ApiError) => ({
        status: response.status,
        message: response.data.message,
        errors: response.data.errors,
      }),
    }),

    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
    }),
  }),
});

// Hooks
export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

// Custom hooks with error handling
export const useCategories = (page = 1, limit = 10) => {
  const result = useGetCategoriesQuery({ page, limit });
  return {
    ...result,
    categories: result.data?.data ?? [],
    pagination: result.data?.meta,
  };
};

export const useCategory = (id: number) => {
  const result = useGetCategoryByIdQuery(id, {
    skip: !id,
  });
  return {
    ...result,
    category: result.data,
  };
};
