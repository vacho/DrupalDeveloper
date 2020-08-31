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

Otras opciones que se pueden usar dentro de #ajax:
- 'method': Metodo jQuery que se ejecuta sobre sobre 'wrapper'. Por defecto es replaceWith()
- 'event': El evento que será disparado
- 'progress': Arreglo indicando el avance del procesamiento de ajax
- 'url': En caso de que no usemos 'callback' (\Drupal\Core\Url)
```
<div class="container">
  <div class="inner first">Hello</div>
  <div class="inner second">And</div>
</div>

$( "div.second" ).replaceWith( "<h2>New heading</h2>" );

<div class="container">
  <div class="inner first">Hello</div>
  <h2>New heading</h2>
</div>
```

También se puede utilizar: append(), html() y otros
```
<div class="demo-container">
  <div class="demo-box">Demonstration Box</div>
</div>

$( "div.demo-container" ).html( "<p>All new content. <em>You bet!</em></p>" );

<div class="demo-container">
  <p>All new content. <em>You bet!</em></p>
</div>
```

Método que realiza el remplazo en 'plugin-configuration-wrapper'
```
public function pluginConfigAjaxCallback($form, FormStateInterface $form_state) {
  return $form['plugin_configuration']
}
```


Referencias
===
Conceptops básicos
- https://www.drupal.org/docs/drupal-apis/ajax-api/basic-concepts

Documentación oficial de ajax en formularios - ejemplos
- https://www.drupal.org/docs/drupal-apis/javascript-api/ajax-forms

Lista de todos los métodos ajax que podemos usar desde php
- https://api.drupal.org/api/drupal/core%21core.api.php/group/ajax/9.1.x


Notas importantes sobre ajax a formularios mediante hook_form_alter
- https://www.reddit.com/r/drupal/comments/c7bph8/adding_ajax_callback_to_form_element_using_hook/