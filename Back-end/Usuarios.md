Usuarios
========
#### Usuario actual
```
//Obtener usuario actual
$user = \Drupal::currentUser();
//Verificar si el usuario tiene un permiso
\Drupal::currentUser()->hasPermission("id_del_permiso")
```

#### Crear usuarios
```
$language = \Drupal::languageManager()->getCurrentLanguage()->getId();
$user = \Drupal\user\Entity\User::create();

//Mandatory settings
$user->setPassword('clave');
$user->enforceIsNew();
$user->setEmail('email');
$user->setUsername('nombre_usuario');

//Configuraciones opcionales
$user->set("init", 'email');
$user->set("langcode", $language);
$user->set("preferred_langcode", $language);
$user->set("preferred_admin_langcode", $language);

$user->activate();

//Guardar usuario
$res = $user->save();
```

#### Loguear usuario
```
$account = user_load_by_name('nombre_usuario');
user_user_login($account);
user_login_finalize($account);
```

#### Desloguear usuario
```
user_logout();
```

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

#### Asignar privilegios a un rol
```
$role = \Drupal\user\Entity\Role::load('authenticated');
$role->grantPermission('access comments');
$role->save();
```

ENLACES Y FUENTES
=================
Módulo User 
https://api.drupal.org/api/drupal/core!modules!user!user.module/8

User.php
https://api.drupal.org/api/drupal/core!modules!user!src!Entity!User.php/class/User/8

Roles de usuario
https://api.drupal.org/api/drupal/core!core.api.php/group/user_api/8
