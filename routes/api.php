<?php

use App\Http\Controllers\CloudinaryController;
use App\Http\Controllers\LogicalCheckController;
use App\Http\Controllers\TweetController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/tweet/index', [TweetController::class, 'index']);

Route::middleware('auth:sanctum')->get('/user/{userId}', [UserController::class, 'showUser']);

Route::middleware('auth:sanctum')->post('/cloudinary/upload', [CloudinaryController::class, 'uploadImage']);
Route::middleware('auth:sanctum')->patch('/user/{userId}/image', [UserController::class, 'updateImage']);
Route::middleware('auth:sanctum')->patch('/user/{userId}/info', [UserController::class, 'updateUserInfo']);

Route::middleware('auth:sanctum')->post('/tweet/logic-check', [LogicalCheckController::class, 'check']);
Route::middleware('auth:sanctum')->post('/tweet/post', [TweetController::class, 'storeTweet']);

Route::middleware('auth:sanctum')->get('/tweet/delete', [TweetController::class, 'delete']);
Route::middleware('auth:sanctum')->post('/tweet/delete', [TweetController::class, 'delete']);

Route::middleware('auth:sanctum')->get('/tweet/detail/{tweetId}', [TweetController::class, 'detail']);

Route::middleware('auth:sanctum')->post('/tweet/liked-count/{tweetId}', [TweetController::class, 'changeLikedCount']);