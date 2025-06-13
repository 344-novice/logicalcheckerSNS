import React, { useEffect, useState } from "react";
import axios from "axios";

// 一旦index機能を出してみる
export default function TweetsForm() {
    const [tweets, setTweets] = useState([]);

    const url = "http://127.0.0.1:8000/api/tweet/index";

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(url);
                console.log("API成功レスポンス", res.data);
                setTweets(res.data);
            } catch (e) {
                console.error("APIエラー", e);
            }
        })();
    }, []);

    return (
        <div>
            <div></div>
            {tweets.map((tweet) => (
                <div
                    key={tweet.id}
                    className="m-5 p-2 border text-xl text-gray-800 dark:text-gray-200 leading-tight"
                >
                    {tweet.tweet}
                </div>
            ))}
        </div>
    );
}
