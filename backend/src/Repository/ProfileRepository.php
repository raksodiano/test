<?php

namespace App\Repository;

use App\Entity\Profile;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @method Profile|null find($id, $lockMode = null, $lockVersion = null)
 * @method Profile|null findOneBy(array $criteria, array $orderBy = null)
 * @method Profile[]    findAll()
 * @method Profile[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProfileRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry, EntityManagerInterface $manager)
    {
        parent::__construct($registry, Profile::class);
        $this->manager = $manager;
    }

    public function existsProfile($email, $phone)
    {

        $exists = $this->findOneBy([
            'email' => $email,
            'phone' => $phone
        ]);

        if (empty($exists)) {
            return [
                'message' => "Email o telefono erroneo",
                'pass' => true,
            ];
        }

        $obj = [
            'id' => $exists->getId(),
            'email' => $exists->getEmail(),
            'phone' => $exists->getPhone(),
            'names' => $exists->getNames(),
        ];

        return [
            'pass' => false,
            'message' => '',
            'obj' => $obj
        ];
    }

    public function dataExists($email, $phone, $dni)
    {

        $exists = $this->findBy(['dni' => $dni]);

        if (!empty($exists)) {
            return [
                'message' => "Documento de identidad ya registrado!",
                'pass' => true,
            ];
        }

        $exists = $this->findBy(['email' => $email]);

        if (!empty($exists)) {
            return [
                'message' => "Email ya registrado!",
                'pass' => true,
            ];
        }

        $exists = $this->findBy(['phone' => $phone]);

        if (!empty($exists)) {
            return [
                'message' => "Telefono ya registrado!",
                'pass' => true,
            ];
        }

        return [
            'pass' => false,
            'message' => ''
        ];
    }

    // /**
    //  * @return Profile[] Returns an array of Profile objects
    //  */
    /*
      public function findByExampleField($value)
      {
      return $this->createQueryBuilder('p')
      ->andWhere('p.exampleField = :val')
      ->setParameter('val', $value)
      ->orderBy('p.id', 'ASC')
      ->setMaxResults(10)
      ->getQuery()
      ->getResult()
      ;
      }
    */

    /*
      public function findOneBySomeField($value): ?Profile
      {
      return $this->createQueryBuilder('p')
      ->andWhere('p.exampleField = :val')
      ->setParameter('val', $value)
      ->getQuery()
      ->getOneOrNullResult()
      ;
      }
    */
}
