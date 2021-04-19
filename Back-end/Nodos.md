Nodos
========
#### Query para obtener datos
```php
// Obtener un nodo con consulta.
$node_storage = $this->entityTypeManager->getStorage('node');
$ids = $node_storage->getQuery()
  ->condition('title', $source_title)
  ->condition('type', 'quiz')
  ->execute();
if (!empty($ids)) {
  $node_id = reset($ids);
  $node = $node_storage->load($node_id);
}

// Obtener el entity_type_manager sin injectar como servicio.
$node_storage = \Drupal::entityTypeManager()->getStorage('node');


// Obtener todos los nodos de un tipo de contenido
$nids = \Drupal::entityQuery('node')->condition('type','my_custom_type')->execute();
$nodes =  \Drupal\node\Entity\Node::loadMultiple($nids);
```


ENLACES Y FUENTES
=================
