Composer
========

#### Crear un nuevo proyecto
```bash
# Version específica.
composer create-project drupal/recommended-project:8.9.8 my_site_name_dir

# Version recomendada
composer create-project drupal/recommended-project my_site_name_dir
```

#### Resolver dependencias de librerias js de módulos contribuidos

Resolver dependencias haciendo un merge. Útil para proyectos en github
```bash
composer require wikimedia/composer-merge-plugin
```

Editar composer.json agregar  en la sección "extra"
```json
"merge-plugin": {
  "include": [
    "docroot/modules/contrib/webform/composer.libraries.json"
  ]
},
```

From now on, every time the "composer.json" file is updated, it will also read the content of "composer.libraries.json" file located at web/modules/contrib/webform/ and update accordingly.

In order for the "composer.json" file to install all the libraries mentioned inside the "composer.libraries.json", from the Git bash composer update --lock


#### Requerir un nuevo componente

```bash
# Ver todas las versiones de un proyecto.
composer show  drupal/account_field_split --all

# Versión en producción
composer require drupal/adminimal_theme:^1.3

# Alfa
composer require drupal/domain_entity:^1.0@alpha

# Beta
composer require drupal/better_normalizers:^1@beta

# Rama en desarrollo
composer require drupal/flexslider:^dev
composer require drupal/http_status_code:1.x-dev
# Fork
composer require drupal/entity_reference_facet_link:dev-3254358-can-not-update

# Requerir un proyecto para un determinado ambiente (dev)
composer require --dev phpunit/phpunit
```

#### Actualizar un módulo, tema

```bash
# Listar actualizaciones posibles.
composer outdated "drupal/*"

# Listar actualizaciones de seguridad.
drush pm:security

# Instalar actualizaciones
composer update drupal/nombre_modulo --with-dependencies
drush updatedb
drush cache:rebuild
drush config:export --diff
```

#### Remover un componente

```
# composer remove drupal/config_filter
```

#### Pulgins
https://www.drupaleasy.com/blogs/ultimike/2020/06/composer-plugins-drupal-developers?utm_source=drupal-newsletter&utm_medium=email&utm_campaign=drupal-newsletter-20200625


#### Problemas comunes
```bash
# La memoria especificada para ejecución de php no es suficiente
php -d memory_limit=-1 composer require 
```

```bash
#  [ErrorException]
#  Undefined index: extra 
composer update zaporylie/composer-drupal-optimizations --no-plugins && composer update --lock
```

#### Actualizar el core
```bash
composer update drupal/core-recommended --with-dependencies
composer update drupal/core --with-dependencies

// Actualizar manualment composer.json los valores roecommended luego
composer update drupal/core "drupal/core-*" --with-all-dependencies

```

- https://www.drupal.org/docs/updating-drupal/updating-drupal-core-via-composer#update-all-steps
- https://www.drupal.org/docs/updating-drupal/update-drupal-core-via-composer
- https://www.drupal.org/docs/upgrading-drupal/upgrading-from-drupal-8-to-drupal-9-or-higher

#### Usar composer en un proyecto que fue instalado sin composer
- Si el proyecto es Drupal 8.8.0 este ya tiene composer y sólo es necesario entonces instalar todos los módulos en la versión actual.

### Actualizar composer
```bash
# Degrada a composer 1.
sudo composer self-update --1

# Actualizar a composer 2
sudo composer self-update --2
```

#### Instalar librería externa
En `composer.json` agregar este código dentro de la sección `repositories`:
```json
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

### Resolver problemas de compatibilidad.
Agregar el MR de gitlab,
```yml
"repositories": [
    {
      "type": "composer",
      "url": "https://packages.drupal.org/8",
      "exclude": [
        "drupal/rng"
      ]
    },
    {
        "type": "git",
        "url": "https://git.drupalcode.org/issue/rng-3218000.git"
    }
  ],
```
Ejecutar comando:
```bash
$ composer require drupal/rng:dev-8.x-1.x
```

ENLACES Y FUENTES
=================
Resolver dependencias de webform
- https://www.drupal.org/docs/8/modules/webform/webform-frequently-asked-questions/how-to-use-composer-to-install-libraries

Todas las opciones de actualización
- https://www.drupal.org/docs/updating-drupal

Actualizando módulos y temas
- https://www.drupal.org/docs/updating-drupal/updating-modules-and-themes-using-composer

Para actualizar composer from 1 to 2
- https://www.drupal.org/docs/develop/using-composer/preparing-your-site-for-composer-2

Para actualizar un propyecto que fue instalado sin composer
- https://www.drupal.org/docs/installing-drupal/add-composer-to-an-existing-site

Guía completa drupal-composer
- https://www.drupal.org/docs/develop/using-composer/using-composer-to-install-drupal-and-manage-dependencies

Resolver problemas de compatibilidad
- https://www.drupal.org/docs/develop/git/using-git-to-contribute-to-drupal/creating-issue-forks-and-merge-requests#s-useissue-forks-to-makecompatibility-fixes-work-with-composer

Composer update para d9 drupal/core-recommended
- https://www.drupal.org/docs/updating-drupal/updating-drupal-core-via-composer