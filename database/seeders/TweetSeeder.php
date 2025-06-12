<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TweetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tweets')->insert([
            'id' => 1,
            'user_id' => 1,
            'text' => 'hoge',
            'image_path' => 'dummy/dummy',
            'liked_count' => 100,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
