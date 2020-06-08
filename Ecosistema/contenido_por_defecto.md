#### Contenido por defecto con default_content
https://www.drupal.org/project/default_content

Primero activar el módulo “default content”

Comandos para genear contenidos.
```
$ drush dcer node <node id>
$ drush dcer taxonomy_term <taxonomy term id> 
$ drush dcer file <file id> 
$ drush dcer media <media id>
$ drush dcer menu_link_content <menu link id>
$ drush dcer block_content <block id>
$ drush dcer user <user_id>
$ drush dcer commerce_product 1
```

Comandos para genear contenidos customizando la ruta donde colocarlo.
```
$ drush dcer node --folder=modules/custom/<carpeta_módulo_custom>
```

NOTA: Generar archivos file con el contenido (ejemplo un svg). Se debe activar el módulo "Better normalizers"

NOTA: Para desplegar esto en un entorno docker. Se recomienda:
```
// Activar los módulos default_content, better_normalizers
$ drush en default_content better_normalizers

// Realizar el cargado de contenido 
$ drush en módulo_custom

// Desactivar módulos default_content, better_normalizers
$ drush pmu default_content better_normalizers
```

ENLACES Y FUENTES
=================
