<x-app-layout>
    <x-slot name="header">
        <h2 id="page-title" class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            <div id="user-page-name" data-user-id="{{ $userId }}" data-login-user-id="{{ $loginUserId }}"></div>
        </h2>
    </x-slot>

    <main aria-labelledby="page-title" class="pt-12 pb-5">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div role="region" aria-label="ユーザーページのコンテンツ" class="py-3 bg-white dark:bg-gray-800 overflow-visible shadow-sm sm:rounded-lg">
                <div id="user-page" data-user-id="{{ $userId }}" data-login-user-id="{{ $loginUserId }}"></div>
            </div>  
        </div>
    </main>

    <x-back-to-home-button />
</x-app-layout>
