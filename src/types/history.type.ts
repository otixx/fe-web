import {
  IDataTransaction,
  IHistoryTicketDetail,
} from "@/interface/history.interface";

export type IHistoryState = {
  history: IHistoryTicketDetail[];
  getHistory: () => Promise<IDataTransaction>;
};

export type IHistoryProps = {
  id?: string;
};
