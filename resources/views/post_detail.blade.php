<!DOCTYPE html>
<html lang="{{  app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="ID=edge">
        <meta name="viewpoint" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
    </head>
    <body>
        <h1>投稿詳細</h1>
        <a href="user">マイページ</a>
        <a href="/">ログアウト</a>
        <form action="/home" method="post" name="delete">
            @csrf
            <p>hogehoge</p>
            <button>削除</button>
        </form>
        <a href="home">ホームに戻る</a>
    </body>
</html>