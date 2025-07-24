import { useState, useEffect } from "react";
import { DEFAULT_USER_IMAGE } from "../constants";

export default function PreloadedImage({ imageUrl, className = "" }) {
    const [src, setSrc] = useState(DEFAULT_USER_IMAGE);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!imageUrl) {
            setSrc(DEFAULT_USER_IMAGE);
            return;
        }

        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            setSrc(imageUrl);
            setLoaded(true);
        };
        img.onerror = () => {
            setSrc(DEFAULT_USER_IMAGE);
            setLoaded(false);
        };
    }, [imageUrl]);

    return (
        <img
            src={src}
            alt="サムネ"
            className={`${className} ${loaded ? "opacity-100" : "opacity-0"}`}
        />
    );
}
