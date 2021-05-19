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
