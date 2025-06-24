import UserImageUploader from "../pages/UserImageUploader";

export default function UserForm({ user, loginUserId, msg }) {
    if (msg === "読み込みに失敗しました") {
        return (
            <div className="m-5 p-2 text-l text-red-600 dark:text-gray-200 leading-tight">
                {msg}
            </div>
        );
    }

    return (
        <div key={user.id}>
            <div className="m-5 p-2 border">
                <img src={user.image} alt="サムネ" />
                <div className="text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {user.name}
                </div>
                <p>ロジカルだとマークがつく</p>
                <div className="flex justify-end">
                    {/* ToDo: この表記に他も揃える */}
                    {Number(user.id) === Number(loginUserId) && (
                        <UserImageUploader id={user.id} />
                    )}
                </div>
            </div>
        </div>
    );
}
