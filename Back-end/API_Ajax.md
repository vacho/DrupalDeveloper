API de ajax
========

#### Enlaces ajax mediante la clase 'use-ajax'
Trabajamos en el método que dibuja un bloque (build()).
```php
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
```yml
hello.hide_block:
  path: '/hide-block'
  defaults:
    _controller: \Drupal\mi_modulo\Controller\HelloController::hideBlock
  requirements:
    _permission: 'access content'  
```

El método en el Controlador
```php
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
```php
$form['example_select'] = [
  '#type' => 'select',
  '#title' => $this->t('Example select field'),
  '#options' => [
    '1' => $this->t('One'),
    '2' => $this->t('Two'),
    '3' => $this->t('Three'),
    '4' => $this->t('From New York to Ger-ma-ny!'),
  ],
  '#ajax' => [
    'callback' => '::myAjaxCallback', // don't forget :: when calling a class method.
    //'callback' => [$this, 'myAjaxCallback'], //alternative notation
    'disable-refocus' => FALSE, // Or TRUE to prevent re-focusing on the triggering element.
    'event' => 'change',
    'wrapper' => 'edit-output', // This element is updated with this AJAX callback.
    'progress' => [
      'type' => 'throbber',
      'message' => $this->t('Verifying entry...'),
    ],
  ]
];

$form['output'] = [
  '#type' => 'textfield',
  '#size' => '60',
  '#disabled' => TRUE,
  '#value' => 'Hello, Drupal!!1',
  '#prefix' => '<div id="edit-output">',
  '#suffix' => '</div>',
];

if ($selectedValue = $form_state->getValue('example_select')) {
  // Get the text of the selected option.
  $selectedText = $form['example_select']['#options'][$selectedValue];
  // Place the text of the selected option in our textfield.
  $form['output']['#value'] = $selectedText;
}
```

Método que realiza el remplazo en 'plugin-configuration-wrapper'
```php
public function myAjaxCallback(array &$form, FormStateInterface $form_state) {
  // Return the prepared textfield.
  return $form['output'];
}

```
#### Recomendaciones importantes
- En formularios, los métodos validate() y submit() se ejecutan antes de los métodos ajax y se pueden usar para actualiazar los valores de form_state. Debido a que cuando se actualiza un elemento de formulario en los métodos ajax no se actualizan sus valores form_state.
- En formularios, no es buena idea generar nuevos elementos de formulario en los métodos ajax. Esto provoca errores.
- En formularios, lo más usual es generar todos los elementos en el método build() para luego manipular su renderizado mediante los métodos callback ajax, form_state y el método validate()

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