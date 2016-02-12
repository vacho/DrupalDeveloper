Usuarios
========

#### Recuperar todos los usuarios y hacer consultas
```
$idsUsers = \Drupal::entityQuery('user')->execute();
$users = User::loadMultiple($idsUsers);
foreach ($users as $user) {
  foreach ($user->get("roles") as $rol) {
    if ($rol->getValue()['target_id'] == "client_manager") {
      ...
    }
  }
}
```

#### Recuperar un usuario
```
$user = User::load($idUser);

```

#### Cerrar sesión de un usuario
```
user_login_finalize($user);

```

ENLACES Y FUENTES
=================
Módulo User 
https://api.drupal.org/api/drupal/core!modules!user!user.module/8

User.php
https://api.drupal.org/api/drupal/core!modules!user!src!Entity!User.php/class/User/8
