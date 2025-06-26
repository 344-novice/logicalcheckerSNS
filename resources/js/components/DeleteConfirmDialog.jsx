import { Dialog } from "@headlessui/react";

export default function DeleteConfirmDialog({ isOpen, onClose, onConfirm }) {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="fixed z-50 inset-0 flex items-center justify-center"
        >
            <div
                className="fixed inset-0 bg-black/30 pointer-events-none"
                aria-hidden="true"
            />
            <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-auto shadow-lg z-50">
                <Dialog.Title className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                    削除確認
                </Dialog.Title>
                <Dialog.Description className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    このツイートを本当に削除しますか？
                </Dialog.Description>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                        削除する
                    </button>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
}
