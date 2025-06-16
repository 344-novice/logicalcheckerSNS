<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Tweet extends Model
{
    public function getAllTweets()
    {
        return DB::table('tweets')->pluck('tweet');
    }

    protected $fillable = [
        'user_id',
        'tweet',
        'image_path'
    ];

    protected $attributes = [
        'liked_count' => 0,
    ];

    public function user() {
        return $this->belongsTo('App\Models\User');
    }
}
