export default function TweetDetail({ tweet, msg, loginUserId, deleteSubmit }) {
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
        <div className="m-5 p-2 border">
            <div className="text-xl text-gray-800 dark:text-gray-200 leading-tight">
                <div className="m-5 p-2 border" key={tweet.id}>
                    <img
                        src={tweet?.user?.image && tweet.user.image}
                        alt="サムネ"
                    />
                    <div className="text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        {tweet.tweet}
                    </div>
                    <p>ロジカルだとマークがつく</p>
                    <div className="flex justify-end">
                        <span>⭐</span>
                        {formatDate(tweet.created_at)}
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <form onSubmit={deleteSubmit}>
                    {tweet.user_id === loginUserId ? (
                        <button type="submit">削除</button>
                    ) : null}
                </form>
            </div>
        </div>
    );
}
