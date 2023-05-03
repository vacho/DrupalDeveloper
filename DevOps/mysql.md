MYSQL
=====
## Comandos gestion
```bash
# Reiniciar mysql (ubuntu)
 $ service mysql restart  
# Reiniciar mysql (fedora)
 $ /etc/init.d/mysqld restart  
```

## Comandos administrativos
```bash
# Ingresar con usario y clave
  $ mysql --user=user_name --password=user_password db_name;
# V
  $ mysql -u user_name -puser_password db_name;

# Mostrar bases de datos y tablas
  $ SHOW databases;
  $ SHOW tables;

# Crear bases de datos
  $ CREATE database db_name;

# Usar una bases de datos
  $ USE db_name;
  //una vez que se esta con una base de datos seleccionada se puede ejecutar sql.

# Salir
  $ quit;

# Crear usuario
  $ CREATE USER 'db_user'@'localhost' IDENTIFIED BY 'user_password';
  $ SELECT * FROM mysql.user;

# Asignar clave a un usuario (ejemplo al usuario root)
  $ mysql -u root
  SET PASSWORD FOR 'root'@'localhost' = PASSWORD('clave');
  SET PASSWORD FOR 'root'@'127.0.0.1' = PASSWORD('clave');
  SET PASSWORD FOR 'root'@'%' = PASSWORD('clave');

# Cambiar de clave
  $ mysql -u user_name -p'user_password' new_password

# Eliminar usuario
  $ DROP USER db_user:

# Privilegios a una base de datos en específico
  $ GRANT ALL PRIVILEGES ON db_name.* to 'db_user'@'localhost';
  $ FLUSH PRIVILEGES;

# Privilegios a todas las bases de datos
  $ GRANT ALL PRIVILEGES ON *.* TO 'db_user'@'localhost' WITH GRANT OPTION;
  $ FLUSH PRIVILEGES;
  
# Otorgar control total
  $ GRANT ALL ON *.* TO 'koalasof'@'localhost' WITH GRANT OPTION;

# Ver privilegios
  $ show grants for bd_user@db_host

# Sacar backup
  $ mysqldump --user=[uname] --password=[pwd] [dbname] > [backupfile.sql]

# Restaurar backup
  $ mysql --user=[uname] --password=[pwd] [db_to_restore] < [backupfile.sql]

```
## Comandos básicos
```bash
# Eliminar todos los registros de una tabla
  $ TRUNCATE TABLE <nombre_tabla>
```
## Estados y configuraciones de la base de datos
```bash
#Ver de una tabla en específico
  $ SHOW TABLE STATUS LIKE 'k_caeb';
#Ver de los campos de una tabla
  $ SELECT COLUMN_NAME, TABLE_NAME, CHARACTER_SET_NAME, COLUMN_TYPE COLLATION_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = 'bdcli_octopus_technologies' AND TABLE_NAME = 'k_caeb';
#Ver de la base de datos
  $  SELECT * FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'bdman_sistema';
```
## Comandos avanzados
```bash
#Eliminar varias bases de datos
  $ mysql> SELECT CONCAT('DROP DATABASE ',schema_name,' ;') AS stmt FROM information_schema.schemata WHERE schema_name LIKE 'bdkhipu\_%' ESCAPE '\\' ORDER BY schema_name
```

Referencias
===
http://www.rackspace.com/knowledge_center/article/installing-mysql-server-on-centos
