<!DOCTYPE html>
<html lang="{{  app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="ID=edge">
        <meta name="viewpoint" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
    </head>
    <body>
        <h1>トップページ</h1>
        <a href="user">マイページ</a>
        <a href="/login">ログアウト</a>
        <div class="logicalCheckerFeedback"></div>
        <form action="home" method="post" name="post">
            @csrf
            <p>投稿フォーム</p>
            <input type="text" name="postText"><br>
            <input type="submit" id="submit" value="投稿"><br>
        </form>
        <a href="user">ユーザー詳細</a>
        <a href="post">{{ $text }}</a>
    </body>
</html>