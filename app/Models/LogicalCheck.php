<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LogicalCheck extends Model
{
    use HasFactory;

    protected $fillable = [
        'tweet_id',
        'post_id',
        'is_moderate',
        'is_logical_post',
        'logical_level',
        'feedback_comment',
    ];

    public function post()
    {
        return $this->belongsTo(Tweet::class);
    }
}
