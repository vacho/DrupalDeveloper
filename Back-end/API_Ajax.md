API de ajax
========

#### Enlaces ajax mediante la clase 'use-ajax'
Trabajamos en el método que dibuja un bloque (build()).
```
public function build() {
  $build = [];
  $build[] = [
    '#theme' => 'container',
    '#children' => [
      '#markup' => '<label>' . $this->t('Hello') . '</label>',
    ]
  ];
  $url = Url::fromRoute('hello.hide_block);
  $url->setOption('attributes', ['class' => 'use-ajax']);
  $build[] = [
    '#type' => 'link',
    '#url' => $url,
    '#title' => $this->t('Remove'),
  ]
  return $build; 
}
```
La ruta para el método que va realizar el trabajo en drupal-php
```
hello.hide_block:
  path: '/hide-block'
  defaults:
    _controller: \Drupal\mi_modulo\Controller\HelloController::hideBlock
  requirements:
    _permission: 'access content'  
```
El método en el Controlador
```
public function hideBlock(Request $request) {
  if (!$request->isXmlHttpRequest()) {
    throw new NotFoundHttpException();
  }

  $response = new AjaxResponse();
  $command = new RemoveCommand('.block-hello');
  $response->addCommand($command);
  return $response;
}
```
Nota: Se puede usar en Botones ajax mediante la clase 'use-ajax-submit'.

#### Formularios AJAX
Elemento de formulario que tiene un recargado ajax
```
$form['plugin'] = [
  '#type' => 'select',
  '#title' => $this->t('Plugin'),
  '#default_value' => $importer->getPluginId(),
  '#options' => $options,
  '#description' => $this->t('The plugin to be used with this importer'),
  '#required' => TRUE,
  '#empty_option' => $this->t('Please select a plugin'),
  '#ajax' => [
    'callback' => [$this, 'pluginConfigAjaxCallback'],
    'wrapper' => 'plugin-configuration-wrapper'
  ]
]
```


#### Referencias
Lista de todos los métodos ajax que podemos usar desde php
https://api.drupal.org/api/drupal/core%21core.api.php/group/ajax/9.0.x