export default function Pagination({ currentPage, lastPage, onPageChange }) {
    if (lastPage <= 1) return null;

    return (
        <nav className="flex justify-center space-x-2 mt-6">
            <button
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
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded border ${
                            page === currentPage
                                ? "bg-blue-500 text-white"
                                : "hover:bg-gray-400 dark:hover:bg-gray-500 dark:text-white"
                        }`}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className={`px-3 py-1 rounded border ${
                    currentPage === lastPage
                        ? "text-gray-400 border-gray-300 cursor-not-allowed"
                        : "hover:bg-gray-400 dark:text-white"
                }`}
            >
                次へ
            </button>
        </nav>
    );
}
