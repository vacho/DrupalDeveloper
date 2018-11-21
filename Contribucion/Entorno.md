Entorno
========
#### Docker que permite montar sobre sqlite, correr tests unitarios
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
