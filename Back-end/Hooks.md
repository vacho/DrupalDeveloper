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
function nombre_modulo_form_alter(&$form, \Drupal\Core\Form\FormStateInterface &$form_state, $form_id) {
  if ($form_id == 'node_people_edit_form') {
    $form['field_is_single']['widget'][0]['value']['#attributes']['readonly'] = TRUE;
    ...
    return $form;
  }
}

/**
 * Implements hook_form_FORM_ID_alter().
 */
function mombre_modulo_form_id_del_formulario_alter(array &$form, FormStateInterface $form_state, $form_id) {
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


ENLACES Y FUENTES
=================
Lista de hooks

https://api.drupal.org/api/drupal/core%21core.api.php/group/hooks/8.2.x


Que son los hooks

https://drupalize.me/tutorial/what-are-hooks?p=2766

https://www.drupal.org/docs/creating-custom-modules/understanding-hooks
