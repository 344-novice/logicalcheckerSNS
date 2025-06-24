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

        return response()->json($user);
    }

    public function updateThumbnail(Request $request, $id) {
        $user = User::findOrFail($id);
        $user->image = $request->input('img');
        $user->save();

        return response()->json();
    }
}
