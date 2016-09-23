MVC
========
#### Ruta: en mimodulo/mimodulo.routing.yml
```
mimodulo.nombre_de_la_ruta:
    path: /ruta/que-se-requiera
    defaults:
      _controller:  Drupal\mimodulo\Controller\NombreControladorController::nombre_metodo
      _title: 'Aqui el título'
    requirements:
      _permission: mimodulo.nombre_del_permiso
```

#### Permiso: en mimodulo/mimodulo.permissions.yml
```
mimodulo.nombre_del_permiso:
  title: "Títlo del privilegio"
  description: "Descripción del privilegio"
  restrict access: true

```

#### Hoock en el módulo: en mimodulo/mimodulo.module
```
function mimodulo_theme() {
  $theme['nombre_template'] = [
    'variables' => [ 'variable_1' => NULL, 'variable_n' => NULL],
    'template' => 'nombre_template',
  ];
  return $theme;
}
```

#### Controlador: en mimodulo/src/Controller/NombreControladorController.php 
```
<?php

/**
 * @file
 * Contains \Drupal\mimodulo\Controller\NombreControladorController.
 */

namespace Drupal\mimodulo\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class NombreControlador.
 *
 * @package Drupal\mimodulo\Controller
 */

class NombreControladorController extends ControllerBase {

  public function nombreMetodo() {
  
    ...
    $x = ...
    $y = ...
    
    // '#cache' is for doesn't cache to controller cache

    return [
      '#theme' => 'nombre_template',
      '#variable_1' => $x,
      '#variable_n' => $y,
      '#cache' => array(
            'max-age' => 0,
      ),
    ];
  }

}
```

#### Template: en mimodulo/templates/nombre_template.html.twig 
```
<div>

    <h2>{{ audio }}</h2>
    <h3>{% trans %} List of {{ variable_1 }} {% endtrans %}</h3>
  
    <ul>
    {% for item in variable_n %}
        <li>{{ item.name }}</li>
    {% endfor %}
    </ul>

</div>
```



ENLACES Y FUENTES
=================
