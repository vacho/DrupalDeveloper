Contribución
========
#### Actualización de parches (Reroll)
```
Se trata de actualizar soluciones que han quedado incompatibles con cambios recientes en el código.

PASOS PREVIOS
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

REALIZAR EL REROLL
1. Ir a la issue y copiar la fecha en el comentario del parche descargado 

2. Ver el log de commits de esa fecha
$ git log --before="12 November 2018 at 12:15"

3. Tomar los primeros 9 caracteres del código del primer commit e ir a este
$ git checkout -b test-branch 749f569c6

4. Aplicar el parche
$ git apply --index 2599228-93.patch

5. Commit del parche
$ git commit -m "Applying patch from issue 2599228 comment 12852422"

6. Intenta hace pull de todos los cambios que han sido hechos desde el commit del parche.
$ git rebase 8.7.x

Si hay conflictos: Realizar los conflictos del rebase.
https://www.drupal.org/node/2723783

Si no hay conflictoss
- Crear un parche con un diff de tu branch local (test-branch) sobre la rama principal:
$ git diff -M 8.7.x test-branch > test-branch.patch
Verificar si el parche creado es correcto
$ git checkout 8.7.x
$ git apply --check test-branch.patch
(no output)
```


ENLACES Y FUENTES
=================
Reroll
https://www.drupal.org/contributor-tasks/reroll
