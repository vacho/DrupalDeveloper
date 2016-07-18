ENTIDADES
========

#### Consultas mediante Entidades

```
//crear entidad
$values =  array(
  'state' => 1,
  'userid' => \Drupal::currentUser()->id(),
);
$Voucher = Vaucher::create($values);
$Voucher->Save();
$id = $Voucher->id();

//Eliminar entidad
$Entity = NombreEntidad::load($id);
$Entity->delete();

//Actualizar una entidad
$configuration = Configuration::load($id);
$configuration->set('valuation_method', $valuationMethod);
$configuration->set('costs_method', $costMethod);
$configuration->save();

//obtener una entidad mediante consulta
$ids = \Drupal::entityQuery('k_accountplan')
->condition('iden', $entity, '=')
->condition('idac', $account->getIdac(), '=')
->condition('idam', $accountingManagement, '=')
->execute();
$AccountPlan = AccountPlan::load(reset($ids));

//obtener multiples entidades mediante consulta
$ids = \Drupal::entityQuery('k_accountingentry')
->condition('idvo', $voucher->getIdvo(), '=')
->execute();
$Entries = AccountingEntry::loadMultiple($ids);
foreach ($entries as $entrie) {
 ... hacer algo con las entidades ...
}

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
      
//Lista de strings (Select list)
$fields['test'] = BaseFieldDefinition::create('list_string')
      ->setLabel(t('List'))
      ->setDescription(t('The list of something.'))
      ->setSettings(array(
        'max_length' => 60,
        'text_processing' => 0,
        'allowed_values' => array(
          'key_1' => 'labee_1',
          ),
      ))
      ->setDefaultValue('')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => 0,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'options_select',
        'weight' => 0,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

// Lista de números
iden lista de strings, poner 'list_integer' en lugar de 'list_string'

//Decimal
$fields['price'] = BaseFieldDefinition::create('decimal')
        ->setLabel(t('Price'))
        ->setDescription(t('The amount of the entity'))
        ->setDisplayOptions('view', array(
            'label' => 'above',
            'type' => 'decimal',
            'weight' => -3,
        ))
        ->setDisplayOptions('form', array(
            'type' => 'number',
            'weight' => -3,
        ))
        ->setDisplayConfigurable('form', TRUE)
        ->setDisplayConfigurable('view', TRUE);

//Integer
$fields['enum'] = BaseFieldDefinition::create('integer')
        ->setLabel(t('Enumeration'))
        ->setDescription(t('The order'))
        ->setDisplayOptions('view', array(
            'label' => 'above',
            'type' => 'integer',
            'weight' => 0,
        ))
        ->setDisplayOptions('form', array(
            'type' => 'number',
            'weight' => 0,
        ))
        ->setDisplayConfigurable('form', TRUE)
        ->setDisplayConfigurable('view', TRUE);

//Boolean (se torna tinyint en mysql)
$fields['predefined'] = BaseFieldDefinition::create('boolean')
        ->setLabel(t('Predefined'))
        ->setDescription(t('Predefined'))
      ->setDisplayOptions('form', array(
        'type' => 'boolean_checkbox',
        'settings' => array(
          'display_label' => TRUE,
        ),
        'weight' => 0,
      ))
      ->setDisplayConfigurable('form', TRUE);

//Fecha
$fields['date_start'] = BaseFieldDefinition::create('timestamp')
        ->setLabel(t('Date start'))
        ->setDescription(t('The date start'))
        ->setDisplayOptions('view', array(
            'label' => 'adobe',
            'type' => 'timestamp',
            'weight' => 2,
        ))
        ->setDisplayOptions('form', array(
            'type' => 'datetime_timestamp',
            'weight' => 2,
        ))
        ->setDisplayConfigurable('form', TRUE);
      
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

//Referecia a otra entidad
$fields['idstore'] = BaseFieldDefinition::create('entity_reference')
      ->setLabel(t('Store'))
      ->setDescription(t('The store the kardex'))
      ->setRequired(TRUE)
      ->setSetting('target_type', 'k_store')
      ->setSetting('handler', 'default')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'entity_reference',
        'weight' => 0,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'entity_reference_autocomplete',
        'settings' => array(
          'match_operator' => 'CONTAINS',
          'size' => 60,
          'autocomplete_type' => 'tags',
          'placeholder' => '_' . t('Store')
        ),
        'weight' => 0,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

//Campo imagen
$fields['photo'] = BaseFieldDefinition::create('image')
      ->setSetting('file_extensions', 'png')
      ->setSetting ('uri_scheme','public://photos')
      ->setLabel(t('Photo'))
      ->setDescription(t('Entity photo'))
      ->setDefaultValue('')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'file',
        'weight' => -4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'file',
        'weight' => -4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);
      
//Campo referenciado a taxonomias con botones de selección
$fields ['category'] = BaseFieldDefinition::create ('entity_reference') 
      ->setLabel(t( 'Category')) 
      ->setDescription(t('Taxonomi term')) 
      ->setCardinality(BaseFieldDefinition::CARDINALITY_UNLIMITED)
      ->setSetting ('target_type','taxonomy_term') 
      ->setTranslatable (TRUE) 
      ->setDisplayOptions ('form',array( 
        'type' =>  'options_buttons', 
        'weight' => - 10 , 
        'settings' => array( 
          'match_operator' => 'CONTAINS' , 
          'size'  =>  '60' , 
          'placeholder'  =>  '' , 
        ), 
      )) 
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);
      
//Campo referenciado a taxonomias con autocomplete      
$fields ['category'] = BaseFieldDefinition::create ('entity_reference') 
      ->setLabel(t( 'Category')) 
      ->setDescription(t('Taxonomi term')) 
      ->setCardinality(BaseFieldDefinition::CARDINALITY_UNLIMITED)
      ->setSetting ('target_type','taxonomy_term') 
      ->setTranslatable (TRUE) 
      ->setDisplayOptions ('form',array( 
        'type' => 'entity_reference_autocomplete',
        'weight' => - 10 , 
        'settings' => array( 
          'match_operator' => 'CONTAINS' , 
          'size'  =>  '60' , 
          'autocomplete_type' => 'tags' , 
          'placeholder'  =>  '' , 
        ), 
      )) 
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);
```

ENLACES Y FUENTES
=================
Documentación oficial
https://api.drupal.org/api/drupal/8

Documentación de la comunidad
https://www.drupal.org/developing/api/8

Hoja resumida de codigo
http://wizzlern.nl/sites/wizzlern.nl/files/artikel/drupal8_content_entity.pdf

Watchdow drupal 8
https://www.drupal.org/node/2270941

Entidades
http://talks.shawnduncan.org/entity_talk/#/overview

http://talks.shawnduncan.org/entity_talk/images/Entity.svg

Recurso sobre entidades
http://shawnduncan.org/entities-core-custom

Tipos de campos
http://bit.ly/1qhjSQ6
