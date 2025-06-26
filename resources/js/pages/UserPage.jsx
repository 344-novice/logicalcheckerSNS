import { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "../components/UserForm";

export default function UserPage({ userId, loginUserId }) {
    const [resUser, setResUser] = useState([]);
    const [errMsg, setErrMsg] = useState("");

    const fetchUserData = async () => {
        try {
            const resUser = await axios.get(
                `http://127.0.0.1:8000/api/user/${userId}`,
                { withCredentials: true }
            );

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
