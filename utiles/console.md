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

$ chown www-data:www-data -R sites/default
$ chmod 755 -R sites/default
$ drupal cache:rebuild

```
#### Comandos de desarrollo

```
Crear un módulo
$ drupal generate:module

Crear una entidad de contenido
$ drupal generate:entity:content

Actualizar entidades despues de hacer modificaciones
$ drupal update:entities

Exportar configuraciones
$ drupal config_split:export --no-interaction

Debuguear una configuración activa
$ drupal debug:config mi_modulo.mi_plugin --show-overridden
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
```
#### Solución errores comunes

```
Timezone America/Tijuana

/etc/php5/cli/php.ini
Editar la línea por ejemplo
date.timezone = America/La_Paz

No quiere ejecutar porque necesita se añadan dependencias en el proyecto
$ composer require drupal/console:~1.0 --prefer-dist --optimize-autoloader

No quiere actualizar dependencia con composer en servidor producción
1. Ejecutar en ambiente local
$composer update 
2. Copiar el archivo "composer.lock" de local al servidor de producción
3. Ejecutar en el servidor de producción  
$ composer install

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

Resumen de comandos
http://drupalconsole.com/cheatsheet/
