<?php

namespace App\Http\Controllers;

use App\Models\LogicalCheck;
use App\Models\Tweet;
use App\Models\User;
use App\Http\Requests\TweetRequest;
use App\Services\LogicalCheckService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
class TweetController extends Controller
{
    public function index(Request $request)
    {
        $tweets = Tweet::with(['user', 'logicalCheck'])
            ->where('delete_flag', 0)
            ->latest()
            ->get();

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

            $tweetArray['is_logical'] = $tweet->logicalCheck ? $tweet->logicalCheck->is_logical : false;

            return $tweetArray;
        });

        return response()->json($formattedTweets);
    }

    public function storeTweet(TweetRequest $request)
    {   


        $userId = Auth::id();

        $tweet = Tweet::create([
            'tweet' => $request->input('tweet'),
            'user_id' => $userId,
            'liked_count' => 0,
        ]);

        User::where('id', $userId)->increment('total_tweet_count');

        $tweet->load('user');

        $logicalCheck = $request->input('logicalCheck');

        if (isset($logicalCheck['logic_result'])) {
            $logicalCheck = array_merge(
        $logicalCheck,
                $logicalCheck['logic_result']
            );
            unset($logicalCheck['logic_result']);
        }
    
        app(LogicalCheckService::class)->storeLogicalCheck($tweet->id, $logicalCheck);

        $logicalCheckRecord = LogicalCheck::where('tweet_id', $tweet->id)->first();

        if (!empty($tweet->user->image)) {
            $originalUrl = $tweet->user->image;
            $transform = 'w_100,h_100,c_fill,q_auto,f_auto';

            $transformedUrl = str_replace(
                '/upload/',
                '/upload/' . $transform . '/',
                $originalUrl
            );

            $tweet->user->image = $transformedUrl;
        }
            
        return response()->json([
            'tweet' => $tweet,
            'is_logical' => $logicalCheckRecord->is_logical_ ?? false,
        ]);
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
