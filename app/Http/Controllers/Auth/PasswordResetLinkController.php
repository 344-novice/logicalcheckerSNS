<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\GmailOAuthMailer; 
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\View\View;

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create(): View
    {
        return view('auth.forgot-password');
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'email'],
        ]);
        
        $user = \App\Models\User::where('email', $request->email)
                        ->where('name', $request->name)
                        ->first();

        if (!$user) {
            return back()->withErrors(['password-reset' => __('アカウント名またはメールアドレスが正しくありません')]);
        }

        /** @var \Illuminate\Auth\Passwords\PasswordBroker $broker */
        $broker = Password::broker();

        $token = $broker->createToken($user);

        $resetPath = route('password.reset', [
            'token' => $token,
            'email' => $user->email,
        ], false);

        $resetUrl = config('app.url') . $resetPath;

        try {
            (new GmailOAuthMailer())->sendPasswordResetMail(
                to: $user->email,
                subject: '【パスワード再設定】リンクをお送りします',
                body: "以下のURLからパスワードを再設定してください：\n\n{$resetUrl}\n\nこのリンクは60分で期限切れになります。"
            );
        } catch (\Exception $e) {
            return back()->withErrors(['email' => 'メール送信に失敗しました：' . $e->getMessage()]);
        }

        return back()->with('status', 'パスワードリセットリンクを送信しました。');
    }
}
