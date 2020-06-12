Fechas
===

#### Fechas
```
// Convertir una fecha a un formato de la isntancia Drupal
format_date($rowKardex->getDate(), 'khipu_short'); //deprecado
\Drupal::service('date.formatter')->format($Service->getDate(), 'khipu_short');

// Fecha actual formateado para Drupal
$date = date('Y-m-d H:i:s');
new DrupalDateTime($date)
```
