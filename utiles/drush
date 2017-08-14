DRUSH
========

#### Instalar
```
# Descargar la última versión estable de github.com/drush-ops/drush/releases.
php -r "readfile('https://s3.amazonaws.com/files.drush.org/drush.phar');" > drush

# Probar si el archivo funciona
php drush core-status

# Dar permisos de ejecución y mover el archivo a donde será accesible desde cualquier ruta
chmod +x drush
sudo mv drush /usr/local/bin

# Opcional. Completar instalación y alias
drush init
```

#### Comandos más útiles
```
# Actualizar un proyecto drupal: saca backup, actualiza el código y actualiza la base de datos
$ drush up

# Cambiar la contraseña de un usuario
drush user-password USERNAME --password="SOMEPASSWORD"

# Bloquear un usuario
drush user-block vacho

# Desbloquear un usuario
drush user-unblock vacho

# Desloguear todos los usuarios
drush sql-query 'TRUNCATE TABLE sessions;'

# Desloguear un usuario en específoc
drush sql-query 'DELETE FROM sessions WHERE uid = 2;'

# Reconstruir rutas
drush ev '\Drupal::service("router.builder")->rebuild();'

```

#### REFERENCIAS
```

https://orga.cat/posts/most-useful-drush-commands

Instalar drush 8 (Drupal 8 + Drupal 7)
wget http://files.drush.org/drush.phar

```
