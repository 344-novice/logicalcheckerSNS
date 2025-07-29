export default function PostForm({
    logicCheck,
    warningMsg,
    isSubmitting,
    isBlockedByFlagged,
    str,
    setStr,
}) {
    return (
        <div className="mb-10">
            <form
                aria-labelledby="tweet-form-heading"
                onSubmit={logicCheck}
                className="flex items-end"
            >
                <div className="relative flex flex-col justify-end mx-auto w-full max-w-[800px]">
                    <label htmlFor="tweet-input" className="sr-only">
                        投稿フォーム
                    </label>
                    <textarea
                        id="tweet-textarea"
                        name="tweet"
                        rows="7"
                        value={str}
                        onChange={(e) => setStr(e.target.value)}
                        placeholder="グッドバイブなロジックを組み立てよう！"
                        className="p-2 pr-24 h-[180px] w-full resize-none border-2 dark:border-4 border-green-500 dark:border-gray-400"
                    />
                    <div
                        className={`absolute bottom-3 right-3 text-sm ${
                            str.length > 500
                                ? "text-red-500"
                                : str.length >= 491
                                ? "text-yellow-500"
                                : "text-gray-500"
                        }`}
                    >
                        {str.length}/500字
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={
                        isSubmitting || isBlockedByFlagged || str.trim() === ""
                    }
                    aria-disabled={
                        isSubmitting || isBlockedByFlagged || str.trim() === ""
                    }
                    className={`ml-5 p-1 w-[80px] border rounded ${
                        isSubmitting || isBlockedByFlagged || str.trim() === ""
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    投稿
                </button>
            </form>
            <div className="mt-4 pr-20 mx-auto">
                <div
                    className="w-full"
                    role="alert"
                    aria-live="assertive"
                    id="logic-warning"
                >
                    {warningMsg}
                </div>
            </div>
        </div>
    );
}
