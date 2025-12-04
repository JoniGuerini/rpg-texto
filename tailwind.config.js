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
            },
            screens: {
                'xs': '480px',
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1536px',
                '3xl': '1920px',
                '4k': '2560px',
            },
            fontSize: {
                'xs': 'clamp(0.625rem, 0.5vw + 0.5rem, 0.75rem)',
                'sm': 'clamp(0.75rem, 0.5vw + 0.6rem, 0.875rem)',
                'base': 'clamp(0.875rem, 0.5vw + 0.7rem, 1rem)',
                'lg': 'clamp(1rem, 0.5vw + 0.8rem, 1.125rem)',
                'xl': 'clamp(1.125rem, 0.5vw + 0.9rem, 1.25rem)',
                '2xl': 'clamp(1.25rem, 0.75vw + 1rem, 1.5rem)',
                '3xl': 'clamp(1.5rem, 1vw + 1.2rem, 1.875rem)',
            }
        },
    },
    plugins: [
        require("tailwindcss-animate"),
    ],
}
