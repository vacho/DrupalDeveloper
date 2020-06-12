DRUSH
========

#### Instalar
```
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
