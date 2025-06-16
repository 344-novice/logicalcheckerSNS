import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import PostForm from "./components/PostForm";
import TweetsForm from "./components/TweetsForm";

const postForm = document.getElementById("post-form");
const tweetsForm = document.getElementById("tweets-form");

// ToDo: ステータスコードをTweetController.phpから受け取ってエラー分岐
export default function App() {
    const [tweets, setTweets] = useState([]);
    const [indexErrMsg, setIndexErrMsg] = useState("");
    const [postErrMsg, setPostErrMsg] = useState("");

    useEffect(() => {
        const fetchTweets = async () => {
            const res = await axios.get(
                "http://127.0.0.1:8000/api/tweet/index"
            );
            setTweets(res.data);
            if (res.status !== 200) {
                setIndexErrMsg("読み込みに失敗しました");
            }
        };
        fetchTweets();
    }, []);

    const onSubmit = async (e) => {
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

    return (
        <>
            <PostForm onSubmit={onSubmit} msg={postErrMsg} />
            <TweetsForm tweets={tweets} msg={indexErrMsg} />
        </>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
