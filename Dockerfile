FROM php:8.2-fpm

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl gd

# composerをコピー
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# ソースコードをコピー
COPY . .

# storageとbootstrap/cacheの書き込み権限を変更
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# composer installだけ実行（キャッシュは起動時に作成）
RUN composer install --no-dev --optimize-autoloader

# 起動時にキャッシュ作成してphp-fpm起動
CMD php artisan config:cache && php artisan route:cache && php artisan view:cache && php-fpm
