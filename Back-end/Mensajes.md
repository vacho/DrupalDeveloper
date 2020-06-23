Mensajes
===

#### Mensajes a la interface del usuario
```
//Mensajes del sistema
\Drupal::messenger()->addMessage(t('An error occurred and processing did not complete.'), 'error');

\Drupal::messenger()->addStatus(t('This is a successful message.'));
\Drupal::messenger()->addWarning(t('This is a warning message.'));
\Drupal::messenger()->addError(t('This is an error message.'));
```

#### Mensajes al sistema de logs (Whatchdog)
```
// Noticias
\Drupal::logger('mi_modulo')->notice($message);

// Errores
\Drupal::logger('mi_modulo')->error($message);
```