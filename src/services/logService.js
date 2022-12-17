import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const init = () => {
  Sentry.init({
    dsn: "https://34531691cc4e4c5e9290fae2c7a92ce5@o1298002.ingest.sentry.io/6527657",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
};

const log = (error) => {
  Sentry.captureException(error);
};

const defaultMethods = {
  init,
  log,
};

export default defaultMethods;
