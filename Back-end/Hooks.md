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
Modificar una view
===

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
```

ENLACES Y FUENTES
=================
