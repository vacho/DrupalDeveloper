Javascript
========
#### 

1. Implementar Libreria en mi_modulo/hello.libraries.yml
```
hello_world:
  version: 1.x
  js:
    js/hello.js: {}
    dependencies:
      - core/jquert
      - core/drupal
      - core/jquery.once
```

2. Agregar al render la libreria
```
$render[#target] = $this->t('Hello');
$render[#attached] = [
  'library' => [
    'mi_modulo/hello_world'
  ]
]
$render'#attached']['drupalSettings'] = [
  'node_type' => $node->type->entity->label(),
];    
```

3. Implementamos el js en Drupal.attachBehaviours (cuando la página esta completamente cargada)
```
(function (Drupal, $) {
  "use strict";
  Drupal.behaviours.helloWorld = {
    attach: function (context, settings) {
      function watch() {
        var date = new Date();
        $(context).find('.time').html(date.toLocaleTimeString());
      }
      var clock = '<div>The time is <span class="time"> ' + settings.node_type + '</span></div>'
      $(document).find('.hello').append(clock);
      setInterval(function() {
        watch();
      }, 1000);
    }
  }
}) (Drupal, jQuery)
```
context:Contiene sólo las partes nuevas de la página.

settings: Contiene datos pasados desde php (Drupal)

ENLACES Y FUENTES
=================

Estándares de programación js dentro de drupal

https://www.drupal.org/node/172169
