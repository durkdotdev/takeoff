const withTM = require("next-transpile-modules")([
  "chakra-js",
  "daisy-js",
  "tailwind-js",
  "unstyled-js"
]);

module.exports = withTM({
  reactStrictMode: true
});
