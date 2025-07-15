FROM php:8.2-fpm

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    git unzip zip curl libzip-dev libpng-dev libonig-dev libxml2-dev gnupg \
    nginx \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl gd

# Node.js（LTS）をインストール（Vite用）
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm

# composerをコピー
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# ソースコードをコピー
COPY . .

# 依存関係インストール
RUN composer install --no-dev --optimize-autoloader \
    && npm install \
    && npm run build

# nginx設定ファイルをコンテナ内にコピー
COPY nginx.conf /etc/nginx/nginx.conf

# entrypointスクリプトの準備（.env動的生成、キャッシュ更新など）
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# ポート公開
EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
