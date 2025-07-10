# PHP公式の8.2 FPMイメージを使う
FROM php:8.2-fpm

# 必要なパッケージをインストール（composerや拡張も含む）
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl gd

# composerを公式イメージからコピー
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 作業ディレクトリを設定
WORKDIR /var/www/html

# すべてのファイルをコンテナにコピー
COPY . .

# composerインストール＆キャッシュ
RUN composer install --no-dev --optimize-autoloader \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# ポートを公開（Renderは環境変数PORTを使う場合もあるので要確認）
EXPOSE 8000

# 起動コマンド
CMD ["php-fpm"]
