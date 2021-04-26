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
