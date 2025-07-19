<x-guest-layout>
    <div class="flex justify-between items-end mb-4 text-gray-600 dark:text-gray-400">
        <p class="font-bold mb-1">{{ __('アカウント登録') }}</p>
    </div>

    <form id="register-form" method="POST" action="{{ route('register') }}" data-dialup="true">
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
            <x-primary-button id="register-form" class="ms-4">
                {{ __('アカウント登録') }}
            </x-primary-button>
        </div>
    </form>

    <x-back-to-login-button />

    <x-register-explanation-modal />
    <script>
    window.registerPageData = {
        hasErrors: @json($errors->any())
    };
    </script>

    @push('scripts')
    @endpush
</x-guest-layout>