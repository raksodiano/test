<?php

namespace App\Controller;

use App\Repository\WalletRepository;
use App\Repository\UserRepository;
use App\Repository\ProfileRepository;
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

    public function __construct(
        UserRepository $userRepository,
        WalletRepository $walletRepository,
        ProfileRepository $profileRepository)
    {
        $this->userRepository = $userRepository;
        $this->walletRepository = $walletRepository;
        $this->profileRepository = $profileRepository;
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
        }

        $exists = $this->profileRepository->existProfile($phone, $dni);

        if ($exists['pass']) {
            return new JsonResponse([
                'message' => $exists['message'],
            ], Response::HTTP_NOT_FOUND);
        }

        $this->walletRepository->rechargeWallet($amount, $exists['wallet_id']);

        return new JsonResponse([
            'message' => 'Regarga hecha con exito!',
        ], Response::HTTP_OK);
    }
}
