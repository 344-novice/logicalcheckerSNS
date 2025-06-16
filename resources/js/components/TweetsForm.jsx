export default function TweetsForm({ tweets, msg }) {
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
                <>
                    <div className="m-5 p-2 border" key={tweet.id}>
                        <div className="text-xl text-gray-800 dark:text-gray-200 leading-tight">
                            {tweet.tweet}
                        </div>
                        <div className="flex justify-end">
                            ⭐ {formatDate(tweet.created_at)}
                            <button type="submit" value={"削除"}>
                                削除
                            </button>
                        </div>
                    </div>
                </>
            ))}
        </div>
    );
}
