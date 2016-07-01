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

#### Referencias
Posibilidades de las rutas: https://www.drupal.org/node/2092643
