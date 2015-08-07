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
#### Campos de Entidades
```
// String
$fields['name'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Name'))
      ->setDescription(t('The name of the PriceFactor entity.'))
      ->setSettings(array(
        'default_value' => '',
        'max_length' => 50,
        'text_processing' => 0,
      ))
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => -4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

//Decimal
$fields['amount'] = BaseFieldDefinition::create('decimal')
      ->setLabel(t('Amount'))
      ->setDescription(t('The amount of the entity'));

//Integer
$fields['state'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('State'))
      ->setDescription(t('The state of the entity'));
//Boolean (se torna tinyint en mysql)
$fields['state'] = BaseFieldDefinition::create('boolean')
      ->setLabel(t('state'))
      ->setDescription(t('The state'));

//Fecha
$fields['date'] = BaseFieldDefinition::create('timestamp')
      ->setLabel(t('Date'))
      ->setDescription(t('The date of the entity'));
      
//Text o String long
$fields['description'] = BaseFieldDefinition::create('string_long')
      ->setLabel(t('Description'))
      ->setDescription(t('The description of the entity'))
      ->setTranslatable(TRUE)
      ->setSettings(array(
          'default_value' => '',
      ))
      ->setDisplayOptions('view', array(
          'label' => 'above',
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

//Referecia circular a la misma entidad
$fields['parent'] = BaseFieldDefinition::create('entity_reference')
      ->setLabel(t('Parent'))
      ->setDescription(t('The ID of the parent.'))
      ->setRevisionable(TRUE)
      ->setSetting('target_type', 'category')
      ->setSetting('handler', 'default')
      // ->setDefaultValueCallback('Drupal\node\Entity\Node::getCurrentUserId')
      ->setTranslatable(TRUE)
      ->setDisplayOptions('view', array(
      		'label' => 'hidden',
      		'type' => 'category',
      		'weight' => -5,
      ))
      ->setDisplayOptions('form', array(
      		'type' => 'entity_reference_autocomplete',
      		'weight' => -5,
      		'settings' => array(
      				'match_operator' => 'CONTAINS',
      				'size' => '60',
      				'autocomplete_type' => 'tags',
      				'placeholder' => '',
      		),
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);
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

#### Campos de Entidades
```
// textfield
$form['filters']['products'] = array(
      '#type' => 'textfield',
      '#placeholder' => '_' . t('Item'),
      '#autocomplete_route_name' => 'k_product.active.autocomplete',
      '#prefix' => '<div id="row1">',
      '#weight' => 11,
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

#### Fechas
```
// Convertir una fecha a un formato de la isntancia Drupal
format_date($rowKardex->getDate(), 'khipu_short');
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
