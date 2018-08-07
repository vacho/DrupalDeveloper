LAMP
===
```
UBUNTU 16.04 con php 7 y mysql 5.7.x
Instalar Apache/httpd
  $ sudo apt-get install apache2
Ver log de errores de apache 
  $ vim /var/log/apache2/error.log

Instalar Mysql
  $ sudo apt-get install mysql-server mysql-client

Ajustar opciones de Seguridad de Mysql
  $ sudo mysql_secure_installation

Habilitar que el usuario root puede loguearse por consola y web
  $ sudo mysql -u root
  $ ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mi_clave'; 

Instalar PHP
  $ sudo apt-get install php
  $ sudo apt-get install php-cli
  $ sudo apt-get install libapache2-mod-php
o
  $ sudo apt-get install php php-cli libapache2-mod-php

Buscar paquetes php a instalar
  $ sudo apt-cache search php

Paquetes útiles php
  $ sudo apt-get install php-mysql
  $ sudo apt-get install php-gd
  $ sudo apt-get install php-curl
  $ sudo apt-get install php-cgi
  $ sudo apt-get install php-pear
  $ sudo apt-get install php-mcrypt
  $ sudo apt-get install php7.0-mbstring
  $ sudo apt-get install php-mbstring
  $ sudo apt-get install php-gettext
  $ sudo apt-get install php-bcmath
o
  $ sudo apt-get install php-mysql php-gd php-curl php-cgi php-pear php-mcrypt php7.0-mbstring php-mbstring php-gettext php-bcmath
  
Levantar/Detener/Reiniciar servicios(apache2/httpd/mysql)
  $ sudo service apache2 [start/stop/restart]

Permitir que el usuario funcione como apache
  $ sudo chown -R usuario:usuario html
  $ sudo usermod -a -G www-data usuario
  $ sudo adduser usuario www-data
  
```
Rutas amistosas: mod_rewrite
===
```
UBUNTU
  $sudo a2enmod rewrite
En /etc/apache2/sites-available/000-default.conf
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

Crear el link simbólico estando en /etc/apache2/sites-available
  $ sudo a2ensite midominio.conf

Agregar los hosts en el archivo
  $ sudo vim etc/hosts
Escribir:
  127.0.0.1	midominio.com	www.midominio.com

Reiniciar apache
  $ sudo service apache2 restart

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
cambiar el tiempo maximo de session (1440 segundos por defecto)
  Settings->Features->General->Login cookie validity
Cambiar en php.ini
  session.gc_maxlifetime = MismoValorConfigurado
```

Optimizar php
===
```
UBUNTU
En /etc/php/7.0/apache2/php.ini
  realpath_cache_size = 1024k
  realpath_cache_ttl = 3600
  max_execution_time = 3600
  max_input_time = 3600
  memory_limit = 256M
  post_max_size = 56M
  upload_max_filesize = 256M
Para ambiente de desarrollo es bueno tener todos los mensajes menos algunos
  error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT & ~E_NOTICE
```

Optimizar mysql
===
```
En /etc/mysql/my.cnf

[mysqld]
query_cache_size   = 64M
query_cache_type   = ON
max_allowed_packet = 128M
max_connections    = 100

innodb_buffer_pool_size        = 3072M
innodb_log_file_size           = 1024M
innodb_flush_method            = O_DIRECT
innodb_log_buffer_size         = 128M
innodb_flush_log_at_trx_commit = 2
sync_binlog                    = 0
innodb_thread_concurrency      = 4

```

Referencias
====
Drupal al sur
http://drupalalsur.org/videos/optimizar-php-y-mysql-para-drupal-7

Optimizar mysql
http://www.speedemy.com/17-key-mysql-config-file-settings-mysql-5-7-proof/
