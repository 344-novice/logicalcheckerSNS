<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', function () {
    return view('home', ['loginUserId' => Auth::id()]);
})->middleware('auth')->name('home');

Route::get('/tweet-detail/{id}', function ($id) {
    return view('tweet-detail', [
        'loginUserId' => Auth::id(),
    ]);
})->where('id', '[0-9]+'); 

Route::get('/mypage', function () {
    return view('user', [
        'id' => Auth::id(), 'loginUserId' => Auth::id()
    ]);
})->middleware('auth')->name('mypage');

Route::get('/user/{id}', function ($id) {
    return view('user', ['id' => $id, 'loginUserId' => Auth::id()]);
})->where('id', '[0-9]+')->name('user');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
