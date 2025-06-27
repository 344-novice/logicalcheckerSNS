<div class="flex justify-between h-16 px-10">
  <div class="flex items-center space-x-8">
    <x-nav-link 
    :href="route('home')" 
    :active="request()->routeIs('home')" 
    class="!text-black"
    >
        {{ __('Home') }}
    </x-nav-link>
  </div>

  <div class="flex items-center space-x-8">
    <div id="darkmode-switch" class="flex items-center"></div>

    <x-nav-link :href="route('mypage')" :active="request()->routeIs('mypage')">
      {{ __('MyPage') }}
    </x-nav-link>

    <form method="POST" action="{{ route('logout') }}">
      @csrf
      <x-nav-link method="post" class="cursor-pointer" onclick="event.preventDefault(); this.closest('form').submit();">
        {{ __('Log Out') }}
      </x-nav-link>
    </form>
  </div>
</div>
