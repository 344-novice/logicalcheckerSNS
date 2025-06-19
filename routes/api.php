<?php

use App\Http\Controllers\TweetController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/tweet/index', [TweetController::class, 'index']);

// ToDo: ここはUserControllerではないか？
Route::middleware('auth:sanctum')->get('/user/id', [TweetController::class, 'loginUserId']);
Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'showUser']);
Route::middleware('auth:sanctum')->get('/user/{id}', [UserController::class, 'showUser']);

Route::middleware('auth:sanctum')->post('/tweet/post', [TweetController::class, 'store']);

Route::middleware('auth:sanctum')->get('/tweet/delete', [TweetController::class, 'delete']);
Route::middleware('auth:sanctum')->post('/tweet/delete', [TweetController::class, 'delete']);

Route::middleware('auth:sanctum')->get('/tweet/detail/{id}', [TweetController::class, 'detail']);