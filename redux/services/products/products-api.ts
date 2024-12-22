import { baseQuery } from "@/redux/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

interface IProduct {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  categoryId: number | string;
  external_url: string;
  thumbnail: string;
  is_active: boolean;
  images: string[];
  meta_description: string;
}

interface CreateProductPayload {
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  categoryId: number | string;
  is_active: boolean;
  external_url: string;
  thumbnail: File[];
  images: File[];
  meta_description: string;
  createdAt?: string;
  [key: string]: unknown;
}

interface UpdateProductPayload extends Partial<CreateProductPayload> {
  id: number;
}

interface GetProductsResponse {
  data: IProduct[];
  count: number;
}
interface IParams {
  id?: number;
  country?: string | null;
  page?: number;
  lang?: string;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQuery,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, IParams>({
      query: ({ country, page = 1 }) => ({
        url: `${country}/product/all`,
        params: { page },
      }),
      providesTags: ["Product"],
    }),
    getProductById: builder.query<IProduct, IParams>({
      query: ({ country, id }) => ({
        url: `${country}/product/${id}`,
      }),
      providesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
    createProduct: builder.mutation<
      IProduct,
      { payload: CreateProductPayload; params: IParams }
    >({
      query: ({ payload, params }) => {
        const formData = new FormData();
        formData.append("title_ar", payload.title_ar);
        formData.append("title_en", payload.title_en);
        formData.append("description_ar", payload.description_ar);
        formData.append("description_en", payload.description_en);
        formData.append("is_active", payload.is_active);
        formData.append("categoryId", String(payload.categoryId));

        formData.append("external_url", payload.external_url);
        formData.append("meta_description", payload.meta_description);
        formData.append("thumbnail", payload.thumbnail[0]);
        payload.images.forEach((image) => {
          formData.append(`images`, image);
        });
        const { country } = params;
        return {
          url: `${country}/product`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<IProduct, UpdateProductPayload>({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        if (body.title_ar) formData.append("title_ar", body.title_ar);
        if (body.title_en) formData.append("title_en", body.title_en);
        if (body.description_ar)
          formData.append("description_ar", body.description_ar);
        if (body.description_en)
          formData.append("description_en", body.description_en);
        if (body.categoryId) formData.append("categoryId", body.categoryId);
        if (body.external_url)
          formData.append("external_url", body.external_url);
        if (body.meta_description)
          formData.append("meta_description", body.meta_description);
        if (body.thumbnail) formData.append("thumbnail", body.thumbnail[0]);
        if (body.images) {
          body.images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
          });
        }

        return {
          url: `/product/${id}/update`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
