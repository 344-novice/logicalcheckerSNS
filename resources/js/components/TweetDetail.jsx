export default function TweetDetail({ tweet, loginUserId, deleteSubmit, msg }) {
    if (msg === "読み込みに失敗しました") {
        return (
            <div className="m-5 p-4 text-xl font-bold text-red-700 dark:text-red-400 text-center leading-snug border border-red-700 rounded bg-red-100 dark:bg-red-900">
                {msg}
            </div>
        );
    }

    const handleUserClick = (e, userId) => {
        e.stopPropagation();
        window.location.href = `/user/${userId}`;
    };

    function formatDate(dateString) {
        return new Date(dateString).toLocaleString();
    }

    return (
        <div className="m-10 border rounded">
            <div className="m-5 flex items-start relative mb-5">
                <div
                    onClick={(e) => handleUserClick(e, tweet.user_id)}
                    className="flex-shrink-0 cursor-pointer"
                >
                    <img
                        src={tweet.user?.image}
                        alt="サムネ"
                        className="mr-5 w-40 h-40 object-cover"
                    />
                </div>
                <div className="ml-5 text-xl text-gray-800 dark:text-gray-200 leading-tight break-words">
                    {tweet.tweet}
                </div>
                <div className="absolute right-0 top-0">✅</div>
            </div>
            <div className="m-5 mb-0 flex justify-end space-x-2">
                <form>
                    {Number(tweet.user_id) === Number(loginUserId) ? (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteSubmit(tweet.id);
                            }}
                            className="mb-2 px-2 py-1 text-sm bg-red-100 text-red-700 rounded-full shadow-md hover:bg-red-600 hover:text-white transition"
                        >
                            削除
                        </button>
                    ) : null}
                </form>
            </div>
            <div className="m-5 text-gray-500 text-sm text-right">
                <span>⭐ 5　</span>
                {formatDate(tweet.created_at)}
            </div>
        </div>
    );
}
