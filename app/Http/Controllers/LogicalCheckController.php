<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LogicalCheck;
use App\Services\LogicalCheckService;
use App\Http\Requests\LogicalCheckRequest;

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

        return response()->json($result);
    }
}
