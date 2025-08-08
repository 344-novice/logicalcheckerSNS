import { Dialog } from "@headlessui/react";

export default function DeleteConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    isDeleteSubmitting,
}) {
    const handleClick = async () => {
        if (isDeleteSubmitting) return;
        try {
            await onConfirm();
            onClose();
        } catch (error) {}
    };

    return (
        <Dialog
            open={isOpen}
            onClose={() => {
                if (!isDeleteSubmitting) {
                    onClose();
                }
            }}
            aria-modal="true"
            className="fixed inset-0 flex items-center justify-center z-50"
        >
            <div
                aria-hidden="true"
                className="fixed inset-0 bg-black/30 z-40"
            />
            <Dialog.Panel className="p-6 max-w-sm mx-auto text-center bg-white dark:bg-gray-800 dark:border-2 rounded-lg shadow-lg z-50">
                <Dialog.Title className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                    削除確認
                </Dialog.Title>
                <Dialog.Description
                    as="div"
                    className="mb-4 text-sm text-gray-700 dark:text-white"
                >
                    <p>このツイートを本当に削除しますか？</p>
                </Dialog.Description>
                <div className="flex justify-center space-x-3">
                    <button
                        onClick={onClose}
                        disabled={isDeleteSubmitting}
                        aria-label="キャンセルしてダイアログを閉じる"
                        className={`px-4 py-2 rounded ${
                            isDeleteSubmitting
                                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                                : "bg-gray-200 dark:bg-gray-500 hover:bg-gray-300 dark:hover:bg-gray-400"
                        }`}
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleClick}
                        disabled={isDeleteSubmitting}
                        aria-label="ツイートを削除する"
                        className={`px-4 py-2 text-white rounded ${
                            isDeleteSubmitting
                                ? "bg-red-400 cursor-not-allowed "
                                : "bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-500"
                        }`}
                    >
                        {isDeleteSubmitting ? "削除中..." : "削除する"}
                    </button>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
}
