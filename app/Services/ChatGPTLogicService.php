<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ChatGPTLogicService
{
    private const CHATGPT_API_URL = 'https://api.openai.com/v1/chat/completions';

    public function checkLogic(string $tweet): array
    {
        $prompt = <<<PROMPT
以下の文章に論理的な問題がある場合のみ指摘してください。
批判的/攻撃的な文調、似非科学などのデマの可能性の高い情報発信であれば、その主張に飛躍がないか精査してください。
それ以外の場合は判定を緩和させてください。
反語やジョークなどの主張の根幹ではない非論理的表現はスルーしてください。
投稿文：
$tweet

以下の形式で300文字程度でJSONで返してください：

{
  "is_logical": true, または false,
  "reason": "なぜそう判断したのかを一文40文字以内で簡潔に説明",
  "hints": ["改善点や注意点などを1〜3点", "なければ空配列で良い"]
}

なお、投稿文は全てmoderation APIでflaggedがfalseであったものです。
不適切な文言が含まれている場合も書き手側の批判的態度を加味してください。
PROMPT;

        try {
            $response = Http::withToken(config('services.openai.key'))
                ->post(self::CHATGPT_API_URL, [
                    'model' => 'gpt-4o',
                    'temperature' => 0.2,
                    'messages' => [
                        ['role' => 'system', 'content' => 'あなたは論理性判定の専門家です。返答は必ずJSON形式で行ってください。'],
                        ['role' => 'user', 'content' => $prompt],
                    ],
            ]);

            if ($response->failed()) {
                return [
                    'error' => 'chatGPT_api_error',
                    'message' => 'chatGPT APIからのエラー応答です: ' . $response->status(),
                ];
            }

            $result = $response->json();
        } catch(\Throwable $e) {
            return [
                'error' => 'chatGPT_api_error',
                'message' => 'chatGPT_APIからのレスポンスが不正です',
            ];
        }

        $rawText = $result['choices'][0]['message']['content'] ?? '{}';

        $rawText = trim($rawText);

        if (str_starts_with($rawText, '```json')) {
            $rawText = substr($rawText, strlen('```json'));
            $rawText = trim($rawText);
        }

        if (str_ends_with($rawText, '```')) {
            $rawText = substr($rawText, 0, -3);
            $rawText = trim($rawText);
        }

        $parsed = json_decode($rawText, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return [
                'error' => 'chatGPT_response_error',
                'message' => 'chatGPT APIの返答がJSON形式ではありません。内容をログで確認してください。',
            ];
        }

        if (!is_array($parsed)) {
            return [
                'error' => 'chatGPT_response_error',
                'message' => 'chatGPT APIの返答が不正な形式でした。',
            ];
        }

        if (!isset($parsed['is_logical']) || !isset($parsed['reason']) || !isset($parsed['hints'])) {
            return [
                'error' => 'chatGPT_response_error',
                'message' => 'chatGPT APIの返答に必要な情報が含まれていません。',
            ];
        }

        if (!is_bool($parsed['is_logical'])) {
            return [
                'error' => 'chatGPT_response_error',
                'message' => '論理判定の結果がbooleanではありません。',
            ];
        }

        return [
            'is_logical' => $parsed['is_logical'] ?? false,
            'reason' => $parsed['reason'] ?? '',
            'hints' => $parsed['hints'] ?? [],
        ];
    }
}
