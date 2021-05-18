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