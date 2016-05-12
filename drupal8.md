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

//Eliminar entidad
$entityDelete = NombreEntidad::load($idDelete);
$entityDelete->delete();

//Actualizar una entidad
$configuration = Configuration::load($idConfiguration);
$configuration->set('valuation_method', $valuationMethod);
$configuration->set('costs_method', $costMethod);
$configuration->save();

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

//obtener multiples entidades mediante consulta con condicionales agrupadas
$query = \Drupal::entityQuery('k_store')
  ->condition('state', 1, '=');
$group = $query->orConditionGroup()
  ->condition('type', 1, '=')
  ->condition('type', 5, '=');
$idsStore = $query
  ->condition($group)
  ->execute();
$entries = Store::loadMultiple($idsStore);

//Obtener entidades con tags (Busca las entidades que tienen el tag 'cats')
$query = \Drupal::entityQuery('node')
    ->condition('status', 1)
    ->condition('field_tags.entity.name', 'cats');
$nids = $query->execute();

//Operadores de consulta 
'=', '<>', '>', '>=', '<', '<=', 'STARTS_WITH', 'CONTAINS', 'ENDS_WITH'
'IN', 'NOT IN': Esperan un $value en un array de textos del mismo tipo del campo.
'BETWEEN': Espera un $value en un array de 2 literales del mismo tipo del campo.
      
//obtener datos de entidades foraneas
$entity->idac->target_id;
$entity->idac->entity->label();
      
//obtner valor de un atributo de la entidad
$rule->get('variable')->value
```
#### Campos de Entidades
```
//String: mysql => varchar(50)
$fields['name'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Name'))
      ->setDescription(t('The name of the entity'))
      ->setSettings(array(
        'max_length' => 50
      ));

//Boolean: mysql => tinyint(4)
$fields['state'] = BaseFieldDefinition::create('boolean')
      ->setLabel(t('state'))
      ->setDescription(t('The state of the entity'));

//Integer: mysql => integer(11)
$fields['state'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('State'))
      ->setDescription(t('The state of the entity'));

//Decimal: mysql => decimal(15,2)
$fields['amount'] = BaseFieldDefinition::create('decimal')
      ->setLabel(t('Amount'))
      ->setDescription(t('The amount of the entity'))
      ->setSettings(array(
        'precision' => 15,
        'scale' => 2
      ));

//Date: mysql => int(11)
$fields['date'] = BaseFieldDefinition::create('timestamp')
      ->setLabel(t('Date'))
      ->setDescription(t('The date of the entity'));

//Text: mysql => longtext
$fields['description'] = BaseFieldDefinition::create('string_long')
      ->setLabel(t('Description'))
      ->setDescription(t('The description of the entity'));

//Email: mysql => varchar(254)
$fields['mail'] = BaseFieldDefinition::create('email')
      ->setLabel(t('Email'))
      ->setDescription(t('The email of the entity'));

//Entity Reference: mysql => int(11)
$fields['parent'] = BaseFieldDefinition::create('entity_reference')
      ->setLabel(t('Parent'))
      ->setDescription(t('The parent id of the entity'))
      ->setSetting('target_type', 'k_category')
      ->setSetting('handler', 'default')
      ->setDisplayOptions('view', array(
        'label' => 'hidden',
        'type' => 'category'
      ))
      ->setDisplayOptions('form', array(
        'type' => 'entity_reference_autocomplete',
        'settings' => array(
          'match_operator' => 'CONTAINS',
          'size' => '60',
          'autocomplete_type' => 'tags',
          'placeholder' => ''
        )
      ));
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

#### Campos de formularios
```
// Date
$form['date'] = array(
  '#type' => 'date',
  '#default_value' => $year . "-" . $month . "-" . $day,
  '#weight' => 13,
);

// Textfield con autocompletado
$form['products'] = array(
  '#type' => 'textfield',
  '#placeholder' => '_' . t('Item'),
  '#autocomplete_route_name' => 'k_product.active.autocomplete',
  '#weight' => 17,
);

// Datetime
$form['date_validity'] = array(
  '#type' => 'datetime',
  '#date_date_element' => 'date',
  '#date_time_element' => 'time',
  '#required' => TRUE,
  '#default_value' => "",
  '#attributes' => array(
    'placeholder' => '_' . t('Validity date'),
   ),
  '#weight' => 15,
);

// Select 
$form['payment'] = array(
  '#type' => 'select',
  '#attributes' => array(
    'title' => t('Payment Method')
  ),
  '#options' => array(
    'CASH' => t('Cash'),
    'CHECK' => t('Check'),
    'TRANSFER' => t('Wire Transfer')
  ),
  '#default_value' => 'CASH',
);

// Radios
$active = array(1 => t('Yes'), 0 => t('No'));
$form['typepurchase'] = array(
  '#type' => 'radios',
  '#title' => t('This purchases will be in the inventory of merchandise:'),
  '#default_value' => 1,
  '#options' => $active
);

// Button
$form['minus'] = array(
  '#type' => "button",
  '#value' => "-",
  '#attributes' => array(
    'class' => array('addOperator'),
  ),
  '#weight' => 97,
);

// Textfield
$form['shortDescription'] = array(
  '#type' => 'textfield',
  '#default_value' => $shortDescription,
  '#size' => 90,
  '#maxlength' => 90,
  '#attributes' => array(
    'placeholder' => '_' . t('Short Description'),
  ),
  '#weight' => 1000,
);

// Textarea
$form['pr']['obs'] = array(
  '#type' => 'textarea',
  '#placeholder' => '_' . t('Observation'),
  '#attributes' => array('title' => t('Observation')),
  '#suffix' => '</div>',
);
```

#### Watchdog (log de drupal)
```
//Guardar un texti en el log (Watchdog)
\Drupal::logger('mi_modulo')->notice("Mi mensaje");
\Drupal::logger('mi_modulo')->error("Mi mensaje");
```

#### Comfiguraciones 
```
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

#### Fechas
```
// Convertir una fecha a un formato de la isntancia Drupal
format_date($rowKardex->getDate(), 'khipu_short');

// Fecha actual formateado para Drupal
$date = date('Y-m-d H:i:s');
new DrupalDateTime($date)
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

#### Redireccionamiento
```
use Symfony\Component\HttpFoundation\RedirectResponse;

$response = new RedirectResponse("quotation?id=" . $idQuotationClient);
$response->send();
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
