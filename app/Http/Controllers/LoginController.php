<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class LoginController extends Controller
{
    public function index() {
        $data = (new User())->account();
        return view('login',$data);
    }

    public function auth(Request $request) {
        $data = (new User())->account();
        $accountName = $request->input('name-or-email');
        $password = $request->input('password');

        if (($accountName !== $data['nameOrEmail']) || ($password !== $data['password'])) {
            // ToDo:警告文を<div class="loginFail"></div>に挿入(React?)
            return view('login');
        }

        return view('home');
    }
};
