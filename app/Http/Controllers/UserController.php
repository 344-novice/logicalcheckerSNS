<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

// ToDo: 依存注入
class UserController extends Controller
{
    public function updateThumbnail(Request $request, $id) {
        $user = User::findOrFail($id);
        $user->image = $request->input('image');
        $user->save();

        return response()->json();
    }
}
