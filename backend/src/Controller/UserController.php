<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Repository\ProfileRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends AbstractController
{

    private $userRepository;
    private $profileRepository;

    public function __construct(UserRepository $userRepository, ProfileRepository $profileRepository)
    {
        $this->userRepository = $userRepository;
        $this->profileRepository = $profileRepository;
    }

    public function loginCheckAction()
    {}

    public function registerClientAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        $names = $data['names'];
        $dni = $data['dni'];
        $phone = $data['phone'];
        $email = $data['email'];

        $code = Response::HTTP_NOT_ACCEPTABLE;
        if (empty($names)) {
            $message = 'Debe ingresar un nombre';
        } elseif (empty($dni)) {
            $message = 'Debe ingresar un el dni';
        } elseif (empty($phone)) {
            $message = 'Debe ingresar un numero de telefono';
        } elseif (empty($email)) {
            $message = 'Debe ingresar un correo electronico';
        } else {
            $message = 'Registrado con exito!';
            $code = Response::HTTP_CREATED;
        }

        $exists = $this->profileRepository->dataExists($email, $phone, $dni);

        if ($exists['pass']) {
            return new JsonResponse([
                'message' => $exists['message'],
            ], Response::HTTP_NOT_ACCEPTABLE);
        }

        $client = $this->userRepository->saveClient($names, $dni, $phone, $email);

        return new JsonResponse([
            'message' => $message,
        ], $code);
    }
}
