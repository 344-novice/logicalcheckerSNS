import ReactDOM from "react-dom/client";
import UserPageName from "./pages/UserPageName";
import HomePage from "./pages/HomePage";
import TweetDetailPage from "./pages/TweetDetailPage";
import UserPage from "./pages/UserPage";

const homeRoot = document.getElementById("home-page");
if (homeRoot) {
    const loginUserId = homeRoot.dataset.loginUserId;
    ReactDOM.createRoot(homeRoot).render(
        <HomePage loginUserId={loginUserId} />
    );
}

const detailRoot = document.getElementById("tweet-detail-page");
if (detailRoot) {
    const loginUserId = detailRoot.dataset.loginUserId;
    ReactDOM.createRoot(detailRoot).render(
        <TweetDetailPage loginUserId={loginUserId} />
    );
}

const userRoot = document.getElementById("user-page");
if (userRoot) {
    const userId = userRoot.dataset.userId;
    const loginUserId = userRoot.dataset.loginUserId;
    ReactDOM.createRoot(userRoot).render(
        <UserPage id={userId} loginUserId={loginUserId} />
    );
}

const userPageNameRoot = document.getElementById("user-page-name");
if (userPageNameRoot) {
    ReactDOM.createRoot(userPageNameRoot).render(<UserPageName />);
}
