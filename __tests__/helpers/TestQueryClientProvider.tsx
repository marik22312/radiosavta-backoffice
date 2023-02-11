import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
export const TestQueryClientProvider: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};
