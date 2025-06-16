export default function TweetsForm({ tweets, msg }) {
    if (msg === "読み込みに失敗しました") {
        return (
            <div className="m-5 p-2 text-l text-red-600 dark:text-gray-200 leading-tight">
                {msg}
            </div>
        );
    }
    return (
        <div>
            {tweets.map((tweet) => (
                <div
                    key={tweet.id}
                    className="m-5 p-2 border text-xl text-gray-800 dark:text-gray-200 leading-tight"
                >
                    {tweet.tweet}
                </div>
            ))}
        </div>
    );
}
