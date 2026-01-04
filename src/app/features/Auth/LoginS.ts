import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../config/axiosBaseQuery";
import { setCredentials } from "./Auth";
import type { Iuser } from "../../../interface";

export const LoginApi = createApi({
  reducerPath: "loginsApi",
  tagTypes: ["Users", "Me"],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    createAuthU: builder.mutation({
      query: (data) => ({
        url: "/auth/local",
        method: "POST",
        data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const userRes = await fetch(
            "http://localhost:1337/api/users/me?populate=role",
            {
              headers: {
                Authorization: `Bearer ${data.jwt}`,
              },
            }
          ).then((res) => res.json());

          dispatch(
            setCredentials({
              jwt: data.jwt,
              user: userRes,
            })
          );
        } catch (error) {
          console.error("Login failed", error);
        }
      },
    }),

    getUsers: builder.query<Iuser[], void>({
      query: () => ({
        url: "/users?populate=role",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    getMe: builder.query<Iuser, void>({
      query: () => ({
        url: "/users/me?populate=role",
        method: "GET",
      }),
      providesTags: ["Me"],
    }),

    // 🔥 UPDATE PROFILE
    updateMe: builder.mutation<Iuser, { id: number; data: { username: string; email: string } }>({
  query: ({ id, data }) => ({
    url: `/users/${id}`,
    method: "PUT",
    data: {
      username: data.username,
      email: data.email,
    },
  }),
  invalidatesTags: ["Me", "Users"],
}),

  }),
});




export const { useCreateAuthUMutation,useGetUsersQuery,useGetMeQuery, useUpdateMeMutation } = LoginApi;
