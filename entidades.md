ENTIDADES
========

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
      		'type' => 'category',file:///home/vacho/Desktop/DrupalDeveloper/drupal8.md
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
