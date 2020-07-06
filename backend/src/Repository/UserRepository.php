<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\Profile;
use App\Entity\Wallet;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    private $passwordEncoder;

    public function __construct(
        ManagerRegistry $registry,
        EntityManagerInterface $manager,
        UserPasswordEncoderInterface $passwordEncoder
    )
    {
        parent::__construct($registry, User::class);
        $this->manager = $manager;
        $this->passwordEncoder = $passwordEncoder;
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(UserInterface $user, string $newEncodedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
        }

        $user->setPassword($newEncodedPassword);
        $this->_em->persist($user);
        $this->_em->flush();
    }

    public function saveClient($names, $dni, $phone, $email)
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

    // /**
    //  * @return User[] Returns an array of User objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
