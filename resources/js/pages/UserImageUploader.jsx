import axios from "axios";
import { toast, Toaster } from "sonner";
import { useState } from "react";

export default function UserImageUploader({ userId, onUploaded }) {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // この定数表記を修正
    const url = import.meta.env.VITE_CLOUDINARY_URL;
    const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
    };

    const handleUpload = async () => {
        console.log(
            "axios.defaults.headers.post:",
            axios.defaults.headers.post
        );
        if (!file) {
            toast.error("ファイルが選択されていません");
            return;
        }

        try {
            await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
                credentials: "include",
            });

            const signatureRes = await axios.get(
                `http://127.0.0.1:8000/api/cloudinary/signature/${userId}`,
                { withCredentials: true }
            );

            const {
                timestamp,
                signature,
                api_key,
                // folder,
                upload_preset: serverPreset,
                signature_base_string,
                errors,
            } = signatureRes.data;

            // 1,4 Laravel側envの簡易チェックエラー確認
            if (errors && errors.length > 0) {
                errors.forEach((e) => console.error("環境変数エラー:", e));
                toast.error(
                    "サーバー設定に問題があります。コンソールを確認して下さい。"
                );
                return;
            }

            // 2 upload_presetのクライアント側との一致チェック
            if (
                serverPreset !== import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
            ) {
                console.error(
                    `upload_preset不一致: サーバー=${serverPreset} / クライアント=${
                        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
                    }`
                );
                toast.error(
                    "upload_presetがクライアントとサーバーで異なります。"
                );
                return;
            }

            // 3 timestampのずれをチェック（5分以上は警告）
            const now = Math.floor(Date.now() / 1000);
            if (Math.abs(now - timestamp) > 300) {
                console.warn(
                    "timestampが現在時刻と5分以上ずれています。署名エラーの可能性あり。"
                );
                toast.warning("署名のtimestampがずれています。");
            }

            // 5 署名対象文字列の完全一致チェック
            const formParams = {
                timestamp,
                upload_preset: preset /* folderなしなら省く */,
            };
            const formBaseString = Object.keys(formParams)
                .sort()
                .map((k) => `${k}=${formParams[k]}`)
                .join("&");

            // ここまでクリアしたらアップロード実行
            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", api_key);
            formData.append("timestamp", timestamp);
            formData.append("signature", signature);
            // formData.append("folder", folder);
            formData.append(
                "upload_preset",
                import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
            );

            console.log([...formData.entries()]);

            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            const response = await axios.post(url, formData);
            const data = response.data;

            await axios.patch(
                `http://127.0.0.1:8000/api/user/${userId}/thumbnail`,
                { image: data.secure_url },
                { withCredentials: true }
            );

            setFile(null);
            setPreviewUrl(null);

            if (onUploaded) onUploaded();

            toast.success("画像を更新しました");
        } catch (error) {
            console.error(
                "Cloudinary upload error:",
                error.response?.data || error.message
            );
            toast.error("アップロードに失敗しました: " + error.message);
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
