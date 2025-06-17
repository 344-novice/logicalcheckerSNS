<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use App\Http\Requests\TweetRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

// ToDo:Tweet数が増えたらページネーションなどの対処
class TweetController extends Controller
{
    public function index(Request $request) {
        // ToDo: 依存注入
        $tweets = Tweet::where('delete_flag', 0)->get();
        return response()->json($tweets);
    }

    public function loginUserId(Request $request) {
        $loginUserId = Auth::id();
        return response()->json($loginUserId);
    }

    public function store(TweetRequest $request)
    {   
        $userId = Auth::id();

        $tweet = Tweet::create([
            'tweet' => $request->input('tweet'),
            'user_id' => $userId,
            'liked_count' => 0,
        ]);
        
        return response()->json($tweet);
    }

    public function delete(Request $request) {
        $tweetId = $request->input('tweetId');
        $tweet = Tweet::findOrFail($tweetId, 'id');
        $tweet->delete_flag = 1;
        $tweet->save();
        $notDeletedTweets = Tweet::where('delete_flag', 0)->get();

        return response()->json($notDeletedTweets);
    }

    public function detail(Request $request) {
        // ToDo: 依存注入
        $tweet = Tweet::where('id', 40)->first();
        return response()->json($tweet);
    }
}
