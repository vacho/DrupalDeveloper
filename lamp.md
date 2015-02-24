LAMP
===
```
Instalar Apache/httpd
  //fedora
  $ sudo yum install httpd
  //ubuntu
  $ sudo apt-get install apache2

Instalar Mysql
  //fedora
  $ sudo yum install mysql mysql-server
  //ubuntu
  $ sudo apt-get install mysql-server mysql-client

Ajustar opciones de Seguridad de Mysql
  //fedora
  $ sudo usr/bin/mysql_secure_installation
  //ubuntu
  $ sudo mysql_secure_installation

Instalar PHP
  //fedora
  $ sudo yum install php php-mysql
  //ubuntu
  $ sudo apt-get install php5

Buscar paquetes php a instalar
  //fedora
  $ yum search php-
  //ubuntu
  $ sudo apt-cache search php

Levantar/Detener/Reiniciar servicios(apache2/httpd/mysql)
  //fedora
  $ sudo systemctl start/stop/restart httpd.service
  //ubuntu
  $ sudo service apache2 start/stop/restart
```
Habilitar rutas amistosas: mod_rewrite
===
```
  //ubuntu
  $sudo a2enmod rewrite
  //En /etc/apache2/sistes-available/000-default.conf
  <Directory /var/www> 
    AllowOverride All 
  </Directory>
  <Directory> AllowOverride All </Directory>
```
