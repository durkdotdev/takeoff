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

/**
 * @param {string} timestamp Stripe Subscription trial_end
 * @returns Days Left
 */
export const calculateTrialTimeLeft = (timestamp) => {
  const day = 24 * 60 * 60 * 1000;
  const now = new Date();
  const time = new Date(timestamp * 1000);
  return Math.round(Math.abs((Number(now) - Number(time)) / day));
};
