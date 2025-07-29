<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>419 Page Expired</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
            background-color: #f3f4f6;
            color: #111827;
        }
        .container {
            text-align: center;
            padding: 12rem 1rem 2rem;
        }
        .code {
            font-size: 6rem;
            font-weight: bold;
        }
        .message {
            font-size: 1.5rem;
            margin-top: 1rem;
        }
        .link {
            text-align: center;
            margin-top: 1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="code">419</div>
        <div class="message"></div>サーバーはただいま離席中です。ログインでアポを取って再度訪問のほどよろしくお願いします。</div>
        <div class="link">
            <a href="{{ url('/home') }}" style="color: #3B82F6;">トップページへ戻る</a>
        </div>
    </div>
</body>
</html>
