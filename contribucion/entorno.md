Entorno
========
#### Docker con sqlite + correr tests unitarios
```
Descargar el core de drupal
https://www.drupal.org/project/drupal/git-instructions

Descargar Makefile para correr un docker de drupal sobre sqlite
https://gist.github.com/andypost/f8e359f2e80cb7d4737350189f009646#file-makefile

Ejecutar composer
$ composer install 

Ejecutar ambiente docker
$ make -s up
Revisar en: http://localhost:8080/

Ejecutar los tests de un módulo. Ejemplo Taxonomy
$ make t t=core/modules/taxonomy/tests/src/Unit/Menu/TaxonomyLocalTasksTest.php
```
#### Entorno local + correr tests unitarios + verificación estándares del código
```
Descargar el core de drupal y colocar en una carpeta local que levante un host normal como sueles hacerlo en tu entorno.
https://www.drupal.org/project/drupal/git-instructions

Entrar en la carpeta de drupa y ejecutar composer
$ composer install 

Instalar drupal (puede ser desde el navegador)

ENTORNO PARA TESTGS UNITARIOS
Activar entorno para ejecutar tests unitarios
$ mkdir sites/default/simpletest
$ chmod 777 -R sites/default/simpletest
$ cp core/phpunit.xml.dist core/phpunit.xml

Configurar el archivo phpunit.xml modificando las variables de entorno
 <env name="SIMPLETEST_BASE_URL" value="http://www.contribdrupal.com/"/>
 <env name="SIMPLETEST_DB" value="mysql://usuarioBD:claveBD@localhost/nombreBD"/>

Ejecutar los tests: Ejemplo
vendor/bin/phpunit --configuration core core/tests/Drupal/KernelTests/Core/Bootstrap/GetFilenameTest.php

ENTORNO PARA VERIFICACIÓN DE ESTÁNDARES DEL CÓDIGO
$ composer global require drupal/coder
$ set PATH $PATH $HOME/.config/composer/vendor/bin
$ phpcs --config-set installed_paths ~/.config/composer/vendor/drupal/coder/coder_sniffer
$ phpcs -i
Debe mostrar "The installed coding standards are Zend, PSR12, PSR1, Squiz, PSR2, MySource, PEAR, DrupalPractice and Drupal"
$  phpcs --standard=Drupal  /ruta_a_carpeta_o_archivo/
```
ENLACES Y FUENTES
=================
Ejecutar tests unitarios
https://www.drupal.org/docs/8/phpunit/running-phpunit-tests

Estándares del código
https://www.drupal.org/node/1419988
