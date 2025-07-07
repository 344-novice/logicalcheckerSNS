<?php

namespace App\Services;

class ImageService
{
    public static function getTransformedUrl(?string $originalUrl, string $transform): ?string
    {
        if (empty($originalUrl)) {
            return null;
        }

        return str_replace(
            '/upload/',
            '/upload/' . $transform . '/',
            $originalUrl
        );
    }
}
