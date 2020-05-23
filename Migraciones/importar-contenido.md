Migrar contenido
========
#### Módulos involucrados.
```
migrate - Framework de migraciones hacia Drupal(nodes, users, files, terms, comments) desde otras fuentes.
migrate_tools - Kit de herramientas para ejecutar y administrar migraciones (status, import, rollback, stop, reset-status, messages, fiedls-source)
migrate_plus - Extensiones al core de migrate (Configuration entities, extensiones del API como PREPARE_ROW, etc.)
migrate_source_csv - Funcionalidad completa para importar archivos CSV.
config_devel - Ayuda a configrar el entorno para importaciones y exportaciones automáticas.
```
#### Proceso.
```
Crear un módulo nuevo.
Crear la estructura de archivos
Crear el archivo de datos csv.
Crear el archivo de importación yml.
Testear la migración (comandos drush)
```
#### Comandos drush.
```
Lista de todas las migraciones disponibles
$ drush ms

Realizar la importación de una migración
$ drush mi <id_migración>
```
#### Todo lo que se puede hacer.
```
- Importar archivos pdf, imágenes, etc.
- Importar en diferentes tipos de campos.
- Importar en entidades relacionadas.
- Combinaciones de plugibs estándar (explode, default_value, concat, etc.)
- Crear plugins propios.
```

ENLACES Y FUENTES
=================
Buen video explicativo que muestra como usar migrate
https://www.youtube.com/watch?v=zZLL02GkP9E&t=1372s
