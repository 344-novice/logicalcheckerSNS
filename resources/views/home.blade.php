<x-app-layout>
    <x-slot name="header">
        <h2 id="page-title" class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('ホーム') }}
        </h2>
    </x-slot>

    <main aria-labelledby="page-title" class="py-12 ">
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
                <section 
                    role="region" 
                    aria-labelledby="welcome-message"
                    class="bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-t-lg" 
                >
                    <div class="pt-10 text-center text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {{ __("論理チェッカーSNS(仮)へようこそ!") }}
                    </div>
                </section>
            <div id="home-page"
                data-login-user-id="{{ $loginUserId }}"
                @if (session('error'))
                    data-error-message="{{ session('error') }}"
                @endif
                role="region"
                aria-label="投稿フォームとツイート一覧"
                class="p-10 font-normal bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-b-lg"
            >
                <div id="post-form"></div>
                <div id="tweets-form"></div>
            </div>
        </div>
    </main>
</x-app-layout>
