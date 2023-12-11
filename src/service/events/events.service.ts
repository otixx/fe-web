import { IEvent } from "@/interface/event/event.interface";
import { privateApi } from "@/shared/axios/axios";
import { useQuery } from "@tanstack/react-query";

export const QfindEvents = () => {
  const fether = () => privateApi.get(`/event`);
  return useQuery({
    queryKey: ["events"],
    queryFn: fether,
    select: (res): IEvent[] => {
      return res?.data?.data;
    },
  });
};
