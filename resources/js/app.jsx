import ReactDOM from "react-dom/client";
import SessionTimeout from "./components/SessionTimeout";
import UserPageName from "./pages/UserPageName";
import HomePage from "./pages/HomePage";
import TweetDetailPage from "./pages/TweetDetailPage";
import UserPage from "./pages/UserPage";
import { createRoot } from "react-dom/client";
import DarkModeToggle from "./components/DarkmodeSwitch";

const reactRoot = document.getElementById("react-root");
if (reactRoot) {
    ReactDOM.createRoot(reactRoot).render(<SessionTimeout />);
}

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
        <UserPage userId={userId} loginUserId={loginUserId} />
    );
}

const userPageNameRoot = document.getElementById("user-page-name");
if (userPageNameRoot) {
    const userId = userPageNameRoot.dataset.userId;
    const loginUserId = userPageNameRoot.dataset.loginUserId;
    ReactDOM.createRoot(userPageNameRoot).render(
        <UserPageName userId={userId} loginUserId={loginUserId} />
    );
}

const container = document.getElementById("darkmode-switch");
if (container) {
    const root = createRoot(container);
    root.render(<DarkModeToggle />);
}
