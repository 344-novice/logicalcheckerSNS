import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

const isProd = process.env.APP_ENV === "production";

export default defineConfig({
    server: {
        host: "127.0.0.1",
        port: 8000,
    },
    base: isProd ? "https://logical-checker-sns.fly.dev/" : "/",
    plugins: [
        react(),
        laravel({
            input: [
                "resources/css/app.css",
                "resources/js/app.js",
                "resources/js/app.jsx",
            ],
            refresh: true,
            useAbsoluteUrls: true,
        }),
    ],
});
