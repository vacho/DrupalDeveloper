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
use Drupal\Core\Render\Markup;


/**
 * Implements hook_mail_alter()
 * @return mixed
 */
function nombreModulo_mail_alter(&$message) {
  $message['body'][0] = Markup::create($message['body'][0]);
}
```
Tambien funciona
```
 check_markup(
      $token->replace($settings->get('confirmation_body'), $data),
      $settings->get('confirmation_body_format')
    ),
```


ENLACES Y FUENTES
=================
Documentación SwiftMailer
- https://www.drupal.org/node/1590154

Inspiración para le hook
- http://code.tutsplus.com/tutorials/using-and-extending-the-drupal-8-mail-api-part-1--cms-23419

- https://api.drupal.org/api/drupal/core!core.api.php/function/hook_mail_alter/8.2.x

- https://www.drupal.org/node/2677530#comment-11226949

Actualizado envio de email
- https://www.lucius.digital/en/blog/sending-html-mails-drupal-89-programmatically-example-drupal-module-including-twig-template
