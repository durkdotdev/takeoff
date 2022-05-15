import { getEnvironmentURL } from "simple-ts-utils";

export const getDocsUrl = () => {
  return getEnvironmentURL(
    "http://localhost:3001",
    "https://takeoff-docs.durk.dev"
  );
};
