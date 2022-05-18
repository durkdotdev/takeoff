const withTM = require("next-transpile-modules")([
  "chakra-js",
  "daisy-js",
  "influx-js",
  "tailwind-js",
  "unstyled-js"
]);

module.exports = withTM({
  reactStrictMode: true
});
