import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

const isProd = process.env.APP_ENV === "production";

export default defineConfig({
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
