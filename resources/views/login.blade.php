<!DOCTYPE html>
<html lang="{{  app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="ID=edge">
        <meta name="viewpoint" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
    </head>
    <body>
        <h1>ログイン</h1>
        <div class="loginFail"></div>
        <form action="/login" method="POST" name="login">
            @csrf
            <p>アカウント名もしくはメールアドレス</p>
            <input type="text" name="name-or-email"><br>
            <p>パスワード</p>
            <input type="password" name="password">
            <input type="submit" id="submit" value="ログイン"><br>
            <a href="/signin">アカウント登録がまだの方はこちら</a>
        </form>
    </body>
</html>