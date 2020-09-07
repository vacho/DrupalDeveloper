HOOKS
========

#### Trozos de código para obtener programaticamente.

Obtener un arbol de ls terminos de una taxonomía.
```
$tree = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree(
      'id_vocabulario',
      0,               // id del termino padre(tid). "0" para obterner todos.
      1,               // Nivel del término. "1" Es es el primer niveñ
      TRUE             // Obtener la entidad del termino entera o un Stdclass.
    );
```


ENLACES Y FUENTES
=================
Terminos y niveles.
- https://boylesoftware.com/blog/drupal-8-get-taxonomy-terms-level/