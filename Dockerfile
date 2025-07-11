FROM php:8.2-fpm

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libpng-dev libonig-dev libxml2-dev \
    nginx \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl gd

# composerを公式イメージからコピー
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# ソースコードをコピー
COPY . .

# composerインストール
RUN composer install --no-dev --optimize-autoloader

# nginx設定ファイルをコンテナ内にコピー
COPY nginx.conf /etc/nginx/nginx.conf

# entrypointスクリプトの準備（.env動的生成、キャッシュ更新など）
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# ポート公開
EXPOSE 80

# entrypointとしてスクリプトを指定
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

# コンテナ起動時にLaravelの開発サーバーを起動
CMD ["php-fpm", "-F"]