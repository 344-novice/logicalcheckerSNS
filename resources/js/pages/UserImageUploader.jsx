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
