import { privateApi } from "@/shared/axios/axios";
import { useMutation } from "@tanstack/react-query";

export const createLogin = () => {
  const fetcher = (values: any) => {
    return privateApi.post(`/user/login`, values);
  };
  return useMutation({
    mutationFn: fetcher,
    onError: (error) => {
      return error;
    },
    onSuccess: (res) => {
      return res;
    },
  });
};
