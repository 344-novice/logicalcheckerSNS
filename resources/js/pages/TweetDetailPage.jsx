import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import TweetDetail from "../components/TweetDetail";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { deleteTweet, getTweetDetail } from "../api/tweetApi";

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
                const resTweetDetail = await getTweetDetail(id);
                if (resTweetDetail.status !== 200) {
                    setMsg("読み込みに失敗しました");
                    return;
                }

                setTweet(resTweetDetail.data);
            } catch (error) {
                setMsg("読み込みに失敗しました");
            }
        };
        fetchData();
    }, []);

    const deleteSubmit = async (tweetId) => {
        try {
            await deleteTweet(tweetId);
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

    const openDeleteConfirmDialog = (tweetId) => {
        setTargetTweetId(tweetId);
        setIsOpen(true);
    };

    return (
        <>
            <Toaster position="top-center" />
            <TweetDetail
                tweet={tweet}
                setTweet={setTweet}
                loginUserId={loginUserId}
                openDeleteConfirmDialog={openDeleteConfirmDialog}
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
