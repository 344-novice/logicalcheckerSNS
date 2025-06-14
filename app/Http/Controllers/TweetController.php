<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use App\Http\Requests\TweetRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TweetController extends Controller
{
    public function index(Request $request) {
        // ToDo: 依存注入
        $tweets = Tweet::all();
        return response()->json($tweets);
    }

    public function store(TweetRequest $request)
    {        
        $tweetText = $request->input('tweet');
        $userId = 1; // 仮で固定ユーザーID

        Tweet::create([
            'tweet' => $tweetText,
            'user_id' => $userId,
            'liked_count' => 0,
        ]);

        // $tweet = new Tweet();
        // $tweet->user_id = Auth::id(); 
        // $tweet->tweet = $request->input('tweet');
        // $tweet->save();
        
        return response()->json(['message' => '投稿成功！']);
    }
}
