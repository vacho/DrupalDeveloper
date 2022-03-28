TempStorage
========

#### Manejo

```php

// Para poner valores en tempstorage
$tempstore = \Drupal::service('tempstore.private');
$store = $tempstore->get('nombre_de_colección');
$store->set('key_name', $value);

// Para recuperar los valores en tempstorage
$tempstore = \Drupal::service('tempstore.private');
$store = $tempstore->get('nombre_de_colección');
$value = $store->get('key_name');

// Eliminar dato. De todas maneras el dato será removido en una semana.
$store->delete('key_name');
```
