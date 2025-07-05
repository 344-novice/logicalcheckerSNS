import { useEffect } from "react";
import axios from "axios";

export default function SessionTimeout() {
    useEffect(() => {
        const timeout = 20 * 60 * 1000;

        const timer = setTimeout(() => {
            axios
                .post("/logout")
                .then(() => {
                    window.location.href = "/login";
                })
                .catch(() => {
                    window.location.href = "/login";
                });
        }, timeout);

        return () => clearTimeout(timer);
    }, []);

    return null;
}
