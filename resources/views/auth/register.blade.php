<x-guest-layout>
    <x-register-explanation-modal />
    
    <div class="flex justify-between items-end mb-4 text-gray-600 dark:text-gray-400">
        <p id="register-heading" class="font-bold mb-1">{{ __('アカウント登録') }}</p>
    </div>

    <form id="register-form" method="POST" action="{{ route('register') }}" aria-labelledby="register-heading">
        @csrf

        <!-- Name -->
        <div>
            <x-input-label for="name" :value="__('アカウント名')" />
            <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" placeholder="上限30文字" required autocomplete="username" />
            <x-input-error id="name-error" :messages="$errors->get('name')" class="mt-2" />
        </div>

        <!-- Email Address -->
        <div class="mt-4">
            <x-input-label for="email" :value="__('メールアドレス')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" placeholder="abc@abc.jp" required autocomplete="email"/>
            <x-input-error id="email-error" :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="__('パスワード')" />

            <x-text-input id="password" class="block mt-1 w-full"
                            type="password"
                            name="password"
                            placeholder="8文字以上"
                            id="password-error" 
                            required autocomplete="new-password"
            />

            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
            <x-input-label for="password_confirmation" :value="__('確認用パスワード')" />

            <x-text-input id="password_confirmation" class="block mt-1 w-full"
                            type="password"
                            name="password_confirmation"
                            placeholder="上記と同じ内容"
                            required autocomplete="new-password" />

            <x-input-error id="password-confirmation-error" :messages="$errors->get('password_confirmation')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <x-primary-button id="register-button" class="ms-4">
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

        <script>
        document.addEventListener('DOMContentLoaded', function () {
            const form = document.getElementById('register-form');
            const registerButton = document.getElementById('register-button');

            if (form && registerButton) {
                form.addEventListener('submit', function () {
                    registerButton.disabled = true;
                    registerButton.innerText = '登録中…';
                    registerButton.classList.add('font-bold', 'bg-white', 'text-black', 'border', 'breeze-loading');
                });
            }
        });
    </script>

    @push('scripts')
    @endpush
</x-guest-layout>