<?php

use App\Http\Controllers\TweetController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LogicalCheckController;
use Illuminate\Support\Facades\Route;

Route::get('/tweet/index', [TweetController::class, 'index']);

Route::middleware('auth:sanctum')->get('/user/{id}', [UserController::class, 'showUser']);

use Illuminate\Support\Facades\Log;

Route::middleware('auth:sanctum')->get('/cloudinary/signature/{userId}', function ($userId) {
    $timestamp = time();
    $uploadPreset = env('VITE_CLOUDINARY_UPLOAD_PRESET');
    $apiSecret = env('CLOUDINARY_API_SECRET');
    $apiKey = env('VITE_CLOUDINARY_API_KEY');

    $folder = "portfolio/user/{$userId}";

    $paramsToSign = [
        'timestamp' => $timestamp,
        // 'folder' => $folder,
        'upload_preset' => $uploadPreset,
    ];

    ksort($paramsToSign);

    $signatureBaseString = '';
    foreach ($paramsToSign as $key => $value) {
        if ($signatureBaseString !== '') {
            $signatureBaseString .= '&';
        }
        $signatureBaseString .= $key . '=' . $value;
    }

    $signature = hash_hmac('sha256', $signatureBaseString, $apiSecret);

    return response()->json([
        'timestamp' => $timestamp,
        'signature' => $signature,
        'api_key' => $apiKey,
        'upload_preset' => $uploadPreset,
        // 'folder' => $folder,
        'signature_base_string' => $signatureBaseString,
    ]);
});



Route::middleware('auth:sanctum')->patch('/user/{id}/thumbnail', [UserController::class, 'updateThumbnail']);

Route::middleware('auth:sanctum')->post('/tweet/logic-check', [LogicalCheckController::class, 'check']);
Route::middleware('auth:sanctum')->post('/tweet/post', [TweetController::class, 'storeTweet']);

Route::middleware('auth:sanctum')->get('/tweet/delete', [TweetController::class, 'delete']);
Route::middleware('auth:sanctum')->post('/tweet/delete', [TweetController::class, 'delete']);

Route::middleware('auth:sanctum')->get('/tweet/detail/{id}', [TweetController::class, 'detail']);