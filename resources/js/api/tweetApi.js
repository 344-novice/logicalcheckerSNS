import axios from "axios";

export const getTweets = async () => {
    const resTweets = await axios.get("http://127.0.0.1:8000/api/tweet/index");
    return resTweets;
};

export const getLogicalCheck = async (tweet) => {
    const resLogicalCheck = await axios.post(
        "http://127.0.0.1:8000/api/tweet/logic-check",
        { tweet },
        { withCredentials: true }
    );
    return resLogicalCheck;
};

export const postTweet = async (tweet, logicalCheck) => {
    const resPostTweet = await axios.post(
        "http://127.0.0.1:8000/api/tweet/post",
        { tweet, logicalCheck },
        { withCredentials: true }
    );
    return resPostTweet;
};

export const deleteTweet = async (tweetId) => {
    const resDeleteTweet = await axios.post(
        "http://127.0.0.1:8000/api/tweet/delete",
        { tweetId },
        { withCredentials: true }
    );
    return resDeleteTweet;
};

export const getTweetDetail = async (tweetId) => {
    const resTweetDetail = await axios.get(
        `http://127.0.0.1:8000/api/tweet/detail/${tweetId}`,
        { withCredentials: true }
    );
    return resTweetDetail;
};

export const changeLikedCount = async (tweetId) => {
    try {
        const resChangeLikedCount = await axios.post(
            `http://127.0.0.1:8000/api/tweet/liked-count/${tweetId}`
        );
        return resChangeLikedCount.data;
    } catch (error) {
        return null;
    }
};
