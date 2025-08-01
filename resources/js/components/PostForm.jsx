export default function PostForm({
    openLogicalCheckerManualDialog,
    str,
    setStr,
    isSubmitting,
    isBlockedByFlagged,
    warningMsg,
    logicCheck,
}) {
    return (
        <div className="-mt-5 mb-10">
            <div
                id="logical-checker-manual-dialog"
                name="logical-checker-manual"
                className="text-center"
            >
                <button
                    type="button"
                    aria-label="論理チェッカーについてのマニュアル"
                    onClick={(e) => {
                        e.stopPropagation();
                        openLogicalCheckerManualDialog();
                    }}
                    className="mb-3 font-bold text-red-500 dark:text-red-600 hover:text-pink-400 dark:hover:text-gray-300"
                >
                    ！初めて本サービスを使う際にはこちらをお読みください！
                </button>
            </div>
            <form
                aria-labelledby="tweet-form-heading"
                onSubmit={logicCheck}
                className="w-full max-w-[800px] mx-auto"
            >
                <div className="relative flex flex-col justify-end w-full">
                    <label htmlFor="tweet-input" className="sr-only">
                        投稿フォーム
                    </label>
                    <textarea
                        id="tweet-textarea"
                        name="tweet"
                        rows={7}
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

                <div className="mt-3 flex justify-end items-start">
                    <div className="mt-4 flex-1">
                        <div
                            className="w-full"
                            role="alert"
                            aria-live="assertive"
                            id="logic-warning"
                        >
                            {warningMsg}
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={
                            isSubmitting ||
                            isBlockedByFlagged ||
                            str.trim() === ""
                        }
                        aria-disabled={
                            isSubmitting ||
                            isBlockedByFlagged ||
                            str.trim() === ""
                        }
                        className={`self-start mt-2 p-1 w-[80px] h-[36px] border-2 rounded ${
                            isSubmitting ||
                            isBlockedByFlagged ||
                            str.trim() === ""
                                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-500"
                        }`}
                    >
                        投稿
                    </button>
                </div>
            </form>
        </div>
    );
}
