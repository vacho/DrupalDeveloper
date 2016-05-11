EMAIL
========
#### Instalar SwiftMailer
```
//Estando en la rais del proyecto drupal
$ composer require swiftmailer/swiftmailer

//instalar el módulo SwiftMailer
$ drupal module:download swiftmailer
$ drupal module:install swiftmailer
// Configurar el mismo en la ruta: /admin/config/swiftmailer/transport

//instalar el módulo MailSystem
$ drupal module:download mailsystem
$ drupal module:install mailsystem
//Configurar el mismo en la ruta: /admin/config/system/mailsystem
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

