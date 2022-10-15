import { useEffect, useState } from "react";

export enum ApiStatus {
  Loading,
  Success,
  Error
}

interface ApiResponse {
  status: ApiStatus;
  error: string;
  response: object;
}

export function useApi(
  callback: () => Promise<object>
) {
  // @ts-ignore: Unreachable code error
  const [data, setData] = useState<ApiResponse<object>>({ 
    status: ApiStatus.Loading,
    error: "",
    response: null
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await callback();
        const nullData = {};

        setData({
          status: ApiStatus.Success,
          error: "",
          response: data
        });
      } catch (error) {
        setData({
          status: ApiStatus.Error,
          error: "Something went wrong",
          response: null
        });
      }
    };

    void getData();
  }, [callback]);

  return data;
}
