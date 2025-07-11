FROM php:8.2-fpm

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl gd

# composerを公式イメージからコピー
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# ソースコードをコピー
COPY . .

# composerインストール（production向け）
RUN composer install --no-dev --optimize-autoloader

# ポート公開
EXPOSE 8000

# entrypointスクリプトをコピー＆実行権限付与
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# entrypointとしてスクリプトを指定
ENTRYPOINT ["docker-entrypoint.sh"]

# コンテナ起動時にphp-fpmを実行
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]