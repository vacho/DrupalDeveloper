CONSOLE
========

#### Iniciar las configuraciones de la consola
```
Inicializar configuraciones por defecto de drupal
$ drupal init

Agregar a la comfiguración del shell
source "$HOME/.console/console.rc" 2>/dev/null

Para usar Fish: Crear enlace simbólico
ln -s ~/.console/drupal.fish ~/.config/fish/completions/drupal.fish

```

#### Instalar Drupal

```
Bajar drupal
$ drupal site:new nombreInstancia 8.0.3

Instalar drupal
$ nombreInstancia> drupal site:install

```


ENLACES Y FUENTES
=================
Documentación oficial
https://www.gitbook.com/book/hechoendrupal/drupal-console/details

Sitio
https://drupalconsole.com/

Repositorio
https://github.com/hechoendrupal/DrupalConsole
