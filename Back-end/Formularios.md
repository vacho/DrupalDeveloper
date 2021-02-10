FORMULARIOS
========

#### Manejo

```
//Obtener todos los elementos de un form_state
foreach ($form_state->getValues() as $key => $value) {
      drupal_set_message($key . ': ' . $value);
}
//Obtener un elemento de un form_state
$searched = $form_state->getValue('nombre_elemento_formulario');
    
```

#### Campos de formularios
```
// Date
$form['date'] = [
  '#type' => 'date',
  '#default_value' => $year . "-" . $month . "-" . $day,
  '#weight' => 13,
];

// Textfield con autocompletado
$form['products'] = [
  '#type' => 'textfield',
  '#placeholder' => '_' . t('Item'),
  '#autocomplete_route_name' => 'k_product.active.autocomplete',
  '#weight' => 17,
];

// Datetime
$form['date_validity'] = [
  '#type' => 'datetime',
  '#date_date_element' => 'date',
  '#date_time_element' => 'time',
  '#required' => TRUE,
  '#default_value' => "",
  '#attributes' => [
    'placeholder' => '_' . t('Validity date'),
   ],
  '#weight' => 15,
];

// Select 
$form['payment'] = [
  '#type' => 'select',
  '#attributes' => [
    'title' => t('Payment Method')
  ],
  '#options' => [
    'CASH' => t('Cash'),
    'CHECK' => t('Check'),
    'TRANSFER' => t('Wire Transfer')
  ],
  '#default_value' => 'CASH',
];

// Checkboxes
$form['platforms'] = [
  '#title' => $this->t('Platforms:'),
  '#type' => 'checkboxes',
  '#description' => $this->t('Select platforms to use as social media links.'),
  '#options' => ['key_a'=> 'text a', 'key_b'=> 'text b', 'key_c'=> 'text c'],
  '#default_value' => ['key_a, 'key_c'],
];

// Radios
$active = [1 => t('Yes'), 0 => t('No')];
$form['typepurchase'] = [
  '#type' => 'radios',
  '#title' => t('This purchases will be in the inventory of merchandise:'),
  '#default_value' => 1,
  '#options' => $active
];

// Button
$form['minus'] = [
  '#type' => "button",
  '#value' => "-",
  '#attributes' => [
    'class' => ['addOperator'],
  ],
  '#weight' => 97,
];

// Textfield
$form['shortDescription'] = [
  '#type' => 'textfield',
  '#default_value' => $shortDescription,
  '#size' => 90,
  '#maxlength' => 90,
  '#attributes' => [
    'placeholder' => '_' . t('Short Description'),
  ],
  '#weight' => 1000,
];

// Textarea
$form['pr']['obs'] = [
  '#type' => 'textarea',
  '#placeholder' => '_' . t('Observation'),
  '#attributes' => ['title' => t('Observation')],
];

// Hidden con ramas abiertas(arreglo multidimencional) enviadas cuando el formulario sea guardado.
$form['plugin_configuration'] = [
  '#type' => 'hidden',
  '#tree' => TRUE,
  '#open' => TRUE,
]
$form['plugin_configuration'][$id] = [
  '#process' => [[get_class($this), 'processPluginConfiguration']],
  '#plugin' => $plugin,
]

// Nombre de sistema (machine name)
$form['id'] = [
  '#type' => 'machine_name',
  '#default_value' => $importer->id(),
  '#machine_name' => [
    'exists' => '\Drupal\products\Entity\Importer::load',
  ],
  '#disabled' => !$importer->isNew(),
];

// Enlace url
$form['url'] = [
  '#type' => 'url',
  '#default_value' => $importer->getUrl() instanceof Url ? $importer->getUrl()->toString() : '',
  '#title' => $this->t('Url'),
  '#description' => $this->t('The url to the import resource'),
  '#required' => TRUE,
];

// Template twig en línea
$form['answer'] = [
  '#type' => 'inline_template',
  '#template' => "{% trans %} Hello {% endtrans %} {{user_name}}",
  '#context' => [
    'user_name' => $user_name,
  ],
];

```

#### Estados
Permiten condicionar el comportamiento de un elemento de formulario a partir del estado otro elemento.
```
$form['boys'] = [
  '#type' => 'checkbox',
  '#title' => $this->t('Do you have boys?'),
];

$form['boys_nomber'] = [
  '#type' => 'textfield',
  '#title' => $this->t('How many boys do you have?'),
  '#states' => [
    'visible' => [
      'input[name="boys"]' => ['checked' => TRUE],
    ]
  ]
];

```
Estados: 
- visible
- invisible
- enabled
- disabled
- required
- optional
- checked
- unchecked
- collapsed

Detonantes:
- checked
- empty
- filled
- unchecked
- expanded
- collapsed
- value

ENLACES Y FUENTES
=================
Documentación oficial
- https://api.drupal.org/api/drupal/8
- https://api.drupal.org/api/drupal/core%21core.api.php/group/form_api/9.1.x


Documentación de la comunidad
- https://www.drupal.org/developing/api/8

Implementar un formulario en un modal llamando desde otro formulario con ajax
- https://www.drupal.org/project/drupal/issues/2934463

Alterar un formulario extendiendolo
- https://www.foreach.be/blog/how-manipulate-forms-drupal-8
