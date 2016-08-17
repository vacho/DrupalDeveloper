CONSOLE
========

#### Instalar Composer globalmente (pre-requisito)
```
$ curl -sS https://getcomposer.org/installer | php
$ mv composer.phar /usr/local/bin/composer
Para fedora, aws EC2
$ ln -s /usr/local/bin/composer /usr/bin/composer
```

Console
===
#### Instalar globalmente
```
$ curl https://drupalconsole.com/installer -L -o drupal.phar
$ mv drupal.phar /usr/local/bin/drupal
$ chmod +x /usr/local/bin/drupal
Probar
$ drupal list
```


#### Iniciar las configuraciones de la consola
```
Inicializar configuraciones por defecto de drupal
$ drupal init

(opcional)Para usar Fish: Crear enlace simbólico
ln -s ~/.console/drupal.fish ~/.config/fish/completions/drupal.fish

```

#### Instalar Drupal

```
Bajar drupal
$ drupal site:new nombreInstancia 8.1.8

Instalar drupal
$ cd nombreInstancia
$ drupal site:install

$ chown www-data:www-data -R sites/default/files/
$ chmod 755 -R sites/default/files/
$ drupal cache:rebuild

```
#### Comandos útiles

```
Limpiar caches
$ drupal cache:rebuild
(Se puede elegir que cache limpiar despues de dar Enter, elegir con las fechas arriba, abajo)

Instalar un módulo
$ drupal module:download nombreDelModulo
$ drupal module:install nombreDelModulo

Poner el sitio en modo dev
$ drupal site:mode dev

Poner el sitio en modo prod
$ drupal site:mode prod

Actualizar entidades código respecto base de datos y el sistema
$ drupal update:entities

```
#### Solución errores comunes

```
Timezone America/Tijuana

/etc/php5/cli/php.ini
Editar la línea por ejemplo
date.timezone = America/La_Paz
```

ENLACES Y FUENTES
=================
Composer
https://getcomposer.org/doc/00-intro.md#globally

Documentación oficial
https://hechoendrupal.gitbooks.io/drupal-console/content/es/index.html

Sitio
https://drupalconsole.com/

Repositorio
https://github.com/hechoendrupal/DrupalConsole
