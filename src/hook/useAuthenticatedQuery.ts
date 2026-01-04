import { useQuery } from "@tanstack/react-query";

import type { AxiosRequestConfig } from "axios";
import axios from "axios";

interface IAuthenticatedQuery {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
}

const useCustomQuery = <T>({
  queryKey,
  url,
  config,
}: IAuthenticatedQuery) => {
  return useQuery<T>({
    queryKey,
    queryFn: async () => {
      const res = await axios.get(url, config);

      // 🔥 هذا السطر هو الحل
      return res.data.data;
    },
  });
};

export default useCustomQuery;
