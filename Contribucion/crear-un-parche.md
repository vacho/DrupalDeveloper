Crear un parche
========
```
Se trata de resolver problemas en una issue de drupal y crear un parche.
```

```
Clonar el repositorio del proyecto con la issue:
De https://www.drupal.org/project/lightning_workflow/git-instructions copiar:
$ git clone --branch 8.x-3.x https://git.drupalcode.org/project/lightning_workflow.git
$ cd lightning_workflow
$ git checkout -b nombre_rama_nueva

Modificar el código del módulo resolviendo el issue en cuestión.
...

Crear el parche con la sulución:
$ git add -p
$ git commit -m "...."
$ git diff -M 8.x-3.x nombre_rama_nueva > numero_issue-numero_comentario.patch

Verificar si el parche creado es correcto
$ git checkout 8.x-3.x
$ git apply --check numero_issue-numero_comentario.patch
(no output)

Aplicar el parche para verificar el correcto funcionamiento
$ git checkout 8.x-3.x
$ git apply --index numero_issue-numero_comentario.patch
