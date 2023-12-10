import { privateApi } from "@/shared/axios/axios";
import { TTicketProps } from "@/types/ticket/ticket.types";

export const getTiket = async ({ id }: TTicketProps) => {
  try {
    const response = await privateApi.get(`/tiket/${id}`);
    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
};
