API de actualización
========
Se utiliza cuando se realizan cambios en la configuración que afectan a datos almacenados.
- Campos de una entidad.
- Schemas.
- Tipos de datos, valores permitidos o estructura de arreglos para una key de configuración.
- Dependencias. (Ejemplo de un plugin)
- Etc.

### Para ejecutar los hooks update:
```
$ drush updb -y
```

### Funciones para actualizar entidades y schemas
```
- getEntityType($entity_type_id)
- installEntityType(EntityTypeInterface $entity_type)
- updateEntityType(EntityTypeInterface $entity_type)
- uninstallEntityType(EntityTypeInterface $entity_type)
- getFieldStorageDefinition($name, $entity_type_id)
- installFieldStorageDefinition($name, $entity_type_id, $provider, FieldStorageDefinitionInterface $storage_definition)
- updateFieldStorageDefinition(FieldStorageDefinitionInterface $storage_definition)
- uninstallFieldStorageDefinition(FieldStorageDefinitionInterface $storage_definition)
```

#### Un nuevo campo ha sido agregado a un tipo de contenido (nodo)
```php
/**
 * Agregar el nuevo campo 'revision_translation_affected' a las entidades de tipo node.
 */
function node_update_8001() {
  // Crear la definición del nuevo campo.
  $storage_definition = BaseFieldDefinition::create('boolean')
      ->setLabel(t('Revision translation affected'))
      ->setDescription(t('Indicates if the last edit of a translation belongs to current revision.'))
      ->setReadOnly(TRUE)
      ->setRevisionable(TRUE)
      ->setTranslatable(TRUE);

  \Drupal::entityDefinitionUpdateManager()
    ->installFieldStorageDefinition('revision_translation_affected', 'node', 'node', $storage_definition);
}
```

#### Campos existentes promovidos a claves para la entidad
```php
/**
 * Promover los campos 'status' y 'uid' a claves de las entidades.
 */
function node_update_8003() {
  $manager = \Drupal::entityDefinitionUpdateManager();
  $entity_type = $manager->getEntityType('node');
  $entity_keys = $entity_type->getKeys();
  $entity_keys['status'] = 'status';
  $entity_keys['uid'] = 'uid';
  $entity_type->set('entity_keys', $entity_keys);
  $manager->updateEntityType($entity_type);

  // @todo Lo de arriba deberá ser suficiente en le futuro. https://www.drupal.org/node/2554245.
  foreach (array('status', 'uid') as $field_name) {
    $manager->updateFieldStorageDefinition($manager->getFieldStorageDefinition($field_name, 'node'));
  }
}
```

#### Cambiar la cadinalidad de un campo con datos de uno a muchos y viceversa.
```php
/**
 * Hacer del campo 'user_id' un campo multiple y migrar sus datos.
 */
function entity_test_update_8001() {
  $database = \Drupal::database();

  // Recuperar datos existentes.
  $user_ids = $database->select('entity_test', 'et')
    ->fields('et', ['id', 'user_id'])
    ->execute()
    ->fetchAllKeyed();

  // Borrar los datos del almacenamiento.
  $database->update('entity_test')
    ->fields(['user_id' => NULL])
    ->execute();

  // Actualiar definiciones y schemas.
  $manager = \Drupal::entityDefinitionUpdateManager();
  $storage_definition = $manager->getFieldStorageDefinition('user_id', 'entity_test');
  $storage_definition->setCardinality(FieldStorageDefinitionInterface::CARDINALITY_UNLIMITED);
  $manager->updateFieldStorageDefinition($storage_definition);

  // Restaurar los datos en el nuevo schema.
  $insert_query = $database->insert('entity_test__user_id')
    ->fields(['bundle', 'deleted', 'entity_id', 'revision_id', 'langcode', 'delta', 'user_id_target_id']);
  foreach ($user_ids as $id => $user_id) {
    $insert_query->values(['entity_test', 0, $id, $id, 'en', 0, $user_id]);
  }
  $insert_query->execute();
}

/**
 * Hacer el campo 'user_id' de multiple a uno y migrar sus datos.
 */
function entity_test_update_8002() {
  $database = \Drupal::database();

  // Recuperar datos existentes.
  $query = $database->select('entity_test__user_id', 'et')
    ->fields('et', ['entity_id', 'user_id_target_id']);
  $query->condition('et.delta', 0);
  $user_ids = $query->execute()->fetchAllKeyed();

  // Eliminar del almacenamiento.
  $database->truncate('entity_test__user_id')->execute();

  // Actualizar definiciones y schemas.
  $manager = \Drupal::entityDefinitionUpdateManager();
  $storage_definition = $manager->getFieldStorageDefinition('user_id', 'entity_test');
  $storage_definition->setCardinality(1);
  $manager->updateFieldStorageDefinition($storage_definition);

  // Restaurar datos y schema en la entidad.
  foreach ($user_ids as $id => $user_id) {
    $database->update('entity_test')
      ->fields(['user_id' => $user_id])
      ->condition('id', $id)
      ->execute();
  }
}
```

```php
/**
 * Implementions of hook_update_N().
 */
function nombre_modulo_update_8001(&$sandbox) {
  $field_storage = FieldStorageConfig::loadByName('block_content', 'placement');
  $allowed_values = $field_storage->getSetting('allowed_values');
  if (!isset($allowed_values['cashback_checkout'])) {
    $allowed_values['cashback_checkout'] = 'Cashback checkout';
    $field_storage->setSetting('allowed_values', $allowed_values);
    $field_storage->save();
  }
}

/**
 * Implements hook_update_n() for new fields in node type Event.
 */
function real_extra_fields_update_8001() {
  $storage_definitions = [
    'audience_type' => BaseFieldDefinition::create('entity_reference')
      ->setLabel(t('Audience type'))
      ->setSetting('target_type', 'taxonomy_term')
      ->setCardinality(3),

    'date' => BaseFieldDefinition::create('datetime')
      ->setLabel(t('Date'))
      ->setSetting('datetime_type', 'date')
      ->setCardinality(1),

    'details_participation_fee' => BaseFieldDefinition::create('text_long')
      ->setLabel(t('Participation fees (details)'))
      ->setTranslatable(TRUE)
      ->setDisplayOptions('form', [
        'type' => 'text_long',
        'weight' => 0,
      ])
      ->setCardinality(1),

    'repl' => BaseFieldDefinition::create('link')
      ->setLabel(t('Replay'))
      ->setSettings([
        'link_type' => LinkItemInterface::LINK_GENERIC,
        'title' => 1,
      ])
      ->setDisplayOptions('form', [
        'type' => 'link_default',
      ])
      ->setCardinality(1),
  ];

  $entity_definition_update_manager = \Drupal::entityDefinitionUpdateManager();
  foreach ($storage_definitions as $field_name => $storage_definition) {
    $entity_definition_update_manager->installFieldStorageDefinition($field_name, 'node', 'node', $storage_definition);
  }
}

/**
 * Implements hook_update_N().
 *
 * Update date_of_stay values from datetime to date.
 */
function siblu_field_update_8004() {
  $database = \Drupal::database();

  $fields = ['end_date_of_stay_value', 'start_date_of_stay_value'];
  $tables = ['paragraph__end_date_of_stay', 'paragraph__start_date_of_stay'];
  $revision_tables = ['paragraph_revision__end_date_of_stay', 'paragraph_revision__start_date_of_stay'];

  $i = 0;
  foreach ($fields as $field) {
    $sql = "SELECT entity_id, revision_id, $field FROM {$tables[$i]}";
    $result = $database->query($sql, []);
    if ($result) {
      while ($row = $result->fetchAssoc()) {
        $date_long = $row[$field];
        $timestamp = strtotime($date_long);
        $date_short = date('Y-m-d', $timestamp);
        $id = $row['entity_id'];
        // Update field table value.
        $database->query("UPDATE {$tables[$i]} SET {$field} = '$date_short' WHERE {$tables[$i]}.entity_id = :id", [":id" => $id]);
        // Update revision field table value.
        $database->query("UPDATE {$revision_tables[$i]} SET {$field} = '$date_short' WHERE {$revision_tables[$i]}.entity_id = :id", [":id" => $id]);
      }
    }
    $i++;
  }
}

/**
 * Update unused layouts 'layout_x' and 'layout_y'.
 */
function asf_layout_builder_ui_post_update_unused_layouts(&$sandbox = NULL) {
  // Need to update existing nodes' layout sections in following way:
  // 'layout_x' => 'new_layout_x' and
  // 'layout_y' => 'new_layout_y'.
  $field_name = OverridesSectionStorage::FIELD_NAME;
  $layout_ids = [
    'layout_x' => 'new_layout_x',
    'layout_y' => 'new_layout_y',
  ];
  $node_storage = \Drupal::entityTypeManager()->getStorage('node');
  if (!isset($sandbox['ids'])) {
    $sandbox['ids'] = $node_storage->getQuery()->exists($field_name)->execute();
    $sandbox['count'] = count($sandbox['ids']);
  }

  for ($i = 0; $i < 10 && count($sandbox['ids']); $i++) {
    $id = array_shift($sandbox['ids']);
    $save = FALSE;
    $node = $node_storage->load($id);
    $sections = $node->get($field_name)->getSections();
    foreach ($sections as $delta => $section) {
      $layout_id = $section->getLayoutId();
      if (in_array($layout_id, array_keys($layout_ids))) {
        $new_section = Section::fromArray([
          'layout_id' => $layout_ids[$layout_id],
          'components' => array_values(array_map(
            function (SectionComponent $component) {
              return $component->toArray();
            }, $section->getComponents())),
        ]);
        $sections[$delta] = $new_section;
        $save = TRUE;
      }
    }
    if ($save) {
      $node->get($field_name)->setValue($sections);
      $node->save();
    }
  }

  $sandbox['#finished'] = empty($sandbox['ids']) ? 1 : ($sandbox['count'] - count($sandbox['ids'])) / $sandbox['count'];
}

/**
 * Update used sandbox and at file nombre_modulo.post_update.php 
 * function hook_post_update_NAME
 */

function nombre_modulo_post_update_nombre_de_la_funcion(&$sandbox) {
  $storage = \Drupal::entityTypeManager()->getStorage('commerce_product');
  // Initialize some variables during the first pass through.
  if (!isset($sandbox['total'])) {
    $ids = $storage->getQuery()
      ->condition('webform_ads', 'contact_project', '<>')
      ->count()
      ->execute();
    if ($ids == 0) {
      $sandbox['#finished'] = 1;
      return;
    }
    $sandbox['total'] = $ids;
    $sandbox['current'] = 0;
  }
  // Handle one pass through.
  $ids = $storage->getQuery()
    ->condition('webform_ads', 'contact_project', '<>')
    ->range($sandbox['current'], $sandbox['current'] + 25)
    ->execute();
  $products = $storage->loadMultiple($ids);
  if (empty($products)) {
    $sandbox['#finished'] = 1;
    return;
  }
  foreach ($products as $product) {
    $product->webform_ads->target_id = 'contact_project';
    $product->save();
    $sandbox['current']++;
  }
  \Drupal::messenger()->addStatus($sandbox['current'] . ' products processed.');
  $sandbox['#finished'] = ($sandbox['current'] / $sandbox['total']);
}

```

### Cargar nuevas configuraciones
```php
/**
 * Create 'Duration', 'Model' vocabularies.
 */
function siblu_field_update_8004() {
  $configs = [
    'taxonomy.vocabulary.model',
    'taxonomy.vocabulary.duration',
    'language.content_settings.taxonomy_term.model',
    'language.content_settings.taxonomy_term.duration',
  ];
  $module_installer = \Drupal::service('module_installer');
  $module_installer->install([
    'config_import',
  ], TRUE);
  /* @var \Drupal\config_import\ConfigImporterServiceInterface $config_importer */
  $config_importer = \Drupal::service('config_import.importer');
  $config_importer->importConfigs($configs);
  $module_installer->uninstall([
    'config_import',
  ], TRUE);
}
```


ENLACES Y FUENTES
=================
APi de actualización
- https://www.drupal.org/docs/drupal-apis/update-api/introduction-to-update-api-for-drupal-8

Ejemplos Hooks update
- https://www.drupal.org/docs/8/api/update-api/updating-database-schema-andor-data-in-drupal-8

Hooks post update
- https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Extension%21module.api.php/function/hook_post_update_NAME/8.2.x