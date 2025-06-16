<?php

use App\Http\Controllers\TweetController;
use Illuminate\Support\Facades\Route;

Route::get('/tweet/index', [TweetController::class, 'index']);

Route::middleware('auth:sanctum')->post('/tweet/post', [TweetController::class, 'store']);


