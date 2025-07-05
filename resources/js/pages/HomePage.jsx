import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import axios from "axios";
import PostForm from "../components/PostForm";
import TweetsForm from "../components/TweetsForm";
import PostConfirmDialog from "@/components/PostConfirmDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { MODERATION_CATEGORY_JA } from "../constants/moderationCategories";

export default function HomePage({ loginUserId }) {
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
        logicalCheckData: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resTweets = await axios.get(
                    "http://127.0.0.1:8000/api/tweet/index"
                );

                if (resTweets.status !== 200) {
                    setIndexErrMsg("読み込みに失敗しました");
                    return;
                }

                setTweets(resTweets.data);
            } catch (error) {
                setIndexErrMsg("読み込みに失敗しました");
            }
        };

        fetchData();
    }, []);

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

        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const logicalCheckResponse = await axios.post(
                "http://127.0.0.1:8000/api/tweet/logic-check",
                { tweet },
                { withCredentials: true }
            );

            setWarningMsg("");
            setIsSubmitting(false);

            const logicalCheckData = logicalCheckResponse.data;

            if (logicalCheckData.error) {
                toast.fail(logicalCheck.message);
                setIsSubmitting(false);
                return;
            }

            if (logicalCheckData.flagged) {
                const categoryKeys = logicalCheckData.categories;
                const jaLabels = categoryKeys.map(
                    (key) => MODERATION_CATEGORY_JA[key] || key
                );
                const categoryStr = jaLabels.join("、");

                setWarningMsg(`
                    上記文章に以下の内容が含まれていることが検知されました。修正の上、再度投稿をお願いします。
                    ${categoryStr}
                    ※批判の意図で引いた文言が検知された場合は、文脈をよりご明記いただくと投稿可能性が上がります。
                    ※そのまま押し通すと管理人がOpenAIにBANされる可能性がありますので、何卒ご容赦ください。`);
                setIsBlockedByFlagged(true);
                setIsSubmitting(false);
                return;
            }

            if (tweet.length < 50 && logicalCheckData.flagged === false) {
                await postTweet(tweet, logicalCheckData);
                return;
            }

            if (!logicalCheckData.logic_result.is_logical) {
                openPostConfirmDialog(
                    tweet,
                    logicalCheckData.logic_result.reason,
                    logicalCheckData.logic_result.hints,
                    logicalCheckData
                );
                setIsSubmitting(false);
                return;
            }

            await postTweet(tweet, logicalCheckData);
        } catch (err) {
            handleErrorToast(err.response?.status);
            setIsSubmitting(false);
        }
    };

    const postTweet = async (tweet, logicalCheckData) => {
        try {
            const resPostTweet = await axios.post(
                "http://127.0.0.1:8000/api/tweet/post",
                { tweet, logicalCheck: logicalCheckData },
                { withCredentials: true }
            );
            setTweets((prev) => [resPostTweet.data, ...prev]);
            toast.success("投稿完了しました");
            setStr("");
        } catch (err) {
            handleErrorToast(err.response?.status);
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteSubmit = async (tweetId) => {
        try {
            const resDeleteTweet = await axios.post(
                "http://127.0.0.1:8000/api/tweet/delete",
                { tweetId },
                { withCredentials: true }
            );
            setTweets(resDeleteTweet.data);
            toast.success("削除が完了しました");
        } catch (err) {
            handleErrorToast(err.response?.status);
        }
    };

    const openPostConfirmDialog = (tweet, reason, hints, logicalCheckData) => {
        setPostConfirmData({
            tweet,
            reason,
            hints,
            logicalCheckData,
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center">
                        <svg
                            className="animate-spin h-8 w-8 text-blue-500 mb-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
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
                msg={indexErrMsg}
            />
            <PostConfirmDialog
                isOpen={isPostConfirmOpen}
                onClose={() => setIsPostConfirmOpen(false)}
                onConfirm={() =>
                    postTweet(
                        postConfirmData.tweet,
                        postConfirmData.logicalCheckData
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
