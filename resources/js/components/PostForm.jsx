import { useState } from "react";

export default function PostForm({ onSubmit, postErrMsg }) {
    const [str, setStr] = useState("");

    const isDisabled = str.trim() === "";

    return (
        <div className="m-10">
            <form onSubmit={onSubmit} className="flex items-end">
                <textarea
                    type="text"
                    name="tweet"
                    rows="3"
                    placeholder="グッドバイブなロジックを組み立てよう！"
                    onChange={(e) => setStr(e.target.value)}
                    className="w-[500px] resize-none"
                />
                <button
                    type="submit"
                    className={`ml-5 p-1 w-[80px] border rounded ${
                        isDisabled
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    投稿
                </button>
            </form>
            <div className="text-red-600">{postErrMsg}</div>
        </div>
    );
}
