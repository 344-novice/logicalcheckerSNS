<x-guest-layout>
    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
        <p class="font-bold mb-1">{{ __('パスワードをお忘れの場合：') }}</p>
        <p>{{ __('下記フォームにメールアドレスを入力してください。') }}</p>
        <p>{{ __('パスワードリセット用のリンクをメールでお送りします。') }}</p>
    </div>

    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('password.email') }}">
        @csrf

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('メールアドレス：')" class="text-lg"/>
            <x-text-input id="email" class="block mt-2 w-full" type="email" name="email" :value="old('email')" required autofocus />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <x-primary-button>
                {{ __('メールを送信') }}
            </x-primary-button>
        </div>
    </form>

    <x-back-to-login-button />
</x-guest-layout>