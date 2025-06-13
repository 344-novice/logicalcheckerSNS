export default function PostForm() {
    return (
        <div className="m-10">
            <form className="flex items-end">
                <textarea
                    className="w-[500px] resize-none"
                    rows="3"
                    type="text"
                    placeholder="グッドバイブなロジックを組み立てよう！"
                />
                <button className="ml-5 p-1 w-[50px] border" type="submit">
                    投稿
                </button>
            </form>
        </div>
    );
}
