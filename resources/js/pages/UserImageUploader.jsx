import { useState, useRef } from "react";
import { toast, Toaster } from "sonner";
import { getCsrfCookie } from "../authApi";
import { uploadToCloudinary, postUserImage } from "../api/userApi";

export default function UserImageUploader({ userId, onUploaded }) {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));

        e.target.value = null;
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("ファイルが選択されていません");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("user_id", userId);

            const { data } = await uploadToCloudinary(formData);

            await getCsrfCookie();
            await postUserImage(userId, data.secure_url);

            if (onUploaded) onUploaded();
            setFile(null);
            setPreviewUrl(null);
            toast.success("画像を更新しました");
        } catch (error) {
            toast.error("アップロードに失敗しました");
        }

        if (fileInputRef.current) fileInputRef.current.value = "";
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
