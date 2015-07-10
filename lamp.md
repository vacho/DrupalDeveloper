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
```

Optimizar php
===
```
UBUNTU
En /etc/php5/apache2/php.ini
  realpath_cache_size = 1024k
  realpath_cache_ttl = 3600
  max_execution_time = 3600
  max_input_time = 3600
  memory_limit = 256M
  post_max_size = 50M
  upload_max_filesize = 256M
Para ambiente de desarrollo es bueno tener todos los mensajes menos algunos
  error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT & ~E_NOTICE
```

Optimizar mysql
===
```
UBUNTU
En /etc/mysql/my.cnf
  max_binlog_size = 100M
  query_cache_limit = 1M
  query_cache_size = 16M
  key_buffer = 16M
  max_allowed_packet = 16M
  max_connections    = 50
  table_cache        = 1024
  innodb_buffer_pool_size = 128M
  innodb_flush_log_at_trx_commit = 2

Si se esta empleando innodb 
  innodb_buffer_pool_size = 512M
  innodb_additional_mem_pool_size = 50M
  innodb_log_file_size = 128M
  innodb_log_buffer_size = 8M
  innodb_flush_log_at_trx_commit = 2
  innodb_lock_wait_timeout = 60
  
```

Referencias
====
Drupal al sur
http://drupalalsur.org/videos/optimizar-php-y-mysql-para-drupal-7
