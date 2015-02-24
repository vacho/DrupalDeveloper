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
  $ sudo apt-get install php5-cli

Buscar paquetes php a instalar
  //fedora
  $ yum search php-
  //ubuntu
  $ sudo apt-cache search php

Paquetes útiles php
  //ubuntu
  $ sudo apt-get install php5-mysql
  $ sudo apt-get install php5-gd
  $ sudo apt-get install php5-curl
  $ sudo apt-get install php5-cgi
  $ sudo apt-get install php-pear

Levantar/Detener/Reiniciar servicios(apache2/httpd/mysql)
  //fedora
  $ sudo systemctl start/stop/restart httpd.service
  //ubuntu
  $ sudo service apache2 start/stop/restart
```
Rutas amistosas: mod_rewrite
===
```
  //ubuntu
  $sudo a2enmod rewrite
```  
En /etc/apache2/sistes-available/000-default.conf
```
  <Directory /var/www/html> 
    AllowOverride All 
  </Directory>
```
PHPMYADMIN
===
```
  //ubuntu
  $ sudo apt-get install phpmyadmin
  // crear enlace simbólico
  $ sudo ln -s /usr/share/phpmyadmin /var/www/html
```
