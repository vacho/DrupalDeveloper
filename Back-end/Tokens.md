Tokens
========

#### Crear nuevos tokens
En el archivo mi_modulo.tokens.inc
```php
/**
 * @file
 * Contains functions related to tokens for Siblu.
 */

use Drupal\Core\Render\BubbleableMetadata;

/**
 * Implements hook_token_info().
 */
function mi_modulo_token_info() {
  $types['mi_modulo_product'] = [
    'name' => t('Product'),
    'description' => t('Tokens related to current product.'),
  ];

  $product = [
    'manager' => [
      'name' => t('Commerce product manager'),
    ],
    'phone_number' => [
      'name' => t('Commerce product manager phone number'),
    ],
  ];

  return [
    'types' => $types,
    'tokens' => [
      'siblu_product' => $product,
    ],
  ];
}

/**
 * Implements hook_tokens().
 */
function mi_modulo_tokens($type, $tokens, array $data, array $options, BubbleableMetadata $bubbleable_metadata) {
  $replacements = [];

  if ($type == 'mi_modulo_product') {
    $product = \Drupal::request()->attributes->get('commerce_product');
    if (empty($product)) {
      return $replacements;
    }
    foreach ($tokens as $name => $original) {
      switch ($name) {
        case 'manager':
        case 'phone_number':
          if (!$product->{$name}->isEmpty()) {
            $replacements[$original] = $product->{$name}->value;
          }
          break;

      }
    }
  }

  return $replacements;

}


```

