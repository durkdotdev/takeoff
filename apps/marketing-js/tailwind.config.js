module.exports = {
  content: [
    "./pages/daisy/**/*.{js,ts,jsx,tsx}",
    "./pages/tailwind/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/daisy/**/*.{js,ts,jsx,tsx}",
    "../../packages/tailwind/**/*.{js,ts,jsx,tsx}"
  ],
  corePlugins: {
    preflight: false
  },
  plugins: [require("daisyui"), require("nightwind")],
  theme: {
    extend: {}
  }
};
