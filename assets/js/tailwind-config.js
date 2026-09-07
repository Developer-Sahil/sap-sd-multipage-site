// Shared Tailwind Play-CDN config. Include right after the cdn.tailwindcss.com <script> tag.
tailwind.config = {
    theme: {
        extend: {
            colors: {
                sap: {
                    blue: '#0a6ed1',
                    dark: '#0f172a',
                    gold: '#f59e0b',
                    accent: '#2563eb',
                    light: '#f8fafc',
                    card: '#ffffff'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            }
        }
    }
}
