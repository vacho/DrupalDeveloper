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
  '#suffix' => '</div>',
];
```


ENLACES Y FUENTES
=================
Documentación oficial
https://api.drupal.org/api/drupal/8

Documentación de la comunidad
https://www.drupal.org/developing/api/8
