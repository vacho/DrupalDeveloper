LAMP
===
```
UBUNTU
Instalar Apache/httpd
  $ sudo apt-get install apache2

Instalar Mysql
  $ sudo apt-get install mysql-server mysql-client

Ajustar opciones de Seguridad de Mysql
  $ sudo mysql_secure_installation

Instalar PHP
  $ sudo apt-get install php5
  $ sudo apt-get install php5-cli
  $ sudo apt-get install libapache2-mod-php5

Buscar paquetes php a instalar
  $ sudo apt-cache search php

Paquetes útiles php
  $ sudo apt-get install php5-mysql
  $ sudo apt-get install php5-gd
  $ sudo apt-get install php5-curl
  $ sudo apt-get install php5-cgi
  $ sudo apt-get install php-pear

Levantar/Detener/Reiniciar servicios(apache2/httpd/mysql)
  $ sudo service apache2 [start/stop/restart]

FEDORA
Instalar Apache/httpd
  $ sudo yum install httpd

Instalar Mysql
  $ sudo yum install mysql mysql-server

Ajustar opciones de Seguridad de Mysql
  $ sudo usr/bin/mysql_secure_installation

Instalar PHP
  $ sudo yum install php php-mysql

Buscar paquetes php a instalar
  $ yum search php-

Levantar/Detener/Reiniciar servicios(apache2/httpd/mysql)
  $ sudo systemctl start/stop/restart httpd.service
  
```
Rutas amistosas: mod_rewrite
===
```
UBUNTU
  $sudo a2enmod rewrite
En /etc/apache2/sistes-available/000-default.conf
  <Directory /var/www/html> 
    AllowOverride All 
  </Directory>
```
Hosts virtuales
===
```
UBUNTU
Crear archivo midominio.conf
  $sudo vim /etc/apache2/sites-available/midominio.conf

Dentro del archivo copiar, adaptar y guardar
  <VirtualHost *:80>
    ServerName www.midominio.com
    ServerAlias midominio.com *midominio.com
    DocumentRoot /var/www/html/midominio
  </VirtualHost>

Crear el link simbólico 
  $ sudo a2ensite midominio.com

Agregar los hosts en el archivo
  $ sudo vim etc/hosts
Escribir:
  127.0.0.1	midominio.com	midominio.com

Reiniciar apache

Opcional: Deshabilitar el sitio
  $ sudo a2dissite midominio.com
  $ sudo service apache2 restart
```

PHPMYADMIN
===
```
UBUNTU
  $ sudo apt-get install phpmyadmin
crear enlace simbólico
  $ sudo ln -s /usr/share/phpmyadmin /var/www/html
```
