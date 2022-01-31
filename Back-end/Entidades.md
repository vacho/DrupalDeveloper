ENTIDADES
========

#### Consultas mediante Entidades

```php
// Crear entidad
$values =  [
  'name' => 'Jose',
  'lastname' => 'Lopez',
];
$Person = Person::create($values);
$Person->save();
$id = $Person->id();

//Eliminar entidad
$Entity = NombreEntidad::load($id);
$Entity->delete();

// Actualizar una entidad
$configuration = Configuration::load($id);
$configuration->set('valuation_method', $valuationMethod);
$configuration->set('costs_method', $costMethod);
$configuration->save();

// Obtener ids de una entidad con consulta con or condition.
$storage = $this->entityTypeManager->getStorage('alternate_hreflang');
$query = $storage->getQuery();
$group = $query
  ->orConditionGroup()
  ->condition('url_x__uri', $url, '=')
  ->condition('url_a__uri', $url, '=')
  ->condition('url_b__uri', $url, '=');
$ids = $query
  ->condition('status', TRUE, '=')
  ->condition($group)
  ->execute();

// Obtener una entidad mediante consulta
$ids = \Drupal::entityQuery('k_accountplan')
->condition('iden', $entity, '=')
->condition('idac', $account->getIdac(), '=')
->condition('idam', $accountingManagement, '=')
->sort('number', 'DESC')
->execute();
$AccountPlan = AccountPlan::load(reset($ids));

// Obtener multiples entidades mediante consulta
$ids = \Drupal::entityQuery('k_accountingentry')
->condition('idvo', $voucher->getIdvo(), '=')
->execute();
$Entries = AccountingEntry::loadMultiple($ids);
foreach ($entries as $entrie) {
 ... hacer algo con las entidades ...
}

// Obtener entidades con tags (Busca las entidades que tienen el tag 'cats')
$query = \Drupal::entityQuery('node')
    ->condition('status', 1)
    ->condition('field_tags.entity.name', 'cats');
$nids = $query->execute();

// Operadores de consulta 
'=', '<>', '>', '>=', '<', '<=', 'STARTS_WITH', 'CONTAINS', 'ENDS_WITH'
'IN', 'NOT IN', 'IS', 'IS NOT': Esperan un $value en un array de textos del mismo tipo del campo.
'BETWEEN': Espera un $value en un array de 2 literales del mismo tipo del campo.
      
// Obtener datos de entidades foraneas
$entity->idac->target_id;
$entity->idac->entity->label();
      
// Obtner valor de un atributo de la entidad
$rule->get('variable')->value

// Guardar imagenes en una entidad
$data = file_get_contents('https://fb-s-b-a.akamaihd.net/h-ak-xpa1/v/t1.0-1/p200x200/15977045_10154309431871267_7175376318146668144_n.jpg?oh=d9e53d50dd85061ce909c3836aa52b09&oe=5925DCAC&__gda__=1499424910_0b04f8498e91f1bff0bbfb6555c8aada');
$file = file_save_data($data, null, FILE_EXISTS_REPLACE);

//create an entity
$values = [
  'name' => 'My new land',
  'photo' => [ <=== this is the field name image of my custom entity
    'target_id' => $file->id(),
    'alt' => 'Hello world'
  ],
];
$person = DefaultBien::create($values);
$person->save();
```

#### Codigos útiles
```php
// Obtener el id del campo por defecto de una imagen media.
$nids = \Drupal::entityQuery('node')->condition('type','<tipo_contenido>')->execute();
$entity = \Drupal::entityTypeManager()->getStorage('node')->load(reset($nids));
$default_id_media = $entity->get('media')->getFieldDefinition()->getDefaultValue($entity);
if ($default_id_media) {
  $default_id_media = reset($default_id_media)['target_id'];
}
```
#### Campos de Entidades
```php
// String
$fields['name'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Name'))
      ->setDescription(t('The name of the PriceFactor entity.'))
      ->setSettings([
        'default_value' => '',
        'max_length' => 50,
        'text_processing' => 0,
      ])
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -4,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

// Link
    $fields['url_test'] = BaseFieldDefinition::create('link')
      ->setLabel(t('URL test'))
      ->setDescription(t('URL link.'))
      ->setSettings([
        'link_type' => LinkItemInterface::LINK_GENERIC,
        'title' => DRUPAL_DISABLED,
      ])
      ->setDisplayOptions('form', [
        'type' => 'link_default',
        'weight' => 0,
      ])
      ->setDisplayConfigurable('form', TRUE);


//Lista de strings (Select list)
$fields['test'] = BaseFieldDefinition::create('list_string')
      ->setLabel(t('List'))
      ->setDescription(t('The list of something.'))
      ->setSettings([
        'max_length' => 60,
        'text_processing' => 0,
        'allowed_values' => [
          'key_1' => 'labee_1',
        ]
      ]
      ->setDefaultValue('')
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => 0,
      ]
      ->setDisplayOptions('form', [
        'type' => 'options_select',
        'weight' => 0,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

// Lista de números
iden lista de strings, poner 'list_integer' en lugar de 'list_string'

//Decimal
$fields['price'] = BaseFieldDefinition::create('decimal')
        ->setLabel(t('Price'))
        ->setDescription(t('The amount of the entity'))
        ->setDisplayOptions('view', [
            'label' => 'above',
            'type' => 'decimal',
            'weight' => -3,
        ])
        ->setDisplayOptions('form', [
            'type' => 'number',
            'weight' => -3,
        ])
        ->setDisplayConfigurable('form', TRUE)
        ->setDisplayConfigurable('view', TRUE);

//Integer
$fields['enum'] = BaseFieldDefinition::create('integer')
        ->setLabel(t('Enumeration'))
        ->setDescription(t('The order'))
        ->setDisplayOptions('view', [
            'label' => 'above',
            'type' => 'integer',
            'weight' => 0,
        ])
        ->setDisplayOptions('form', [
            'type' => 'number',
            'weight' => 0,
        ])
        ->setSetting('size', 'big');
        ->setDisplayConfigurable('form', TRUE)
        ->setDisplayConfigurable('view', TRUE);

//Boolean (se torna tinyint en mysql)
$fields['predefined'] = BaseFieldDefinition::create('boolean')
        ->setLabel(t('Predefined'))
        ->setDescription(t('Predefined'))
      ->setDisplayOptions('form', [
        'type' => 'boolean_checkbox',
        'settings' => [
          'display_label' => TRUE,
        ],
        'weight' => 0,
      ])
      ->setDisplayConfigurable('form', TRUE);

//Fecha
$fields['date_start'] = BaseFieldDefinition::create('timestamp')
        ->setLabel(t('Date start'))
        ->setDescription(t('The date start'))
        ->setDisplayOptions('view', [
            'label' => 'adobe',
            'type' => 'timestamp',
            'weight' => 2,
        ])
        ->setDisplayOptions('form', [
            'type' => 'datetime_timestamp',
            'weight' => 2,
        ])
        ->setDisplayConfigurable('form', TRUE);
      
//Text o String long
$fields['description'] = BaseFieldDefinition::create('string_long')
      ->setLabel(t('Description'))
      ->setDescription(t('The description of the entity'))
      ->setTranslatable(TRUE)
      ->setSettings([
          'default_value' => '',
      ])
      ->setDisplayOptions('view', [
          'label' => 'above',
          'type' => 'string',
          'weight' => 4,
      ])
      ->setDisplayOptions('form', [
          'type' => 'string',
          'weight' => 4,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

//Referecia a otra entidad
$fields['idstore'] = BaseFieldDefinition::create('entity_reference')
      ->setLabel(t('Store'))
      ->setDescription(t('The store the kardex'))
      ->setRequired(TRUE)
      ->setSetting('target_type', 'k_store')
      ->setSetting('handler', 'default')
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'entity_reference',
        'weight' => 0,
      ])
      ->setDisplayOptions('form', [
        'type' => 'entity_reference_autocomplete',
        'settings' => [
          'match_operator' => 'CONTAINS',
          'size' => 60,
          'autocomplete_type' => 'tags',
          'placeholder' => '_' . t('Store')
        ],
        'weight' => 0,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

//Campo imagen
$fields['photo'] = BaseFieldDefinition::create('image')
      ->setSetting('file_extensions', 'png')
      ->setSetting ('uri_scheme','public://photos')
      ->setLabel(t('Photo'))
      ->setDescription(t('Entity photo'))
      ->setDefaultValue('')
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'file',
        'weight' => -4,
      ])
      ->setDisplayOptions('form', [
        'type' => 'file',
        'weight' => -4,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);
      
//Campo referenciado a taxonomias con botones de selección
$fields ['category'] = BaseFieldDefinition::create ('entity_reference') 
      ->setLabel(t( 'Category')) 
      ->setDescription(t('Taxonomi term')) 
      ->setCardinality(BaseFieldDefinition::CARDINALITY_UNLIMITED)
      ->setSetting ('target_type','taxonomy_term') 
      ->setTranslatable (TRUE) 
      ->setDisplayOptions ('form', [
        'type' =>  'options_buttons', 
        'weight' => - 10 , 
        'settings' => [
          'match_operator' => 'CONTAINS' , 
          'size'  =>  '60' , 
          'placeholder'  =>  '' , 
        ], 
      ]) 
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);
      
//Campo referenciado a taxonomias con autocomplete      
$fields ['category'] = BaseFieldDefinition::create ('entity_reference') 
      ->setLabel(t( 'Category')) 
      ->setDescription(t('Taxonomi term')) 
      ->setCardinality(BaseFieldDefinition::CARDINALITY_UNLIMITED)
      ->setSetting ('target_type','taxonomy_term') 
      ->setTranslatable (TRUE) 
      ->setDisplayOptions ('form', [
        'type' => 'entity_reference_autocomplete',
        'weight' => - 10 , 
        'settings' => [
          'match_operator' => 'CONTAINS' , 
          'size'  =>  '60' , 
          'autocomplete_type' => 'tags' , 
          'placeholder'  =>  '' , 
        ], 
      ]) 
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);
```


PROGRAMAR REGISTRO DE ENTIDADES EN TRANSACCIONES
=======
```php
$database = \Drupal::database();
$transaction = $database->startTransaction();
$id_branch = null;
try {
  if(empty($id_branch)) {
      throw new \Exception('Empty: Branch Entity id.');
  }
  $Branch = Entities::load($id_branch);
  $branch_address = $Branch->getAddress();

  for ($i = 0; $i < 8000; $i++) {
    $values = [
      'entity' => $id_branch,
      'name' => 'Store ' . $i,
      'address' => $branch_address,
    ];
    $Store = Store::create($values);
    $Store->save();
  }

}
catch (\Exception $e) {
  $transaction->rollback();
  watchdog_exception('nombre_modulo', $e, $e->getMessage());
  throw new \Exception(  $e->getMessage(), $e->getCode(), $e->getPrevious());
}
```

ENLACES Y FUENTES
=================
Documentación oficial
- https://api.drupal.org/api/drupal/8

Documentación de la comunidad
- https://www.drupal.org/developing/api/8

Watchdow drupal 8
- https://www.drupal.org/node/2270941

Entidades
- http://talks.shawnduncan.org/entity_talk/#/overview
- http://talks.shawnduncan.org/entity_talk/images/Entity.svg

Tipos de campos
- http://bit.ly/1qhjSQ6

Entidades traducibles
- https://www.drupal.org/docs/develop/translating-custom-entities