Nodos
========
#### Query para obtener datos
```
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
```





ENLACES Y FUENTES
=================
