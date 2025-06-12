<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    {{ __("論理チェッカーSNS(仮)へようこそ!") }}
                </div>
                <div class="m-10">
                    <form action="{{ route('tweet.store') }}" method="post">
                        @csrf
                        <input class="w-" type="text" id="tweetText" name="tweet">
                        <input class="ml-5 p-1 px-3 border " type="submit" value="投稿">
                        @error('tweet')
                        <div class="m-2 0 0 2 text-red-500">文字が入ってないよ！</div>
                        @enderror
                    </form>
                </div>
            </div>
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                @foreach ($tweets as $tweet)
                <div class="m-5 p-2 border text-xl text-gray-800 dark:text-gray-200 leading-tight">{{ $tweet }}<br></div>
                @endforeach
            </div>
        </div>
    </div>
</x-app-layout>
