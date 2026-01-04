import { axiosBaseQuery } from "../../config/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    uploadImage: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        data: formData,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = uploadApi;
