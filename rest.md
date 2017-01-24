REST
========

#### Generación mediante la consola
```
// Genera la clase que permite gestionar un servicio mediante los métodos GET, PUT, POST, DELETE, PATCH, HEAD, OPTIONS
$ drupal generate:plugin:rest:resource
Cuando pida 'Enter the plugin rest resource url' se puede poner /ruta/{parametros}
```

### Habilitar el recurso
```
Instalar el módulo REST UI
https://www.drupal.org/project/restui

- Habilitar el recurso.
/admin/config/services/rest

- Activar privilegios para los roles indicados.
/admin/people/permissions
```

### Acceder al recurso
```
Por URL
/dblog/1?_format=json

Usando postman

```


#### Referencias
```
Ejmplo con GET y POST
https://github.com/DrupalBolivia/RESTFul-web-services/blob/master/rest_example/src/Plugin/rest/resource/RestExampleResource.php

Documentación
https://www.drupal.org/docs/8/api/restful-web-services-api/restful-web-services-api-overview
```

