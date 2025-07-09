import UserImageUploader from "../pages/UserImageUploader";
import { DEFAULT_USER_IMAGE } from "../constants/index";

export default function UserForm({ user, loginUserId, fetchUserAgain, msg }) {
    if (msg === "読み込みに失敗しました") {
        return (
            <div className="m-5 p-4 text-xl font-bold text-red-700 dark:text-red-400 text-center leading-snug border border-red-700 rounded bg-red-100 dark:bg-red-900">
                {msg}
            </div>
        );
    }

    return (
        <div key={user.id} className="m-10 border rounded">
            <div className="m-5 flex">
                <img
                    src={user.image ? user.image : DEFAULT_USER_IMAGE}
                    alt="サムネ"
                    className="m-5 w-40 h-40 object-cover inline-block border-2 dark:border-gray-500 rounded"
                />
                <div className="m-5 text-xl text-gray-800 dark:text-gray-200 leading-normal">
                    ユーザー名：{user.name}
                    <br />
                    レベル：🟢
                </div>
            </div>
            <div className="ml-10 mb-10 flex">
                {Number(user.id) === Number(loginUserId) && (
                    <UserImageUploader
                        userId={user.id}
                        onUploaded={fetchUserAgain}
                    />
                )}
            </div>
        </div>
    );
}
