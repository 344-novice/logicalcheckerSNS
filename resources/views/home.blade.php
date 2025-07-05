<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Home') }}
        </h2>
    </x-slot>

    <div class="py-12 font-semibold">
        <div class="max-w-5xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-t-lg">
                <div class="p-10 pb-0 text-xl text-gray-900 dark:text-gray-100">
                    {{ __("論理チェッカーSNS(仮)へようこそ!") }}
                </div>
            </div>
            <div id="home-page"
                data-login-user-id="{{ $loginUserId }}"
                @if (session('error'))
                    data-error-message="{{ session('error') }}"
                @endif
                class="p-10 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-b-lg">
                <div id="post-form"></div>
                <div id="tweets-form"></div>
            </div>
        </div>
    </div>
</x-app-layout>
