import { IEvent } from "@/interface/event.interface";
import { privateApi } from "@/shared/axios/axios";
import { useQuery } from "@tanstack/react-query";

export const QfindEvents = (page: number) => {
  const fether = () =>
    privateApi.get(`/event`, {
      params: {
        page: page,
      },
    });
  return useQuery({
    queryKey: ["events", page],
    queryFn: fether,
    select: (res): IEvent => {
      return res?.data?.data;
    },
  });
};
