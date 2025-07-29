export default function Pagination({ currentPage, lastPage, onPageChange }) {
    if (lastPage <= 1) return null;

    return (
        <nav
            aria-label="ページネーション"
            className="flex justify-center mt-6 space-x-2"
        >
            <button
                type="button"
                aria-label="前のページへ"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${
                    currentPage === 1
                        ? "text-gray-400 dark:text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-400 dark:text-white"
                }`}
            >
                前へ
            </button>

            {[...Array(lastPage)].map((_, i) => {
                const page = i + 1;
                return (
                    <button
                        type="button"
                        key={page}
                        aria-label={`${page}ページ目へ移動`}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded border ${
                            page === currentPage
                                ? "text-white bg-blue-500"
                                : "dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500"
                        }`}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                aria-label="次のページへ"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className={`px-3 py-1 rounded border ${
                    currentPage === lastPage
                        ? "text-gray-400 border-gray-300 cursor-not-allowed"
                        : "dark:text-white hover:bg-gray-400"
                }`}
            >
                次へ
            </button>
        </nav>
    );
}
