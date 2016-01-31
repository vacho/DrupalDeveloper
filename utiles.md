Composer
===
#### Instalar globalmente
```
$ curl -sS https://getcomposer.org/installer | php
$ mv composer.phar /usr/local/bin/composer
Para fedora, aws EC2
$ ln -s /usr/local/bin/composer /usr/bin/composer
```

Console
===
#### Instalar globalmente
```
Primero instalar composer, luego:
$ curl https://drupalconsole.com/installer -L -o drupal.phar
$ mv drupal.phar /usr/local/bin/drupal
$ ln -s /usr/local/bin/drupal /usr/bin/drupal
```

Drush para drupal 8
===
#### Instalar globalmente
```
Primero instalar composer, luego:
$ composer global require drush/drush:dev-master
$ git clone https://github.com/drush-ops/drush.git /usr/local/src/drush
$ cd /usr/local/src/drush
$ git checkout master-fulltest  #or whatever version you want.
$ ln -s /usr/local/src/drush/drush /usr/bin/drush
$ composer install
$ drush --version
```

#### Tareas administrativas
```
Actualizar el core (probado con Drupal 7)
$ drush rf
$ drush up drupal
```

Email
===
#### Revisar emails mandados localmente
```
En php.ini
sendmail_path = /usr/bin/env catchmail -f some@from.address

$ apt-get install ruby-full g++ sqlite3 libsqlite3-dev
$ gem install mailcatcher
$ mailcatcher

mailcatcher
Go to http://localhost:1080/
Send mail through smtp://localhost:1025

```

Referencias
===
Composer
https://getcomposer.org/doc/00-intro.md#globally

Console
https://www.drupal.org/project/console

Drush
http://docs.drush.org/en/master/install/

Maicatcher
http://mailcatcher.me/
