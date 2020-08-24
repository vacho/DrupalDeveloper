Commerce el ecosistema para hacer comercio electrónico de Drupal
========

#### Manipular entidades programaticamente
```
$parameter = \Drupal::routeMatch()->getParameter('commerce_product');
$product = \Drupal\commerce_product\Entity\Product::load((int)$parameter->id());

/*Load Product Variations*/
$entity_manager = \Drupal::entityManager();
$product_variation = $entity_manager->getStorage('commerce_product_variation')->load((int)$product->getVariationIds()[0]);
$price_number = $product_variation->get('price')->getValue()[0]['number'];
$price_currency = $product_variation->get('price')->getValue()[0]['currency_code'];
```


#### Módulos recomendads
Commerce Reporting
Nos da reportes gráficos y en tablas de clientes, productos, pagos por periodos de tiempo.
```
https://www.drupal.org/project/commerce_reports
```

Commerce Stock
Permite gestionar el stock para las Tiendas.
```
https://www.drupal.org/project/commerce_stock
```

### Diagrama relación de entidades
https://docs.drupalcommerce.org/commerce2/developer-guide/core/relationships


ENLACES Y FUENTES
=================
Documentación API para drupal 8 (commerce 2)
https://docs.drupalcommerce.org/commerce2/getting-started

