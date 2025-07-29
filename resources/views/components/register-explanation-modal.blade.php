<div id="register-explanation-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" class="fixed flex inset-0 items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="flex flex-col p-6 max-w-3xl min-w-[400px] min-h-[200px] bg-white rounded-lg shadow-lg">
        <h2 id="modal-title" class="mb-4 text-xl font-semibold text-gray-800">アカウント登録について</h2>
        <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>hogeやfooといったダミーデータの定番の名前は既に使われております。</li>
            <li>
                本ページは複数の企業様に閲覧いただく想定です。
                <p class="mt-2">　 アカウント名の登録において、お名前や社名等を入れる際はその点をご留意ください。</p>
            </li>
            <li>メールアドレスはダミーでもいいですが、@と.の入っていない場合は弾かれます。</li>
            <li>パスワードリセット機能を利用する際には実際のメールアドレスを登録する必要があります。</li>
        </ul>
    <div class="flex justify-between items-center mt-6">
        <label for="modal-optout-checkbox" class="flex items-center -ml-1 space-x-2">
            <input id="modal-optout-checkbox" type="checkbox" class="form-checkbox checked:bg-blue-500 checked:ring-0 focus:ring-0 border-2 focus:outline-none rounded">
            <span class="text-sm text-gray-700">次回以降表示しない</span>
        </label>
        <button
            id="modal-close-button"
            class="font-semibold text-blue-500 hover:text-blue-700"
        >
            閉じる
        </button>
    </div>
    </div>
</div>