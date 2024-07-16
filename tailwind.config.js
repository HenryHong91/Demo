export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn1: "fadeIn 1.5s ease-out 0.2s forwards",
        fadeIn2: "fadeIn 1.5s ease-out 0.5s forwards",
        fadeIn3: "fadeIn 1.5s ease-out 0.7s forwards",
        fadeIn4: "fadeIn 1.5s ease-out 1.0s forwards",
        fadeIn5: "fadeIn 1.5s ease-out 1.3s forwards",
        fadeIn6: "fadeIn 1.5s ease-out 1.6s forwards",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
