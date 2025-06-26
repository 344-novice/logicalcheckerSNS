import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import axios from "axios";
import PostForm from "../components/PostForm";
import TweetsForm from "../components/TweetsForm";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";

export default function HomePage({ loginUserId }) {
    const [tweets, setTweets] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [targetTweetId, setTargetTweetId] = useState(null);
    const [indexErrMsg, setIndexErrMsg] = useState("");

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
            const resPostTweet = await axios.post(
                "http://127.0.0.1:8000/api/tweet/post",
                { tweet },
                { withCredentials: true }
            );
            setTweets((prev) => [resPostTweet.data, ...prev]);
            toast.success("投稿完了しました");
            e.target.reset();
        } catch (err) {
            if (err.response?.status === 400) {
                toast.error("投稿に問題が発生しました");
            } else if (err.response?.status === 500) {
                toast.error("サーバーに問題が発生しました");
            } else {
                toast.error("予期せぬエラーが発生しました");
            }
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
            if (err.response?.status === 400) {
                toast.error("投稿に問題が発生しました");
            } else if (err.response?.status === 500) {
                toast.error("サーバーに問題が発生しました");
            } else {
                toast.error("予期せぬエラーが発生しました");
            }
        }
    };

    const openConfirmDialog = (tweetId) => {
        setTargetTweetId(tweetId);
        setIsOpen(true);
    };

    return (
        <>
            <Toaster position="top-center" />
            <PostForm postSubmit={postSubmit} />
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
