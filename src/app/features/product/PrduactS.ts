import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../config/axiosBaseQuery";

export const PrduactS = createApi({
  reducerPath: "prduact",
  baseQuery: axiosBaseQuery(),
  refetchOnReconnect:true,
  refetchOnMountOrArgChange:true,
  tagTypes: ["Product"],

  endpoints: (builder) => ({
    /* GET PRODUCTS */
    getPr: builder.query<any[], void>({
      query: () => ({
        url: "/proudacts?populate[thumbnail]=true&populate[category]=true",
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ["Product"],
    }),

    getPrById: builder.query<any, string>({
      query: (id) => ({
        url: `/proudacts/${id}?populate[thumbnail]=true&populate[category]=true`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
    }),

    /* CREATE PRODUCT */
    createPr: builder.mutation({
      query: (data) => ({
        url: "/proudacts",
        method: "POST",
        data: {
          data: {
            title: data.title,
            description: data.description,
            price: data.price,
            stock: data.stock,
            thumbnail: data.thumbnail,
            category: data.category,
          },
        },
      }),
      invalidatesTags: ["Product"],
    }),

    /* UPDATE PRODUCT */
    updatePr: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/proudacts/${id}`,
        method: "PUT",
        data: {
          data: {
            title: data.title,
            description: data.description,
            price: data.price,
            stock: data.stock,
            thumbnail: data.thumbnail,
            category: data.category,
          },
        },
      }),
      invalidatesTags: ["Product"],
    }),

    /* DELETE PRODUCT */
    deletePr: builder.mutation<any, string>({
      query: (id) => ({
        url: `/proudacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});


export const {
  useGetPrQuery,
  useGetPrByIdQuery,
  useCreatePrMutation,
  useUpdatePrMutation,
  useDeletePrMutation,
} = PrduactS;
