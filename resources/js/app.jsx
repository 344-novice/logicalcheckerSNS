import ReactDOM from "react-dom/client";
import UserPageName from "./pages/UserPageName";
import HomePage from "./pages/HomePage";
import TweetDetailPage from "./pages/TweetDetailPage";
import UserPage from "./pages/UserPage";

const homeRoot = document.getElementById("home-page");
if (homeRoot) {
    ReactDOM.createRoot(homeRoot).render(<HomePage />);
}

const detailRoot = document.getElementById("tweet-detail-page");
if (detailRoot) {
    ReactDOM.createRoot(detailRoot).render(<TweetDetailPage />);
}

const userRoot = document.getElementById("user-page");
if (userRoot) {
    const userId = userRoot.dataset.userId;
    ReactDOM.createRoot(userRoot).render(<UserPage userId={userId} />);
}

const userPageNameRoot = document.getElementById("user-page-name");
if (userPageNameRoot) {
    ReactDOM.createRoot(userPageNameRoot).render(<UserPageName />);
}
