interface BarcodeResponse {
  message: string;
  response: {
    status_code: string;
    status_message: string;
    transaction_id: string;
    actions: [
      {
        name: string;
        method: string;
        url: string;
      },
      {
        name: string;
        method: string;
        url: string;
      },
      {
        name: string;
        method: string;
        url: string;
      },
      {
        name: string;
        method: string;
        url: string;
      },
    ];
  };
}
