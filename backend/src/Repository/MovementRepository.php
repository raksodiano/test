<?php

namespace App\Repository;

use App\Entity\Movement;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @method Movement|null find($id, $lockMode = null, $lockVersion = null)
 * @method Movement|null findOneBy(array $criteria, array $orderBy = null)
 * @method Movement[]    findAll()
 * @method Movement[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MovementRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry, EntityManagerInterface $manager)
    {
        parent::__construct($registry, Movement::class);
        $this->manager = $manager;
    }

    public function movements($amount, $wallet_id)
    {
        $date = new \Datetime();
        $date = new \DateTime($date->format('Y-m-d H:i:s'));

        $new_user = new User;
        $new_user
            ->setUsername($email)
            ->setPassword($this->passwordEncoder->encodePassword($new_user, $phone));

        $new_profile = new Profile;
        $new_profile
            ->setNames($names)
            ->setDni($dni)
            ->setPhone($phone)
            ->setEmail($email)
            ->setCreatedAt($date)
            ->setUser($new_user);

        $new_wallet = new Wallet;
        $new_wallet
            ->setAmount(0)
            ->setCreatedAt($date)
            ->setUpdatedAt($date)
            ->setUser($new_user);

        $this->manager->persist($new_user);
        $this->manager->persist($new_profile);
        $this->manager->persist($new_wallet);
        $this->manager->flush();

    }

}
