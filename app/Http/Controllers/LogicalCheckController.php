<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

// ToDo: moderation APIでflaggedがfalseでもchatGPT APIに送っていたらOpenAIにBANされた実例があるため、
//       プロンプトには「以下ツイートはmoderation APIでチェックしたものです」の文言を入れる
class LogicalCheckController extends Controller
{
   public function check(Request $request)
    {
        
    $tweetContent = $request->input('tweet');

    $response = Http::withToken(config('services.openai.key'))
        ->post('https://api.openai.com/v1/moderations', [
            'input' => $tweetContent,
        ]);

    $result = $response->json();

    $flagged = $result['results'][0]['flagged'] ?? false;
    $rawCategories = $result['results'][0]['categories'] ?? [];

    $categories = collect($rawCategories)
        ->filter(fn($value) => $value === true)
        ->keys()
        ->toArray();

    return response()->json([
        'ok' => !$flagged,
        'flagged' => $flagged,
        'categories' => $categories,
        'raw' => $result,
    ]);

        // ※50文字以下はmoderationだけ通す
        // ※厳密モードはなし
        // 2. moderation APIに投げる

        // 3. flaggedでなければ chatGPT APIに投げる
        // 4. 結果をlogical_checkテーブルに保存
        // 5. 結果をJSONで返す（必要に応じて）
    }
}
