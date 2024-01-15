import {
  IDataTransaction,
  IHistoryTicketDetail,
} from "@/utils/interface/history.interface";

export type IHistoryState = {
  history: IHistoryTicketDetail[];
  getHistory: () => Promise<IDataTransaction>;
};

export type IHistoryProps = {
  id?: string;
};
