<?php

namespace App\Repository;

use App\Entity\Wallet;
use App\Entity\Movement;
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


}
