DRUPAL 8
========

#### Consultas mediante sql
```
$db = \Drupal::database();

//Método 1
$query = $db->select('k_product', 'p');
$query->fields('p', ['idpr', 'name', 'type']);
$data = $query->execute()->fetchAllAssoc('idpr', 'name', 'type');

//Método 2

// Obtener un array asociativo. Con 'idpr' como identificador de cada subarray asociativo 
$sql = "SELECT idpr, name, code, detail FROM k_product";
$data = $db->query($sql)->fetchAllAssoc('idpr', 'FETCH_ASSOC');

// Obtener sólo un dato puntual
$sql = "SELECT idpr FROM k_product WHERE name = :name;";
$id_product = $db->query($sql, array(':name' => 'Lapiz'))->fetchField(0);

DEPRECADOS.
//múltiples filas
$result = db_query('SELECT id, qualifier, email, board, popup
          FROM {k_message}
          WHERE rule = :rid',
          array(':rid' => $idRule)
);

foreach ($result as $record) {
  $idMessage = $record->id;
  $qualifier = $record->qualifier;
  $emailMsg = $record->email;
  $boardMsg = $record->board;
  $popupMsg = $record->popup;
}
 
//optener valor de un sólo campo
$addFactor =  db_query('SELECT value FROM k_factor WHERE id = :id;', array(':id' => $id))->fetchField();
```

#### Watchdog (log de drupal)
```
//Guardar un texti en el log (Watchdog)
\Drupal::logger('mi_modulo')->notice("Mi mensaje");
\Drupal::logger('mi_modulo')->error("Mi mensaje");
```

#### Fechas
```
// Convertir una fecha a un formato de la isntancia Drupal
format_date($rowKardex->getDate(), 'khipu_short'); //deprecado
\Drupal::service('date.formatter')->format($Service->getDate(), 'khipu_short');

// Fecha actual formateado para Drupal
$date = date('Y-m-d H:i:s');
new DrupalDateTime($date)
```
#### Variables de estado
```
// Obtener un valor
$value = \Drupal::state()->get('name_variable');

// Colocar un valor
\Drupal::state()->set('name_variable', valor_variable);
```

#### Configuraciones
```
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

#### Comandos usuales
```
//Mensajes del sistema
drupal_set_message("Mi mensaje");
```

#### Redireccionamiento
```
use Symfony\Component\HttpFoundation\RedirectResponse;

$response = new RedirectResponse("quotation?id=" . $idQuotationClient);
$response->send();
```

#### Rutas
```
// Obtener nombre routing de la ruta actual
$url_object = \Drupal::service('path.validator')->getUrlIfValid(\Drupal::service('path.current')->getPath());
$route_name = $url_object->getRouteName();
```

### Cache
```
// Vaciar caches persistentes
use Drupal\Core\Cache\Cache;

foreach (Cache::getBins() as $service_id => $cache_backend) {
    $cache_backend->deleteAll();
}
```

### Seguridad
```
Permisos
sites -> 755
sites/default -> 755
sites/default/files -> 775
sites/default/settings.php -> 444
sites/default/services.yml -> 444
```

ENLACES Y FUENTES
=================
Documentación oficial
https://api.drupal.org/api/drupal/8

Documentación de la comunidad
https://www.drupal.org/developing/api/8

Clases de drupal 8
https://api.drupal.org/api/drupal/classes/8

Configuraciones
https://www.drupal.org/developing/api/8/configuration

Hoja resumida de codigo
http://wizzlern.nl/sites/wizzlern.nl/files/artikel/drupal8_content_entity.pdf

Watchdow drupal 8
https://www.drupal.org/node/2270941

Lo basico de programar en D8
http://capgemini.github.io/drupal/drupal-8-in-2-steps/

Webomelette
http://www.webomelette.com/

Event dispacher
http://www.sitepoint.com/drupal-8-hooks-symfony-event-dispatcher/

Entity query
https://api.drupal.org/api/drupal/core!lib!Drupal!Core!Entity!Query!QueryInterface.php/function/QueryInterface%3A%3Acondition/8

Entidades
http://talks.shawnduncan.org/entity_talk/#/overview

http://talks.shawnduncan.org/entity_talk/images/Entity.svg

Recurso sobre entidades
http://shawnduncan.org/entities-core-custom

Programación orientada a objectos para Drupal 8 - php
https://prakashdrupal.wordpress.com/2016/04/13/want-to-learn-drupal-8-custom-module/

Programación MVC sobre Drupal 8
https://gist.github.com/jmolivas/d29065493a91f16f35b2

Seguimiento de cambios en el Core
https://www.drupal.org/list-changes/drupal

Configuraciones sobre Drupal 8
http://hojtsy.hu/files/ConfigSchemaCheatSheet1.5.pdf

Entidades traducibles en drupal 8
https://vimeo.com/166918014

Definición de librerias
https://ffwagency.com/blog/managing-css-and-javascript-files-drupal-8-libraries
https://www.drupal.org/theme-guide/8/assets

