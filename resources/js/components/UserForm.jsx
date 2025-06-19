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
                {/* ToDo: 画像登録機能 */}
                <p>画像がここにくる</p>
                <div className="text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {user.name}
                </div>
                <p>ロジカルだとマークがつく</p>
                <div className="flex justify-end">
                    {user.id === loginUserId ? (
                        <div>
                            <button type="submit">画像投稿</button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
