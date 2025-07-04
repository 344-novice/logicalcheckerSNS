<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\LogicalCheckService;
use Illuminate\Support\Facades\Log;

class LogicalCheckController extends Controller
{
   public function check(Request $request)
    {
        $result = app(LogicalCheckService::class)->analyze($request->input('tweet'));

        if (isset($result['error'])) {
            $userMessage = match ($result['error']) {
                'moderation_api_error' => '投稿内容のチェックで問題が発生しました。時間を置いて再試行してください。',
                'chatGPT_api_error' => '論理チェックに失敗しました。しばらく待ってから再度お試しください。',
                default => 'エラーが発生しました。運営にお問い合わせください。',
            };

            return response()->json([
                'error' => $result['error'],
                'message' => $userMessage,
            ]);
        }

        if (!isset($result['flagged'])) {
            $result['flagged'] = false;
        }
        
        if (!isset($result['logic_result'])) {
            $result['logic_result'] = [
                'is_logical' => false,
                'reason' => null,
                'hints' => [],
            ];
        } else {
            if (!isset($result['logic_result']['is_logical'])) {
                $result['logic_result']['is_logical'] = false;
            }
            if (!isset($result['logic_result']['reason'])) {
                $result['logic_result']['reason'] = null;
            }
            if (!isset($result['logic_result']['hints'])) {
                $result['logic_result']['hints'] = [];
            }
        }

        return response()->json($result);
    }
}
