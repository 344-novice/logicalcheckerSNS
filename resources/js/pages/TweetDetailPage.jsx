import { useEffect, useState } from "react";
import TweetDetail from "../components/TweetDetail";

export default function TweetDetailPage() {
    const [tweet, setTweet] = useState([]);
    const [msg, setMsg] = useState("");
    const [loginUserId, setLoginUserId] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resUser = await axios.get(
                    "http://127.0.0.1:8000/api/user/id"
                );

                if (resUser.status !== 200) {
                    setIndexErrMsg("読み込みに失敗しました");
                    return;
                }

                setLoginUserId(resUser.data);

                const res = await axios.get(
                    "http://127.0.0.1:8000/api/tweet/detail"
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

    const deleteSubmit = async (e) => {
        e.preventDefault();
        const tweetId = 42;

        const result = window.confirm("ツイートを削除しますか？");
        if (result) {
            try {
                const res = await axios.post(
                    "http://127.0.0.1:8000/api/tweet/delete",
                    { tweetId },
                    { withCredentials: true }
                );
                window.location.href = "/dashboard";
            } catch (err) {
                if (err.response?.status === 400) {
                    alert("投稿に問題が発生しました");
                } else if (err.response?.status === 500) {
                    alert("サーバーに問題が発生しました");
                } else {
                    alert("予期せぬエラーが発生しました");
                }
            }
        }
    };

    return (
        <>
            <TweetDetail
                tweet={tweet}
                msg={msg}
                loginUserId={loginUserId}
                deleteSubmit={deleteSubmit}
            />
        </>
    );
}
