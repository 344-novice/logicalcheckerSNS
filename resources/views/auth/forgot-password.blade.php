<x-guest-layout>
    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
        <p class="font-bold mb-1">{{ __('パスワードをお忘れの場合：') }}</p>
        <p>{{ __('アカウント名とメールアドレスを入力してください。') }}</p>
        <p>{{ __('パスワードリセット用のリンクをメールでお送りします。') }}</p>
    </div>

    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form id="reset-form" method="POST" action="{{ route('password.email') }}">
        @csrf

        <!-- Name -->
        <div class="mb-4">
            <x-input-label for="name" :value="__('アカウント名：')" class="text-lg" />
            <x-text-input id="name" class="block mt-2 w-full" type="text" name="name" :value="old('name')" required />
            <x-input-error :messages="$errors->get('password-reset')" class="mt-2" />
        </div>

        <!-- Email -->
        <div class="mb-4">
            <x-input-label for="email" :value="__('メールアドレス：')" class="text-lg" />
            <x-text-input id="email" class="block mt-2 w-full" type="email" name="email" :value="old('email')" required />
            <x-input-error :messages="$errors->get('password-reset')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <x-primary-button id="login-button" >
                {{ __('メールを送信') }}
            </x-primary-button>
        </div>
    </form>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const form = document.getElementById('reset-form');
            const loginButton = document.getElementById('login-button');

            if (form && loginButton) {
                form.addEventListener('submit', function () {
                    loginButton.disabled = true;
                    loginButton.innerText = '送信中…';
                    loginButton.classList.add('font-bold', 'bg-white', 'text-black', 'border', 'breeze-loading');
                });
            }
        });
    </script>

    <x-back-to-login-button />
</x-guest-layout>