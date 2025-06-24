import axios from "axios";
import { useState } from "react";

export default function UserImageUploader({ id }) {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const url = import.meta.env.VITE_CLOUDINARY_URL;
    const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setErrorMsg(null);
    };

    const handleUpload = async () => {
        if (!file) {
            setErrorMsg("ファイルが選択されていません");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset);
        formData.append("folder", `portfolio/user/${id}`);

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                setErrorMsg("アップロードに失敗しました");
                return;
            }

            const data = await response.json();
            setImageUrl(data.secure_url);
            setErrorMsg(null);

            const res = await axios.get(
                `http://127.0.0.1:8000/api/user/${id}`,
                { withCredentials: true }
            );

            await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
                credentials: "include",
            });

            const patch = await axios.patch(
                `http://127.0.0.1:8000/api/user/${id}/thumbnail`,
                { img: data.secure_url },
                { withCredentials: true }
            );
        } catch (error) {
            setErrorMsg("投稿に失敗しました: ");
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>アップロード</button>
            {errorMsg && (
                <p style={{ color: "red", marginTop: "10px" }}>{errorMsg}</p>
            )}
            {imageUrl && <img src={imageUrl} alt="ユーザーサムネイル" />}
        </div>
    );
}
