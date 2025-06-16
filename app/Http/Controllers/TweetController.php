<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use App\Models\User;
use App\Http\Requests\TweetRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TweetController extends Controller
{
    public function index(Request $request) {
        // ToDo: 依存注入
        $tweets = Tweet::all();
        return response()->json($tweets);
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
}
