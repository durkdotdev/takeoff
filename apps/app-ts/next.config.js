const withTM = require("next-transpile-modules")([
  "chakra-ts",
  "daisy-ts",
  "influx-ts",
  "tailwind-ts",
  "unstyled-ts"
]);

module.exports = withTM({
  reactStrictMode: true
});
