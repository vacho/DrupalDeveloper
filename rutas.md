Rutas
========
#### Crear una ruta
En el archivo miarchivo.routing.yml
```
sale.onlyform.add:
  path: '/sales/sales-add'
  defaults:
    _form: '\Drupal\sales\Form\addsaleForm'
    _title: 'Sales'
  requirements:
    _permission: sale.onlyform.add
```
En el archivo miarchivo.permission.yml
```
sale.onlyform.add:
  title: 'Add Sale'
  description: 'Add Sale'
  restrict access: true
```
#### Crear urls
```
  use Drupal\Core\Url;
  $Url = new Url($route_name, $params)​;

  // O mediante el método estático de la url
  $Url = Url::fromRoute($route_name, $params)​
```
#### Obtener una url
```
  $path = $Url->toString();
  // o usando como base el nombre de la ruta
  $path = \Drupal::url($route_name)
  
  // Sin una ruta como base
  use Drupal\Core\Url;
  $Url = Url::fromUri('internal:/mypath/to/style.css');
```

#### Referencias
Posibilidades de las rutas: https://www.drupal.org/node/2092643
Cheatsheet https://cryptic.zone/blog/drupal-8-cheatsheet-developers
