Commerce el ecosistema para hacer comercio electrónico de Drupal
========

#### Manipular entidades programaticamente
```php
// Obener productos
$query = \Drupal::entityQuery('commerce_product')
      ->condition('status', 1);
$and = $query->andConditionGroup();
$and->condition('field_categoy', $category);
$query->condition($and);
if ($subcategory != 0) {
  $and = $query->andConditionGroup();
  $and->condition('field_categoy', $subcategory);
  $query->condition($and);
}
$product_ids = $query->execute();
$products = [];

foreach ($product_ids as $product_id) {
  $products[] = [
    'id' => $product_id,
  ];
}


// Obtener producto por parametro
$parameter = \Drupal::routeMatch()->getParameter('commerce_product');
$product = \Drupal\commerce_product\Entity\Product::load((int)$parameter->id());

// Cargar product variations
$entity_manager = \Drupal::entityManager();
$product_variation = $entity_manager->getStorage('commerce_product_variation')->load((int)$product->getVariationIds()[0]);
$price_number = $product_variation->get('price')->getValue()[0]['number'];
$price_currency = $product_variation->get('price')->getValue()[0]['currency_code'];
```


#### Módulos recomendads
Commerce Reporting

Nos da reportes gráficos y en tablas de clientes, productos, pagos por periodos de tiempo.
- https://www.drupal.org/project/commerce_reports

Commerce Stock

Permite gestionar el stock para las Tiendas.
- https://www.drupal.org/project/commerce_stock

### Diagrama relación de entidades
- https://docs.drupalcommerce.org/commerce2/developer-guide/core/relationships


ENLACES Y FUENTES
=================
Documentación API para drupal 8 (commerce 2)
- https://docs.drupalcommerce.org/commerce2/getting-started

Recetas de código
- https://docs.drupalcommerce.org/commerce2/developer-guide/products/product-management/code-recipes

Código para agregar al carrito
- https://www.valuebound.com/resources/blog/how-to-add-a-product-programmatically-to-drupal-commerce-cart