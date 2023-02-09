import React from "react";

import { Provider } from "mobx-react";
import "./App.scss";

import { Routes } from "./routes";
import httpClient from "./services/http.client";
import IdentityService from "./services/identity.service";
import IdentityStore from "./stores/identity.store";

import { BASE_API_URL } from "./config/api.config";
import BaseApiService from "./services/base.api.service";
import { CookieOven } from "./services/CookieOven";
import ProgramsStore from "./stores/programs.store";
import { ProgramsService } from "./services/programs.service";

import "antd/dist/antd.css";
import { AuthenticaitonProvider } from "./providers/AuthenticationProvider";
import { SignalContextProvider } from "./providers/SignalProvider";
import { FeatureFlagsProvider } from "./providers/FeatureFlags";

import { SignalReciever } from "./components/SignalReciever/SignalReciever";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./services/queryClient";
import { BrowserRouter as Router } from "react-router-dom";

import { QueryClientProvider } from "react-query";
import { queryClient } from "./services/queryClient";

const cookieOven = new CookieOven();
const apiService = new BaseApiService(BASE_API_URL, httpClient);
const identityService = new IdentityService(apiService, cookieOven);
const programsService = new ProgramsService(apiService);

const stores = {
  identityStore: new IdentityStore(identityService),
  apiStore: apiService,
  programsService: programsService,
  programsStore: new ProgramsStore(programsService),
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FeatureFlagsProvider>
        <AuthenticaitonProvider>
          <SignalContextProvider>
            <div className="App">
              <Provider {...stores}>
                <Router>
                  <SignalReciever />
                  <Routes />
                </Router>
              </Provider>
            </div>
          </SignalContextProvider>
        </AuthenticaitonProvider>
      </FeatureFlagsProvider>
    </QueryClientProvider>
  );
};

export default App;
