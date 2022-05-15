import { getEnvironmentURL } from "simple-ts-utils";

// App URL
// Development: http://localhost:3000
// Production: Use your app's domain!
export const APP_URL = getEnvironmentURL(
  "http://localhost:3000",
  "https://app.domain.com"
);

// Marketing URL
// Development: http://localhost:3000
// Production: Use your marketing website's domain!
export const MARKETING_URL = getEnvironmentURL(
  "http://localhost:3001",
  "https://domain.com"
);
