Configuraciones
===

#### Operaciones con el API
```php
//Cron
\Drupal::config('system.cron')->get('threshold.autorun')
\Drupal::state()->get('system.cron_last')

//Email
\Drupal::config('user.mail')->get('register_admin_created.subject');
\Drupal::config('user.mail')->get('register_admin_created.body');

//Escribiendo configuraciones
$config = \Drupal::service('config.factory')->getEditable('system.performance');
$config->set('cache.page.enabled', 1); // Set a scalar value.
$page_cache_data = array('enabled' => 1, 'max_age' => 5); // Set an array of values.
$config->set('cache.page', $page_cache_data);
$config->save();

//Servicios
$resource_id = 'product_resource';
$resources = \Drupal::config('rest.settings')->get('resources') ?: array();
$resources[$resource_id] = array(); // reset de resource configuration
$method = "GET";

$resources[$resource_id][$method] = array();
$resources[$resource_id][$method]['supported_formats'] = array("json");
$resources[$resource_id][$method]['supported_auth'] = array("cookie");

\Drupal::configFactory()->getEditable('rest.settings')
  ->set('resources', $resources)
  ->save();

//Sistema
\Drupal::configFactory()->getEditable('system.site')
  ->set('page.404', 'not-found')
  ->save();

```

Config Split
```bash
# Drush 8 o anterior:
drush config-split-import config_dev

# Drush 9 o posterior:
drush config-split:import config_dev

## Verificar la configuraciones sobreescritas.

# Drush 8 o anterior:
drush config-export

# Drush 9 o posterior:
drush config:export

# Editar una configuración activa
drush config-edit nombre.configuración
```

### Referencias
Config split
- https://www.drupal.org/docs/contributed-modules/configuration-split/creating-a-simple-split-configuration-dev-modules-only
- https://www.specbee.com/blogs/how-to-split-configurations-across-different-sites-on-drupal-9?utm_source=drupal-newsletter&utm_medium=email&utm_campaign=drupal-newsletter-20210708

Buena guía de módulos, comandos y algo de código.
- https://www.daggerhartlab.com/drupal-8-configuration-management-with-config-split/