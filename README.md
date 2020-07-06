Evaluacion de Symfony y ReactJS
===============================
- Clonar todo el repositorio

Instalacion Backend
-------------------
- Una vez clonado moverse a la carpeta del backend y se preparan las variables de entrono

```bash
$ cd backend
$ cp .env-example .env
```

- Dentro de el archivo .env se agregan los datos de acceso de la db en la siguiente linea
cambiando **User_name** por el nombre de usuario del manejador de db y **Pasword** por la 
contrase#a del mismo, el nombre **db_test** sera el nombre de la base de datos,
es opcional cambiar el nombre.

```bash
DATABASE_URL=mysql://User_name:Pasword@127.0.0.1:3306/db_test?serverVersion=5.7
```

- Preparamos las dependencias con composer

```bash
$ composer install
```
- Culminada la instalacion se procede a crear la base de datos con sus tablas.
si se estan en sistemas GNU/Linux, se puede acortar la parte de php por ./bin/console
y este funcionara igual.

```bash
$ php bin/console doctrine:database:create
$ php bin/console doctrine:schema:update --force
```

- Finalmente iniciamos el servidor

```bash
$ php -S localhost:8000 -t public/
```

Instalacion Frontend
--------------------

- Nos movemos a la carpeta del frontend

```bash
$ cd frontend
```

- Comenzamos con la instalacion de las dependencias de ReactJS

```bash
$ npm install

or

$ yarn install
```

- finalizamos iniciando el servidor de NodeJS

```bash
$ npm start
 
or

$ yarn start
```