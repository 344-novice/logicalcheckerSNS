import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";

export default function UserPage({ userId }) {
    const [res, setRes] = useState([]);
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://127.0.0.1:8000/api/user/${userId}`,
                    { withCredentials: true }
                );

                if (res.status !== 200) {
                    setErrMsg("読み込みに失敗しました");
                    return;
                }

                setRes(res.data);
            } catch (error) {
                setErrMsg("読み込みに失敗しました");
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <UserForm user={res} msg={errMsg} />
        </>
    );
}
