import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import { initHttpClient } from "./services/http.client";
import mixpanel from "mixpanel-browser";

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

mixpanel.init(process.env.REACT_APP_MIXPANEL_API_KEY!, {
  debug: process.env.NODE_ENV === "development",
});
initHttpClient();

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
