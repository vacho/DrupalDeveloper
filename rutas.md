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
  $url = new Url($route_name, $params)​;

  // O mediante el método estático de la url
  $url = Url::fromRoute($route_name, $params)​
```

#### Referencias
Posibilidades de las rutas: https://www.drupal.org/node/2092643
Cheatsheet https://cryptic.zone/blog/drupal-8-cheatsheet-developers
