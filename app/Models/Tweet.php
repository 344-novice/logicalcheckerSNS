<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tweet extends Model
{

    protected $table = 'tweets';
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

    public function logicalCheck()
    {
        return $this->hasOne(LogicalCheck::class);
    }
}
