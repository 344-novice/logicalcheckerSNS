import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import axios from "axios";
import PostForm from "../components/PostForm";
import TweetsForm from "../components/TweetsForm";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { MODERATION_CATEGORY_JA } from "../constants/moderationCategories";

export default function HomePage({ loginUserId }) {
    const [tweets, setTweets] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [targetTweetId, setTargetTweetId] = useState(null);
    const [indexErrMsg, setIndexErrMsg] = useState("");
    const [warningMsg, setWarningMsg] = useState("");

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

    const postSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const tweet = formData.get("tweet");

        try {
            // ToDo: 呼び出し中に二重送信ができないように投稿ボタンを無効化
            const logicalCheck = await axios.post(
                "http://127.0.0.1:8000/api/tweet/logic-check",
                { tweet }
            );

            if (logicalCheck.data.error) {
                toast.fail(logicalCheck.data.message);
            }

            // ToDo: flaggedだった場合、文章を修正するまで投稿ボタンを無効化
            if (logicalCheck.data.flagged) {
                const categoryKeys = logicalCheck.data.categories;
                const jaLabels = categoryKeys.map(
                    (key) => MODERATION_CATEGORY_JA[key] || key
                );
                const categoryStr = jaLabels.join("、");

                // ToDo: tailwindなどでもう少しこなれた感じに
                setWarningMsg(
                    `上記文章に以下の内容が含まれていることが検知されました。修正の上、再度投稿をお願いします。
                    ${categoryStr}
                    ※批判の意図で引いた文言が検知された場合は、文脈をよりご明記いただくと投稿可能性が上がります。
                    ※そのまま押し通すと管理人がOpenAIにBANされる可能性がありますので、何卒ご容赦ください。`
                );
                return;
            } else {
                setWarningMsg("");
            }

            // ToDo: moderation APIより時間がかかるので待機時間の画面表示
        } catch (err) {
            handleErrorToast(err.response?.status);
        }

        try {
            const resPostTweet = await axios.post(
                "http://127.0.0.1:8000/api/tweet/post",
                { tweet, logicalCheck: logicalCheck.data },
                { withCredentials: true }
            );
            setTweets((prev) => [resPostTweet.data, ...prev]);
            toast.success("投稿完了しました");
            e.target.reset();
        } catch (err) {
            handleErrorToast(err.response?.status);
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

    const openConfirmDialog = (tweetId) => {
        setTargetTweetId(tweetId);
        setIsOpen(true);
    };

    const handleErrorToast = (status) => {
        if (status === 400) return toast.error("投稿に問題が発生しました");
        if (status === 500) return toast.error("サーバーに問題が発生しました");
        return toast.error("予期せぬエラーが発生しました");
    };

    return (
        <>
            <Toaster position="top-center" />
            <PostForm
                postSubmit={postSubmit}
                warningMsg={warningMsg}
                logicalCheckComment={logicalCheck}
            />
            <TweetsForm
                tweets={tweets}
                loginUserId={loginUserId}
                deleteSubmit={openConfirmDialog}
                msg={indexErrMsg}
            />
            <DeleteConfirmDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={() => deleteSubmit(targetTweetId)}
            />
        </>
    );
}
