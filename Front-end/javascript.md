Javascript
========
#### 

1. Implementar Libreria en mi_modulo/hello.libraries.yml
```yml
hello_world:
  version: 1.x
  js:
    js/hello.js: {}
  dependencies:
    - core/jquery
    - core/drupal
    - core/jquery.once
```

2. Agregar al render la libreria
```php
$render[#target] = $this->t('Hello');
$render[#attached] = [
  'library' => [
    'mi_modulo/hello_world'
  ]
]
$render['#attached']['drupalSettings'] = [
  'node_type' => $node->type->entity->label(),
];    
```

3. Implementamos el js en Drupal.attachBehaviours (cuando la página esta completamente cargada)
```js
(function (Drupal, $) {
  "use strict";
  Drupal.behaviors.helloWorld = {
    attach: function (context, settings) {
      var message = '<div>Hello ' + settings.node_type + '</span></div>'
      $(document).find('.hello').append(message);
    }
  }
}) (Drupal, jQuery)
```
context:Contiene sólo las partes nuevas de la página.

settings: Contiene datos pasados desde php (Drupal)

ENLACES Y FUENTES
=================

Estándares de programación js dentro de drupal
- https://www.drupal.org/node/172169


Nuevas formas de usar jquery ui
- https://www.drupal.org/docs/upgrading-drupal/upgrading-from-drupal-8-or-later/upgrading-from-drupal-9-to-drupal-10-0/migrating-dependencies-on-core-jquery-ui-libraries