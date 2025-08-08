<x-guest-layout>
    <x-register-explanation-modal class="hidden" id="register-explanation-modal" />
    
    <div class="flex justify-between items-end mb-4 text-gray-600 dark:text-gray-400">
        <p id="register-heading" class="font-bold mb-1">{{ __('アカウント登録') }}</p>
    </div>

    <form id="register-form" method="POST" action="{{ route('register') }}" aria-labelledby="register-heading" data-dialup="true" novalidate>
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

            <x-text-input id="password"
                            type="password"
                            name="password"
                            placeholder="8文字以上"
                            class="block mt-1 w-full"
                            required autocomplete="new-password"
            />

            <x-input-error id="password-error" :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
            <x-input-label for="password_confirmation" :value="__('確認用パスワード')" />

            <x-text-input id="password_confirmation" 
                            type="password"
                            name="password_confirmation"
                            placeholder="上記と同じ内容"
                            class="block mt-1 w-full"
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
        document.addEventListener('DOMContentLoaded', function () {
            const hasErrors = @json($errors->any());
            const modal = document.getElementById('register-explanation-modal');
            const hasSeenModal = localStorage.getItem('hasSeenRegisterExplanationModal');

            modal.classList.add('hidden');

            if (!hasErrors && !hasSeenModal) {
                modal.classList.remove('hidden');
            }

            const closeButton = document.getElementById('modal-close-button');
            const optOutCheckbox = document.getElementById('modal-optout-checkbox');

            closeButton.addEventListener('click', () => {
                modal.classList.add('hidden');
                if (optOutCheckbox.checked) {
                    localStorage.setItem('hasSeenRegisterExplanationModal', 'true');
                }
            });

            const form = document.getElementById('register-form');

            const registerButton = document.getElementById('register-button');
            const backToLoginButton = document.getElementById('back-to-login-button');

            form.addEventListener('submit', function () {
                registerButton.disabled = true;
                registerButton.innerText = '登録中…';
                registerButton.classList.add('font-bold', 'bg-white', 'text-black', 'border', 'breeze-loading');

                backToLoginButton.disabled = true;
                backToLoginButton.classList.add('bg-white', 'text-gray', 'pointer-events-none');
            });
        });
    </script>

    @push('scripts')
    @endpush
</x-guest-layout>