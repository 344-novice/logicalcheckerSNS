<x-guest-layout>
    <div id="register-explanation-modal" class="z-50 bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center">
        <div class="flex flex-col p-6 max-w-3xl min-w-[400px] min-h-[200px] bg-white rounded-lg shadow-lg">
            <h2 class="mb-4 text-xl font-semibold text-gray-800">アカウント登録について</h2>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
                <li>hogeやfooといったダミーデータの定番の名前は既に使われております。</li>
                <li>
                    本ページは複数の企業様に閲覧いただく想定です。
                    <p class="mt-2">　 アカウント名の登録において、お名前や社名等を入れる際はその点をご留意ください。</p>
                </li>
                <li>メールアドレスはダミーでもいいですが、@と.の入っていない場合は弾かれます。</li>
            </ul>
        <div class="mt-6 flex justify-between items-center">
            <label class="flex items-center space-x-2 -ml-1">
                <input type="checkbox" id="modal-optout-checkbox" class="form-checkbox border-2 rounded checked:bg-blue-500 checked:ring-0">
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

    <div class="flex justify-between items-end mb-4 text-gray-600 dark:text-gray-400">
        <p class="font-bold mb-1">{{ __('アカウント登録') }}</p>
    </div>

    <form method="POST" action="{{ route('register') }}" data-dialup="true">
        @csrf

        <!-- Name -->
        <div>
            <x-input-label for="name" :value="__('アカウント名')" />
            <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required autofocus autocomplete="name" />
            <x-input-error :messages="$errors->get('name')" class="mt-2" />
        </div>

        <!-- Email Address -->
        <div class="mt-4">
            <x-input-label for="email" :value="__('メールアドレス')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="__('パスワード')" />

            <x-text-input id="password" class="block mt-1 w-full"
                            type="password"
                            name="password"
                            required autocomplete="new-password" />

            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
            <x-input-label for="password_confirmation" :value="__('確認用パスワード（上記と同じ内容）')" />

            <x-text-input id="password_confirmation" class="block mt-1 w-full"
                            type="password"
                            name="password_confirmation" required autocomplete="new-password" />

            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <x-primary-button class="ms-4">
                {{ __('アカウント登録') }}
            </x-primary-button>
        </div>
    </form>

    <x-back-to-login-button />
    <script>
    window.registerPageData = {
        hasErrors: @json($errors->any())
    };
    </script>

    @push('scripts')
    @endpush
</x-guest-layout>