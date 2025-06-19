import { useEffect, useState } from "react";

export default function UserPageName() {
    const [userPageName, setUserPageName] = useState("User");

    useEffect(() => {
        // ToDo: loginUserIdとパス名が一致したときも分岐に追加
        if (location.pathname === "/mypage") {
            setUserPageName("MyPage");
        }
    }, []);

    return (
        <>
            <div>{userPageName}</div>
        </>
    );
}
