<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            <div id="user-page-name" data-user-id="{{ $userId }}" data-login-user-id="{{ $loginUserId }}"></div>
        </h2>
    </x-slot>

    <div class="pt-12 pb-5">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="py-3 bg-white dark:bg-gray-800 overflow-visible shadow-sm sm:rounded-lg">
                <div id="user-page" data-user-id="{{ $userId }}" data-login-user-id="{{ $loginUserId }}"></div>
            </div>  
        </div>
    </div>

    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="flex justify-end">
            <a
            href="/home"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
            ← 戻る
            </a>
        </div>
    </div>
</x-app-layout>
