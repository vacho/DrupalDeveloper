COMPOSER
========

#### Instalar Composer globalmente (pre-requisito)
```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
# Para fedora, aws EC2
ln -s /usr/local/bin/composer /usr/bin/composer

#Evitar el corte por tiempo de espera excesivo
"config": {
  "process-timeout": 0,
},
```


ENLACES Y FUENTES
=================
Composer y drupal
- https://www.amazeelabs.com/en/drupal-composer-recipes

Buenas prácticas composer
- https://www.lullabot.com/articles/drupal-8-composer-best-practices

Template composer
- https://github.com/drupal-composer/drupal-project
