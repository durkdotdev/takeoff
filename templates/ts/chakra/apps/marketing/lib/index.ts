import { getEnvironmentURL } from "simple-ts-utils";

// App URL
// Development: http://localhost:3000
// Production: Use your app's domain!
export const APP_URL = getEnvironmentURL(
  "http://localhost:3000",
  "https://app.domain.com"
);
