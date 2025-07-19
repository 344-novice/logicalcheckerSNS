<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Cloudinary\Cloudinary;
use Illuminate\Support\Facades\Config;

class CloudinaryController extends Controller
{
    public function uploadImage(Request $request)
    {
        $request->validate([
            'file' => 'required|file|image|max:10240',
        ]);

        $cloudinary = new Cloudinary([
            'cloud' => [
                'api_key'    => config('cloudinary.api_key'),
                'api_secret' => config('cloudinary.api_secret'),
                'cloud_name' => config('cloudinary.cloud_name'),
            ],
        ]);

        $file = $request->file('file');

        $timestamp = time();
        $publicId = 'user_thumbnails/' . pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . "_{$timestamp}";

        $result = $cloudinary->uploadApi()->upload(
            $file->getPathname(),
            [
                'folder' => 'user_thumbnails',
                'public_id' => $publicId,
            ]
        );

        return response()->json([
            'secure_url' => $result['secure_url'],
            'public_id' => $result['public_id'],
        ]);
    }
}
