import { useEffect, useState } from "react";

export default function UserPageName({ userId, loginUserId }) {
    const [userPageName, setUserPageName] = useState("User");

    useEffect(() => {
        if (
            location.pathname === "/mypage" ||
            Number(userId) === Number(loginUserId)
        ) {
            setUserPageName("MyPage");
        }
    }, []);

    return (
        <>
            <div>{userPageName}</div>
        </>
    );
}
