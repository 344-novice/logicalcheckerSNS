<?php

namespace App\Services;

use App\Models\LogicalCheck;
use App\Models\User;
use App\Services\ModerationService;
use App\Services\ChatGPTLogicService;
use Illuminate\Support\Facades\Auth;
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
            $userId = Auth::id();
            if ($userId) {
                User::where('id', $userId)->increment('total_moderate_false_count');
            }

            return $moderationResult;
        }

        if (mb_strlen($tweet) < 50) {
            return $moderationResult;
        }

        $logicCheckResult = app(ChatGPTLogicService::class)->checkLogic($tweet);

        if (isset($logicCheckResult['error'])) {
            return $logicCheckResult;
        }

        return [
            'flagged' => false,
            'logic_result' => $logicCheckResult,
        ];
    }

    public function storeLogicalCheck(int $tweetId, array $checkResult): void
    {
        $is_logical = $checkResult['is_logical'] ?? false;
        $reason = $checkResult['reason'] ?? null;
        $hints = isset($checkResult['hints']) ? $checkResult['hints'] : null;

        LogicalCheck::create([
            'tweet_id' => $tweetId,
            'is_logical' => $is_logical,
            'reason' => json_encode($reason),
            'hints' => json_encode($hints),
        ]);

        $userId = Auth::id();

        if ($userId) {
            if ($is_logical) {
                User::where('id', $userId)->increment('total_logical_true_count');
            }
        }
    }
}
