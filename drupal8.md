DRUPAL 8
========

#### Consultas mediante sql
```
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

#### Consultas mediante Entidades

```
//crear entidad
$voucher =  array(
  'iden' => $_SESSION['entity']['id'],
  'state' => 1,
  'userid' => \Drupal::currentUser()->id(),
);
      
$entityVoucher = entity_create('k_voucher', $voucher);
$entityVoucher->Save();
$idVoucher = $entityVoucher->id();

//obtener una entidad mediante consulta
$idsAccountPlan = \Drupal::entityQuery('k_accountplan')
->condition('iden', $entity, '=')
->condition('idac', $account->getIdac(), '=')
->condition('idam', $accountingManagement, '=')
->execute();
$accountPlan = AccountPlan::load(reset($idsAccountPlan));

//obtener multiples entidades mediante consulta
$idsEntries = \Drupal::entityQuery('k_accountingentry')
->condition('idvo', $voucher->getIdvo(), '=')
->execute();
$entries = AccountingEntry::loadMultiple($idsEntries);
foreach ($entries as $entrie) {
 ... hacer algo con las entidades ...
}

//Obtener entidades con tags (Busca las entidades que tienen el tag 'cats')
$query = \Drupal::entityQuery('node')
    ->condition('status', 1)
    ->condition('field_tags.entity.name', 'cats');
$nids = $query->execute();

//Operadores de consulta 
=, <, >, <=, >=, CONTAINS, 
      
//obtener datos de entidades foraneas
$entity->idac->target_id;
$entity->idac->entity->label();
      
//obtner valor de un atributo de la entidad
$rule->get('variable')->value
```

#### Formularios

```
//Obtener todos los elementos de un form_state
foreach ($form_state->getValues() as $key => $value) {
      drupal_set_message($key . ': ' . $value);
}
//Obtener un elemento de un form_state
$searched = $form_state->getValue('nombre_elemento_formulario');
    
```

#### Watchdog (log de drupal)
```
//Guardar un texti en el log (Watchdog)
\Drupal::logger('mi_modulo')->notice("Mi mensaje");
\Drupal::logger('mi_modulo')->error("Mi mensaje");
```

#### Cadenas traducibles 
```
drupal_set_message(
      t("Your account has been created successfully. We have sent an email to @userEmail with login details.",
        array(
          '@userEmail' => $userEmail,
        )
      )
    );
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

```

#### Comandos usuales
```
//Mensajes del sistema
drupal_set_message("Mi mensaje");
```

#### Usuarios
```
//Obtener usuario actual
$user = \Drupal::currentUser();
//Verificar si el usuario tiene un permiso
\Drupal::currentUser()->hasPermission("id_del_permiso")
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
