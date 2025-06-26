<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

// ToDo: 依存注入
class UserController extends Controller
{
    public function showUser($id)
    {
        $user = User::find($id);
        $userData = $user->toArray();

            if (!empty($user->image)) {
                $originalUrl = $user->image;
                $transform = 'w_200,h_200,c_fill,q_auto,f_auto';

                $transformedUrl = str_replace(
                    '/upload/',
                    '/upload/' . $transform . '/',
                    $originalUrl
                );

                $userData['image'] = $transformedUrl;
            }

        return response()->json($userData);
    }

    public function updateThumbnail(Request $request, $id) {
        $user = User::findOrFail($id);
        $user->image = $request->input('image');
        $user->save();

        return response()->json();
    }
}
