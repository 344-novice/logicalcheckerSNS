<x-guest-layout>
    <div class="flex justify-between items-end mb-4 text-gray-600 dark:text-gray-400">
        <p class="font-bold mb-1">{{ __('ログイン') }}</p>
        <a class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            href="{{ route('register') }}"
            >
            {{ __('アカウントの新規作成はこちら') }}
        </a>
    </div>

    <div class="mb-2">
        <p>複数のサービスを掛け持ちしてWeb公開しているため、挙動が非常に重いです。古のインターネットを思い出してノスタルジーに浸っていただければと思います。</p>
    </div>

    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form id="login-form" method="POST" action="{{ route('login') }}" data-dialup="true">
        @csrf

        <!-- User Name or Email Address -->
        <div>
            <x-input-label for="login" :value="__('アカウント名 or メールアドレス')" />
            <x-text-input id="login" class="block mt-1 w-full" type="text" name="login" :value="old('login')" required autofocus autocomplete="username" />
            <x-input-error :messages="$errors->get('login')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="__('パスワード')" />

            <x-text-input id="password" class="block mt-1 w-full"
                            type="password"
                            name="password"
                            required autocomplete="current-password" />

            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Remember Me -->
        <div class="block mt-4">
            <label for="" class="inline-flex items-center">
                <!-- //ToDo: registerのチェックボックスと揃える -->
                <input id="remember_me" type="checkbox" class="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800" name="remember">
                <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">{{ __('ログイン状態を保持する') }}</span>
            </label>
        </div>

        <div class="flex items-center justify-end mt-4">
            @if (Route::has('password.request'))
                <a class="text-sm text-gray-600 dark:text-gray-400 hover:font-bold hover:text-gray-900 dark:hover:text-gray-100" href="{{ route('password.request') }}">
                    {{ __('パスワードを忘れた場合はこちら') }}
                </a>
            @endif

            <x-primary-button id="login-button" class="ms-3">
                {{ __('ログイン') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout>