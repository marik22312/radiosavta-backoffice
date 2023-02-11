import { TestQueryClientProvider } from "./TestQueryClientProvider";
import { renderHook } from "@testing-library/react-hooks";

export const renderHookWithQueryClient = (hook: any) => {
  return renderHook(hook, {
    wrapper: TestQueryClientProvider,
  });
};
