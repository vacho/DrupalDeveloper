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
function nombre_modulo_form_alter(&$form, &$form_state, $form_id) {
  if ($form_id == 'node_people_edit_form') {
    $form['field_is_single']['widget'][0]['value']['#attributes']['readonly'] = TRUE;
    ...
    return $form;
  }
}```

ENLACES Y FUENTES
=================
