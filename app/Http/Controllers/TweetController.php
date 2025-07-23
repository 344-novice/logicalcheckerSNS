<?php

namespace App\Http\Controllers;

use App\Http\Requests\TweetRequest;
use App\Http\Resources\TweetResource;
use App\Models\LogicalCheck;
use App\Models\Tweet;
use App\Models\User;
use App\Services\ImageService;
use App\Services\LogicalCheckService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TweetController extends Controller
{
    public function index(Request $request)
    {
        $tweets = Tweet::with(['user', 'logicalCheck', 'likes'])
            ->where('delete_flag', 0)
            ->latest()
            ->paginate(5);;
            
        return TweetResource::collection($tweets);
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

        if (!empty($tweet->user->image)) {
            $tweet->user->image = ImageService::getTransformedUrl(
                $tweet->user->image,
                'w_100,h_100,c_fill,q_auto,f_auto'
            );
        }

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
            
        return response()->json(array_merge(
            $tweet->toArray(),
            [
                'is_logical' => $logicalCheckRecord->is_logical_ ?? false,
                'user' => $tweet->user,
            ]
        ));
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

            $tweetArray['user']['image'] = ImageService::getTransformedUrl(
                $tweet->user->image ?? null,
                'w_100,h_100,c_fill,q_auto,f_auto'
            );

            return $tweetArray;
        });

        return response()->json($formattedTweets);
    }

    public function show($id)
    {
        $tweet = Tweet::where('id', $id)
                    ->where('delete_flag', 0)
                    ->first();

        if (!$tweet) {
            return redirect('/home')->with('error', '指定された投稿は存在しないか、削除されています。');
        }

        return view('tweet-detail', [
            'loginUserId' => Auth::id(),
        ]);
    }

    public function detail(Request $request, $id) {
        $tweet = Tweet::with(['user', 'logicalCheck'])
            ->where('id', $id)
            ->first();

        $tweetData = $tweet->toArray();

        $tweetData['user']['image'] = ImageService::getTransformedUrl(
            $tweet->user->image ?? null,
            'w_200,h_200,c_fill,q_auto,f_auto'
        );

        return response()->json($tweetData);
    }

    public function changeLikedCount(Request $request, $id)
    {
        $user = $request->user();

        return DB::transaction(function () use ($id, $user) {
            $tweet = Tweet::lockForUpdate()->findOrFail($id);

            $likedRecord = $tweet->likes()->where('user_id', $user->id)->first();

            if ($likedRecord) {
                $likedRecord->delete();
                $tweet->decrement('liked_count');
                $liked = false;
            } else {
                $tweet->likes()->create(['user_id' => $user->id]);
                $tweet->increment('liked_count');
                $liked = true;
            }

            $tweet->refresh();

            return response()->json([
                'liked' => $liked,
                'liked_count' => $tweet->liked_count,
                'tweet_id' => $tweet->id,
            ]);
        });
    }
}
