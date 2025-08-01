import { Dialog } from "@headlessui/react";

export default function openLogicalCheckerManualDialog({ isOpen, onClose }) {
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
                className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 dark:border-2 rounded-lg shadow-lg z-50"
            >
                <Dialog.Title
                    id="post-confirm-title"
                    className="mb-3 text-center text-lg font-bold text-gray-900 dark:text-white"
                >
                    論理チェッカーを利用するにあたって
                </Dialog.Title>
                <Dialog.Description
                    id="post-confirm-description"
                    as="div"
                    className="mb-5 space-y-5 text-left text-gray-700 dark:text-gray-300"
                >
                    <ul className="space-y-3 list-disc list-inside">
                        <li>
                            本SNSでは、以下の2種類の文章チェックを行なっています
                            <br />
                            <span className="font-bold">
                                {"　 "}
                                ①「差別的、攻撃的、過激に性的」などの文言チェック
                            </span>
                            <br />
                            <span className="font-bold">
                                {"　 "}
                                ②「文章全体が論理的であるか」の論理チェック
                            </span>
                        </li>
                        <li>
                            50文字未満の場合は①のみを行い、50文字以上の場合は①のあとに②を行います
                        </li>
                        <li>
                            ①でNGが出た場合は、文言を修正するまで投稿することができません
                            <br />
                            {"　 "}
                            ①のNG数が多い場合、アカウントが凍結・削除される可能性があります
                            <br />
                            {"　 "}
                            <span className="font-bold italic">
                                Tips:
                                批判対象を引用する場合は、引用である旨をはっきり示すことでNGを回避しやすいです
                            </span>
                        </li>
                        <li>
                            ②の段階でNGが出た場合、理由と改善方針を確認することができます
                            <br />
                            {"　 "}
                            この場合はそのまま投稿することも可能ですが、ロジカルツイートマーク（✅）はつきません
                            <br />
                            {"　 "}
                            なお、ロジカルツイートとみなされたツイートの割合が多いほど、ユーザーランクが上がります
                        </li>
                        <li>
                            <span className="font-bold">
                                批判的な文章ほどチェックの基準は上がります
                            </span>
                            <br />
                            {"　 "}
                            対立する立場での議論は歓迎しますが、論理の飛躍や過度な一般化など不当な論拠に基づいて
                            <br />
                            {"　 "}
                            非難していないか、本サービスをきっかけに考えていただければ幸いです
                        </li>
                    </ul>
                </Dialog.Description>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => {
                            onClose();
                        }}
                        className="px-4 py-2 text-white bg-gray-700 dark:bg-blue-700 hover:bg-gray-500 dark:hover:bg-blue-600 rounded"
                    >
                        閉じる
                    </button>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
}
