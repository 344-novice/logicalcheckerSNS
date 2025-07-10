FROM php:8.2-fpm

# 必要なパッケージをインストール（curlやzipなど）
RUN apt-get update && apt-get install -y \
    curl unzip zip git libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl gd

# composerを公式サイトからインストール
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html

# storage と bootstrap/cache の書き込み権限を設定
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# composer install（開発用パッケージ除く）
RUN composer install --no-dev --optimize-autoloader

# 起動時にキャッシュを作成してphp-fpmを起動
CMD php artisan config:cache && php artisan route:cache && php artisan view:cache && php-fpm
