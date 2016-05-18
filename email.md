EMAIL
========
#### SwiftMailer
```
//Estando en la rais del proyecto drupal
$ composer require swiftmailer/swiftmailer

// Instalar el módulo SwiftMailer
$ drupal module:download swiftmailer
$ drupal module:install swiftmailer
Configurar en la ruta: /admin/config/swiftmailer/transport
Transport types puede estar en el de tu preferencia
En la pestaña mensajes elige HTML y desmarca "Respect provided e-mail format."

// Instalar el módulo MailSystem
$ drupal module:download mailsystem
$ drupal module:install mailsystem
Configurar en la ruta admin/config/system/mailsystem
Formater y Sender deben estar en SwiftMailer, Theme puede estar en el Tema por defecto o en SwiftMailer

// Customizar el template html
En la ruta /modules/swiftmailer/templates/swiftmailer.html.twig se encuentra el template base.

```

#### Bug..
Si aunque este todo bien configurado el sitio no logra mandar email html.. este hook lo resuelve
```
function nombreDeTuModulo_mail_alter(&$message) {
  $message['headers']['Content-Type'] = 'text/html; charset=UTF-8';
}
```

ENLACES Y FUENTES
=================
Documentación SwiftMailer
https://www.drupal.org/node/1590154

Inspiración para le hook
http://code.tutsplus.com/tutorials/using-and-extending-the-drupal-8-mail-api-part-1--cms-23419

