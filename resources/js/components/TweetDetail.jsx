import { toast } from "sonner";
import useLikeToggle from "../hooks/useLikeToggle";
import PreloadedImage from "./PreloadedImage";

export default function TweetDetail({
    tweet,
    setTweet,
    loginUserId,
    openDeleteConfirmDialog,
    msg,
}) {
    if (msg === "読み込みに失敗しました") {
        return (
            <div className="m-5 p-4 text-xl font-bold text-red-700 dark:text-red-200 text-center leading-snug border border-red-700 rounded bg-red-100 dark:bg-red-900">
                {msg}
            </div>
        );
    }

    const handleUserClick = (e, userId) => {
        e.stopPropagation();
        if (Number(tweet.user_id) === Number(loginUserId)) {
            window.location.href = "/mypage";
        } else {
            window.location.href = `/user/${userId}`;
        }
    };

    function formatDate(dateString) {
        return new Date(dateString).toLocaleString();
    }

    const { changeLikedCount } = useLikeToggle();

    const handleLike = async (tweetId) => {
        const updated = await changeLikedCount(tweetId);
        if (!updated) {
            toast.error("いいねの変更に失敗しました");
            return;
        }

        setTweet({
            ...tweet,
            liked_count: updated.liked_count,
            liked: updated.liked,
        });

        setTweets(updatedTweets);
    };

    return (
        <div className="m-10 border rounded">
            <div className="flex items-start relative m-5">
                <div
                    onClick={(e) => handleUserClick(e, tweet.user_id)}
                    className="flex flex-col flex-shrink-0 items-center cursor-pointer"
                >
                    <PreloadedImage
                        imageUrl={tweet.user?.image}
                        className="mb-2 w-40 h-40 cursor-pointer object-cover border-2 border-gray-300 dark:border-gray-400 hover:border-blue-500 dark:hover:border-4 dark:hover:border-blue-500 rounded"
                    />
                    {tweet.user?.is_logical_gold && (
                        <span className="mt-3 text-center text-3xl">🥇</span>
                    )}
                </div>
                <div className="flex flex-col justify-start ml-10">
                    <p
                        onClick={(e) => {
                            e.stopPropagation();
                            handleUserClick(e, tweet.user_id);
                        }}
                        className="text-xl font-bold dark:text-white hover:text-blue-500 dark:hover:text-blue-500 cursor-pointer"
                    >
                        {tweet.user?.name}
                    </p>

                    <div
                        onClick={() => handleTweetClick(tweet.id)}
                        className="mt-3 mr-10 text-xl text-gray-800 dark:text-gray-200 leading-tight break-words"
                    >
                        {tweet.tweet}
                    </div>
                    {tweet.is_logical ? (
                        <div className="absolute right-0 top-0">✅</div>
                    ) : null}
                </div>
            </div>
            <div className="m-5 mb-0 flex justify-end space-x-2">
                <form>
                    {Number(tweet.user_id) === Number(loginUserId) ? (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                openDeleteConfirmDialog(tweet.id);
                            }}
                            className="px-2 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white rounded-full shadow-md"
                        >
                            削除
                        </button>
                    ) : null}
                </form>
            </div>
            <div className="m-5 text-sm text-right text-gray-500 dark:text-gray-200">
                <span
                    onClick={() => handleLike(tweet.id)}
                    className={`cursor-pointer select-none transition-colors duration-300 ease-in-out ${
                        tweet.liked
                            ? "text-pink-500 dark:text-pink-400 font-semibold"
                            : "text-gray-500 dark:text-white hover:text-pink-500 dark:hover:text-pink-400"
                    }`}
                >
                    いいね
                </span>
                <span className="mx-1" />
                {tweet.liked_count}
                <span className="mx-2" />
                {formatDate(tweet.created_at)}
            </div>
        </div>
    );
}
