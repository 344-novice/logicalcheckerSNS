<!DOCTYPE html>
<html lang="{{  app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="ID=edge">
        <meta name="viewpoint" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
    </head>
    <body>
        <h1>アカウント登録</h1>
        <form action="/" method="post" name="login">
            @csrf
            <p>アカウント名もしくはメールアドレス</p>
            <input type="text" id="name-or-email"><br>
            <p>パスワード</p>
            <input type="password" id="password">
            <input type="submit" id="submit" value="登録"><br>
        </form>
    </body>
</html>