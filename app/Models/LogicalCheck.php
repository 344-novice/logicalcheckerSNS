<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LogicalCheck extends Model
{
    use HasFactory;

    protected $table = 'logical_checks';

    protected $fillable = [
        'tweet_id',
        'post_id',
        'is_logical',
        'reason',
        'hints'
    ];

    public function post()
    {
        return $this->belongsTo(Tweet::class);
    }
}
