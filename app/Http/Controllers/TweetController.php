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
        $tweets = (new Tweet())->getAllTweets();
        return view('dashboard', ['tweets' => $tweets]);
    }

    public function store(Tweet $tweet, TweetRequest $request)
    {        
        $tweet = new Tweet();
        $tweet->user_id = Auth::id(); 
        $tweet->tweet = $request->input('tweet');
        $tweet->save();
        
        return redirect()->route('dashboard');
    }
}
