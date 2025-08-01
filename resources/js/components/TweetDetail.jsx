import { toast } from "sonner";
import useLikeToggle from "../hooks/useLikeToggle";
import PreloadedImage from "./PreloadedImage";

export default function TweetDetail({
    tweetData,
    setTweetData,
    msg,
    loginUserId,
    openDeleteConfirmDialog,
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
        if (Number(tweetData.user_id) === Number(loginUserId)) {
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

        setTweetData({
            ...tweetData,
            liked_count: updated.liked_count,
            liked: updated.liked,
        });
    };

    return (
        <div
            role="article"
            aria-label={`ツイート by ${tweetData.user?.name}`}
            className="m-10 border rounded"
        >
            <div className="relative flex items-start m-5">
                <div className="flex flex-col flex-shrink-0 items-center">
                    <button
                        type="button"
                        aria-label={`${tweetData.user?.name}さんのプロフィールを見る`}
                        onClick={(e) => handleUserClick(e, tweetData.user_id)}
                        className="mb-2 w-40 h-40 object-cover border-2 dark:hover:border-4 border-gray-300 dark:border-gray-400 hover:border-blue-500 dark:hover:border-blue-500 cursor-pointer rounded"
                    >
                        <PreloadedImage
                            imageUrl={tweetData.user?.image}
                            alt={`${tweetData.user?.name}のプロフィール画像`}
                            className="w-full h-full object-cover rounded"
                        />
                    </button>
                    {tweetData.user?.is_logical_gold && (
                        <span
                            aria-label="論理性の優秀なユーザー"
                            role="img"
                            className="mt-3 text-center text-3xl"
                        >
                            🥇
                        </span>
                    )}
                </div>

                <div className="flex flex-col justify-start ml-10">
                    <button
                        type="button"
                        aria-label={`${tweetData.user?.name}さんのプロフィールを見る`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleUserClick(e, tweetData.user_id);
                        }}
                        className="inline-block self-start text-left text-xl font-bold dark:text-white hover:text-blue-500 dark:hover:text-blue-500 cursor-pointer"
                    >
                        {tweetData.user?.name}
                    </button>

                    <div
                        aria-label="ツイート本文"
                        className="mt-3 mr-10 text-xl text-gray-800 dark:text-gray-200 leading-tight break-words"
                    >
                        {tweetData.tweet}
                    </div>
                    {tweetData.logical_check?.is_logical ? (
                        <div
                            aria-label="論理的なツイートマーク"
                            role="img"
                            className="absolute right-0 top-0"
                        >
                            ✅
                        </div>
                    ) : null}
                </div>
            </div>
            <div className="flex justify-end space-x-2 m-5 mb-0">
                <form>
                    {Number(tweetData.user_id) === Number(loginUserId) ? (
                        <button
                            type="button"
                            aria-label="ツイートを削除"
                            onClick={(e) => {
                                e.stopPropagation();
                                openDeleteConfirmDialog(tweetData.id);
                            }}
                            className="px-2 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white rounded-full shadow-md"
                        >
                            削除
                        </button>
                    ) : null}
                </form>
            </div>
            <div className="m-5 text-sm text-right text-gray-500 dark:text-gray-200">
                <button
                    type="button"
                    aria-pressed={tweetData.liked}
                    aria-label={
                        tweetData.liked ? "いいねを取り消す" : "いいねを付ける"
                    }
                    onClick={() => handleLike(tweetData.id)}
                    className={`cursor-pointer select-none transition-colors duration-300 ease-in-out ${
                        tweetData.liked
                            ? "font-semibold text-pink-500 dark:text-pink-400"
                            : "text-gray-500 dark:text-white hover:text-pink-500 dark:hover:text-pink-400"
                    }`}
                >
                    いいね
                </button>
                <span className="mx-1" />
                {tweetData.liked_count}
                <span className="mx-2" />
                {formatDate(tweetData.created_at)}
            </div>
        </div>
    );
}
