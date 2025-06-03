<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function post (Request $request) {
        $text = $request->input('postText');
        return view('home', ['text' => $text]);
    }

    // public function postAccount () {
    //     $data = (new Post())->postAccount();
    //     return $data['postAccount'];
    // }
}
