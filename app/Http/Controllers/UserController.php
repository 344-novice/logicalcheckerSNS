<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function showUser($id)
    {
        $user = User::findOrFail($id);
        $userData = $user->toArray();

        $userData['image'] = ImageService::getTransformedUrl(
            $user->image,
            'w_200,h_200,c_fill,q_auto,f_auto'
        );

        return response()->json($userData);
    }

    public function updateimage(Request $request, $userId) {
        $user = User::findOrFail($userId);

        // ToDo: policy導入検討
        if (Auth::id() !== $user->id) {
            abort(403, '許可されていません');
        }

        $request->validate([
            'image' => 'nullable|string|url',
        ]);

        $user->image = $request->input('image');
        $user->save();

        return response()->json();
    }

    public function updateUserInfo(Request $request, $userId)
    {
        $user = User::findOrFail($userId);

        // ToDo: policy導入検討
        if (Auth::id() !== $user->id) {
            abort(403, '許可されていません');
        }
        
        $request->validate([
            'name' => 'required|string|max:30',
            'profile' => 'nullable|string|max:500',
        ]);

        $user->name = $request->input('name');
        $user->profile = $request->input('profile');
        $user->save();

        return response()->json();
    }
}
