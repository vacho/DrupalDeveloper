Cache
===

### Cache types
Ther is 3 types of cache configurations:
- contexts: Define the kind of the output is . Examples user, url.path, languages, theme.
- tags: Let drupal know when cached content should be invalidated and cleared. Examples when the config changes, or some node, or some term, etc. 
- Max-Age: How long the content should be cached in seconds.
```php
use Drupal\Core\Cache\Cache;

return [
  '#markup' => 'Hello, user!',
  '#cache' => [
    'contexts' => ['user'],
    'tags' => ['config:system.site'],
    'max-age' => Cache::PERMANENT,
  ],
];
```

### Operaciones sobre la cache
```php
// Vaciar caches persistentes
use Drupal\Core\Cache\Cache;

foreach (Cache::getBins() as $service_id => $cache_backend) {
    $cache_backend->deleteAll();
}
```

ENLACES Y FUENTES
=================
https://api.drupal.org/api/drupal/core%21core.api.php/group/cache/8.2.x

- Errores y casos comunes
https://www.lullabot.com/articles/common-max-age-pitfalls-with-drupal-cache