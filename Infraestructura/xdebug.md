XDEBUG
========

#### Instalar
```
Instalar el paquete para desarrolladores php
sudo apt install php7.2-dev

Obtener archivo con información del entorno php
$ sudo php -i > ~/php-info.txt

Subir el archivo generado php-info.txt al generador de paso para instalar en
https://xdebug.org/wizard.php
Ejecutar los paso generados...

Conecta xdebug con el editor
$ sudo apt install php-xdebug

Editar xdebug.ini
$ sudo vim /etc/php/7.0/mods-available/xdebug.ini
Copiar la siguiente configuración
zend_extension = /usr/lib/php/20170718/xdebug.so
xdebug.remote_autostart = 1
xdebug.remote_enable = 1
xdebug.remote_handler = dbgp
xdebug.remote_host = 127.0.0.1
xdebug.remote_log = /tmp/xdebug_remote.log
xdebug.remote_mode = req
xdebug.remote_port = 9005 #if you want to change the port you can change

Reiniciar apache
$ sudo service apache2 restart

```

ENLACES Y FUENTES
=================
Guía para instalar
https://blog.thamaraiselvam.com/finally-configured-xdebug-with-sublime-text-3-on-ubuntu-17-04-ea19aff56c67
