import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const QueryClientProviders = ({ children }: any) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
