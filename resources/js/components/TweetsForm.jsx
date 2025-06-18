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
                <a href={`/tweet-detail/${tweet.id}`} key={tweet.id}>
                    <div className="m-5 p-2 border">
                        <p>画像がここにくる</p>
                        <div className="text-xl text-gray-800 dark:text-gray-200 leading-tight">
                            {tweet.tweet}
                        </div>
                        <p>ロジカルだとマークがつく</p>
                        <div className="flex justify-end">
                            <form onSubmit={deleteSubmit}>
                                {tweet.user_id === loginUserId ? (
                                    <div>
                                        <button type="submit">削除</button>
                                        <span>⭐</span>
                                    </div>
                                ) : (
                                    <span>⭐</span>
                                )}
                            </form>
                            {formatDate(tweet.created_at)}
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}
