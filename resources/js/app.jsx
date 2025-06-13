import React from "react";
import ReactDOM from "react-dom/client";
import PostForm from "./components/PostForm";
import TweetsForm from "./components/TweetsForm";

const postForm = document.getElementById("post-form");
const tweetsForm = document.getElementById("tweets-form");

if (postForm) {
    ReactDOM.createRoot(postForm).render(<PostForm />);
}

if (tweetsForm) {
    ReactDOM.createRoot(tweetsForm).render(<TweetsForm />);
}
