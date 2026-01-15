import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../config/axiosBaseQuery";

export const CategoryS = createApi({
  reducerPath: "category",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    
    // 🔹 GET all categories
    getC: builder.query<any[], void>({
      query: () => ({
        url: "/categories?populate=iconC&populate=proudacts",
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ["Category"],
    }),

    // 🔹 CREATE category
  createC: builder.mutation<any, any>({
  query: (data) => ({
    url: "/categories",
    method: "POST",
    data: {
      data, // ← مهم جدًا
    },
  }),
  invalidatesTags: ["Category"],
}),


    // 🔥 UPDATE category
    updateC: builder.mutation<any, { id: string; data: any }>({
  query: ({ id, data }) => ({
    url: `/categories/${id}`,
    method: "PUT",
    data: {
      data: {
        title: data.title,
        iconC: data.iconC,

        // 🔥 أهم سطر
        proudacts: data.proudacts,
      },
    },
  }),
  invalidatesTags: ["Category"],
}),

    // 🔥 DELETE category
    deleteC: builder.mutation<any, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCQuery,
  useCreateCMutation,
  useUpdateCMutation,
  useDeleteCMutation,
} = CategoryS;
