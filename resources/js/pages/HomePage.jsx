import { useEffect, useState } from "react";
import PostForm from "../components/PostForm";
import TweetsForm from "../components/TweetsForm";

export default function HomePage({ id }) {
    const [tweets, setTweets] = useState([]);
    const [loginUserId, setLoginUserId] = useState(0);
    const [userImage, setUserImage] = useState("");
    const [indexErrMsg, setIndexErrMsg] = useState("");
    const [postErrMsg, setPostErrMsg] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resUser = await axios.get(
                    `http://127.0.0.1:8000/api/user/${id}`
                );

                if (resUser.status !== 200) {
                    setIndexErrMsg("読み込みに失敗しました");
                    return;
                }

                setLoginUserId(resUser.id);

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
            const res = await axios.post(
                "http://127.0.0.1:8000/api/tweet/post",
                { tweet },
                { withCredentials: true }
            );
            setTweets((prev) => [res.data, ...prev]);
            e.target.reset();
        } catch (err) {
            if (err.response?.status === 400) {
                setPostErrMsg("投稿に問題が発生しました");
            } else if (err.response?.status === 500) {
                setPostErrMsg("サーバーに問題が発生しました");
            } else {
                setPostErrMsg("予期せぬエラーが発生しました");
            }
        }
    };

    const deleteSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const tweetId = formData.get("tweet_id");

        const result = window.confirm("ツイートを削除しますか？");
        if (result) {
            try {
                const res = await axios.post(
                    "http://127.0.0.1:8000/api/tweet/delete",
                    { tweetId },
                    { withCredentials: true }
                );
                setTweets(res.data);
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
            <PostForm postSubmit={postSubmit} msg={postErrMsg} />
            <TweetsForm
                tweets={tweets}
                loginUserId={loginUserId}
                deleteSubmit={deleteSubmit}
                msg={indexErrMsg}
            />
        </>
    );
}
