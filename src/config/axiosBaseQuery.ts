import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axiosInstance from "./axios.config";
export const axiosBaseQuery =
  ({ baseUrl = "" } = {}): BaseQueryFn =>
  async ({ url, method, data, params }, { getState }) => {
    try {
      const token = (getState() as any).auth?.user?.jwt;

      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      });

      return { data: result.data };
    } catch (axiosError: any) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };

