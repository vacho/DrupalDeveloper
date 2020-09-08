HOOKS
========

#### Trozos de código para obtener programaticamente.

Obtener el arbol de terminos de una taxonomía.
```
$tree = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree(
      'id_vocabulario',
      0,               // id del termino padre(tid). "0" para obterner todos.
      1,               // Nivel del término. "1" Es es el primer nivel
      TRUE             // Obtener la entidad del termino entera o un Stdclass.
    );
```

Obtener todos los terminos padre de un termino.
```
$ancestors = \Drupal::service('entity_type.manager')->getStorage("taxonomy_term")->loadAllParents($tid);
$list = [];
foreach ($ancestors as $term) {
  $list[$term->id()] = $term->label();
}
```


ENLACES Y FUENTES
=================
Terminos y niveles.
- https://boylesoftware.com/blog/drupal-8-get-taxonomy-terms-level/