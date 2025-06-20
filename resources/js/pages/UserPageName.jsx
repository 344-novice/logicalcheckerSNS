import { useEffect, useState } from "react";

export default function UserPageName({ id, loginUserId }) {
    const [userPageName, setUserPageName] = useState("User");

    useEffect(() => {
        if (location.pathname === "/mypage" || id === loginUserId) {
            setUserPageName("MyPage");
        }
    }, []);

    return (
        <>
            <div>{userPageName}</div>
        </>
    );
}
