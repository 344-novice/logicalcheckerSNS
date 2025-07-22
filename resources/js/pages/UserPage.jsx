import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import { getUser, updateUserInfo } from "../api/userApi";
import { toast } from "sonner";

export default function UserPage({ userId, loginUserId }) {
    const [userData, setUserData] = useState([]);
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userData = await getUser(userId);

            if (userData.status !== 200) {
                setErrMsg("読み込みに失敗しました");
                return;
            }

            setUserData(userData.data);
        } catch (error) {
            setErrMsg("読み込みに失敗しました");
        }
    };

    const handleUpdateUserInfo = async (updateData) => {
        try {
            const resUpdateUserInfo = await updateUserInfo(userId, updateData);

            if (resUpdateUserInfo.status !== 200) {
                toast.error("更新に失敗しました");
                return;
            }
            toast.success("プロフィールを更新しました");
            fetchUserData();
        } catch (error) {
            toast.error("更新に失敗しました");
        }
    };

    return (
        <>
            <UserForm
                userData={userData}
                loginUserId={loginUserId}
                fetchUserAgain={fetchUserData}
                msg={errMsg}
                updateUserInfo={handleUpdateUserInfo}
            />
        </>
    );
}
