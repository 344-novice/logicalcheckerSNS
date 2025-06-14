import React from "react";
import ReactDOM from "react-dom/client";
import PostForm from "./components/PostForm";
import TweetsForm from "./components/TweetsForm";
import axios from "axios";

const postForm = document.getElementById("post-form");
const tweetsForm = document.getElementById("tweets-form");

if (postForm) {
    ReactDOM.createRoot(postForm).render(
        <PostForm
            onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const tweet = formData.get("tweet");

                try {
                    await axios.post(
                        "/api/tweet/post",
                        { tweet },
                        { withCredentials: true }
                    );
                    alert("投稿完了！");
                } catch (err) {
                    console.error("投稿失敗:", err);
                }
            }}
        />
    );
}

if (tweetsForm) {
    ReactDOM.createRoot(tweetsForm).render(<TweetsForm />);
}
