module.exports = {
  content: [
    "./pages/daisy/**/*.{js,ts,jsx,tsx}",
    "./pages/influx/**/*.{js,ts,jsx,tsx}",
    "./pages/tailwind/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/daisy-js/**/*.{js,ts,jsx,tsx}",
    "../../packages/daisy-ts/**/*.{js,ts,jsx,tsx}",
    "../../packages/influx-js/**/*.{js,ts,jsx,tsx}",
    "../../packages/influx-ts/**/*.{js,ts,jsx,tsx}",
    "../../packages/tailwind-js/**/*.{js,ts,jsx,tsx}",
    "../../packages/tailwind-ts/**/*.{js,ts,jsx,tsx}"
  ],
  corePlugins: {
    preflight: false
  },
  // daisy development
  // plugins: [require("daisyui"), require("nightwind")],
  // influx development
  plugins: [require("influx-ui"), require("nightwind")],
  theme: {
    extend: {}
  }
};
