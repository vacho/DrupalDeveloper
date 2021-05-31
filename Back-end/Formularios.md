FORMULARIOS
========

#### Manejo

```php
//Obtener todos los elementos de un form_state
foreach ($form_state->getValues() as $key => $value) {
      drupal_set_message($key . ': ' . $value);
}
//Obtener un elemento de un form_state
$searched = $form_state->getValue('nombre_elemento_formulario');
    
```

#### Campos de formularios
```php
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
  '#default_value' => ['key_a'],
];

// Radios
$active = [1 => $this->('Yes'), 0 => $this->('No')];
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

// Número telefónico
$form['phone_number'] = [
  '#type' => 'tel',
  '#title' => $this->t('Example phone'),
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

// Elementos tag html
$form['title'] = [
  '#type' => 'html_tag',
  '#tag' => 'h2',
  '#value' => $this->t('Regret cancellation'),
];
$form['intro'] = [
  '#type' => 'html_tag',
  '#tag' => 'p',
  '#value' => $this->t('Do you confirm that you want keep your membership %subscription instead of cancelling it on %date?', [
    '%subscription' => $subscription_label,
    '%date' => $date,
    ]),
  ];

```

#### Estados
Permiten condicionar el comportamiento de un elemento de formulario a partir del estado otro elemento.
```php
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


#### Webform
Consultas
```php
$submission_storage = \Drupal::entityTypeManager()->getStorage('webform_submission');
$ids_ws = $submission_storage->getQuery()
  ->accessCheck(FALSE)
  ->condition('uuid', $submission_uuid)
  ->execute();
if (count($ids_ws) == 1) {
  $id_ws = reset($ids_ws);
  $webform_submission = $submission_storage->load($id_ws);
  $webform_submission_data = $webform_submission->getData();

  if ($webform_submission_data['numero_de_socio'] == $codigo_de_socio) {
    $email = $webform_submission_data['correo_electronico'];
    $whatsapp_number = $webform_submission_data['numero_celular_con_whatsapp'];
    $status = TRUE;
  }
  else {
    $status = FALSE;
  }
}


$select = \Drupal::service('database')
  ->select('webform_submission_data', 'wsd')
  ->fields('wsd', array('sid'))
  ->orderBy('wsd.sid', 'DESC')
  ->condition('wsd.webform_id', 'id_formulario', '=')
  ->condition('wsd.name', 'nombre_sistema_del_campo', '=')
  ->condition('wsd.value', $some_value, '=')
  ->execute();
$results = $select->fetchAll(\PDO::FETCH_COLUMN);

```

ENLACES Y FUENTES
=================
Documentación oficial
- https://api.drupal.org/api/drupal/core%21core.api.php/group/form_api/9.1.x


Implementar un formulario en un modal llamando desde otro formulario con ajax
- https://www.drupal.org/project/drupal/issues/2934463

Alterar un formulario extendiendolo
- https://www.foreach.be/blog/how-manipulate-forms-drupal-8

Sobreescribir la ruta pasando parametros en array
- http://www.impraveen.com/override-route-controller-drupal-8

Tablas con paginador
- https://zanzarra.com/blog/drupal-custom-pager-and-table-header-sortable-without-sql-query