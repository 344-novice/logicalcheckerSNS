<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ChatGPTLogicService
{
    public function checkLogic(string $tweet): array
    {
        $prompt = <<<PROMPT
次の投稿文が論理的に書かれているかを判定してください。
投稿文：
$tweet

以下の形式で300文字程度でJSONで返してください：

{
  "is_logical": true, または false,
  "reason": "なぜそう判断したのかを簡潔に説明",
  "hints": ["改善点や注意点などを1〜3点", "なければ空配列で良い"]
}

なお、投稿文は全てmoderation APIでflaggedがfalseであったものです。
不適切な文言が含まれている場合も書き手側の批判的態度を加味してください。
PROMPT;

        // try {
        //     $response = Http::withToken(config('services.openai.key'))
        //         ->post('https://api.openai.com/v1/chat/completions', [
        //             'model' => 'gpt-4o',
        //             'temperature' => 0.7,
        //             'messages' => [
        //                 ['role' => 'system', 'content' => 'あなたは論理性判定の専門家です。返答は必ずJSON形式で行ってください。'],
        //                 ['role' => 'user', 'content' => $prompt],
        //             ],
        //     ]);

        //     if ($response->failed()) {
        //         return [
        //             'error' => 'chatGPT_api_error',
        //             'message' => 'chatGPT APIからのエラー応答です: ' . $response->status(),
        //         ];
        //     }

        //     $result = $response->json();
        // } catch(\Throwable $e) {
        //     return [
        //         'error' => 'chatGPT_api_error',
        //         'message' => 'chatGPT_APIからのレスポンスが不正です',
        //     ];
        // }

        // $rawText = $result['choices'][0]['message']['content'] ?? '{}';

        // $parsed = json_decode($rawText, true);

        // if (!is_array($parsed)) {
        //     return [
        //         'error' => 'chatGPT_response_error',
        //         'message' => 'chatGPT APIの返答が不正な形式でした。',
        //         'raw' => $rawText,
        //     ];
        // }

        // if (!isset($parsed['is_logical']) || !isset($parsed['reason']) || !isset($parsed['hints'])) {
        //     return [
        //         'error' => 'chatGPT_response_error',
        //         'message' => 'chatGPT APIの返答に必要な情報が含まれていません。',
        //         'raw' => $parsed,
        //     ];
        // }

        // if (!is_bool($parsed['is_logical'])) {
        //     return [
        //         'error' => 'chatGPT_response_error',
        //         'message' => '論理判定の結果がbooleanではありません。',
        //         'raw' => $parsed,
        //     ];
        // }

        // chatGPT APIはお金がかかるからしばらくはこのダミーデータを使う
        $parsed = [
            "is_logical" => true,
            "reason" => "この文章は、桃太郎が鬼を退治に行く動機や状況を一貫して説明しています。具体的な証拠がないものの、人々の恐怖や確信に基づく行動であり、物語の論理的な流れとして成立しています。ただし、一部に説明不足や曖昧な点（喋る動物の理由など）があり、完全な論理性とは言い切れません。",
            "hints" => [
                "喋る動物の設定や理由をもう少し説明するとより納得感が増す",
                "人々の恐怖の根拠を具体化すると説得力が上がる",
                "桃太郎が退治に行く決断の背景をもう少し詳しく描写すると良い"
            ]
        ];

        return [
            'is_logical' => $parsed['is_logical'] ?? false,
            'analysis' => [
                'reason' => $parsed['reason'] ?? '',
                'hints' => $parsed['hints'] ?? [],
            ],
            // 'raw' => $rawText,
        ];
    }
}
