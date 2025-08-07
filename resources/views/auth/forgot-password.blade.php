<x-guest-layout>
    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
        <p class="mb-1 font-bold">{{ __('パスワードをお忘れの場合') }}</p>
        <p>{{ __('アカウント名とメールアドレスを入力してください。') }}</p>
        <p>{{ __('パスワードリセット用のリンクをメールでお送りします。') }}</p>
    </div>

    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form id="reset-form" method="POST" action="{{ route('password.email') }}" novalidate>
        @csrf

        <!-- Name -->
        <div class="mb-4">
            <x-input-label for="name" :value="__('アカウント名：')" class="text-lg" />
            <x-text-input id="name" type="text" name="name" :value="old('name')" class="block mt-2 w-full" required />
            <x-input-error id="name-error" :messages="$errors->get('password-reset')" class="mt-2" />
        </div>

        <!-- Email -->
        <div class="mb-4">
            <x-input-label for="email" :value="__('メールアドレス：')" class="text-lg" />
            <x-text-input id="email" type="email" name="email" :value="old('email')" class="block mt-2 w-full" required />
            <x-input-error id="email-error" :messages="$errors->get('password-reset')" class="mt-2" />
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
            const backToLoginButton = document.getElementById('back-to-login-button');

            form.addEventListener('submit', function () {
                loginButton.disabled = true;
                loginButton.innerText = '送信中…';
                loginButton.classList.add('font-bold', 'bg-white', 'text-black', 'border', 'breeze-loading');

                backToLoginButton.disabled = true;
                backToLoginButton.classList.add('bg-white', 'text-gray', 'pointer-events-none');
            });
        });
    </script>

    <x-back-to-login-button />
</x-guest-layout>