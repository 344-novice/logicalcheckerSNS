import { useState } from "react";
import UserImageUploader from "../pages/UserImageUploader";
import { DEFAULT_USER_IMAGE } from "../constants/index";

export default function UserForm({
    userData,
    loginUserId,
    fetchUserAgain,
    msg,
    updateUserInfo,
}) {
    const isMyPage = Number(userData.id) === Number(loginUserId);
    const [editMode, setEditMode] = useState(false);
    const [editName, setEditName] = useState(userData.name || "");
    const [editProfile, setEditProfile] = useState(userData.profile || "");

    if (msg === "読み込みに失敗しました") {
        return (
            <div className="m-5 p-4 text-xl font-bold text-red-700 dark:text-red-400 text-center leading-snug border border-red-700 rounded bg-red-100 dark:bg-red-900">
                {msg}
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateData = {
            name: editName,
            profile: editProfile,
        };
        await updateUserInfo(updateData);
        setEditMode(false);
    };

    return (
        <div key={userData.id} className="m-10 border rounded">
            <div className="m-5 flex">
                <div className="flex flex-col items-center">
                    <img
                        src={userData.image || DEFAULT_USER_IMAGE}
                        alt="サムネ"
                        className="m-5 w-40 h-40 object-cover inline-block border-2 dark:border-gray-500 rounded"
                    />
                    <div className="mb-10 flex">
                        {isMyPage && (
                            <UserImageUploader
                                userId={userData.id}
                                onUploaded={fetchUserAgain}
                            />
                        )}
                    </div>
                </div>
                <div className="m-5 flex-1 min-w-0 text-xl text-gray-800 dark:text-gray-200 leading-normal">
                    {editMode ? (
                        <form onSubmit={handleSubmit}>
                            <div className="relative flex items-center">
                                <label className="whitespace-nowrap">
                                    ユーザー名：
                                </label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) =>
                                        setEditName(e.target.value)
                                    }
                                    maxLength={30}
                                    className="ml-2 pr-16 px-2 py-1 w-full border dark:border-2 rounded-sm"
                                />
                                <div
                                    className={`absolute bottom-2 right-3 text-sm select-none pointer-events-none ${
                                        editName.length >= 30
                                            ? "text-red-500"
                                            : editName.length >= 26
                                            ? "text-yellow-500"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {editName.length}/30字
                                </div>
                            </div>

                            <div className="relative flex items-center mt-5">
                                <label className="whitespace-nowrap">
                                    自己紹介文：
                                </label>
                                <textarea
                                    value={editProfile}
                                    rows={7}
                                    onChange={(e) =>
                                        setEditProfile(e.target.value)
                                    }
                                    maxLength={500}
                                    placeholder="500文字以内で入力"
                                    className="px-2 pr-24 py-1 ml-2 w-full border dark:border-2 rounded-sm resize-none"
                                />
                                <div
                                    className={`absolute bottom-2 right-3 text-sm select-none pointer-events-none ${
                                        editProfile.length >= 500
                                            ? "text-red-500"
                                            : editProfile.length >= 491
                                            ? "text-yellow-500"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {editProfile.length}/500字
                                </div>
                            </div>
                            <div className="flex justify-end mt-5">
                                <button
                                    type="submit"
                                    className={`mr-2 px-3 py-1 rounded text-white ${
                                        !editName || !editName.trim()
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-blue-500"
                                    }`}
                                    disabled={!editName || !editName.trim()}
                                >
                                    保存
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditName(userData.name || "");
                                        setEditProfile(userData.profile || "");
                                        setEditMode(false);
                                    }}
                                    className="px-3 py-1 bg-gray-400 text-white rounded"
                                >
                                    キャンセル
                                </button>
                            </div>
                        </form>
                    ) : (
                        // ToDo: ランクづけなど項目が増えていったらデザイン再検討
                        <>
                            <>
                                <div className="inline-block p-3 border-2 w-full max-w-full break-words whitespace-normal rounded-sm">
                                    <span>ユーザー名：</span>
                                    {userData.name}
                                </div>

                                <div className="p-3 mt-3 border-2 w-full max-w-full break-words whitespace-normal rounded-sm">
                                    自己紹介文：{userData.profile}
                                </div>
                            </>

                            <div className="flex justify-end mt-5">
                                {isMyPage && (
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none"
                                    >
                                        編集
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
