import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import axios from "axios";
import TweetDetail from "../components/TweetDetail";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";

export default function TweetDetailPage({ loginUserId }) {
    const [tweet, setTweet] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [targetTweetId, setTargetTweetId] = useState(null);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        const pathParts = window.location.pathname.split("/");
        const id = pathParts[pathParts.length - 1];

        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://127.0.0.1:8000/api/tweet/detail/${id}`,
                    { withCredentials: true }
                );

                if (res.status !== 200) {
                    setMsg("読み込みに失敗しました");
                    return;
                }

                setTweet(res.data);
            } catch (error) {
                setMsg("読み込みに失敗しました");
            }
        };
        fetchData();
    }, []);

    const deleteSubmit = async (tweetId) => {
        try {
            const resDeleteTweet = await axios.post(
                "http://127.0.0.1:8000/api/tweet/delete",
                { tweetId },
                { withCredentials: true }
            );
            window.location.href = "/home";
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
            <TweetDetail
                tweet={tweet}
                loginUserId={loginUserId}
                deleteSubmit={openConfirmDialog}
                msg={msg}
            />
            <DeleteConfirmDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={() => deleteSubmit(targetTweetId)}
            />
        </>
    );
}
