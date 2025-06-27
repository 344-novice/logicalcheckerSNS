import axios from "axios";
import { toast, Toaster } from "sonner";
import { useState } from "react";

export default function UserImageUploader({ userId, onUploaded }) {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const url = import.meta.env.VITE_CLOUDINARY_URL;
    const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("ファイルが選択されていません");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset);
        formData.append("folder", `portfolio/user/${userId}`);

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                toast.error("アップロードに失敗しました");
                return;
            }

            const data = await response.json();

            await axios.get(`http://127.0.0.1:8000/api/user/${userId}`, {
                withCredentials: true,
            });

            await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
                credentials: "include",
            });

            await axios.patch(
                `http://127.0.0.1:8000/api/user/${userId}/thumbnail`,
                { image: data.secure_url },
                { withCredentials: true }
            );

            if (onUploaded) onUploaded();
            setFile(null);
            setPreviewUrl(null);
            toast.success("画像を更新しました");
        } catch (error) {
            toast.error("アップロードに失敗しました: ");
        }
    };

    return (
        <>
            <Toaster position="top-center" />
            <div className="flex flex-col space-y-3">
                <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition inline-block w-40 text-center">
                    サムネイルを選択
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>
                <button
                    onClick={handleUpload}
                    className="w-40 px-4 py-2 text-sm text-center border border-black bg-gray-50 text-black rounded hover:bg-black hover:text-white transition"
                >
                    アップロード
                </button>
                {file && (
                    <div>
                        <img
                            src={previewUrl}
                            alt="プレビュー"
                            className="mt-5 w-40 h-40 border-2 border-gray-400 object-cover block"
                        />
                    </div>
                )}
            </div>
        </>
    );
}
