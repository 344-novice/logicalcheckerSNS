import { DEFAULT_USER_IMAGE } from "../constants/index";

export default function TweetsForm({
    tweets,
    loginUserId,
    openDeleteConfirmDialog,
    msg,
}) {
    if (msg === "読み込みに失敗しました") {
        return (
            <div className="m-5 p-4 text-center text-xl font-bold text-red-700 dark:text-red-200 leading-snug bg-red-100 dark:bg-red-700 border-2 border-red-700 dark:border-red-500 rounded ">
                {msg}
            </div>
        );
    }

    const handleUserClick = (e, userId) => {
        e.stopPropagation();
        window.location.href = `/user/${userId}`;
    };

    const handleTweetClick = (tweetId) => {
        window.location.href = `/tweet-detail/${tweetId}`;
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
                                src={
                                    tweet.user?.image
                                        ? tweet.user?.image
                                        : DEFAULT_USER_IMAGE
                                }
                                alt="サムネ"
                                className="mb-2 w-20 h-20 cursor-pointer object-cover border-2 border-gray-300 dark:border-gray-400 hover:border-blue-500 dark:hover:border-blue-500 rounded"
                            />
                            <div className="mt-2 dark:text-white hover:text-blue-500 dark:hover:text-blue-500 cursor-pointer text-center">
                                <p>{tweet.user?.name}</p>
                            </div>
                        </div>
                        <div
                            onClick={() => handleTweetClick(tweet.id)}
                            className="font-normal mx-5 text-lg text-gray-800 dark:text-gray-200 leading-tight break-words hover:text-blue-500 cursor-pointer"
                        >
                            {tweet.tweet}
                        </div>
                        {tweet.is_logical ? (
                            <div className="absolute right-0 top-0">✅</div>
                        ) : null}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <form>
                            {Number(tweet.user_id) === Number(loginUserId) ? (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openDeleteConfirmDialog(tweet.id);
                                    }}
                                    // ToDo: hoverがうまくいっていない
                                    className="mb-2 px-2 py-1 text-sm bg-red-200 dark:bg-white text-red-700 dark:text-red-600 rounded-full shadow-md hover:bg-red-600 hover:text-white dark:transition"
                                >
                                    削除
                                </button>
                            ) : null}
                        </form>
                    </div>
                    <div className="text-sm text-right text-gray-500 dark:text-gray-200">
                        <span>⭐ 5　</span>
                        {formatDate(tweet.created_at)}
                    </div>
                </div>
            ))}
        </div>
    );
}
