MYSQL
=====

## Comandos básicos
```
//ingresar con usario y clave
$ mysql --user=user_name --password=user_password db_name;
V
$ mysql -u user_name -puser_password db_name;

//mostrar bases de datos
$ SHOW databases;

//crear bases de datos
$ CREATE database db_name;

//salir
$ quit;

//crear usuario
$ CREATE USER 'db_user'@'localhost' IDENTIFIED BY 'user_password';
$ SELECT * FROM mysql.user;
//eliminar usuario
$ DROP USER db_user:

//privilegios
$ GRANT ALL PRIVILEGES ON db_name.* TO 'db_user'@'localhost' IDENTIFIED BY 'db_password in hasg format' WITH
GRANT OPTION;
$ FLUSH PRIVILEGES;
$ show grants for bd_user@db_host
$ GRANT ALL ON *.* TO 'koalasof'@'localhost' WITH GRANT OPTION;

//sacar backup
$ mysqldump --user=[uname] --password=[pwd] [dbname] > [backupfile.sql]
//restaurar backup
$ mysql --user=[uname] --password=[pwd] [db_to_restore] < [backupfile.sql]

```
