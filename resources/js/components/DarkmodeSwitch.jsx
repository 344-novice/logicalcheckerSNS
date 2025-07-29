import { useState, useEffect } from "react";

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            if (localStorage.theme === "dark") return true;
            if (
                !("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
            )
                return true;
        }
        return false;
    });

    useEffect(() => {
        const html = window.document.documentElement;
        if (darkMode) {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label={
                darkMode
                    ? "ライトモードに切り替える"
                    : "ダークモードに切り替える"
            }
            className="px-6 py-2 rounded bg-gray-500"
        >
            {darkMode ? "💡" : "🌙"}
        </button>
    );
}
