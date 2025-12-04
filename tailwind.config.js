/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                slate: {
                    850: '#1e293b', // Custom dark
                    900: '#0f172a',
                    950: '#020617',
                },
                accent: {
                    amber: '#f59e0b',
                    blue: '#60a5fa',
                    red: '#ef4444',
                    green: '#22c55e'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            }
        },
    },
    plugins: [
        require("tailwindcss-animate"),
    ],
}
