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
            className="fixed flex items-center justify-center inset-0 z-50"
        >
            <div
                className="fixed inset-0 bg-black/30 pointer-events-none z-40"
                aria-hidden="true"
            />
            <Dialog.Panel
                aria-labelledby="post-confirm-title"
                aria-describedby="post-confirm-description"
                className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 dark:border-2 rounded-lg shadow-lg z-50"
            >
                <Dialog.Title
                    id="post-confirm-title"
                    className="mb-3 text-center text-lg font-bold text-gray-900 dark:text-white"
                >
                    投稿確認
                </Dialog.Title>
                <Dialog.Description
                    id="post-confirm-description"
                    as="div"
                    className="mb-5 space-y-5 text-sm text-gray-700 dark:text-gray-300"
                >
                    <p className="text-center font-bold text-red-600">
                        ！以下の内容が論理的でない可能性があります！
                    </p>

                    <div className="p-2 bg-gray-100 dark:bg-gray-700 whitespace-pre-wrap rounded">
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

                    <p className="block mx-auto mt-3 px-3 py-1 text-center text-sm text-red-700 dark:text-red-500 bg-red-100 dark:bg-red-900/40 rounded">
                        このまま投稿をする場合、アカウントの論理レベルが下がる場合があります
                    </p>
                </Dialog.Description>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 font-semibold bg-gray-200 dark:bg-gray-400 hover:bg-gray-300 dark:hover:bg-gray-300 dark:border-2 rounded"
                    >
                        修正する
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-4 py-2 text-white bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-600 rounded"
                    >
                        投稿する
                    </button>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
}
