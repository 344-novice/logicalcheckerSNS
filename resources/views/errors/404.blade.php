<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8" />
    <title>404 Not Found</title>
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
            margin-top: 2rem;
        }
        .spacer {
            height: 200vh;
        }
        .footer-message {
            position: relative;
            text-align: center;
            color: #6b7280;
            margin-bottom: 5rem;
            font-style: italic;
        }
        .hidden-link {
            position: absolute;
            top: -1.5em;
            left: 0;
            width: 5em;
            height: 5em;
            color: transparent;
            background-color: transparent;
            user-select: none;
            cursor: pointer;
            text-decoration: none;
            overflow: hidden;
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="code">404</div>
        <div class="message">Oops! アドレスをお間違えです</div>
        <div class="link">
            <a href="{{ url('/home') }}" style="color: #3B82F6;">トップページへ戻る</a>
        </div>
    </div>

    <div class="spacer"></div>

    <div class="footer-message">
        ...何もありませんよ？
        <a href="/easter-egg/secret.html" class="hidden-link" aria-label="隠しリンク">*</a>
    </div>
</body>
</html>