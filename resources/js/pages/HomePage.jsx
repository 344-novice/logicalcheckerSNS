import { useCallback, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import PostForm from "../components/PostForm";
import TweetsForm from "../components/TweetsForm";
import PostConfirmDialog from "@/components/PostConfirmDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import {
    deleteTweet,
    getLogicalCheck,
    getTweets,
    postTweet,
} from "../api/tweetApi";
import { MODERATION_CATEGORY_JA } from "../constants/moderationCategories";

export default function HomePage({ loginUserId }) {
    // ToDo: tweets→tweetsData
    const [tweets, setTweets] = useState([]);
    const [isPostConfirmOpen, setIsPostConfirmOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [targetTweetId, setTargetTweetId] = useState(null);
    const [indexErrMsg, setIndexErrMsg] = useState("");
    const [warningMsg, setWarningMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBlockedByFlagged, setIsBlockedByFlagged] = useState(false);
    const [str, setStr] = useState("");
    const [postConfirmData, setPostConfirmData] = useState({
        tweet: "",
        reason: "",
        hints: [],
        logicalCheck: null,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchData = useCallback(
        async (page) => {
            try {
                const resTweets = await getTweets(page);
                if (resTweets.status !== 200) {
                    setIndexErrMsg("読み込みに失敗しました");
                    return;
                }
                setTweets(resTweets.data.data);
                setLastPage(resTweets.data.meta.last_page);
            } catch (error) {
                setIndexErrMsg("読み込みに失敗しました");
            }
        },
        [setTweets, setLastPage, setIndexErrMsg]
    );

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, fetchData]);

    useEffect(() => {
        const homePageElement = document.getElementById("home-page");
        if (homePageElement) {
            const tweetLoadErrorMessage = homePageElement.dataset.errorMessage;
            if (tweetLoadErrorMessage) {
                toast.error(tweetLoadErrorMessage);
            }
        }
    }, []);

    const logicCheck = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const tweet = formData.get("tweet");

        if (!tweet) {
            toast.error("投稿内容が空です");
            return;
        }

        if (tweet.length > 500) {
            toast.error("投稿文章は500文字以内です");
            return;
        }

        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const resLogicalCheck = await getLogicalCheck(tweet);

            setWarningMsg("");
            setIsSubmitting(false);

            const logicalCheck = resLogicalCheck.data;

            if (logicalCheck.error) {
                toast.fail(logicalCheck.message);
                setIsSubmitting(false);
                return;
            }

            if (logicalCheck.flagged) {
                const categoryKeys = logicalCheck.categories;
                const jaLabels = categoryKeys.map(
                    (key) => MODERATION_CATEGORY_JA[key] || key
                );
                const categoryStr = jaLabels.join("、");

                setWarningMsg(
                    <div className="text-center text-red-600 dark:text-orange-500">
                        <p>
                            上記文章に以下の内容が含まれていることが検知されました。修正の上、再度投稿をお願いします。
                        </p>
                        <div>{categoryStr}</div>
                        <p>
                            ※そのまま押し通すと管理人がOpenAIにBANされる可能性がありますので、何卒ご容赦ください。
                        </p>
                    </div>
                );
                setIsBlockedByFlagged(true);
                setIsSubmitting(false);
                return;
            }

            if (tweet.length < 50 && logicalCheck.flagged === false) {
                await postSubmit(tweet, logicalCheck);
                return;
            }

            if (!logicalCheck.logic_result.is_logical) {
                openPostConfirmDialog(
                    tweet,
                    logicalCheck.logic_result.reason,
                    logicalCheck.logic_result.hints,
                    logicalCheck
                );
                setIsSubmitting(false);
                return;
            }

            await postSubmit(tweet, logicalCheck);
        } catch (err) {
            handleErrorToast(err.response?.status);
            setIsSubmitting(false);
        }
    };

    const postSubmit = async (tweet, logicalCheck) => {
        try {
            await postTweet(tweet, logicalCheck);
            toast.success("投稿完了しました");
            setStr("");
            fetchData(currentPage);
        } catch (err) {
            handleErrorToast(err.response?.status);
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteSubmit = async (tweetId) => {
        try {
            await deleteTweet(tweetId);
            toast.success("削除が完了しました");

            const resTweets = await getTweets(currentPage);

            if (currentPage > resTweets.data.meta.last_page) {
                setCurrentPage(resTweets.data.meta.last_page);
            } else {
                setTweets(resTweets.data.data);
                setLastPage(resTweets.data.meta.last_page);
            }
        } catch (err) {
            handleErrorToast(err.response?.status);
        }
    };

    const openPostConfirmDialog = (tweet, reason, hints, logicalCheck) => {
        setPostConfirmData({
            tweet,
            reason,
            hints,
            logicalCheck,
        });
        setIsPostConfirmOpen(true);
    };

    const openDeleteConfirmDialog = (tweetId) => {
        setTargetTweetId(tweetId);
        setIsDeleteConfirmOpen(true);
    };

    const handleErrorToast = (status) => {
        if (status === 400) return toast.error("投稿に問題が発生しました");
        if (status === 500) return toast.error("サーバーに問題が発生しました");
        return toast.error("予期せぬエラーが発生しました");
    };

    useEffect(() => {
        if (isBlockedByFlagged && str.trim() !== "") {
            setIsBlockedByFlagged(false);
        }
    }, [str]);

    return (
        <>
            {isSubmitting && (
                <div className="fixed flex items-center justify-center inset-0 bg-black/30 z-50">
                    <div className="flex flex-col p-6 items-center bg-white dark:bg-gray-800 rounded-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="animate-spin mb-4 h-8 w-8 text-blue-500"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                className="opacity-25"
                            ></circle>
                            <path
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                                className="opacity-75"
                            ></path>
                        </svg>
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            論理チェッカーを起動中です…
                        </p>
                    </div>
                </div>
            )}

            <Toaster position="top-center" />
            <PostForm
                logicCheck={logicCheck}
                warningMsg={warningMsg}
                isSubmitting={isSubmitting}
                isBlockedByFlagged={isBlockedByFlagged}
                str={str}
                setStr={setStr}
                openPostConfirmDialog={openPostConfirmDialog}
            />
            <TweetsForm
                tweets={tweets}
                loginUserId={loginUserId}
                openDeleteConfirmDialog={openDeleteConfirmDialog}
                setTweets={setTweets}
                msg={indexErrMsg}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                lastPage={lastPage}
            />
            <PostConfirmDialog
                isOpen={isPostConfirmOpen}
                onClose={() => setIsPostConfirmOpen(false)}
                onConfirm={() =>
                    postSubmit(
                        postConfirmData.tweet,
                        postConfirmData.logicalCheck
                    )
                }
                tweet={postConfirmData.tweet}
                reason={postConfirmData.reason}
                hints={postConfirmData.hints}
            />
            <DeleteConfirmDialog
                isOpen={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                onConfirm={() => deleteSubmit(targetTweetId)}
            />
        </>
    );
}
