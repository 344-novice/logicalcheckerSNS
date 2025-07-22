<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property int $tweet_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Tweet $tweet
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Like newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Like newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Like query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Like whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Like whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Like whereTweetId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Like whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Like whereUserId($value)
 */
	class Like extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $tweet_id
 * @property int $is_logical
 * @property string|null $reason
 * @property string|null $hints
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Tweet|null $post
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LogicalCheck newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LogicalCheck newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LogicalCheck query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LogicalCheck whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LogicalCheck whereHints($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LogicalCheck whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LogicalCheck whereIsLogical($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LogicalCheck whereReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LogicalCheck whereTweetId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LogicalCheck whereUpdatedAt($value)
 */
	class LogicalCheck extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string $tweet
 * @property int $liked_count
 * @property int $delete_flag
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Like> $likes
 * @property-read int|null $likes_count
 * @property-read \App\Models\LogicalCheck|null $logicalCheck
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tweet newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tweet newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tweet query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tweet whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tweet whereDeleteFlag($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tweet whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tweet whereLikedCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tweet whereTweet($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tweet whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tweet whereUserId($value)
 */
	class Tweet extends \Eloquent {}
}

namespace App\Models{
/**
 * @property string|null $image
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property int $is_admin
 * @property int $total_moderate_false_count
 * @property int $total_logical_true_count
 * @property int $total_tweet_count
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $profile
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereIsAdmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereProfile($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereTotalLogicalTrueCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereTotalModerateFalseCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereTotalTweetCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

