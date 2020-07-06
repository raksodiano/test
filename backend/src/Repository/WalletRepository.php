<?php

namespace App\Repository;

use App\Entity\Wallet;
use App\Entity\Movement;
use App\Entity\Token;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @method Wallet|null find($id, $lockMode = null, $lockVersion = null)
 * @method Wallet|null findOneBy(array $criteria, array $orderBy = null)
 * @method Wallet[]    findAll()
 * @method Wallet[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WalletRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry, EntityManagerInterface $manager)
    {
        parent::__construct($registry, Wallet::class);
        $this->manager = $manager;
    }

    public function rechargeWallet($amount, $wallet_id)
    {
        $date = new \Datetime();
        $date = new \DateTime($date->format('Y-m-d H:i:s'));

        $wallet = $this->find($wallet_id);
        $wallet
            ->setAmount($amount)
            ->setUpdatedAt($date);

        $user = $wallet->getUser();

        $new_movement = new Movement;
        $new_movement
            ->setAmount($amount)
            ->setType(true)
            ->setCreatedAt($date)
            ->setUser($user);

        $this->manager->persist($new_movement);
        $this->manager->flush();

    }

    public function validateBalance($amount, $wallet_id)
    {
        $wallet = $this->find($wallet_id);
        $balance = $wallet->getAmount();

        return ($balance < $amount) ? true : false;
    }

    public function payment($amount, $wallet_id, $key)
    {
        $date = new \Datetime();
        $date = new \DateTime($date->format('Y-m-d H:i:s'));

        $wallet = $this->find($wallet_id);

        $user = $wallet->getUser();
        $token = $user->getToken();
        
        if (empty($token)) {
            $new_token = new Token;
            $new_token
                ->setToken($key)
                ->setAmount($amount)
                ->setStatus(true)
                ->setExpired(false)
                ->setCreatedAt($date)
                ->setUser($user);
    
            $this->manager->persist($new_token);
            $this->manager->flush();
        } else {
            $token
                ->setToken($key)
                ->setAmount($amount)
                ->setStatus(true)
                ->setExpired(false)
                ->setCreatedAt($date)
                ->setUser($user);

            $this->manager->flush();
        }
        
    }

    public function paymentConfirm($amount, $wallet_id, $key)
    {
        $date = new \Datetime();
        $date = new \DateTime($date->format('Y-m-d H:i:s'));

        $wallet = $this->find($wallet_id);
        $wallet->setAmount($wallet->getAmount() - $amount);
        $user = $wallet->getUser();

        $new_movement = new Movement;
        $new_movement
            ->setAmount($amount)
            ->setType(false)
            ->setCreatedAt($date)
            ->setUser($user);

        $this->manager->persist($new_movement);
        $this->manager->flush();

    }

    public function discountBalance($wallet_id, $key)
    {
        $date = new \Datetime();
        $date = new \DateTime($date->format('Y-m-d H:i:s'));

        $wallet = $this->find($wallet_id);
        $balance = $wallet->getAmount();
        $wallet
            ->setAmount(($balance - $amount))
            ->setUpdatedAt($date);

        $user = $wallet->getUser();

        $new_movement = new Movement;
        $new_movement
            ->setAmount($amount)
            ->setType(false)
            ->setCreatedAt($date)
            ->setUser($user);

        $new_token = $this->findOneBy(['token' => $key, 'status' => true,]);
        $new_token
            ->setToken($key)
            ->setAmount($amount)
            ->setStatus(true)
            ->setExpired(false)
            ->setCreatedAt($date)
            ->setUser($user);

        $this->manager->persist($new_token);
        $this->manager->flush();

    }

}
