import { useState } from "react";
import UserImageUploader from "../pages/UserImageUploader";
import PreloadedImage from "./PreloadedImage";

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
        <div
            role="region"
            aria-labelledby="user-profile-heading"
            className="m-10 border rounded"
        >
            <h2 id="user-profile-heading" className="sr-only">
                ユーザープロフィール
            </h2>
            <div className="flex m-5">
                <div className="flex flex-col flex-shrink-0 items-center cursor-pointer">
                    <PreloadedImage
                        imageUrl={userData.image}
                        className="mx-5 mt-5 w-40 h-40 object-cover inline-block border-2 dark:border-gray-500 rounded"
                    />
                    <span
                        aria-hidden={!userData.is_logical_gold}
                        aria-label="論理性の優秀なユーザー"
                        style={{ opacity: userData.is_logical_gold ? 1 : 0 }}
                        className="my-3 text-center text-3xl"
                    >
                        🥇
                    </span>
                    <div>
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
                                <label
                                    htmlFor="username"
                                    className="whitespace-nowrap"
                                >
                                    ユーザー名：
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    value={editName}
                                    onChange={(e) =>
                                        setEditName(e.target.value)
                                    }
                                    maxLength={30}
                                    className="ml-2 px-2 py-1 pr-16 w-full border dark:border-2 rounded-sm"
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
                                <label
                                    htmlFor="profile"
                                    className="whitespace-nowrap"
                                >
                                    自己紹介文：
                                </label>
                                <textarea
                                    id="profile"
                                    value={editProfile}
                                    rows={7}
                                    onChange={(e) =>
                                        setEditProfile(e.target.value)
                                    }
                                    maxLength={500}
                                    placeholder="500文字以内で入力"
                                    className="px-2py-1  pr-24 ml-2 w-full border dark:border-2 rounded-sm resize-none"
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
                        <>
                            <>
                                <div className="inline-block p-3 w-full max-w-full border-2 break-words whitespace-normal rounded-sm">
                                    <span>ユーザー名：</span>
                                    {userData.name}
                                </div>

                                <div className="p-3 mt-3 w-full max-w-full border-2 break-words whitespace-normal rounded-sm">
                                    自己紹介文：{userData.profile}
                                </div>
                            </>

                            <div className="flex justify-end mt-5">
                                {isMyPage && (
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 focus:outline-none rounded"
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
