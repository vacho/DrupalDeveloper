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

// Conmvertir de formato europeo Y-m-d a un formato configurado en el sitio html_date
use Drupal\Core\Datetime\DrupalDateTime;

$time = DrupalDateTime::createFromFormat('Y-m-d', $date_string);
$date_formatter = \Drupal::service('date.formatter');
$date_converted = $date_formatter->format($time->getTimestamp(), 'html_date');
```
