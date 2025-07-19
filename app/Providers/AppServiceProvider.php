<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Cloudinary\Configuration\Configuration;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Configuration::instance([
            'cloud' => [
                'api_key' => config('cloudinary.api_key'),
                'api_secret' => config('cloudinary.api_secret'),
                'cloud_name' => config('cloudinary.cloud_name'),
            ],
            'url' => [
                'secure' => true
            ]
        ]);
    }
}
