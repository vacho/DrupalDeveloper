MYSQL
=====

## Comandos básicos
```
Ingresar con usario y clave
  $ mysql --user=user_name --password=user_password db_name;
  V
  $ mysql -u user_name -puser_password db_name;

Mostrar bases de datos
  $ SHOW databases;

Crear bases de datos
  $ CREATE database db_name;

Usar una bases de datos
  $ USE db_name;
  //una vez que se esta con una base de datos seleccionada se puede ejecutar sql.

Salir
  $ quit;

Crear usuario
  $ CREATE USER 'db_user'@'localhost' IDENTIFIED BY 'user_password';
  $ SELECT * FROM mysql.user;

Eliminar usuario
  $ DROP USER db_user:

Privilegios a una base de datos en específico
  $ GRANT ALL PRIVILEGES ON db_name.* to 'db_user'@'localhost';
  $ FLUSH PRIVILEGES;

Privilegios a todas las bases de datos
  $ GRANT ALL PRIVILEGES ON *.* TO 'db_user'@'localhost' WITH GRANT OPTION;
  $ FLUSH PRIVILEGES;
  
Otorgar control total
  $ GRANT ALL ON *.* TO 'koalasof'@'localhost' WITH GRANT OPTION;

Ver privilegios
  $ show grants for bd_user@db_host

Sacar backup
  $ mysqldump --user=[uname] --password=[pwd] [dbname] > [backupfile.sql]

Restaurar backup
  $ mysql --user=[uname] --password=[pwd] [db_to_restore] < [backupfile.sql]

```
