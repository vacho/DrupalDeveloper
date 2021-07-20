WEBFORM
========


#### 
Consultas
```php
$submission_storage = \Drupal::entityTypeManager()->getStorage('webform_submission');
$ids_ws = $submission_storage->getQuery()
  ->accessCheck(FALSE)
  ->condition('uuid', $submission_uuid)
  ->execute();
if (count($ids_ws) == 1) {
  $id_ws = reset($ids_ws);
  $webform_submission = $submission_storage->load($id_ws);
  $webform_submission_data = $webform_submission->getData();

  if ($webform_submission_data['numero_de_socio'] == $codigo_de_socio) {
    $email = $webform_submission_data['correo_electronico'];
    $whatsapp_number = $webform_submission_data['numero_celular_con_whatsapp'];
    $status = TRUE;
  }
  else {
    $status = FALSE;
  }
}

$select = \Drupal::service('database')
  ->select('webform_submission_data', 'wsd')
  ->fields('wsd', array('sid'))
  ->orderBy('wsd.sid', 'DESC')
  ->condition('wsd.webform_id', 'id_formulario', '=')
  ->condition('wsd.name', 'nombre_sistema_del_campo', '=')
  ->condition('wsd.value', $some_value, '=')
  ->execute();
$results = $select->fetchAll(\PDO::FETCH_COLUMN);

```

Actualización.
```php
$submission_storage = \Drupal::entityTypeManager()->getStorage('webform_submission');
$ids = $submission_storage->getQuery()
  ->accessCheck(FALSE)
  ->condition('webform_id', 'id_del_webform')
  ->execute();
if (count($ids) > 0) {
  foreach ($ids as $id) {
    $submission = $submission_storage->load($id);
    $data = $submission->getData();
    // Remove unused wich_session.
    if ($data['wich_formation'] != 'Bootcamp Ma Collection' && !empty($data['wich_session'])) {
      $submission->setElementData('wich_session', '');
      $submission->save();
    }
  }
}
```

ENLACES Y FUENTES
=================

Crear y actualizar envios de webform
- https://www.drupal.org/docs/8/modules/webform/webform-cookbook/how-to-programmatically-create-and-update-a-submission