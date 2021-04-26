Cache
===

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
