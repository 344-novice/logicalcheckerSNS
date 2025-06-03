<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;

Route::get('/login', function() {
    return view('login');
});
Route::post('/login', [LoginController::class, 'auth']);

Route::get('/signin', function() {
    return view('signin');
});
Route::post('/signin', function() {
    return view('signin');
});

Route::get('/home', function() {
    return view('home');
});
Route::post('/home', [PostController::class, 'post']);

Route::get('/user', function() {
    return view('user');
});
Route::post('/user', function() {
    return view('user');
});

Route::get('/admin/login', function() {
    return view('admin/login');
});
Route::post('/admin/login', function() {
    return view('admin/login');
});

Route::get('/admin/top', function() {
    return view('admin/top');
});
Route::post('/admin/top', function() {
    return view('admin/top');
});

Route::get('/post', function() {
    return view('post_detail');
});
Route::post('/post', function() {
    return view('post_detail');
});

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
