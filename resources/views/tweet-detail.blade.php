<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('投稿詳細') }}
        </h2>
    </x-slot>

    <div class="pt-12 pb-5">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div id="tweet-detail-page" data-login-user-id="{{ $loginUserId }}"></div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="flex justify-end">
            <a
            href="/home"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            >
            ← 戻る
            </a>
        </div>
    </div>
</x-app-layout>
