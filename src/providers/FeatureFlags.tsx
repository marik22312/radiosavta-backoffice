import React from "react";
import flagsmith from "flagsmith";
import { FlagsmithProvider } from "flagsmith/react";

const FLAT_SMITH_API_KEY = process.env.REACT_APP_FLAGSMITH_API_KEY ?? "";

export const FeatureFlagsProvider: React.FC = ({ children }) => {
  return (
    <FlagsmithProvider
      options={{
        environmentID: FLAT_SMITH_API_KEY,
      }}
      flagsmith={flagsmith}
    >
      {/* @ts-ignore */}
      {children}
    </FlagsmithProvider>
  );
};
