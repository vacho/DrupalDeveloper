Contribución
========
#### Actualización de parches (Reroll)
```
Se trata de actualizar soluciones que han quedado incompatibles con cambios recientes en el código.

Pasos previos
1. Filtrar issues que tienen necesidad de Reroll. Escoger una.
https://www.drupal.org/project/issues/search/drupal?issue_tags=Needs+reroll
2. Confirmar que el parche necesita reroll
- Actualizar el core actualizado
$ git checkout 8.7.x
$ git pull --rebase
- Descargar el parche
- Verficiar el parche
$ git apply --check nombre-archivo.patch
Si el resultado es vacio el parche no necesita ser actualizado. 
- Quitar el tag: "Needs reroll"
- Dejar un comentario "I could apply the patch, so no reroll is needed." 
Si el resultado es que se necesita el reroll:
Dejar un comentario avisando que se está empezando a hacer el reroll y asignarse la tarea mientras dure el trabajo.

Realizar el reroll



```


ENLACES Y FUENTES
=================
Reroll
https://www.drupal.org/contributor-tasks/reroll
