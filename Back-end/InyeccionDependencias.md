Inyección de dependencias
========

#### Servicio para realizar consultas a entidades

Llamar al servicio
```
use Drupal\Core\Entity\EntityTypeManagerInterface;
```

Inyectar el servicio en el constructor.
```
   * ...
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   *   Entity type manager.
   * ...
   */
  public function __construct(..., EntityTypeManagerInterface $entityTypeManager, ...) {
    parent::__construct(...);
    ...
    $this->entityTypeManager = $entityTypeManager;
    ...
  }
```

Instanciar el servicio al momento de crear el objeto.
```
  ...
    public static function create(..., ContainerInterface $container, ...) {
      return new static(
        ...,
        $container->get('entity_type.manager'),
        ...
      );
    }
```

Utilizar el servicio.
```
  $entityTypeDefinition = $this->entityTypeManager->getDefinition($entity_type_id);
    if ($bundle_key = $entityTypeDefinition->getKey('bundle')) {
      $results = $this->entityTypeManager->getStorage('node')->loadByProperties([
        'nid' => $entity_ids
      ]);
      foreach ($results as $node) {
        $type = $node->getType();
        if (!isset($bundle_data[$entity_type_id][$type])) {
          $bundle_data[$entity_type_id][$type] = $bundle_info[$entity_type_id][$type]['label'];
        }
      }
    }
```

ENLACES Y FUENTES
=================
Documentación oficial
https://api.drupal.org/api/drupal/8

Documentación de la comunidad
https://www.drupal.org/developing/api/8
