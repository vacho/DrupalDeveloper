Batch
===

Drupal provee una API para ejecutar tareas pesadas sin que php retorne errores por capacidades de memoria.


#### Ejemplo de código puesto su ejecución en batch.
```php
//Verificar una lista de emails em batch.
public function submitForm(array &$form, FormStateInterface $form_state) {
  $email_ids = $form_state->getValue('emailids');
  $emails = explode("\n",$email_ids);
    
  $batch = array(
    'title' => t('Verifying Emails...'),
    'operations' => [],
    'init_message'     => t('Starting'),
    'progress_message' => t('Processed @current out of @total.'),
    'error_message'    => t('An error occurred during processing'),
    'finished' => '\Drupal\batch_example\DeleteNode::ExampleFinishedCallback',
  );
  foreach ($emails as $key => $value) {
    $email = trim($value);
    $batch['operations'][] = ['\Drupal\batch_example\EmailCheck::checkEmailExample',[$email]];
  }

  batch_set($batch);
}
```

#### Referencias
Documentación API
- https://api.drupal.org/api/drupal/core%21includes%21form.inc/group/batch/8.2.x

Ejemplo de uso
- https://opensenselabs.com/blogs/tech/how-use-batch-api-drupal-8