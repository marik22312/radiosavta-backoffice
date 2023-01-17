import { useFlags } from "flagsmith/react";

export const useFeatureFlags = (flagsToUse: string[]) => {
  const flags = useFlags(flagsToUse);

  const isFeatureEnabled = (featureKey: string) => {
    return flags[featureKey]?.enabled === true;
  };

  return {
    isFeatureEnabled,
  };
};
