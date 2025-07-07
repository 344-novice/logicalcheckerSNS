import { Dialog } from "@headlessui/react";

export default function PostConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    tweet,
    reason,
    hints,
}) {
    function formatReason(text) {
        if (!text) return null;
        const sentences = text.split("。").filter(Boolean);
        return sentences.map((sentence, i) => <p key={i}>{sentence}。</p>);
    }

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="fixed z-50 inset-0 flex items-center justify-center"
        >
            <div
                className="fixed inset-0 bg-black/30 pointer-events-none z-40"
                aria-hidden="true"
            />
            <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto shadow-lg z-50">
                <Dialog.Title className="text-lg font-bold mb-3 text-gray-900 dark:text-white text-center">
                    投稿確認
                </Dialog.Title>
                <Dialog.Description
                    as="div"
                    className="text-sm text-gray-700 dark:text-gray-300 mb-5 space-y-5"
                >
                    <p className="font-bold text-red-600 text-center">
                        ！以下の内容が論理的でない可能性があります！
                    </p>

                    <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded whitespace-pre-wrap">
                        {tweet}
                    </div>

                    {reason && (
                        <div>
                            <strong>理由：</strong>
                            {formatReason(reason)}
                        </div>
                    )}

                    {hints && hints.length > 0 && (
                        <div>
                            <strong>ヒント：</strong>
                            <ul className="list-disc list-inside">
                                {hints.map((hint, i) => (
                                    <li key={i}>{hint}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Dialog.Description>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                        修正する
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                        投稿する
                    </button>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
}
