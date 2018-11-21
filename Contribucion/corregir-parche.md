Resolver problemas en un parche
========
```
Se trata de resolver problemas de testeo, problemas detectados y/o comentados.
```


#### Pasos previos
```
1. Identificar una issue con la estado "Needs work"
https://www.drupal.org/project/issues/search/drupal?status%5B%5D=13&version%5B%5D=8.x

2. Encontrar una issue en la que se sienta capaz que se puede resolver los problemas en el parche subido.

3. Actualizar el core
$ git checkout 8.7.x
$ git pull --rebase

4. Descargar el parche en el comentario más reciente
```

#### Resolver los problemas
```
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
- RESOLVER LOS PROBLEMAS EN EL PARCHE
- Crear un parche con un diff de tu branch local (test-branch) sobre la rama principal:
$ git diff -M 8.7.x test-branch > test-branch.patch
Verificar si el parche creado es correcto
$ git checkout 8.7.x
$ git apply --check test-branch.patch
(no output)
```
