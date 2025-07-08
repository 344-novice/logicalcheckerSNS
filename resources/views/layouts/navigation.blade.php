<div class="flex justify-between h-16 px-10">
  <div class="flex items-center space-x-8">
    <x-nav-link 
    :href="route('home')" 
    :active="request()->routeIs('home')" 
    class="text-black dark:text-white"
    >
        {{ __('ホーム') }}
    </x-nav-link>
  </div>

  <div class="flex items-center space-x-5">
    <div id="darkmode-switch" class="flex items-center"></div>

    <x-nav-link :href="route('mypage')" :active="request()->routeIs('mypage')" class="dark:text-white">
      {{ __('マイページ') }}
    </x-nav-link>

    <form method="POST" action="{{ route('logout') }}">
      @csrf
      <x-nav-link method="post" class="cursor-pointer dark:text-white" onclick="event.preventDefault(); this.closest('form').submit();">
        {{ __('ログアウト') }}
      </x-nav-link>
    </form>
  </div>
</div>
