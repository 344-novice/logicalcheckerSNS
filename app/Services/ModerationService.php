<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ModerationService {
    private const MODERATION_API_URL = 'https://api.openai.com/v1/moderations';
    public function check($tweet) {
        try {
            $response = Http::withToken(config('services.openai.key'))
                ->post(self::MODERATION_API_URL, [
                    'input' => $tweet,
                ]);

            if ($response->failed()) {
                return [
                    'error' => 'moderation_api_error',
                    'message' => 'Moderation APIからのエラー応答です: ' . $response->status(),
                ];
            }

            $result = $response->json();

        } catch(\Throwable $e) {
            return [
                'error' => 'moderation_api_error',
                'message' => 'Moderation APIからのレスポンスが不正です',
            ];
        }

        $flagged = $result['results'][0]['flagged'] ?? false;
        $rawCategories = $result['results'][0]['categories'] ?? [];

        $categories = collect($rawCategories)
            ->filter(fn($value) => $value === true)
            ->keys()
            ->toArray();

        return [
            'flagged' => $flagged,
            'categories' => $categories,
        ];
    }
}