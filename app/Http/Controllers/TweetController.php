<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use App\Http\Requests\TweetRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

// ToDo:Tweet数が増えたらページネーションなどの対処
// ToDo: 依存注入
class TweetController extends Controller
{
    public function index(Request $request)
    {
        $tweets = Tweet::with('user')
            ->where('delete_flag', 0)
            ->latest()
            ->get();

        // ToDo: Resourceファイルに分ける
        $formattedTweets = $tweets->map(function ($tweet) {
            $tweetArray = $tweet->toArray();

            if (!empty($tweet->user->image)) {
                $originalUrl = $tweet->user->image;
                $transform = 'w_100,h_100,c_fill,q_auto,f_auto';

                $transformedUrl = str_replace(
                    '/upload/',
                    '/upload/' . $transform . '/',
                    $originalUrl
                );

                $tweetArray['user']['image'] = $transformedUrl;
            }

            return $tweetArray;
        });

        return response()->json($formattedTweets);
    }

    public function store(TweetRequest $request)
    {   
        $userId = Auth::id();

        $tweet = Tweet::create([
            'tweet' => $request->input('tweet'),
            'user_id' => $userId,
            'liked_count' => 0,
        ]);

        $tweet->load('user');

        if (!empty($tweet->user->image)) {
            $originalUrl = $tweet->user->image;
            $transform = 'w_150,h_150,c_fill,q_auto,f_auto';

            $transformedUrl = str_replace(
                '/upload/',
                '/upload/' . $transform . '/',
                $originalUrl
            );

            $tweet->user->image = $transformedUrl;
        }
            
        return response()->json($tweet);
    }

    public function delete(Request $request) {
        $tweetId = $request->input('tweetId');
        $tweet = Tweet::findOrFail($tweetId, 'id');
        $tweet->delete_flag = 1;
        $tweet->save();

        $tweets = Tweet::with('user')
            ->where('delete_flag', 0)
            ->latest()
            ->get();

        $formattedTweets = $tweets->map(function ($tweet) {
            $tweetArray = $tweet->toArray();

            if (!empty($tweet->user->image)) {
                $tweetArray['user']['image'] = str_replace(
                    '/upload/',
                    '/upload/w_100,h_100,c_fill,q_auto,f_auto/',
                    $tweet->user->image
                );
            }

            return $tweetArray;
        }
    );

    return response()->json($formattedTweets);
    }

    public function detail(Request $request, $id) {
        $tweet = Tweet::with('user')
            ->where('id', $id)
            ->first();

        $tweetData = $tweet->toArray();

        if (!empty($tweet->user->image)) {
            $originalUrl = $tweet->user->image;
            $transform = 'w_200,h_200,c_fill,q_auto,f_auto';

            $transformedUrl = str_replace(
                '/upload/',
                '/upload/' . $transform . '/',
                $originalUrl
            );

            $tweetData['user']['image'] = $transformedUrl;
        }

        return response()->json($tweetData);
    }
}
