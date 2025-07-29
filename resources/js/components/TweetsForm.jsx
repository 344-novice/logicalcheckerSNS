import { toast } from "sonner";
import useLikeToggle from "../hooks/useLikeToggle";
import PaginationButton from "./PaginationButton";
import PreloadedImage from "./PreloadedImage";

export default function TweetsForm({
    tweets,
    setTweets,
    loginUserId,
    openDeleteConfirmDialog,
    msg,
    currentPage,
    setCurrentPage,
    lastPage,
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

    const { changeLikedCount } = useLikeToggle();

    const handleLike = async (tweetId) => {
        const updated = await changeLikedCount(tweetId);
        if (!updated) {
            toast.error("いいねの変更に失敗しました");
            return;
        }

        const updatedTweets = tweets.map((tweet) =>
            tweet.id === tweetId
                ? {
                      ...tweet,
                      liked_count: updated.liked_count,
                      liked: updated.liked,
                  }
                : tweet
        );

        setTweets(updatedTweets);
    };

    return (
        <div>
            <h2 id="tweets-heading" className="sr-only">
                ツイート一覧
            </h2>
            {tweets.map((tweet) => (
                <article
                    key={tweet.id}
                    aria-label={`ツイート by ${tweet.user?.name}`}
                    className="my-5 p-5 border rounded"
                >
                    <div className="relative flex items-start mb-3">
                        <button
                            aria-label={`${tweet.user?.name}さんのプロフィールを見る`}
                            onClick={(e) => handleUserClick(e, tweet.user.id)}
                            className="flex flex-col flex-shrink-0 items-center cursor-pointer"
                        >
                            <PreloadedImage
                                imageUrl={tweet.user?.image}
                                alt={`${tweet.user?.name}さんのサムネイル画像`}
                                className="w-20 h-20 cursor-pointer object-cover border-2 border-gray-300 dark:border-gray-400 hover:border-blue-500 dark:hover:border-blue-500 rounded"
                            />
                            {tweet.user?.is_logical_gold && (
                                <span
                                    aria-label="論理性の優秀なユーザー"
                                    className="mt-3 text-center text-lg"
                                >
                                    🥇
                                </span>
                            )}
                        </button>

                        <div className="flex flex-col justify-start ml-4">
                            <button
                                aria-label={`${tweet.user?.name}さんのプロフィールを見る`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleUserClick(e, tweet.user.id);
                                }}
                                className="font-semibold text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-50 cursor-pointer"
                            >
                                {tweet.user?.name}
                            </button>

                            <button
                                aria-label="ツイート内容を詳しく見る"
                                onClick={() => handleTweetClick(tweet.id)}
                                className="mt-3 mr-5 font-normal text-lg text-gray-800 hover:text-blue-500 dark:text-gray-200  dark:hover:text-blue-500 leading-tight break-words cursor-pointer"
                            >
                                {tweet.tweet}
                            </button>
                        </div>

                        {tweet.is_logical ? (
                            <div
                                aria-label="論理的なツイートマーク"
                                className="absolute right-0 top-0 mr-5"
                            >
                                ✅
                            </div>
                        ) : null}
                    </div>

                    <div className="flex justify-end mr-5">
                        <form>
                            {Number(tweet.user.id) === Number(loginUserId) ? (
                                <button
                                    type="button"
                                    aria-label={`ツイートID ${tweet.id} を削除`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openDeleteConfirmDialog(tweet.id);
                                    }}
                                    className="mb-2 px-2 py-1 text-sm text-red-700 dark:text-red-600 hover:text-white dark:hover:text-white bg-red-200 dark:bg-white hover:bg-red-600 dark:hover:bg-red-600 rounded-full shadow-md"
                                >
                                    削除
                                </button>
                            ) : null}
                        </form>
                    </div>

                    <div className="mr-5 text-sm text-right text-gray-500 dark:text-gray-200">
                        <span
                            aria-label={`${
                                tweet.liked ? "いいね済み" : "いいね"
                            } (${tweet.liked_count}件)`}
                            aria-pressed={tweet.liked}
                            onClick={() => handleLike(tweet.id)}
                            className={`cursor-pointer select-none transition-colors duration-300 ease-in-out ${
                                tweet.liked
                                    ? "font-semibold text-pink-500 dark:text-pink-400"
                                    : "font-normal text-gray-500 dark:text-white hover:text-pink-500 dark:hover:text-pink-400"
                            }`}
                        >
                            いいね
                        </span>
                        <span aria-hidden="true" className="mx-1" />
                        <span aria-live="polite">{tweet.liked_count}</span>
                        <span
                            aria-label={`投稿時間: ${formatDate(
                                tweet.created_at
                            )}`}
                            aria-hidden="true"
                            className="mx-2"
                        />
                        {formatDate(tweet.created_at)}
                    </div>
                </article>
            ))}
            <div>
                <PaginationButton
                    currentPage={currentPage}
                    lastPage={lastPage}
                    onPageChange={(page) => {
                        if (page >= 1 && page <= lastPage) {
                            setCurrentPage(page);
                        }
                    }}
                />
            </div>
        </div>
    );
}
