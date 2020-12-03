Composer
========

#### Crear un nuevo proyecto
Version especifica
```
$ composer create-project drupal/recommended-project:8.9.8 my_site_name_dir
```

Version recomendada
```
$ composer create-project drupal/recommended-project my_site_name_dir
```

#### Resolver dependencias de librerias js de módulos contribuidos

Resolver dependencias haciendo un merge. Útil para proyectos en github
```
$ composer require wikimedia/composer-merge-plugin
```

Editar composer.json agregar  en la sección "extra"
```
"merge-plugin": {
  "include": [
    "docroot/modules/contrib/webform/composer.libraries.json"
  ]
},
```

From now on, every time the "composer.json" file is updated, it will also read the content of "composer.libraries.json" file located at web/modules/contrib/webform/ and update accordingly.

3) In order for the "composer.json" file to install all the libraries mentioned inside the "composer.libraries.json", from the Git bash composer update --lock


#### Requerir un nuevo componente

```
// Versión en producción
$ composer require drupal/adminimal_theme:^1.3

// Alfa
$ composer require drupal/domain_entity:^1.0@alpha

// Beta
$ composer require drupal/better_normalizers:^1@beta

// Rama en desarrollo
$ composer require drupal/flexslider:^dev

```

#### Actualizar un módulo, tema

```
// Listar actualizaciones posibles.
$ composer outdated "drupal/*"

// Listar actualizaciones de seguridad.
$ drush pm:security

// Instalar actualizaciones
$ composer update drupal/nombre_modulo --with-dependencies
$ drush updatedb
$ drush cache:rebuild
$ drush config:export --diff
```

#### Remover un componente

```
$ composer remove drupal/config_filter
```

#### Pulgins
https://www.drupaleasy.com/blogs/ultimike/2020/06/composer-plugins-drupal-developers?utm_source=drupal-newsletter&utm_medium=email&utm_campaign=drupal-newsletter-20200625


#### Problemas comunes
```
// La memoria especificada para ejecución de php no es suficiente
php -d memory_limit=-1 composer require 
```

```
//  [ErrorException]
//  Undefined index: extra 
composer update zaporylie/composer-drupal-optimizations --no-plugins && composer update --lock
```

#### Actualizar el core
```
$ composer update drupal/core-recommended --with-dependencies
```
- https://www.drupal.org/docs/updating-drupal/updating-drupal-core-via-composer#update-all-steps
- https://www.drupal.org/docs/updating-drupal/update-drupal-core-via-composer
- https://www.drupal.org/docs/upgrading-drupal/upgrading-from-drupal-8-to-drupal-9-or-higher

#### Instalar librería externa
```
En `composer.json` agregar este código dentro de la sección `repositories`:
```
    {
      "type": "package",
      "package": {
          "name": "library-magnific/magnific-popup",
          "version": "1.1.0",
          "type": "drupal-library",
          "source": {
              "url": "https://github.com/dimsemenov/Magnific-Popup",
              "type": "git",
              "reference": "1.1.0"
          }
      }
    },
```
Ejecutar `composer require --prefer-dist library-magnific/magnific-popup:1.1.*` para instalar.

```


ENLACES Y FUENTES
=================
Resolver dependencias de webform
- https://www.drupal.org/docs/8/modules/webform/webform-frequently-asked-questions/how-to-use-composer-to-install-libraries

Todas las opciones de actualización
- https://www.drupal.org/docs/updating-drupal

Actualizando módulos y temas
- https://www.drupal.org/docs/updating-drupal/updating-modules-and-themes-using-composer