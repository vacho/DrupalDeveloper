HOOKS
========

#### Preguardado de una entidad
```
/**
 * Implements hook_entity_presave().
 */
function nombre_modulo_entity_presave(Drupal\Core\Entity\EntityInterface $entity) {
  switch ($entity->bundle()) {
    case 'nombre_sistema_entidad':
      $gender = $entity->get('field_gender')->value;
      $entity->set('field_gender2', $cgender);
      break;
    ...  
  }
}
```

#### Modificar un formulario
```
/**
 * Implements hook_form_alter().
 */
function nombre_modulo_form_alter(&$form, \Drupal\Core\Form\FormStateInterface $form_state, $form_id) {
  if ($form_id == 'node_people_edit_form') {
    $form['field_is_single']['widget'][0]['value']['#attributes']['readonly'] = TRUE;
    ...
    return $form;
  }
}

/**
 * Implements hook_form_FORM_ID_alter().
 */
function mombre_modulo_form_id_del_formulario_alter(array &$form, \Drupal\Core\Form\FormStateInterface $form_state) {
  // Prepare form for using AJAX.
  $form['#attached']['library'][] = 'core/drupal.dialog.ajax';
  $form['caption'] = [
    '#type' => 'html_tag',
    '#tag' => 'div',
    '#value' => t('Want to join our community ?'),
    '#weight' => -25,
    '#attributes' => [
      'class' => [
        'newsletter-form-caption',
        'a-block-title',
        'a-block-title--size--small',
      ],
    ],
  ];
  ...
}


/**
 * Implements hook_webform_submission_form_alter().
 */
function nombe_modulo_webform_submission_form_alter(array &$form, FormStateInterface $form_state, $form_id) {
  // Disable inline form errors summary for all webforms.
  $form['#disable_inline_form_errors_summary'] = TRUE;
}

/**
 * Implements hook_webform_element_alter().
 */
function nombre_modulo_webform_element_alter(array &$element, FormStateInterface $form_state, array $context) {
  if ($element["#webform_id"] == 'job_application--job_offer_title') {
    if (isset($_GET["job_offer"])) {
      $node = Node::load($_GET["job_offer"]);
      if ($node instanceof NodeInterface) {
        $element['#markup'] = t("To apply for the « @title » offer, please complete the following form :", ['@title' => $node->getTitle()]);
      }
    }
  }


```

#### Modificar una view
```
/**
 * Implementation of hook_views_query_alter().
 */
function nombre_modulo_views_query_alter(ViewExecutable $view, QueryPluginBase $query) {
  if ($view->id() == 'id_de_la_view') {
    $query->addField('node_field_data', 'nid', '', ['function' => 'groupby']);
    $query->addGroupBy('node_field_data.nid');
  }
}

/**
 * Implements hook_views_pre_render().
 */
function nombre_modulo_views_pre_render(ViewExecutable $view) {
  // Update title for category view.
  if ($view->storage->id() == 'commerce_cart_block') {
    $category = Term::load($id_category);
    $curr_langcode = \Drupal::languageManager()->getCurrentLanguage(\Drupal\Core\Language\LanguageInterface::TYPE_CONTENT)->getId();
    $translated = \Drupal::service('entity.repository')->getTranslationFromContext($category, $curr_langcode);
    $view->setTitle($translated->getName());
  }
}
```

#### Modificar un bloque 
```
/**
 * Implements hook_block_build_BASE_BLOCK_ID_alter().
 */
function nombre_modulo_block_build_lang_drop_down_switcher_alter(array &$build, BlockPluginInterface $block) {
  $langcodes = _get_configurable_languages();
  $languages_disabled = 0;

  foreach ($langcodes as $configurableLanguage) {
    $disabled = $configurableLanguage->getThirdPartySetting('disable_language', 'disable');
    if (isset($disabled) && $disabled == 1) {
      $languages_disabled++;
    }
  }

  if ($languages_disabled == count($langcodes) || $languages_disabled == count($langcodes) - 1) {
    $build['#access'] = FALSE;
  }
}

function _get_configurable_languages() {
  $configurableLanguages = [];

  // Get all languages.
  $languages = \Drupal::languageManager()->getLanguages();

  // The language itself doesn't own the thirdPartySetting,
  // So we need to use its matching ConfigEntity
  // Getting the ConfigurableLanguageManager.
  $configManager = \Drupal::entityTypeManager()->getStorage('configurable_language');
  $configurableLanguages = $configManager->loadMultiple(array_keys($languages));

  return $configurableLanguages;
}
```

#### Modificar algo en el theme
```
/**
 * Implements hook_preprocess_HOOK().
 */
function nombre_modulo_preprocess_block__system_branding_block(&$variables) {
  // @see asf_form_system_theme_settings_alter().
  $svg_images = [
    'svg_logo_image' => theme_get_setting('svg_logo_image'),
    'svg_logo_text' => theme_get_setting('svg_logo_text'),

  ];
  foreach ($svg_images as $key => $svg_image) {
    $file = $svg_image ? File::load($svg_image[0]) : NULL;
    if ($file) {
      $variables[$key] = [
        '#theme' => 'image',
        '#uri' => $file->getFileUri(),
      ];
    }
  }
}
```

#### Reparar un schema personalizado
```
/**
 * Implements hook_config_schema_info_alter().
 */
function nombre_modulo_config_schema_info_alter(&$definitions) {
  // @todo: Remove once https://www.drupal.org/project/menu_multilingual/issues/2956990 is fixed.
  if (isset($definitions['block.settings.system_menu_block:*.third_party.menu_multilingual']['mapping']) && isset($definitions['block.settings.system_menu_block:*']['mapping'])) {
    $definitions['block.settings.system_menu_block:*']['mapping'] = array_merge($definitions['block.settings.system_menu_block:*']['mapping'], $definitions['block.settings.system_menu_block:*.third_party.menu_multilingual']['mapping']);
  }
}  
```

#### Modificar un tipo de contenido
```
/**
 * Implements hook_entity_type_build().
 */
function nombre_modulo_entity_type_build(array &$entity_types) {
  if (isset($entity_types['node'])) {
    $entity_types['node']->addConstraint('UniqueIdCatalog', []);
  }
}
```

#### Agregar una librería a una página
```
/**
 * Implements hook_page_attachments().
 */
function nombre_modulo_page_attachments(array &$attachments) {
  // Gigya adds scripts in all pages so we add throbber script too.
  $attachments['#attached']['library'][] = 'nombre_modulo/nombre_libreria';
}
```

#### Modificar un widget
```
/**
 * Implements hook_field_widget_form_alter().
 */
function nombre_modulo_field_widget_form_alter(&$element, FormStateInterface $form_state, $context) {
  $field_definition = $context['items']->getFieldDefinition();
  $paragraph_entity_reference_field_name = $field_definition->getName();

  if ($paragraph_entity_reference_field_name == 'additionnal_informations') {
    $widget_state = WidgetBase::getWidgetState($element['#field_parents'], $paragraph_entity_reference_field_name, $form_state);
    $paragraph_instance = $widget_state['paragraphs'][$element['#delta']]['entity'];
    // Duration field should be invisible if type of contract != CDD.
    if ($paragraph_instance->bundle() == 'job_offer_informations') {
      if (isset($element['subform']['duration'])) {
        $dependee_field_name = 'type_of_contract';
        $selector = sprintf('select[name="%s[%d][subform][%s]"]', $paragraph_entity_reference_field_name, $element['#delta'], $dependee_field_name);
        $element['subform']['duration']['#states'] = [
          'visible' => [
            $selector => ['value' => 'cdd'],
          ],
        ];
      }
    }
  }
}
```

#### Modifcar un menu operations
```
/**
 * Implements hook_entity_operation_alter().
 */
function nombre_modulo_entity_operation_alter(array &$operations, EntityInterface $entity) {
  // Add 'Edit all' operation to webform submissions items.
  if ($entity->getEntityTypeId() === "webform_submission") {
    /* @var $edit_operation_url Drupal\Core\Url */
    $edit_operation_url = $operations['edit']['url'];
    if (isset($edit_operation_url)) {
      $url = \Drupal\Core\Url::fromRoute('entity.webform_submission.edit_form.all', $edit_operation_url->getRouteParameters());
      $operation = [
        'title' => t('Edit all'),
        'weight' => 0,
        'url' => $url,
      ];
      array_push($operations, $operation);
    }
  }
}
```

#### Modificar o filtrar plugins por tipo y por consumidor
```
/**
 * Implements hook_plugin_filter_TYPE__CONSUMER_alter().
 */
function nombre_modulo_plugin_filter_block__layout_builder_alter(&$definitions) {
  /* @var $user Drupal\user\Entity\User */
  $current_user = \Drupal::currentUser();
  $user = User::load($current_user->id());
  // User 'contributor' can't use share this block.
  if ($user->hasRole('contributor')) {
    unset($definitions['sharethis_widget_block']);
  }
}
```

#### Alterar las tareas de instalación - configuraciones
```
/**
 * Implements hook_install_tasks_alter().
 */
function nombre_modulo_install_tasks_alter(&$tasks, $install_state) {
  // Moves the language config import task to the end of the install tasks so
  // that it is run after the final import of languages.
  $task = $tasks['sdd_install_import_language_config'];
  unset($tasks['sdd_install_import_language_config']);
  $tasks = array_merge($tasks, ['sdd_install_import_language_config' => $task]);
}
```

#### Quitar una pestaña del menu de tabs de webform
```
/**
 * Implements hook_local_tasks_alter().
 */
function nombre_modylo_local_tasks_alter(&$local_tasks) {
  // Unset webform submissions because we replace it by a view page with tabs for each form.
  unset($local_tasks['entity.webform_submission.collection']);
}
```

#### Hook update
```
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
```
### Cargar nuevas configuraciones
```
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

### Alterar los links de menús, campos de tipo link
```
/**
 * Implements hook_link_alter().
 *
 * Add target="_blank" to all external links.
 */
function mi_modulo_link_alter(&$variables) {
  if ($variables['url']->isExternal()) {
    $webUri = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
    /* @var $url Drupal\Core\Url */
    $url = $variables['url'];
    $linkUri = $url->toString();
    if (str_contains($linkUri, $webUri) === FALSE) {
      $variables['options']['attributes']['target'] = '_blank';
      $variables['options']['attributes']['rel'] = 'noopener';
    }
  }
}
```
### Alterar el modo de vista de un nodo
```
/**
 * Implements hook_node_view().
 */
function nombre_modulo_node_view(array &$build, EntityInterface $entity, EntityViewDisplayInterface $display, $view_mode) {
  if ($entity->bundle() == 'landing_page' && $view_mode == "teaser") {
    if (empty($build['hea'][0])) {
      $id_empty_image = 39;
      $media_entity = Media::load($id_empty_image);

      $build['hea']['#theme'] = 'field';
      $build['hea']['#title'] = 'Header image';
      $build['hea']['#label_display'] = 'hidden';
      $build['hea']['#view_mode'] = 'teaser';
      $build['hea']['#language'] = $entity->language()->getId();
      $build['hea']['#field_name'] = 'hea';
      $build['hea']['#field_type'] = 'entity_reference';
      $build['hea']['#field_translatable'] = FALSE;
      $build['hea']['#entity_type'] = 'node';
      $build['hea']['#bundle'] = 'landing_page';
      $build['hea']['#object'] = $entity;
      $build['hea']['#formatter'] = 'entity_reference_entity_view';
      $build['hea']['#is_multiple'] = FALSE;
      $build['hea']['#third_party_settings'] = [];
      $build['hea'][0] = [
        '#media' => $media_entity,
        '#view_mode' => 'card',
        '#cache' => [
          'tags' => [
            '0' => "media:" . $id_empty_image,
            '1' => "media_view",
          ],
          'contexts' => [
            '0' => "route.name.is_layout_builder_ui",
            '1' => "user.permissions",
          ],
          'max-age' => -1,
          'keys' => [
            '0' => "entity_view",
            '1' => "media",
            '2' => $id_empty_image,
            '3' => "card",
          ],
          'bin' => "render",
        ],
        '#theme' => 'media',
        '#weight' => 0,
        '#pre_render' => [
          '0' => [
            '0' => \Drupal::entityTypeManager()->getViewBuilder('media'),
            '1' => 'build',
          ],
        ],
      ];
      $build['hea']['#weight'] = 0;
    }
  }
}
```

ENLACES Y FUENTES
=================
Lista de hooks
- https://api.drupal.org/api/drupal/core!core.api.php/group/hooks/8.2.x


Que son los hooks
- https://drupalize.me/tutorial/what-are-hooks?p=2766
- https://www.drupal.org/docs/creating-custom-modules/understanding-hooks

Ejemplos Hooks update
- https://www.drupal.org/docs/8/api/update-api/updating-database-schema-andor-data-in-drupal-8
- https://www.drupal.org/docs/7/creating-custom-modules/howtos/examples-for-database-update-scripts-using-hook_update_n-how