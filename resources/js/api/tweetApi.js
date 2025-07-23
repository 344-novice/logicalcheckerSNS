import api from "./api";

export const getTweets = async (page = 1) => {
    return await api.get(`/api/tweet/index?page=${page}`);
};

export const getLogicalCheck = async (tweet) => {
    return await api.post("/api/tweet/logic-check", { tweet });
};

export const postTweet = async (tweet, logicalCheck) => {
    return await api.post("/api/tweet/post", { tweet, logicalCheck });
};

export const deleteTweet = async (tweetId) => {
    return await api.post("/api/tweet/delete", { tweetId });
};

export const getTweetDetail = async (tweetId) => {
    return await api.get(`/api/tweet/detail/${tweetId}`);
};

export const changeLikedCount = async (tweetId) => {
    try {
        const res = await api.post(`/api/tweet/liked-count/${tweetId}`);
        return res.data;
    } catch (error) {
        return null;
    }
};
