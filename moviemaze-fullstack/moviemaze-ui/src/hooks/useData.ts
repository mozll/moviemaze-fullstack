import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

interface Response<T> {
  count: number;
  results: T[];
}
const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  dependencies?: any[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();

      setIsLoading(true);
      apiClient
        .get<Response<T>>(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((response) => {
          setData(response.data.results);
          setIsLoading(false);
        })
        .catch((error) => {
          if (!(error instanceof CanceledError)) setError(error.message);
        });

      return () => controller.abort();
    },
    dependencies ? [...dependencies] : []
  );

  return { data, error, isLoading };
};

export default useData;
