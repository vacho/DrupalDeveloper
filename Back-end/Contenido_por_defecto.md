Contenido por defecto
========

#### 1. Obtener el módulo default_content y better normalizers
```
$ composer require drupal/default_content:^1@alpha
$ composer require drupal/better_normalizers:^1@beta
```
NOTA: El módulo "Better normalizers" se utiliza para generar archivos "file" (ejemplo un svg)

#### 2. Activar los módulos
```
$ drush en -y default_content better_normalizers
```

#### 3. Crear un módulo para contener los contenidos
```
$ drush generate module-standard
// Crear carpeta que va contener el contenido generado
$ mkdir docroot/modules/custom/<carpeta_módulo_custom>/content
```

#### 4. Crear los contenidos haciendo site building
```
...
```

#### 5. Generar los contenidos para ser reutilizados usando comandos.
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
$ drush dcer node <node_id> --folder=modules/custom/<carpeta_módulo_custom>/content
```

#### 5. Desactivar los módulos para generar contenidos
// Desactivar módulos default_content, better_normalizers
```
$ drush pmu default_content better_normalizers
```

ENLACES Y FUENTES
=================
