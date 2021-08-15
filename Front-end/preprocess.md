Preprocess
========
#### Sobreescribir un theme

Para manejar el focal point: 
```php
/**
 * Implements hook_preprocess_hook().
 */
function nombre_theme_preprocess_paragraph__full_width_push(array &$variables) {
  $paragraph = $variables['paragraph'];
  if ($paragraph->hasField('field_image_media') && !$paragraph->field_image_media->isEmpty()) {
    // Get image url.
    $entity_type_manager = \Drupal::entityTypeManager();
    $media = $entity_type_manager->getStorage('media')->load($paragraph->field_image_media->target_id);
    $file = $entity_type_manager->getStorage('file')->load($media->field_media_image->target_id);
    $image_uri = $file->getFileUri();
    $style = $entity_type_manager->getStorage('image_style')->load('style_full_width_push_default');
    $variables['project_image_url'] = $style->buildUrl($image_uri);
    // Get image focal point settings.
    $variables['project_image_url_focal_point'] = '0 0';
    $crop_type = \Drupal::config('focal_point.settings')->get('crop_type');
    $focal_point_manager = \Drupal::service('focal_point.manager');
    $crop = $focal_point_manager->getCropEntity($file, $crop_type);
    if (!$crop->get('x')->isEmpty() && !$crop->get('y')->isEmpty()) {
      $x = $crop->get('x')->value;
      $y = $crop->get('y')->value;
      $focal_point = $focal_point_manager->absoluteToRelative($x, $y, $media->field_media_image->width, $media->field_media_image->height);
      $variables['project_image_url_focal_point'] = $focal_point['x'] . '% ' . $focal_point['y'] . '%';
    }
    \Drupal::service('renderer')->addCacheableDependency($variables, $media);
  }
}

/**
 * Implements hook_preprocess_views_view_unformatted__clubs__clubs_activities_schedule().
 */
function koala_ecommerce_preprocess_field__commerce_product__title(&$variables) {
  /** @var Drupal\commerce_product\Entity\Product $product */
  if ($product = $variables['element']['#object']) {
    $product_id = $product->id();
    // @todo work with more than one variation.
    $variations = $product->getVariationIds();
    $variation_id = reset($variations);
    $category_id = $product->get('field_categoy')->getValue()[0]['target_id'];
    $term = Term::load($category_id);
    $subcategory_id = 0;
    $id = $term->id();
    $parent_id = $term->parent->target_id;
    if ($parent_id > 0) {
      $category_id = $parent_id;
      $subcategory_id = $id;
    }

    $params = [
      'product_id' => $product_id,
      'product_variation_id' => $variation_id,
      'category' => $category_id,
      'subcategory' => $subcategory_id,
    ];
    $url = new Url('koala_ecommerce.product_page', $params);
    $variables['items'][0]['content']['#url'] = $url;
  }
}
```