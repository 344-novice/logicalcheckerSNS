import ReactDOM from "react-dom/client";
import HomePage from "./pages/HomePage";
import TweetDetailPage from "./pages/TweetDetailPage";

const homeRoot = document.getElementById("home-page");
if (homeRoot) {
    ReactDOM.createRoot(homeRoot).render(<HomePage />);
}

const detailRoot = document.getElementById("tweet-detail-page");
if (detailRoot) {
    ReactDOM.createRoot(detailRoot).render(<TweetDetailPage />);
}
