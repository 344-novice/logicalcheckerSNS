export default function TweetsForm({ tweets, loginUserId, deleteSubmit, msg }) {
    if (msg === "読み込みに失敗しました") {
        return (
            <div className="m-5 p-2 text-l text-red-600 dark:text-gray-200 leading-tight">
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
                <div
                    key={tweet.id}
                    onClick={() => handleTweetClick(tweet.id)}
                    className="m-5 p-2 border cursor-pointer"
                >
                    <div onClick={(e) => handleUserClick(e, tweet.user_id)}>
                        <img src={tweet.user?.image} alt="サムネ" />
                    </div>
                    <div className="text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        {tweet.tweet}
                    </div>
                    <p>ロジカルだとマークがつく</p>
                    <div className="flex justify-end">
                        <form
                            onSubmit={(e) => {
                                deleteSubmit(tweet.id);
                            }}
                        >
                            {Number(tweet.user_id) === Number(loginUserId) ? (
                                <div>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteSubmit(tweet.id);
                                        }}
                                    >
                                        削除
                                    </button>
                                    <span>⭐</span>
                                </div>
                            ) : (
                                <span>⭐</span>
                            )}
                        </form>
                        {formatDate(tweet.created_at)}
                    </div>
                </div>
            ))}
        </div>
    );
}
