export default function PostForm({ onSubmit }) {
    return (
        <div className="m-10">
            <form onSubmit={onSubmit} className="flex items-end">
                <textarea
                    name="tweet"
                    rows="3"
                    type="text"
                    placeholder="グッドバイブなロジックを組み立てよう！"
                    className="w-[500px] resize-none"
                />
                <button type="submit" className="ml-5 p-1 w-[50px] border">
                    投稿
                </button>
            </form>
        </div>
    );
}
