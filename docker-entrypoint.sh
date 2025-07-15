#!/bin/sh
set -e

# .env ファイルを生成（fly secretsやDockerfile環境変数から注入）
env | grep -E '^(APP|DB|MAIL|LOG|SESSION|QUEUE|OPENAI)_' | while IFS='=' read -r key value
do
  # 値にスペースや特殊文字があればクォートする
  case "$value" in
    *[!a-zA-Z0-9_./-]*)
      echo "$key=\"${value}\""
      ;;
    *)
      echo "$key=$value"
      ;;
  esac
done > /var/www/html/.env

# Laravel設定キャッシュ
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 起動ログ
echo "[Entrypoint] Running CMD: $@"

# 起動
php-fpm &
exec nginx -g 'daemon off;'
