import { useEffect, useState } from "react";

export default function UserPageName({ userId, loginUserId }) {
    const [userPageName, setUserPageName] = useState("ユーザー");

    useEffect(() => {
        if (
            location.pathname === "/mypage" ||
            Number(userId) === Number(loginUserId)
        ) {
            setUserPageName("マイページ");
        }
    }, []);

    return (
        <>
            <div>{userPageName}</div>
        </>
    );
}
