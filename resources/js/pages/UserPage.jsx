import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import { getUser } from "../api/userApi";

export default function UserPage({ userId, loginUserId }) {
    const [resUser, setResUser] = useState([]);
    const [errMsg, setErrMsg] = useState("");

    const fetchUserData = async () => {
        try {
            const resUser = await getUser(userId);

            if (resUser.status !== 200) {
                setErrMsg("読み込みに失敗しました");
                return;
            }

            setResUser(resUser.data);
        } catch (error) {
            setErrMsg("読み込みに失敗しました");
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        fetchUserData();
    }, [resUser?.image]);

    return (
        <>
            <UserForm
                user={resUser}
                loginUserId={loginUserId}
                fetchUserAgain={fetchUserData}
                msg={errMsg}
            />
        </>
    );
}
