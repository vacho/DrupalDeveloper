Variables
===

#### Variables de estado
```php
// Obtener un valor
$value = \Drupal::state()->get('name_variable');

// Obtener un valor con valor por defecto en caso e no encontrar un valor.
$value = \Drupal::state()->get('name_variable', valor_por_defecto);

// Colocar un valor
\Drupal::state()->set('name_variable', valor_variable);
```

