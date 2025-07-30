<?php

namespace App\Services;

use League\OAuth2\Client\Grant\RefreshToken;
use League\OAuth2\Client\Provider\Google;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\OAuth;
use PHPMailer\PHPMailer\PHPMailer;

class GmailOAuthMailer
{
    protected $clientId;
    protected $clientSecret;
    protected $email;
    protected $tokenPath;
    protected $provider;

    public function __construct()
    {
        $this->clientId = config('services.gmail.client_id');
        $this->clientSecret = config('services.gmail.client_secret');
        $this->email = config('services.gmail.email');
        $this->tokenPath = storage_path('app/' . config('services.gmail.token_path'));

        $this->provider = new Google([
            'clientId'     => $this->clientId,
            'clientSecret' => $this->clientSecret,
        ]);
    }

    protected function getAccessToken()
    {
        $tokens = json_decode(file_get_contents($this->tokenPath), true);
        $refreshToken = $tokens['refresh_token'];

        $grant = new RefreshToken();
        $token = $this->provider->getAccessToken($grant, ['refresh_token' => $refreshToken]);

        return [
            'access_token' => $token->getToken(),
            'refresh_token' => $refreshToken,
        ];
    }

    public function sendPasswordResetMail(string $to, string $subject, string $body): bool
    {
        $tokens = $this->getAccessToken();

        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->Port       = 587;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->SMTPAuth   = true;
            $mail->AuthType   = 'XOAUTH2';

            $mail->setOAuth(new OAuth([
                'provider'       => $this->provider,
                'clientId'       => $this->clientId,
                'clientSecret'   => $this->clientSecret,
                'refreshToken'   => $tokens['refresh_token'],
                'userName'       => $this->email,
                'accessToken'    => $tokens['access_token'],
            ]));

            $mail->setFrom($this->email, '論理チェッカーSNS');
            $mail->addAddress($to);

            $mail->CharSet = 'UTF-8';
            $mail->Encoding = 'base64';

            $mail->Subject = $subject;
            $mail->Body    = $body;

            $mail->send();
            return true;
        } catch (Exception $e) {
            report($e);
            return false;
        }
    }
}