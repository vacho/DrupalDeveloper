DRUSH
========

#### Instalar
```bash
# Visitar https://github.com/drush-ops/drush/releases y descargar drush.phar (8.x recomendado).

# Verificar archivo.
php drush.phar core-status

# Renombrar `drush` por `php drush.phar`. y mover archivo $PATH. 
chmod +x drush.phar
sudo mv drush.phar /usr/local/bin/drush

# Opcional. Habilita alias
drush init
```

#### Comandos más útiles
```bash
# Ver log de errores
drush watchdog-show

# Actualizar un proyecto drupal: saca backup, actualiza el código y actualiza la base de datos
drush up

# Lista de módulos activos que no son del core.
drush pm-list --type=Module --no-core   --status=enabled

# Cambiar la contraseña de un usuario
drush user-password USERNAME --password="SOMEPASSWORD"

# Reconstruir rutas
drush ev '\Drupal::service("router.builder")->rebuild();'

# loguear como admin
drush uli --uri local.misitio.com

# Ver todos los servicios
drush devel-container-services

# verificar una configuración activa
drush cget nombre_configuracion

# Manejar hook_update
drush php-eval "echo drupal_get_installed_schema_version('siblu_field');"
drush php-eval "echo drupal_set_installed_schema_version('siblu_field', '8004');"
drush updb -y

# Deploy
drush deploy

Drush deploy ejecuta:
drush updatedb --no-cache-clear
drush cache:rebuild
drush config:import
drush cache:rebuild
drush deploy:hook

# Search API
drush search-api:rebuild-tracker && drush search-api:index
drush crons

```
# Comandos base de datos
```bash
# actualizar base de datos
drush updb -y

# Entrar modo consola a la base de datos
$ drush sql-cli

# Sacar backup de la base de datos.
$ drush sql-dump
$ drush sql-dump > default.sql

# importar contenido por defecto
drush default-content:import-all
```

# Comandos usuarios
```bash
# Crear usuario
drush user-create <usuario>

# Cambiar de clave usuario
drush user-password <usuario> <contraseña>

# Agregar rol a usuario
drush user-add-role <rol> <usuario>

# Bloquear un usuario
drush user-block <usuario>

# Desbloquear un usuario
drush user-unblock <usuario>

# Desloguear todos los usuarios
drush sql-query 'TRUNCATE TABLE sessions;'

# Desloguear un usuario en específico
drush sql-query 'DELETE FROM sessions WHERE uid = 2;'
```

# Comandos para manipular configuraciones
```bash
# Editar configuración activa
drush config-edit <numero>

# importar configuraciones
drush cim -y

# exportar configuraciones
drush cex
```

# Comandos gestion del sitio
```bash
# Sitio en modo mantenimiento
drush state:set system.maintenance_mode 1 --input-format=integer
drush state:set system.maintenance_mode 0 --input-format=integer
```

#### REFERENCIAS
```
Comandos más utilizados
- https://orga.cat/posts/most-useful-drush-commands

Instalar drush 8 (Drupal 8 + Drupal 7)
- wget http://files.drush.org/drush.phar

Comandos base de datos
- https://drushcommands.com/drush-8x/sql/
```
