import React from "react";
import ReactDOM from "react-dom/client";
import PostForm from "./components/PostForm";

const postForm = document.getElementById("post-form");

if (postForm) {
    ReactDOM.createRoot(postForm).render(<PostForm />);
}
