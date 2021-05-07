Drush
===

Se pueden programar nuevos comandos para drush.


#### Ejemplo comando
```php
namespace Drupal\mi_modulo\Commands;

use Drupal\mi_modulo\LocalsHandlerInterface;
use Drush\Commands\DrushCommands;

/**
 * Drush commands concerning centers.
 */
class MiNuevoCommando extends DrushCommands {

  /**
   * The locals service handler.
   *
   * @var \Drupal\mi_modulo\LocalsHandlerInterface
   */
  protected $localsHandler;

  /**
   * Commands constructor.
   *
   * @param \Drupal\mi_modulo\LocalsHandlerInterface $locals_handler
   *   The locals handler service.
   */
  public function __construct(LocalsHandlerInterface $locals_handler) {
    parent::__construct();
    $this->localsHandler = $locals_handler;
  }

  /**
   * Import Local nodes from Loclas service information.
   *
   * @param string $local_id
   *   Local ID.
   *
   * @command mi_modulo-locals:import-locals
   *
   * @usage drush mi_modulo-locas:import-locals
   *   Creates nodes for centers of default area 1.
   */
  public function importLocals($local_id = '1') {
    $locals = $this->centersHandler->initializeCenters([$local_id]);
    if (isset($locals['local_' . $local_id])) {
      $this->output()->writeln(
        'An amount of ' . count($locals['area_' . $local_id]) . ' locals where successfully imported.'
      );
    }
    else {
      $this->output()->writeln('The entered Local ID <em>"' . $local_id . '"</em> did not match any result.');
    }
  }

}

```

#### Referencias
Documentación API
- https://api.drupal.org/api/drupal/core%21includes%21form.inc/group/batch/8.2.x

Ejemplo de uso
- https://opensenselabs.com/blogs/tech/how-use-batch-api-drupal-8