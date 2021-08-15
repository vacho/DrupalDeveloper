EMAIL
========
#### Envío de email por código
```php
// En caso de tener que enviar un archivo adjunto.
$file = file_save_data($output, $destination, FileSystemInterface::EXISTS_REPLACE);
$file->setTemporary();
$file->save();
$this->fileName = $file->label();
$attachment = [
  'filecontent' => file_get_contents($destination),
  'filename' => $file->label(),
  'filemime' => 'application/pdf'
];

// Obtener las configuraciones para enviar.
$tempstore = \Drupal::service('tempstore.private');
$store = $tempstore->get('views_bulk_operations_' . $this->view->id() . '_' . $this->view->current_display);
$subject = $store->get('subject');
$email = $store->get('email');
$body = $store->get('body');

// Enviar el email.
$mail_manager = \Drupal::service('plugin.manager.mail');
$lang_code = \Drupal::languageManager()->getCurrentLanguage()->getId();
$params = [
  'subject' => $subject,
  'to' => $email,
  'body' => $body,
];
$params['attachments'][] = $attachment;
$mail_manager->mail('nombre_modulo', 'clave_envio', $params['to'], $lang_code, $params, NULL, TRUE);

// @Por verificar pero algunas veces se necesita este hook más
/**
 * Implements hook_mail().
 */
function mi_modulo_mail($key, &$message, $params) {
  $options = [
    'langcode' => 'es',
  ];

  switch ($key) {
    case 'clave_envio':
      $message['from'] = \Drupal::config('system.site')->get('mail');
      $message['to'] = $params['to'];
      $message['subject'] = $params['subject'];
      $message['body'][] = $params['body'];
      break;
  }
}
```

#### SwiftMailer
```bash
# Estando en la rais del proyecto drupal
composer require drupal/swiftmailer 

# Instalar el módulo SwiftMailer
drush en swiftmailer

# Configurar en la ruta: /admin/config/swiftmailer/transport
# Transport types puede estar en el de tu preferencia
# En la pestaña mensajes elige HTML y desmarca "Respect provided e-mail format."

# Instalar el módulo MailSystem
drush en mailsystem
# Configurar en la ruta admin/config/system/mailsystem
# Formater y Sender deben estar en SwiftMailer, Theme puede estar en el Tema por defecto o en SwiftMailer

# Customizar el template html
# En la ruta /modules/swiftmailer/templates/swiftmailer.html.twig se encuentra el template base.
```

#### Bug..
Si aunque este todo bien configurado el sitio no logra mandar email html.. este hook lo resuelve
```php
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
