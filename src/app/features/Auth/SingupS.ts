import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../config/axiosBaseQuery";
import { setCredentials } from "./Auth";

export const SignupApi = createApi({
  reducerPath: "registerApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/auth/local/register",
        method: "POST",
        data,
      }),

      // 🔥 المكان الصحيح
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // خزّن اليوزر + التوكن
          dispatch(setCredentials(data));
        } catch (error) {
          console.error("Signup failed", error);
        }
      },
    }),
  }),
});

export const { useCreateUserMutation } = SignupApi;
