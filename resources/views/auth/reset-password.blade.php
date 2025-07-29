<x-guest-layout>
    <div class="flex justify-between items-end mb-4 text-gray-600 dark:text-gray-400">
        <p class="mb-1 font-bold">{{ __('パスワードのリセット') }}</p>
    </div>

    <form method="POST" action="{{ route('password.store') }}">
        @csrf

        <!-- Password Reset Token -->
        <input type="hidden" name="token" value="{{ $request->route('token') }}">

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('メールアドレス')" />
            <x-text-input id="email" type="email" name="email" :value="old('email', $request->email)" class="block mt-1 w-full" required autofocus autocomplete="username" />
            <x-input-error id="email-error" :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="__('パスワード')" />
            <x-text-input id="password" type="password" name="password" class="block mt-1 w-full" required autocomplete="new-password" />
            <x-input-error id="password-error" :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
            <x-input-label for="password_confirmation" :value="__('確認用パスワード')" />

            <x-text-input id="password_confirmation" type="password" name="password_confirmation" class="block mt-1 w-full" required autocomplete="new-password" />

            <x-input-error id="password-confirmation-error" :messages="$errors->get('password_confirmation')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <x-primary-button>
                {{ __('パスワードをリセットする') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout>
