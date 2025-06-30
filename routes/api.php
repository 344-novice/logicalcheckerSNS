<?php

use App\Http\Controllers\TweetController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LogicalCheckController;
use Illuminate\Support\Facades\Route;

Route::get('/tweet/index', [TweetController::class, 'index']);

Route::middleware('auth:sanctum')->get('/user/{id}', [UserController::class, 'showUser']);

Route::middleware('auth:sanctum')->patch('/user/{id}/thumbnail', [UserController::class, 'updateThumbnail']);

Route::post('/tweet/logic-check', [LogicalCheckController::class, 'check']);

Route::middleware('auth:sanctum')->post('/tweet/post', [TweetController::class, 'storeTweet']);

Route::middleware('auth:sanctum')->get('/tweet/delete', [TweetController::class, 'delete']);
Route::middleware('auth:sanctum')->post('/tweet/delete', [TweetController::class, 'delete']);

Route::middleware('auth:sanctum')->get('/tweet/detail/{id}', [TweetController::class, 'detail']);