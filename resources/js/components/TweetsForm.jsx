export default function TweetsForm({ tweets, loginUserId, deleteSubmit, msg }) {
    if (msg === "読み込みに失敗しました") {
        return (
            <div className="m-5 p-4 text-xl font-bold text-red-700 dark:text-red-400 text-center leading-snug border border-red-700 rounded bg-red-100 dark:bg-red-900">
                {msg}
            </div>
        );
    }

    const handleTweetClick = (tweetId) => {
        window.location.href = `/tweet-detail/${tweetId}`;
    };

    const handleUserClick = (e, userId) => {
        e.stopPropagation();
        window.location.href = `/user/${userId}`;
    };

    function formatDate(dateString) {
        return new Date(dateString).toLocaleString();
    }

    return (
        <div>
            {tweets.map((tweet) => (
                <div key={tweet.id} className="my-5 p-5 border rounded">
                    <div className="flex items-start relative mb-3">
                        <div
                            onClick={(e) => handleUserClick(e, tweet.user_id)}
                            className="flex-shrink-0"
                        >
                            <img
                                src={tweet.user?.image}
                                alt="サムネ"
                                className="mb-2 w-30 h-30 cursor-pointer object-cover"
                            />
                            <div className="hover:text-blue-500 cursor-pointer text-center">
                                <p>{tweet.user.name}</p>
                            </div>
                        </div>
                        <div
                            onClick={() => handleTweetClick(tweet.id)}
                            className="font-normal mx-5 text-lg text-gray-800 dark:text-gray-200 leading-tight break-words hover:text-blue-500 cursor-pointer"
                        >
                            {tweet.tweet}
                        </div>
                        <div className="absolute right-0 top-0">✅</div>
                    </div>
                    <div className="flex justify-end space-x-2">
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
                    <div className="text-gray-500 text-sm text-right">
                        <span>⭐ 5　</span>
                        {formatDate(tweet.created_at)}
                    </div>
                </div>
            ))}
        </div>
    );
}
