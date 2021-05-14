Drush para drupal 8
===
#### Instalar globalmente
```bash
# Primero instalar composer, luego:
composer global require drush/drush:dev-master
git clone https://github.com/drush-ops/drush.git /usr/local/src/drush
cd /usr/local/src/drush
git checkout master-fulltest  #or whatever version you want.
ln -s /usr/local/src/drush/drush /usr/bin/drush
composer install
drush --version
```

#### Tareas administrativas
```bash
# Actualizar el core (probado con Drupal 7)
drush rf
drush up drupal
```

Email
===
#### Revisar emails mandados localmente
```bash
# En php.ini
# sendmail_path = /usr/bin/env catchmail -f some@from.address

apt-get install ruby-full g++ sqlite3 libsqlite3-dev
gem install mailcatcher
mailcatcher

# mailcatcher
# Go to http://localhost:1080/
# Send mail through smtp://localhost:1025
```

Fish
===
#### Mejora la consola de linux
```bash
sudo apt-get install fish

# Colocar el shell fish como el por defecto para el usuario
chsh -s `which fish`

# Salir de fish
bash
```

Referencias
===
Drush
- http://docs.drush.org/en/master/install/

Maicatcher
- http://mailcatcher.me/

Fish: Mejora la consola
- https://fishshell.com/docs/current/tutorial.html
- https://www.digitalocean.com/community/tutorials/how-to-install-and-use-the-fish-shell-on-an-ubuntu-vps
