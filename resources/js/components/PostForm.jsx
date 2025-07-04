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
            <form onSubmit={logicCheck} className="flex items-end">
                <textarea
                    type="text"
                    name="tweet"
                    rows="7"
                    placeholder="グッドバイブなロジックを組み立てよう！"
                    value={str}
                    onChange={(e) => {
                        setStr(e.target.value);
                    }}
                    className="h-[180px] w-[800px] resize-none border-2 border-green-500"
                />
                <button
                    type="submit"
                    disabled={
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
            {warningMsg && (
                <p className="mt-2 whitespace-pre-line text-red-600 font-bold">
                    {warningMsg}
                </p>
            )}
        </div>
    );
}
