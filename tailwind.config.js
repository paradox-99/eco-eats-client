/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': '"Montserrat", sans-serif',
        'manrope': '"Manrope", sans-serif',
        'pirata': '"Pirata One", system-ui'
      },
      
    },
    
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ['light', 'dark',
    {
      dark: {
        ...require("daisyui/src/theming/themes")["dark"],
        primary: '#ff421c',
        "base-content": "#ebe8e8",
      },
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        primary: '#ff421c',
        "base-content": "#000000",
      },
    },
    ],
  },
}

