import axios from "axios";
import { toast, Toaster } from "sonner";
import { useState } from "react";
import { getCsrfCookie } from "../authApi";
import { postUserThumbnail } from "../api/userApi";

export default function UserImageUploader({ userId, onUploaded }) {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;

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
        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("folder", `portfolio/user/${userId}`);

        try {
            const { data } = await axios.post(UPLOAD_URL, formData);

            await getCsrfCookie();

            await postUserThumbnail(id);

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
                <label className="w-40 px-4 py-2 text-center bg-blue-500 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white cursor-pointer rounded">
                    サムネイルを選択
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>
                <button
                    onClick={handleUpload}
                    className="w-40 px-4 py-2 text-center text-black hover:text-white bg-gray-100 hover:bg-gray-700 dark:hover:bg-gray-500 border border-black dark:border-none rounded"
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
