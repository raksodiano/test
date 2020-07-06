<?php

namespace App\Controller;

use App\Repository\WalletRepository;
use App\Repository\UserRepository;
use App\Repository\ProfileRepository;
use App\Repository\TokenRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class WalletController extends AbstractController
{
    private $walletRepository;
    private $userRepository;
    private $profileRepository;
    private $tokenRepository;

    public function __construct(
        UserRepository $userRepository,
        WalletRepository $walletRepository,
        ProfileRepository $profileRepository,
        TokenRepository $tokenRepository)
    {
        $this->userRepository = $userRepository;
        $this->walletRepository = $walletRepository;
        $this->profileRepository = $profileRepository;
        $this->tokenRepository = $tokenRepository;
    }

    public function rechargeWalletAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        $dni = $data['dni'];
        $phone = $data['phone'];
        $amount = $data['amount'];

        $code = Response::HTTP_NOT_ACCEPTABLE;
        if (empty($dni)) {
            $message = 'Debe ingresar el dni';
        } elseif (empty($phone)) {
            $message = 'Debe ingresar el numero de telefono';
        } elseif (empty($amount)) {
            $message = 'Debe ingresar un valor';
        } else {
            $message = 'Regarga hecha con exito!';
            $code = Response::HTTP_OK;
        }

        $exists = $this->profileRepository->existProfile($phone, $dni);

        if ($exists['pass']) {
            return new JsonResponse([
                'message' => $exists['message'],
            ], Response::HTTP_NOT_FOUND);
        }

        $this->walletRepository->rechargeWallet($amount, $exists['wallet_id']);

        return new JsonResponse([
            'message' => $message,
        ], $code);
    }

    public function paymentAction(Request $request)
    { 
        $data = json_decode($request->getContent(), true);
        
        $amount = $data['amount'];
        $email = $data['email'];

        if (empty($amount)) {
            return new JsonResponse([
                'message' => 'Debe ingresar un valor'
            ], Response::HTTP_NOT_ACCEPTABLE);
        }

        $wallet_id = $this->userRepository->validateEmail($email);

        $balance = $this->walletRepository->validateBalance($amount, $wallet_id);

        if ($balance) {
            return new JsonResponse([
                    'message' => 'No cuenta con suficiente balance'
                ], Response::HTTP_NOT_ACCEPTABLE);
        }

        $key = '';
        $pattern = '1234567890abcdefghijklmnopqrstuvwxyz';
        $max = strlen($pattern)-1;
        for($i=0;$i < 6 ;$i++) $key .= $pattern{mt_rand(0,$max)};

        $payment = $this->walletRepository->payment($amount, $wallet_id, $key);
        
        return new JsonResponse([
            'message' => 'Ingrese el siguiente codigo para confirmar el pago, codigo: ' . $key,
        ], Response::HTTP_OK);

    }

    public function confirmPaymentAction(Request $request)
    { 

        $data = json_decode($request->getContent(), true);
        
        $key = $data['key'];
        $email = $data['email'];

        if (empty($key)) {
            return new JsonResponse([
                'message' => 'Debe ingresar el codigo'
            ], Response::HTTP_NOT_ACCEPTABLE);
        }

        $wallet = $this->userRepository->validateWallet($email);

        $balance = $this->walletRepository->validateBalance(
            $wallet['amount'], 
            $wallet['wallet_id']
        );
        
        if ($balance) {
            return new JsonResponse([
                    'message' => 'No cuenta con suficiente balance'
                ], Response::HTTP_NOT_ACCEPTABLE);
        }

        $user_id = $this->userRepository->validateEmail($email);
        $token_id = $this->userRepository->validateToken($email, $key);

        $this->walletRepository->paymentConfirm(
            $wallet['amount'], 
            $wallet['wallet_id'], 
            $key
        );

        $this->tokenRepository->updatedToken($token_id);

        return new JsonResponse([
            'message' => 'Confirmacion de pago hecha correctamente!',
        ], Response::HTTP_OK);

    }
}
