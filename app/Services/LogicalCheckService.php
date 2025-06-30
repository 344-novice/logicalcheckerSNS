<?php

namespace App\Services;

use App\Models\LogicalCheck;
use Illuminate\Support\Facades\Log;

class LogicalCheckService
{
    public function analyze(string $tweet): array
    {
        
        $moderationResult = app(ModerationService::class)->check($tweet);

        if (isset($moderationResult['error'])) {
            return $moderationResult;
        }

        if ($moderationResult['flagged']) {
            return $moderationResult;
        }

        if (mb_strlen($tweet) < 50) {
            return $moderationResult;
        }

        $logicCheckResult = app(ChatGPTLogicService::class)->checkLogic($tweet);

        if (isset($logicCheckResult['error'])) {
            Log::error('ChatGPTエラー', [
                'tweet' => $tweet,
                'response' => $logicCheckResult,
            ]);

            unset($logicCheckResult['raw']);

            return $logicCheckResult;
        }

        return [
            'flagged' => false,
            'logic_result' => $logicCheckResult,
        ];
    }

    public function storeLogicalCheck(int $tweetId, array $checkResult): void
    {
        LogicalCheck::create([
            'tweet_id' => $tweetId,
            'is_moderate' => $checkResult['flagged'],
            'is_logical_post' => $checkResult['is_logical'],
            'reason' => $checkResult['reason'] ?? null,
            'hints' => isset($checkResult['hints']) ? json_encode($checkResult['hints']) : null,
        ]);
    }
}
