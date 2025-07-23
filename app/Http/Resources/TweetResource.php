<?php

namespace App\Http\Resources;

use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TweetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
        public function toArray(Request $request)
    {
        $userId = $request->user()->id ?? null;

        return [
            'id' => $this->id,
            'tweet' => $this->tweet,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'image' => ImageService::getTransformedUrl(
                    $this->user->image ?? null,
                    'w_100,h_100,c_fill,q_auto,f_auto'
                ),
            ],
            'is_logical' => $this->logicalCheck ? $this->logicalCheck->is_logical : false,
            'liked' => $userId ? $this->likes->contains('user_id', $userId) : false,
            'liked_count' => $this->liked_count,
            'created_at' => $this->created_at,
        ];
    }
}
