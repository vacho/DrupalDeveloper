API de actualización
========
Se utiliza cuando se realizan cambios en la configuración que afectan a datos almacenados.
- Campos de una entidad.
- Schemas.
- Tipos de datos, valores permitidos o estructura de arreglos para una key de configuración.
- Dependencias. (Ejemplo de un plugin)
- Etc.

### Para ejecutar los hooks update:
```bash
drush updb -y
```

### Funciones para actualizar entidades y schemas
```php
- getEntityType($entity_type_id)
- installEntityType(EntityTypeInterface $entity_type)
- updateEntityType(EntityTypeInterface $entity_type)
- uninstallEntityType(EntityTypeInterface $entity_type)
- getFieldStorageDefinition($name, $entity_type_id)
- installFieldStorageDefinition($name, $entity_type_id, $provider, FieldStorageDefinitionInterface $storage_definition)
- updateFieldStorageDefinition(FieldStorageDefinitionInterface $storage_definition)
- uninstallFieldStorageDefinition(FieldStorageDefinitionInterface $storage_definition)
```

### hook_update
- Se utiliza para actualizar Entidades, Campos, Vistas entre otros. 
- Se tiene que considerar que algunas API's de drupal no están todabia levantadas cuando se ejecutan.
- Se debe seguir la numeración N nombre_modulo_update_N.
- Se programan en mi_modulo.install

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

/**
 * Cambiar la cadinalidad de un campo con datos de uno a muchos y viceversa.
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

/**
 * Cargar nuevas configuraciones.
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

/**
 * Actualizar los valores permitidos de un campo.
 */
/**
 * Add new option on "Header color" field.
 */
function nombre_modulo_update_8002() {
  $entity_definition_update_manager = \Drupal::entityDefinitionUpdateManager();
  $field_storage_definition = $entity_definition_update_manager->getFieldStorageDefinition('header_color', 'node');
  $allowed_values = $field_storage_definition->getSetting('allowed_values');
  $allowed_values['Black on white'] = 'Black on white';
  $field_storage_definition->setSetting('allowed_values', $allowed_values);
  $entity_definition_update_manager->updateFieldStorageDefinition($field_storage_definition);
}

/**
 * Update ct plant with 'site' system name by plant with 'plant' system name.
 */
function nombre_modulo_update_8001() {
  // Backup of all content 'site' in data structure and then remove.
  $node_storage = \Drupal::entityTypeManager()->getStorage('node');
  $ids = $node_storage->getQuery()
    ->condition('type', 'site', '=')
    ->execute();
  $nodes = $node_storage->loadMultiple($ids);
  $temp_nodes = [];
  foreach ($nodes as $node) {
    $temp_nodes[] = $node;
    $node->delete();
  }

  // Run configurations: remove ct 'site' and create ct 'plant'.
  /** @var SiteAliasManager $alias_manager */
  $alias_manager = Drush::service('site.alias.manager');
  Drush::drush($alias_manager->getSelf(), 'config:import')->run();

  // Load content backed up to ct 'plant'.
  foreach ($temp_nodes as $temp_node) {
    $paragraph = Paragraph::create([
      'type' => 'snmp',
      'field_snmp_authentication_password' => $temp_node->get('snmp_authentication_password')->getValue()[0]['value'],
      'field_snmp_encryption_password'     => $temp_node->get('snmp_encryption_password')->getValue()[0]['value'],
      'field_snmp_ip'                      => $temp_node->get('snmp_ip')->getValue()[0]['value'],
      'field_snmp_port'                    => $temp_node->get('snmp_port')->getValue()[0]['value'],
      'field_snmp_username'                => $temp_node->get('snmp_username')->getValue()[0]['value'],
    ]);
    $paragraph->save();
    $members = [];
    foreach ($temp_node->get('members')->getValue() as $member) {
      $members[] = $member['target_id'];
    }
    $node = Node::create([
      'type'           => 'plant',
      'title'          => $temp_node->get('title')->value,
      'ems_id'         => $temp_node->get('ems_id')->getValue()[0]['value'],
      'gelocation'     => $temp_node->get('gelocation')->getValue()[0],
      'address'        => $temp_node->get('address')->getValue()[0],
      'ip'             => $temp_node->get('ip')->getValue()[0]['value'],
      'members'        => $members,
      'snmp_reference' => [
        'target_id' => $paragraph->id(),
        'target_revision_id' => $paragraph->getRevisionId(),
      ],
    ]);
    $node->save();
  }
}

/**
 * Removing "arbol" nodes and content type.
 */
function mi_module_update_8001() {
  $node_storage = \Drupal::entityTypeManager()->getStorage('node');
  $ids = $node_storage->getQuery()
    ->condition('type', 'arbol', '=')
    ->execute();
  $nodes = $node_storage->loadMultiple($ids);
  foreach ($nodes as $node) {
    $node->delete();
  }
  $content_type = \Drupal::entityTypeManager()->getStorage('node_type')->load('arbol');
  $content_type->delete();
}


```


### hook_post_update
- Es ideal para actuializar CRUD.
- Se tiene ejecutan con toda el API cargada y despues de todos los hook_update_N.
- Puede ser llamado nombre_modulo_post_update_cualquier_texto.
- Se programan en mi_modulo.post_update.php
- Las funciones se ejecutan en orden alfabetico.

```php
/**
 * Remove if exist the account.profile menu_link.
 *
 * @param array $sandbox
 *   Stores information for batch updates.
 */
function mi_modulo_post_update_remove_account_profile_menu_link(array &$sandbox) {
  $menu_link = \Drupal::entityTypeManager()->getStorage('menu_link_content')->load('id_item_de_menu');
  if ($menu_link) {
    $menu_link->delete();
  }
}

/**
 * Remove legacy fields content.
 */
function mi_modulo_post_update_descripcion_corta_metodo(array &$sandbox) {
  $content_types = [
    'content_1',
    'content_2',
  ];

  $node_storage = \Drupal::entityTypeManager()->getStorage('node');
  // Initialize some variables during the first pass through.
  if (!isset($sandbox['total'])) {
    $nids = $node_storage->getQuery()
      ->condition('type', $content_types, 'IN')
      ->execute();
    $sandbox['total'] = count($nids);
    $sandbox['current'] = 0;
  }

  // Handle one pass through.
  $nids = $node_storage->getQuery()
    ->condition('type', $content_types, 'IN')
    ->range($sandbox['current'], $sandbox['current'] + 25)
    ->execute();
  $nodes = $node_storage->loadMultiple($nids);

  foreach ($nodes as $node) {
    /** @var \Drupal\node\NodeInterface $node */
    $sandbox['current']++;

    if ($node->hasField('field_paragraphs') && !$node->field_paragraphs->isEmpty()) {
      foreach ($node->field_paragraphs->referencedEntities() as $key => $paragraph) {
        /** @var \Drupal\paragraphs\ParagraphInterface $paragraph */
        if ($paragraph->bundle() == 'product_promotion') {
          $node->field_paragraphs->removeItem($key);
          $paragraph->delete();
        }
      }
      $node->save();
    }
    elseif ($node->hasField('selection_categories') &&
      !$node->selection_categories->isEmpty()) {

      $node->selection_categories->target_id = NULL;
      $node->save();
    }
  }
  \Drupal::messenger()->addStatus($sandbox['current'] . ' nodes processed.');
  $sandbox['#finished'] = ($sandbox['current'] / $sandbox['total']);
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

Documentación aclaraciones
- https://www.drupal.org/project/drupal/issues/3087479

Actualización de entidades
- https://www.drupal.org/node/3034742

Módulo con un monton de código para actualizar y una API
- https://www.drupal.org/project/hook_update_deploy_tools

Actualización de configuraciones
- https://www.drupal.org/docs/drupal-apis/update-api/updating-configuration-in-drupal-8