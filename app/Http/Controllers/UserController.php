<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\ImageService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function showUser($id)
    {
        $user = User::find($id);
        $userData = $user->toArray();

        $userData['image'] = ImageService::getTransformedUrl(
            $user->image ?? null,
            'w_200,h_200,c_fill,q_auto,f_auto'
        );

        return response()->json($userData);
    }

    public function updateThumbnail(Request $request, $id) {
        $user = User::findOrFail($id);
        $user->image = $request->input('image');
        $user->save();

        return response()->json();
    }
}
