export default function TweetsForm({ tweets, loginUserId, deleteSubmit, msg }) {
    if (msg === "読み込みに失敗しました") {
        return (
            <div className="m-5 p-2 text-l text-red-600 dark:text-gray-200 leading-tight">
                {msg}
            </div>
        );
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleString();
    }

    return (
        <div>
            {tweets.map((tweet) => (
                <div className="m-5 p-2 border" key={tweet.id}>
                    <div className="text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        {tweet.tweet}
                    </div>
                    <div className="flex justify-end">
                        <form onSubmit={deleteSubmit}>
                            <input
                                type="hidden"
                                name="tweet_id"
                                value={tweet.id}
                            />
                            {tweet.user_id === loginUserId ? (
                                <button type="submit">削除</button>
                            ) : (
                                <span className>⭐</span>
                            )}
                        </form>
                        {formatDate(tweet.created_at)}
                    </div>
                </div>
            ))}
        </div>
    );
}
