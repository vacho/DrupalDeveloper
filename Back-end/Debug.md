Depurar el código
========

#### Xdebug en local
Permite ver las variables y su contenido de manera eficiente y en tu editor de código favorito

1. Instalar
```
$ sudo apt-get install php-xdebug

// Configurar en php.ini
html_errors = On

// Configuraciones en php.ini opcionales
display_errors = On
display_startup_errors = On
error_reporting = E_ALL
```

2. Configurar xdebug
en /etc/php/[version_php]/mods-available/xdebug.ini
```
zend_extension=/usr/lib/php/20190902/xdebug.so
xdebug.remote_autostart = 1
xdebug.remote_enable = 1
xdebug.remote_handler = dbgp
xdebug.remote_host = 127.0.0.1
xdebug.remote_log = /tmp/xdebug_remote.log
xdebug.remote_mode = req
xdebug.remote_port = 9000
```
3. Reiniciar servicios
```
$ service apache2 restart
```

4. Instalar plugin para el navegador web
```
Plugin chrome
https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc/related
```

4. Configurar phpStorm
```
- Verificar si tenemos el proyecto con Xdebug
Confurations > Languages & Framework > PHP > Debug > Validate

- Configurar la conexión en "Edit configurations" (menú superior lado izquierdo de play)
Crear desde Templates un "PHP Web Page"
Colocar
Start ULR: / (u otro url del proyecto)
Browser: Chrome (u otro)

En "server" dar click en "..."
Host:mi_proyecto_local.com
Port: 80
Debugger: Xdebug
Check "Use path mappings..."
En "Absolute path on the server" colocar la ruta al index del proyecto. Ej: /var/www/html/mi_proyecto_local/docroot

- Empezar a escuchar conexiones php debug
Dar click en el icono telefono "Start listening"

- Empezar a debuguear 
Navegar en el proyecto
```

#### Xdebug en docker


ENLACES Y FUENTES
=================
https://lucidar.me/en/aws-cloud9/how-to-install-and-configure-xdebug-on-ubuntu/

https://dev.to/thamaraiselvam/configure-xdebug-php-7-nginx-any-linux-distribution-3ic0

https://gist.github.com/RazaChohan/51bffc660d52eae8a75dd0f9503740bf

https://blog.liip.ch/archive/2016/06/20/lets-debug-drupal-8.html
