import { privateApi } from "@/shared/axios/axios";

export const getEvent = async () => {
  try {
    const response = await privateApi.get(`/event`);
    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
};
